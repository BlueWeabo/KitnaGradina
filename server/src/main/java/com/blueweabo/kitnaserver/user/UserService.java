package com.blueweabo.kitnaserver.user;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository=repository;
    }

    public User saveUser(User user) {
        return repository.save(user);
    }

    public Optional<User> getUserById(UUID id) {
        return repository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<User> loginUser(User user) {
        Optional<User> dataUser = getUserByEmail(user.getEmail());
        return dataUser.map(u -> u.getPassword() == user.getPassword() ? u : null);
    }

    public boolean validateUser(User user) {
        Optional<User> dataUser = getUserById(user.getId());
        return dataUser.map(u -> u.getPassword() == user.getPassword()).get();
    }
}
