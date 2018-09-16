package com.esprit.timetable.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.esprit.timetable.models.Salle;
import com.esprit.timetable.models.User;

public interface SalleRepository extends JpaRepository<Salle, Long> {
	@Query(value = "SELECT s.id, s.name, s.nb_max FROM salle s INNER JOIN disponibilite d ON s.id = d.salle_id  WHERE  d.h9ah10_30 = 1 AND d.date = ?1", nativeQuery = true)
	List<Salle> findAllSallesOccupe9A10_30(Date dateDebut);

	@Query(value = "SELECT s.id, s.name, s.nb_max FROM salle s INNER JOIN disponibilite d ON s.id = d.salle_id  WHERE  d.h10_45ah12_15 = 1 AND d.date = ?1", nativeQuery = true)
	public List<Salle> findAllSallesOccupe10_45A12_15(Date dateDebut);

	@Query(value = "SELECT s.id, s.name, s.nb_max FROM salle s INNER JOIN disponibilite d ON s.id = d.salle_id  WHERE  d.h14ah15_30 = 1 AND d.date = ?1", nativeQuery = true)
	public List<Salle> findAllSallesOccupe14A15_30(Date dateDebut);

	@Query(value = "SELECT s.id, s.name, s.nb_max FROM salle s INNER JOIN disponibilite d ON s.id = d.salle_id  WHERE  d.h15_45ah17_15 = 1 AND d.date = ?1", nativeQuery = true)
	public List<Salle> findAllSallesOccupe15_45A17_15(Date dateDebut);
}
