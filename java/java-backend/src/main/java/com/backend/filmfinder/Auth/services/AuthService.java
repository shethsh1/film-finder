package com.backend.filmfinder.Auth.services;

import com.backend.filmfinder.Auth.dto.AuthenticationResponse;
import com.backend.filmfinder.Auth.dto.LoginDTO;
import com.backend.filmfinder.Auth.dto.UserDTO;
import com.backend.filmfinder.Repository.UserRepository;
import com.backend.filmfinder.config.JwtService;
import com.backend.filmfinder.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse createUser(UserDTO userDTO) {
        var user = User.builder()
                .email(userDTO.getEmail())
                .username(userDTO.getUsername())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();




    }

    public AuthenticationResponse authenticateUser(LoginDTO loginDTO) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDTO.getEmail(),
                            loginDTO.getPassword()
                    )

            );

        } catch (AuthenticationException e) {
            return AuthenticationResponse
                    .builder()
                    .errorMessage(e.getMessage())
                    .build();


        }

        var user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();

    }



}
