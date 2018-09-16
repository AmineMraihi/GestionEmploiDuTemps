package com.esprit.timetable.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Disponibilite {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "date")
    private Date date;
	
	@Column(name = "H9AH10_30")
    private Boolean H9AH10_30;
	
	@Column(name = "H10_45AH12_15")
    private Boolean H10_45AH12_15;
	
	@Column(name = "H14AH15_30")
    private Boolean H14AH15_30;
	
	@Column(name = "H15_45AH17_15")
    private Boolean H15_45AH17_15;
	
	@OneToOne
	private Salle salle;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Boolean getH9AH10_30() {
		return H9AH10_30;
	}

	public void setH9AH10_30(Boolean h9ah10_30) {
		H9AH10_30 = h9ah10_30;
	}

	public Boolean getH10_45AH12_15() {
		return H10_45AH12_15;
	}

	public void setH10_45AH12_15(Boolean h10_45ah12_15) {
		H10_45AH12_15 = h10_45ah12_15;
	}

	public Boolean getH14AH15_30() {
		return H14AH15_30;
	}

	public void setH14AH15_30(Boolean h14ah15_30) {
		H14AH15_30 = h14ah15_30;
	}

	public Boolean getH15_45AH17_15() {
		return H15_45AH17_15;
	}

	public void setH15_45AH17_15(Boolean h15_45ah17_15) {
		H15_45AH17_15 = h15_45ah17_15;
	}

	public Salle getSalle() {
		return salle;
	}

	public void setSalle(Salle salle) {
		this.salle = salle;
	}

	
	
}
