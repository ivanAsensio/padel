package com.fic.udc.es.padel.dtos;

import java.time.DayOfWeek;

public class ScheduleDto {

	private Long scheduleId;
	private DayOfWeek day;
	private int initHour;
	private int finalHour;
	
	public ScheduleDto() {
		super();
	}
	
	public ScheduleDto(Long scheduleId, DayOfWeek day, int initHour, int finalHour) {
		super();
		this.scheduleId = scheduleId;
		this.day = day;
		this.initHour = initHour;
		this.finalHour = finalHour;
	}

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
	
	
}
