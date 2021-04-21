package com.fic.udc.es.padel.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.entities.FieldDao;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class FieldServiceImpl implements FieldService{

	@Autowired
	private FieldDao fieldDao;

	@Override
	public Field addField(String name) {
		Field field = new Field();
		field.setName(name);
		field.setState(true);
		fieldDao.save(field);
		return field;
	}

	@Override
	public void deleteField(Long id) throws InstanceNotFoundException{
		Optional<Field> field = fieldDao.findById(id);
		if(!field.isPresent()) {
			throw new InstanceNotFoundException("project.entities.field", id);
		}
		fieldDao.delete(field.get());
		
	}

	@Override
	public Field updateField(Long id, String name) throws InstanceNotFoundException{
		Optional<Field> field = fieldDao.findById(id);
		if(!field.isPresent()) {
			throw new InstanceNotFoundException("project.entities.field", id);
		}
		Field fieldObtained = field.get();
		fieldObtained.setName(name);
		return fieldObtained;
	}

	@Override
	public void changeState(Long id, boolean state) throws InstanceNotFoundException{
		Optional<Field> field = fieldDao.findById(id);
		if(!field.isPresent()) {
			throw new InstanceNotFoundException("project.entities.field", id);
		}
		Field fieldObtained = field.get();
		fieldObtained.setState(state);
		
	}

	@Override
	public List<Field> findAllFields() {
		Iterable<Field> fields = fieldDao.findAll();
		List<Field> fieldsObtained = new ArrayList<Field>();
		fields.forEach(fieldsObtained::add);
		return fieldsObtained;
	}
	
}
