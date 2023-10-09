package com.backend.filmfinder.users.services;

import com.backend.filmfinder.Repository.UserRepository;
import com.backend.filmfinder.models.User;
import com.backend.filmfinder.users.dto.UserDTO;
import com.backend.filmfinder.users.exception.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUser(String username, String password, String email) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        user.setEmail(email);
        user.setGoogleLogin(false);
        userRepository.save(user);


    }

    public boolean findByUsernameOrEmail(String email, String username) {
        User user = userRepository.findByUsernameOrEmail(username, email);
        if( user == null ) {
            return false;
        } else {
            return true;
        }
    }

    public User authenticateUser(String email, String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findByEmail(email);
        if(passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new AuthenticationException("Invalid email or password");
        }
    }



}
