package example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final ExternalPaymentGateway gateway;
    private final int maxRetries;

    public PaymentService(ExternalPaymentGateway gateway, int maxRetries) {
        this.gateway = gateway;
        this.maxRetries = maxRetries;
    }

    public boolean processPayment() {
        int attempt = 0;
        boolean success = false;
        
        do {
            attempt++;
            logger.info("Payment processing attempt #{}", attempt);
            
            try {
                success = gateway.process();
                if (!success && attempt < maxRetries) {
                    logger.warn("Payment failed. Retrying...");
                }
            } catch (Exception e) {
                logger.error("Payment processing error: {}", e.getMessage());
                success = false;
            }
            
        } while (!success && attempt < maxRetries);

        if (success) {
            logger.info("Payment successfully processed in {} attempts", attempt);
        } else {
            logger.error("Payment failed after {} attempts", maxRetries);
        }
        
        return success;
    }

}
