package com.backend.filmfinder.Repository;


import com.backend.filmfinder.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);


}
