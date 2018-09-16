package com.esprit.timetable.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Classe {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "name")
    private String name;
	
	@Column(name = "nbetudiants")
    private Integer nbetudiants;
	
	@ManyToMany(mappedBy="classes")
	private List<Seance> seances;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Seance> getSeances() {
		return seances;
	}

	public void setSeances(List<Seance> seances) {
		this.seances = seances;
	}

	public Integer getNbetudiants() {
		return nbetudiants;
	}

	public void setNbetudiants(Integer nbetudiants) {
		this.nbetudiants = nbetudiants;
	}

	

	
	
	
	
}
