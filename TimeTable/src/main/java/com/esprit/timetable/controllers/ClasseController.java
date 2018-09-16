package com.esprit.timetable.controllers;

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

import com.esprit.timetable.models.Classe;
import com.esprit.timetable.models.Seance;
import com.esprit.timetable.repositories.ClasseRepository;

@RestController
@RequestMapping("classe")
public class ClasseController {
	@Autowired
	private ClasseRepository classeRepository;
	@GetMapping
	public List<Classe> list() {
		return classeRepository.findAll();
	}
	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createclasse(@RequestBody Classe classe) {
		classeRepository.save(classe);
	}
	@PutMapping("/update/{id}")
	public Classe updateSeance(@RequestBody Classe classe) {
		return classeRepository.save(classe);
	}
	
	@DeleteMapping("/deleteClasse/{id}")
	public boolean deleteClasse(@PathVariable Long id) {
		classeRepository.delete(id);
		return true;
	}
	@GetMapping("existe/{name}")
	public Classe classeExiste(@PathVariable String name) {
		return classeRepository.findByName(name);
	}
	

}
