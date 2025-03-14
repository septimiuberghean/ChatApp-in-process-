package com.example.chatapp.chat_application.repository;

import com.example.chatapp.chat_application.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(Long senderId);  // Use senderId instead of userId
}
