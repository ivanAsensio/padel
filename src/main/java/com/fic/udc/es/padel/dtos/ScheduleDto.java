package com.fic.udc.es.padel.dtos;

public class ScheduleDto {

	private Long scheduleId;
	private String day;
	private int initHour;
	private int finalHour;
	
	public ScheduleDto() {
		super();
	}
	
	public ScheduleDto(Long scheduleId, String day, int initHour, int finalHour) {
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
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
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
