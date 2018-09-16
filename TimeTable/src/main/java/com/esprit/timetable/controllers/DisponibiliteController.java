package com.esprit.timetable.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.esprit.timetable.models.Disponibilite;
import com.esprit.timetable.models.Salle;
import com.esprit.timetable.models.Seance;
import com.esprit.timetable.repositories.DisponibiliteRepository;

@RestController
@RequestMapping("disponibilite")
public class DisponibiliteController {
	@Autowired
	private DisponibiliteRepository disponibiliteRepository;
	
	

	@GetMapping
	public List<Disponibilite> list() {
		return disponibiliteRepository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.OK)
	public void createDisponibilite(@RequestBody Seance seance) throws ParseException {
		Disponibilite disponibilite =new Disponibilite();
		Date dateDebutF=seance.getDateDebut();
		Date dateFinF = seance.getDateFin();
		if (dateDebutF.getHours() == 9 && dateFinF.getHours() == 10 && dateDebutF.getMinutes()==0 && dateFinF.getMinutes()==30) {
			disponibilite.setH9AH10_30(true);
		}
		if (dateDebutF.getHours() == 10 && dateFinF.getHours() == 12 && dateDebutF.getMinutes()==45 && dateFinF.getMinutes()==15) {
			disponibilite.setH10_45AH12_15(true);
		}
		if (dateDebutF.getHours() == 14 && dateFinF.getHours() == 15 && dateDebutF.getMinutes()==0 && dateFinF.getMinutes()==30) {
			disponibilite.setH14AH15_30(true);
		}
		if (dateDebutF.getHours() == 15 && dateFinF.getHours() == 17 && dateDebutF.getMinutes()==45 && dateFinF.getMinutes()==15) {
			disponibilite.setH15_45AH17_15(true);
		}
		disponibilite.setDate(dateDebutF);
		disponibilite.setSalle(seance.getSalle());
		System.out.println(disponibilite);
		disponibiliteRepository.save(disponibilite);
	}
	@PutMapping("/update/{id}")
	public Disponibilite updateDisponibilite(@RequestBody Disponibilite disponibilite) {
		return disponibiliteRepository.save(disponibilite);
	}

	@DeleteMapping("/deleteDisponibilite/{id}")
	public boolean deleteDisponibilite(@PathVariable Long id) {
		disponibiliteRepository.delete(id);	
		return true;
	}
	public java.util.Date convert(String date) throws ParseException {

        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date date1 = sdf1.parse(date);
        java.sql.Date sqlDate = new java.sql.Date(date1.getTime());
        return date1;
    }

}
