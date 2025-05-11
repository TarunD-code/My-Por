package messageQueueProcessorExample;

import java.util.LinkedList;
import java.util.Queue;

public class MessageQueue {
    private final Queue<String> queue = new LinkedList<>();

    // Mandatory method for App.java to work
    public synchronized void addMessage(String message) {
        queue.add(message);
    }

    public synchronized boolean hasMessages() {
        return !queue.isEmpty();
    }

    public synchronized String getNextMessage() {
        return queue.poll();
    }

    public synchronized int size() {
        return queue.size();
    }
}