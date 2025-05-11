package example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

class PaymentServiceTest 
{
	 @Mock
	    private ExternalPaymentGateway mockGateway;

	    @Test
	    void testSuccessfulPaymentOnFirstAttempt() throws Exception 
	    {
	        when(mockGateway.process()).thenReturn(true);
	        
	        PaymentService service = new PaymentService(mockGateway, 3);
	        assertTrue(service.processPayment());
	        verify(mockGateway, times(1)).process();
	    }

	    @Test
	    void testRetryLogicOnFailure() throws Exception {
	        when(mockGateway.process())
	            .thenThrow(new Exception("Network error"))
	            .thenThrow(new Exception("Server timeout"))
	            .thenReturn(true);
	        
	        PaymentService service = new PaymentService(mockGateway, 3);
	        assertTrue(service.processPayment());
	        verify(mockGateway, times(3)).process();
	    }

	    @Test
	    void testFailureAfterMaxRetries() throws Exception {
	        when(mockGateway.process()).thenThrow(new Exception("Service unavailable"));
	        
	        PaymentService service = new PaymentService(mockGateway, 3);
	        assertFalse(service.processPayment());
	        verify(mockGateway, times(3)).process();
	    }
}
