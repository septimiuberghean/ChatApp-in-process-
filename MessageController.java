package com.example.chatapp.chat_application.controller;

import com.example.chatapp.chat_application.model.Message;
import com.example.chatapp.chat_application.model.User;
import com.example.chatapp.chat_application.service.MessageService;
import com.example.chatapp.chat_application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final UserService userService;

    @Autowired
    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUserId(@PathVariable Long userId) {
        List<Message> messages = messageService.findMessagesByUserId(userId);
        if (messages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        // Find the sender by ID
        User sender = userService.findById(message.getSender().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        message.setSender(sender);
        Message savedMessage = messageService.saveMessage(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }
}
