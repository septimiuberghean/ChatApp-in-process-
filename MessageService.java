package com.example.chatapp.chat_application.service;

import com.example.chatapp.chat_application.model.Message;
import com.example.chatapp.chat_application.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> findMessagesByUserId(Long userId) {
        return messageRepository.findBySenderId(userId);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public Iterable<Message> findAllMessages() {
        return messageRepository.findAll();
    }
}
