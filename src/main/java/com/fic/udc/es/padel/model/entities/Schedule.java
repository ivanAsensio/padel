package com.fic.udc.es.padel.model.entities;

import java.time.DayOfWeek;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Schedule {
	
	private Long scheduleId;
	private DayOfWeek day;
	private int initHour;
	private int finalHour;
	private User user;
	
	public Schedule() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}

	public DayOfWeek getDay() {
		return day;
	}

	public void setDay(DayOfWeek day) {
		this.day = day;
	}

	public int getInitHour() {
		return initHour;
	}

	public void setInitHour(int initHour) {
		this.initHour = initHour;
	}

	public int getFinalHour() {
		return finalHour;
	}

	public void setFinalHour(int finalHour) {
		this.finalHour = finalHour;
	}

	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name= "user_id")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
}
