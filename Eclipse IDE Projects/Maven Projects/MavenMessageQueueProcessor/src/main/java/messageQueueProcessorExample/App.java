package messageQueueProcessorExample;

public class App {
    public static void main(String[] args) {
        MessageQueue queue = new MessageQueue();
        
        queue.addMessage("Order-123: Process payment");
        queue.addMessage("Order-456: Update inventory");
        queue.addMessage("Order-789: Send confirmation");
        
        // Corrected line: removed underscore after 'new'
        MessageQueueProcessor processor = new MessageQueueProcessor(queue);
        processor.processMessages();
    }
}