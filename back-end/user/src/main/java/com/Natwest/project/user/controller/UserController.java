package com.Natwest.project.user.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Natwest.project.user.model.LoginRequest;
import com.Natwest.project.user.model.User;
import com.Natwest.project.user.repository.UserRepository;
import com.Natwest.project.user.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {

    private final UserService userService;
    private UserRepository userRepository;  //added by me

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        if (registeredUser != null) {
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/{userID}")
    public ResponseEntity<User> getUserById(@PathVariable String userID) {
        Optional<User> user = userService.getUserById(userID);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        String result= userService.login(loginRequest);

        if(result!=null){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().build();

    }
    
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//        User user = userRepository.findByEmail(loginRequest.getEmail());
//        
//        // Check if the user exists and the password matches
//        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok(user.getUserID()); // Return user ID if credentials match
//        } else {
//            return ResponseEntity.status(401).body(null); // Unauthorized if credentials don't match
//        }
//    }
}
    

