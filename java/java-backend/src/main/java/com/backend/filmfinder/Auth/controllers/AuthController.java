package com.backend.filmfinder.Auth.controllers;

import com.backend.filmfinder.Auth.dto.AuthenticationResponse;
import com.backend.filmfinder.Auth.dto.LoginDTO;
import com.backend.filmfinder.Auth.dto.UserDTO;
import com.backend.filmfinder.Auth.exception.AuthenticationException;
import com.backend.filmfinder.Auth.services.AuthService;
import com.backend.filmfinder.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<AuthenticationResponse> createAccount(@RequestBody UserDTO userDTO) throws AuthenticationException {


        try {
            if (userRepository.findByUsernameOrEmail(userDTO.getUsername(), userDTO.getPassword()).isPresent()) {
                throw new AuthenticationException("Username or email already exists.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(authService.createUser(userDTO));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    AuthenticationResponse.builder()
                            .errorMessage(e.getMessage())
                            .build()
            );


        }


    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDTO loginDTO) {

        return ResponseEntity.ok(authService.authenticateUser(loginDTO));





    }
}
