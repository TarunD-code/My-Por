package example;

public interface ExternalPaymentGateway {
    boolean process() throws Exception;
}