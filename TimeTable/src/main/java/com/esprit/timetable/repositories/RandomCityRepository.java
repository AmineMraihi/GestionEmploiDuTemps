package com.esprit.timetable.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.timetable.models.RandomCity;


public interface RandomCityRepository extends JpaRepository<RandomCity, Long>{

}
