package ua.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "cuisine")
public class Cuisine extends AbstractEntity {

	private String name;

	@OneToMany(mappedBy = "cuisine")
	private List<Meal> meals = new ArrayList<>();

	public Cuisine(String name) {
		this.name = name;
	}

	public Cuisine() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}