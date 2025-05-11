package messageQueueProcessorExample;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MessageQueueProcessor {
    private static final Logger logger = LoggerFactory.getLogger(MessageQueueProcessor.class);
    private final MessageQueue messageQueue;

    public MessageQueueProcessor(MessageQueue messageQueue) {
        this.messageQueue = messageQueue;
    }

    public void processMessages() {
        logger.info("Starting message processing...");
        
        while (messageQueue.hasMessages()) {
            String message = messageQueue.getNextMessage();
            processSingleMessage(message);
        }
        
        logger.info("No more messages to process.");
    }

    private void processSingleMessage(String message) {
        logger.info("Processing message: {}", message);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            logger.error("Interrupted while processing message: {}", message);
            Thread.currentThread().interrupt();
        }
    }
}