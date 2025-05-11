package controlFlow;

import controlFlow.AuditService;
import controlFlow.InsufficientBalanceException;
import controlFlow.InvalidPaymentException;
import controlFlow.PaymentFailedException;
import controlFlow.PaymentGateway;
import controlFlow.PaymentGatewayException;
import controlFlow.PaymentRequest;
import controlFlow.PaymentResult;
import controlFlow.UserService;

public class MavenPaymentService {
    private static final int MAX_RETRIES = 3;
    private final UserService userService;
    private final PaymentGateway paymentGateway;
    private final AuditService auditService;

    // Corrected constructor name to match class
    public MavenPaymentService(UserService userService, PaymentGateway paymentGateway, AuditService auditService) {
        this.userService = userService;
        this.paymentGateway = paymentGateway;
        this.auditService = auditService;
    }

    public PaymentResult processPayment(PaymentRequest request) {
        // 1. Validation
        if (request.getAmount() <= 0) {
            throw new InvalidPaymentException("Invalid amount");
        }

        // 2. Business Logic
        if (!userService.hasSufficientBalance(request.getUserId(), request.getAmount())) {
            throw new InsufficientBalanceException("Balance too low");
        }

        // 3. Retry Mechanism
        int attempt = 0;
        boolean success = false;
        while (attempt < MAX_RETRIES && !success) {
            try {
                paymentGateway.process(request);
                success = true;
            } catch (PaymentGatewayException e) {
                attempt++;
                if (attempt >= MAX_RETRIES) {
                    auditService.logFailure(request, e);
                    throw new PaymentFailedException("Payment failed after retries");
                }
            }
        }

        // 4. Post-Processing
        auditService.logSuccess(request);
        return new PaymentResult("SUCCESS");
    }
}