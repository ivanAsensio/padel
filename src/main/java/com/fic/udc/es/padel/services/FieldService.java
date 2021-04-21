package com.fic.udc.es.padel.services;

import java.util.List;

import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

public interface FieldService {
	
	public Field addField(String name);
	
	public void deleteField(Long id) throws InstanceNotFoundException;
	
	public Field updateField(Long id, String name) throws InstanceNotFoundException;
	
	public void changeState(Long id, boolean state) throws InstanceNotFoundException;
	
	public List<Field> findAllFields();
}
