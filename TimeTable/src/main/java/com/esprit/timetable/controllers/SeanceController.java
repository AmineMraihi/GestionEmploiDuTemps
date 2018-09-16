package com.esprit.timetable.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.esprit.timetable.models.Seance;
import com.esprit.timetable.repositories.SeanceRepository;

@RestController
@RequestMapping("seances")
public class SeanceController {

	@Autowired
	private SeanceRepository seanceRepository;
	
	@GetMapping
	public List<Seance> list() {
		return seanceRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createSeance(@RequestBody Seance seance) throws ParseException {
		seanceRepository.save(seance);
	}
	
	@PutMapping("/seance")
	public Seance updateSeance(@RequestBody Seance seance) throws ParseException {
		return seanceRepository.save(seance);
	}
	
	@DeleteMapping("/seance/{id}")
	public boolean deleteUser(@PathVariable Long id) {
		seanceRepository.delete(id);
		return true;
	}
	
}
