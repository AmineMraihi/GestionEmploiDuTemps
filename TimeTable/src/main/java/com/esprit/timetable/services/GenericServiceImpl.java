package com.esprit.timetable.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.timetable.models.RandomCity;
import com.esprit.timetable.models.User;
import com.esprit.timetable.repositories.RandomCityRepository;
import com.esprit.timetable.repositories.UserRepository;

import java.util.List;

@Service
public class GenericServiceImpl implements GenericService {

	@Autowired
	private UserRepository userRepository;



	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public List<User> findAllUsers() {
		return (List<User>) userRepository.findAll();
	}



}
