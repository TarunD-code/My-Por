package example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PaymentProcessor {
    private static final Logger logger = LoggerFactory.getLogger(PaymentProcessor.class);

    public static void main(String[] args) {
        ExternalPaymentGateway gateway = new RealPaymentGateway();
        PaymentService paymentService = new PaymentService(gateway, 3);
        
        if (paymentService.processPayment()) {
            logger.info("Transaction completed successfully");
        } else {
            logger.error("Transaction failed after maximum retries");
        }
    }

    private static class RealPaymentGateway implements ExternalPaymentGateway {
        private int attempt = 0;
        
        @Override
        public boolean process() throws Exception {
            attempt++;
            // Simulate 3rd attempt success
            if (attempt < 3) {
                throw new Exception("Payment gateway timeout");
            }
            return true;
        }
    }

}
