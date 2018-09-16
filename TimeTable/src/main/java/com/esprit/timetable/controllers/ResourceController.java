package com.esprit.timetable.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.esprit.timetable.models.RandomCity;
import com.esprit.timetable.models.User;
import com.esprit.timetable.services.GenericService;

@RestController
@RequestMapping("/springjwt")
public class ResourceController {

	@Autowired
	private GenericService userService;



	@RequestMapping(value = "/users", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN_USER')")
	public List<User> getUsers() {
		return userService.findAllUsers();
	}

}
