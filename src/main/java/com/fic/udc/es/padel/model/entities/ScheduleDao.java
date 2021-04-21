package com.fic.udc.es.padel.model.entities;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface ScheduleDao extends PagingAndSortingRepository<Schedule, Long>{

	public List<Schedule> findByUser(User user);
}
