package ua.controller;

//написати 4 запити для кожної таблиці і додати їх до вашої консольної менюшки

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
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

	public void selectMeal(EntityManager em) {
		List<Meal> list = em.createQuery("From Meal", Meal.class).getResultList();
		for (Meal meal : list) {
			System.out.println(meal.getName());
		}
	}

	public void selectMealByName(EntityManager em) {
		System.out.println("Введіть назву страви:");
		List<Meal> list = em.createQuery("FROM Meal m WHERE m.name=?1", Meal.class)
				.setParameter(1, enterParameters.stringEnter())
				.getResultList();
		for (Meal meal : list) {
			System.out.println(meal.getName());
			System.out.println(meal.getShortDescription());
			System.out.println(meal.getFullDescription());
			System.out.println(meal.getPrice());
			System.out.println(meal.getWeight());
			System.out.println(meal.getCuisine());
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

	public void selectMealByIdList(EntityManager em) {
		em.getTransaction().begin();
		List<Integer> list = new ArrayList<>();
		System.out.println("Введіть першу страву:");
		list.add(enterParameters.intEnter());
		System.out.println("Введіть другу страву:");
		list.add(enterParameters.intEnter());
		System.out.println("Введіть третю страву:");
		list.add(enterParameters.intEnter());

		List<Meal> meals = em.createQuery("FROM Meal m WHERE m.id IN ?1", Meal.class).setParameter(1, list)
				.getResultList();
		for (Meal meal : meals) {
			System.out.println(meal.getName());
			System.out.println(meal.getShortDescription());
			System.out.println(meal.getFullDescription());
			System.out.println(meal.getPrice());
			System.out.println(meal.getWeight());
			System.out.println(meal.getCuisine());
			System.out.println();
		}
		em.getTransaction().commit();
	}

	public void selectMealByPriceInterval(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть нижню межу ціни:");
		String s1 = enterParameters.stringEnter();
		System.out.println("Введіть верхню межу ціни:");
		String s2 = enterParameters.stringEnter();
		List<Meal> meals = em.createQuery("FROM Meal m WHERE m.price BETWEEN ?1 AND ?2", Meal.class)
				.setParameter(1, new BigDecimal(s1))
				.setParameter(2, new BigDecimal(s2))
				.getResultList();
		for (Meal meal : meals) {
			System.out.println(meal.getName());
			System.out.println(meal.getShortDescription());
			System.out.println(meal.getFullDescription());
			System.out.println(meal.getPrice());
			System.out.println(meal.getWeight());
			System.out.println(meal.getCuisine());
		}
		em.getTransaction().commit();
	}

	public void selectMealByLetter(EntityManager em) {
		System.out.println("Введіть першу букву або частину слова:");
		String s = enterParameters.stringEnter();
		List<Meal> meals = em.createQuery("FROM Meal m WHERE m.name LIKE ?1", Meal.class)
				.setParameter(1, s + "%")
				.getResultList();
		for (Meal meal : meals) {
			System.out.println(meal.getName());
			System.out.println(meal.getShortDescription());
			System.out.println(meal.getFullDescription());
			System.out.println(meal.getPrice());
			System.out.println(meal.getWeight());
			System.out.println(meal.getCuisine());
		}
	}
	
	public void selectBiggestPrice(EntityManager em) {
		BigDecimal max = em.createQuery("SELECT min(m.price) FROM Meal m", BigDecimal.class).getSingleResult();
		System.out.println("Найдешевша страва коштує: " + max);
	}
	
	public void selectAvgPrice(EntityManager em) {
		Double avg = em.createQuery("SELECT avg(m.price) FROM Meal m", Double.class).getSingleResult();
		System.out.println("Середня ціна страв: " + avg);
	}
	
	public void selectSumWeight(EntityManager em) {
		long sum = em.createQuery("SELECT sum(m.weight) FROM Meal m", Long.class).getSingleResult();
		System.out.println("Загальна вага страв у меню: " + sum);
	}
	
}
