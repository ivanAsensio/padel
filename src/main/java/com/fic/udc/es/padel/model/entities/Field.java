package com.fic.udc.es.padel.model.entities;

public class Field {
	
	private Long fieldId;
	private String name;
	private boolean state;
	
	public Field() {
		super();
	}
	public Long getFieldId() {
		return fieldId;
	}
	public void setFieldId(Long id) {
		this.fieldId = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isState() {
		return state;
	}
	public void setState(boolean state) {
		this.state = state;
	}
	
}
