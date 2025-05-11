package controlFlow.PaymentService; // Same package as main code

import controlFlow.UserService;          // Import from parent package
import controlFlow.PaymentGateway;       // Import from parent package
import controlFlow.AuditService;         // Import from parent package
import controlFlow.MavenPaymentService;
import controlFlow.PaymentRequest;       // Import from parent package
import controlFlow.PaymentResult;        // Import from parent package
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PaymentServiceTest {
    @Test
    void testProcessPayment() {
        // Mock/stub dependencies (example)
        UserService userService = new UserService();
        PaymentGateway gateway = new PaymentGateway();
        AuditService auditService = new AuditService();

        // Create the service and request
        MavenPaymentService paymentService = new MavenPaymentService(userService, gateway, auditService);
        PaymentRequest request = new PaymentRequest(100.0, "USD", "user123");

        // Test logic
        PaymentResult result = paymentService.processPayment(request);
        assertTrue(result.getStatus().equals("SUCCESS"));
    }
}