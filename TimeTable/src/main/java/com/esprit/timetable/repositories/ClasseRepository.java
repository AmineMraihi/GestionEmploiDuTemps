package com.esprit.timetable.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.timetable.models.Classe;
import com.esprit.timetable.models.User;

public interface ClasseRepository extends JpaRepository<Classe, Long>{
Classe findByName(String name);
}
