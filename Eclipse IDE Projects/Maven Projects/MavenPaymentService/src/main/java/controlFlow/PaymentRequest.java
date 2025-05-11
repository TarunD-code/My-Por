package controlFlow;

public class PaymentRequest 
{
	 private double amount;
	 private String currency;
	 private String userId;

	    public PaymentRequest(double amount, String currency, String userId) {
	        this.amount = amount;
	        this.currency = currency;
	        this.userId = userId;
	    }

	    // Getters
	    public double getAmount() { return amount; }
	    public String getCurrency() { return currency; }
	    public String getUserId() { return userId; }

		public int getAmount1() {
			// TODO Auto-generated method stub
			return 0;
		}

}
