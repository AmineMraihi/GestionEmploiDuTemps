package com.esprit.timetable.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.esprit.timetable.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
