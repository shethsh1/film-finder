package com.backend.filmfinder.Repository;


import com.backend.filmfinder.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsernameOrEmail(String username, String email);
    User findByEmail(String email);


}
