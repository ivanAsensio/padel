package com.fic.udc.es.padel.dtos;

public class FieldDto {
	
	private Long fieldId;
	private String name;
	private boolean state;
	
	public FieldDto(Long fieldId, String name, boolean state) {
		super();
		this.fieldId = fieldId;
		this.name = name;
		this.state = state;
	}

	public Long getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
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
