package com.esprit.timetable.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esprit.timetable.models.Role;
import com.esprit.timetable.models.Seance;
import com.esprit.timetable.repositories.RoleRepository;

@RestController
@RequestMapping("roles")
public class RoleController {
	@Autowired
	private RoleRepository roleRepository;
	
	@GetMapping
	public List<Role> list() {
		return roleRepository.findAll();
	}
	

}
