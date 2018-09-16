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

import com.esprit.timetable.models.Matiere;
import com.esprit.timetable.repositories.MatiereRepository;
@RestController
@RequestMapping("matiere")
public class MatiereController {

	
	
		@Autowired
		private MatiereRepository matiereRepository;
		@GetMapping
		public List<Matiere> list() {
			return matiereRepository.findAll();
		}
		@PostMapping
		@ResponseStatus(HttpStatus.OK)
		public void creatematiere(@RequestBody Matiere matiere) {
			matiereRepository.save(matiere);
		}
		@PutMapping("/update/{id}")
		public Matiere updateSeance(@RequestBody Matiere matiere) {
			return matiereRepository.save(matiere);
		}
		
		@DeleteMapping("/deleteMatiere/{id}")
		public boolean deleteClasse(@PathVariable Long id) {
			matiereRepository.delete(id);
			return true;
		}
		
	}
