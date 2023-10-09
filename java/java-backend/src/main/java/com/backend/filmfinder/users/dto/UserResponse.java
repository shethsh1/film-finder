package com.backend.filmfinder.users.dto;

public class UserResponse {
    private int id;
    private String username;
    private String email;

    // Constructors, getters, and setters here

    public UserResponse() {
        // Default constructor
    }

    public UserResponse(int id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
