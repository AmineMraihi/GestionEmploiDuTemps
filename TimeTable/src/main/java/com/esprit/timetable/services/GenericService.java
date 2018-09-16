package com.esprit.timetable.services;



import java.util.List;

import com.esprit.timetable.models.RandomCity;
import com.esprit.timetable.models.User;

public interface GenericService {
	
	User findByUsername(String username);

    List<User> findAllUsers();


}
