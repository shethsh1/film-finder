package com.backend.filmfinder.users.controllers;

import com.backend.filmfinder.Repository.UserRepository;
import com.backend.filmfinder.models.User;
import com.backend.filmfinder.users.dto.LoginDTO;
import com.backend.filmfinder.users.dto.UserDTO;
import com.backend.filmfinder.users.exception.AuthenticationException;
import com.backend.filmfinder.users.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("users/create")
    public ResponseEntity<String> createAccount(@RequestBody UserDTO userDTO) {


        if(userService.findByUsernameOrEmail(userDTO.getEmail(), userDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exists.");
        }

        userService.createUser(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");



    }

    @PostMapping("users/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {

        try {
            User user = userService.authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());
            return ResponseEntity.status(HttpStatus.OK).body("User logged in.");

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }


    }
}
