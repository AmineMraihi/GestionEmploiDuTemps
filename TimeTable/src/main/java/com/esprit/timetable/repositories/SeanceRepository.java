package com.esprit.timetable.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.timetable.models.Seance;
import com.esprit.timetable.models.User;

public interface SeanceRepository extends JpaRepository<Seance, Long>{

}
