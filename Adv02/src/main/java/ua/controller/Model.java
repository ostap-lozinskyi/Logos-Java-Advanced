package ua.controller;

import java.math.BigDecimal;
import javax.persistence.EntityManager;
import ua.entity.Cuisine;
import ua.entity.Meal;

public class Model {
	
	private EnterParameters enterParameters = new EnterParameters();

	public void addMeal(EntityManager em) {
		em.getTransaction().begin();
		Meal meal = new Meal();
		System.out.println("Введіть ім'я:");
		meal.setName(enterParameters.stringEnter());
		System.out.println("Введіть номер кухні:");
		Cuisine cuisine = em.find(Cuisine.class, enterParameters.intEnter());
		meal.setCuisine(cuisine);
		System.out.println("Введіть короткий опис:");
		meal.setShortDescription(enterParameters.stringEnter());
		System.out.println("Введіть повний опис:");
		meal.setFullDescription(enterParameters.stringEnter());
		System.out.println("Введіть ціну:");
		meal.setPrice(new BigDecimal(enterParameters.stringEnter()));
		System.out.println("Введіть вагу:");
		meal.setWeight(enterParameters.intEnter());
		em.persist(meal);
		em.getTransaction().commit();
	}

	public void updateMeal(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть номер страви, яку потрібно змінити:");
		Meal meal = em.find(Meal.class, enterParameters.intEnter());
		if (meal != null) {
			System.out.println("Введіть нове ім'я:");
			meal.setName(enterParameters.stringEnter());
			System.out.println("Введіть номер кухні:");
			Cuisine cuisine = em.find(Cuisine.class, enterParameters.intEnter());
			meal.setCuisine(cuisine);
			System.out.println("Введіть короткий опис:");
			meal.setShortDescription(enterParameters.stringEnter());
			System.out.println("Введіть повний опис:");
			meal.setFullDescription(enterParameters.stringEnter());
			System.out.println("Введіть ціну:");
			meal.setPrice(new BigDecimal(enterParameters.stringEnter()));
			System.out.println("Введіть вагу:");
			meal.setWeight(enterParameters.intEnter());
			em.persist(meal);
		} else {
			System.out.println("Страви з таким номером не існує!");
		}
		em.getTransaction().commit();
	}

	public void deleteMeal(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть номер страви, яку потрібно видалити:");
		Meal meal = em.find(Meal.class, enterParameters.intEnter());
		if (meal != null) {
			em.remove(meal);
		} else {
			System.out.println("Страви з таким номером не існує!");
		}
		em.getTransaction().commit();
	}

	public void selectTable(EntityManager em) {
		System.out.println("Введіть номер страви, яку потрібно вивести:");
		Meal meal = em.find(Meal.class, enterParameters.intEnter());
		if (meal != null) {
			System.out.println(meal.getName());
			System.out.println(meal.getShortDescription());
			System.out.println(meal.getFullDescription());
			System.out.println(meal.getWeight());
			System.out.println(meal.getCuisine());
			System.out.println(meal.getPrice());
		} else {
			System.out.println("Страви з таким номером не існує!");
		}
	}

	public void addCuisine(EntityManager em) {
		em.getTransaction().begin();
		Cuisine cuisine = new Cuisine();
		System.out.println("Введіть ім'я кухні:");
		cuisine.setName(enterParameters.stringEnter());
		em.persist(cuisine);
		em.getTransaction().commit();
	}

	public void updateCuisine(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть номер кухні, яку потрібно змінити:");
		Cuisine cuisine = em.find(Cuisine.class, enterParameters.intEnter());
		if (cuisine != null) {
			System.out.println("Введіть нове ім'я:");
			cuisine.setName(enterParameters.stringEnter());
			em.persist(cuisine);
		} else {
			System.out.println("Кухні з таким номером не існує!");
		}
		em.getTransaction().commit();
	}

	public void deleteCuisine(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть номер кухні, яку потрібно видалити:");
		Cuisine cuisine = em.find(Cuisine.class, enterParameters.intEnter());
		if (cuisine != null) {
			em.remove(cuisine);
		} else {
			System.out.println("Кухні з таким номером не існує!");
		}
		em.getTransaction().commit();
	}
}
