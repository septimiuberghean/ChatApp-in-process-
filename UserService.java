package com.example.chatapp.chat_application.service;

import com.example.chatapp.chat_application.model.User;
import com.example.chatapp.chat_application.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service  // Marks this as a service class
public class UserService {

    private final UserRepository userRepository;  // Make the repository final for immutability

    // Constructor injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to find a user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Method to save a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Method to get a user by their ID
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // Method to get all users (optional, if needed)
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }
}
