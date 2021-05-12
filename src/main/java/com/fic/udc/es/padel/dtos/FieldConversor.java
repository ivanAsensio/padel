package com.fic.udc.es.padel.dtos;

import java.util.List;
import java.util.stream.Collectors;

import com.fic.udc.es.padel.model.entities.Field;

public class FieldConversor {
	
	private FieldConversor() {}
	
	public final static List<FieldDto> toFieldDtos(List<Field> fields) {
		return fields.stream().map(o -> toFieldDto(o)).collect(Collectors.toList());
	}
	
	public final static FieldDto toFieldDto(Field field) {
		return new FieldDto(field.getFieldId(),field.getName(),field.isState());
	}

}
