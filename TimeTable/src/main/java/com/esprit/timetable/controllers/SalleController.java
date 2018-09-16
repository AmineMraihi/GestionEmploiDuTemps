package com.esprit.timetable.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import com.esprit.timetable.models.Salle;

import com.esprit.timetable.repositories.SalleRepository;

@RestController
@RequestMapping("salle")
public class SalleController {
	@Autowired
	private SalleRepository salleRepository;

	@GetMapping
	public List<Salle> list() {
		return salleRepository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createSalle(@RequestBody Salle salle) {
		salleRepository.save(salle);
	}

	@PutMapping("/update/{id}")
	public Salle updateSalle(@RequestBody Salle salle) {
		return salleRepository.save(salle);
	}

	@DeleteMapping("/deleteSalle/{id}")
	public boolean deleteSalle(@PathVariable Long id) {
		salleRepository.delete(id);	
		return true;
	}

	@SuppressWarnings("deprecation")
	@GetMapping("listeSalle/{dateDebut}/{dateFin}")
	public List<Salle> listSalleDispo(@PathVariable String dateDebut, @PathVariable String dateFin) throws ParseException {
		List<Salle> salles = new ArrayList<Salle>(salleRepository.findAll());
		List<Salle> sallesOccupe = new ArrayList<Salle>();
		Date dateDebutF=convert(dateDebut);
		Date dateFinF = convert(dateFin);
		System.out.println(dateDebutF);
		System.out.println(dateFinF);
		if (dateDebutF.getHours() == 9 && dateFinF.getHours() == 10 && dateDebutF.getMinutes()==0 && dateFinF.getMinutes()==30) {
			sallesOccupe = salleRepository.findAllSallesOccupe9A10_30(dateDebutF);
		}
		if (dateDebutF.getHours() == 10 && dateFinF.getHours() == 12 && dateDebutF.getMinutes()==45 && dateFinF.getMinutes()==15) {
			sallesOccupe = salleRepository.findAllSallesOccupe10_45A12_15(dateDebutF);
		}
		if (dateDebutF.getHours() == 14 && dateFinF.getHours() == 15 && dateDebutF.getMinutes()==0 && dateFinF.getMinutes()==30) {
			sallesOccupe = salleRepository.findAllSallesOccupe14A15_30(dateDebutF);
		}
		if (dateDebutF.getHours() == 15 && dateFinF.getHours() == 17 && dateDebutF.getMinutes()==45 && dateFinF.getMinutes()==15) {
			sallesOccupe = salleRepository.findAllSallesOccupe15_45A17_15(dateDebutF);
		}
		System.out.println(sallesOccupe);
		salles.removeAll(sallesOccupe);
		System.out.println(salles);
		return salles;
	}
	 public java.util.Date convert(String date) throws ParseException {

	        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        java.util.Date date1 = sdf1.parse(date);
	        java.sql.Date sqlDate = new java.sql.Date(date1.getTime());
	        return date1;
	    }


}
