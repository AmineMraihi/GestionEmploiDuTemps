package com.esprit.timetable.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.timetable.models.Matiere;
import com.esprit.timetable.models.User;

public interface MatiereRepository extends JpaRepository<Matiere, Long>{

}
