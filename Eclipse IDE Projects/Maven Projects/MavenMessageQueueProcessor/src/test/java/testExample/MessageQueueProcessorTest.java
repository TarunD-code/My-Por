package testExample;

import messageQueueProcessorExample.MessageQueue;
import messageQueueProcessorExample.MessageQueueProcessor;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MessageQueueProcessorTest {

    @Test
    void testEmptyQueue() {
        MessageQueue queue = new MessageQueue();
        MessageQueueProcessor processor = new MessageQueueProcessor(queue);
        processor.processMessages();
        assertEquals(0, queue.size());
    }

    @Test
    void testSingleMessageProcessing() {
        MessageQueue queue = new MessageQueue();
        queue.addMessage("Test Message 1");
        
        MessageQueueProcessor processor = new MessageQueueProcessor(queue);
        processor.processMessages();
        
        assertEquals(0, queue.size());
    }

    @Test
    void testMultipleMessages() {
        MessageQueue queue = new MessageQueue();
        queue.addMessage("Message 1");
        queue.addMessage("Message 2");
        queue.addMessage("Message 3");
        
        MessageQueueProcessor processor = new MessageQueueProcessor(queue);
        processor.processMessages();
        
        assertEquals(0, queue.size());
    }

    @Test
    void testMessageOrder() {
        MessageQueue queue = new MessageQueue();
        queue.addMessage("First");
        queue.addMessage("Second");
        
        MessageQueueProcessor processor = new MessageQueueProcessor(queue);
        processor.processMessages();
        
        assertEquals("First", processor.getProcessedMessages().get(0));
        assertEquals("Second", processor.getProcessedMessages().get(1));
    }
}