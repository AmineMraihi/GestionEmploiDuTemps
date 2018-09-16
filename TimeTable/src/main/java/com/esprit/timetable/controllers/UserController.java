package com.esprit.timetable.controllers;

import com.esprit.timetable.models.Role;
import com.esprit.timetable.models.Salle;
import com.esprit.timetable.models.Seance;
import com.esprit.timetable.models.User;
import com.esprit.timetable.repositories.RoleRepository;
import com.esprit.timetable.repositories.UserRepository;
import com.esprit.timetable.util.CustomErrorType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("users")
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@GetMapping
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/listeRole")
	public List<Role> getAllRole() {
		return roleRepository.findAll();
	}
	
	  

	/*
	 * @PostMapping
	 * 
	 * @ResponseStatus(HttpStatus.OK) public void createUser(@RequestBody User user)
	 * { user.setPassword(
	 * "821f498d827d4edad2ed0960408a98edceb661d9f34287ceda2962417881231a");
	 * userRepository.save(user); }
	 */
	@PostMapping("/signup")
	public void signUp(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		System.out.println(roleRepository.findAll()+"Wiw");
		
		user.setRoles(getAllRole());
		if (userRepository.findByUsername(user.getUsername()) != null) {
			logger.error("username Already exist " + user.getUsername());
		
		}
		else {
		userRepository.save(user);
		logger.info("User ADD");}
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable("id") long id) {
		return userRepository.getOne(id);
	}

	@GetMapping("/user/{username}/{password}")
	public User validateLogin(@PathVariable("username") String username, @PathVariable("password") String password) {
		for (User u : userRepository.findAll()) {
			if (u != null && u.getUsername().equals(username) && bCryptPasswordEncoder.encode(u.getPassword()).equals(password)) {
				System.out.println("here");
				return u;
			}
		}
		System.out.println("it says null");
		return null;
	}
	/*
	 * @PostMapping("/sign-up") public void signUp(@RequestBody User user) {
	 * user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
	 * 
	 * userRepository.save(user); logger.info("User ADD"); }
	 */

	/*
	 * @SuppressWarnings("deprecation")
	 * 
	 * @GetMapping("listerole/") public List<Role> listrole() throws ParseException
	 * { List<Role> salles = new ArrayList<Role>(userRepository.findAll());
	 * 
	 * return salles; }
	 */

	@PutMapping("/updateuser")
	public User updateSeance(@RequestBody User user) throws ParseException {
		return userRepository.save(user);
	}

	@DeleteMapping("/deleteuser/{id}")
	public boolean deleteUser(@PathVariable Long id) {
		userRepository.delete(id);
		return true;
	}

	@GetMapping("/username/{username}")
	private User usernameExist(@PathVariable String username) {
		final User user = userRepository.findByUsername(username);
		if (user != null) {
			System.out.println("here");
			return user;
		}
	
	System.out.println("it says null");
	return null;
	}
	
	@CrossOrigin
	@RequestMapping("/login")
	public Principal user(Principal principal) {
		logger.info("user logged "+principal);
		return principal;
	}

}
