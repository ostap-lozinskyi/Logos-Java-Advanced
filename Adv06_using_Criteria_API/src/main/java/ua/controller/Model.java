package ua.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import ua.entity.Cuisine;
import ua.entity.Cuisine_;
import ua.entity.Meal;
import ua.entity.Meal_;
import ua.model.view.MealView;

public class Model {

	private EnterParameters enterParameters = new EnterParameters();
	
	private void mealParametersEnter(Meal meal, EntityManager em) {		
		System.out.println("Введіть ім'я:");
		meal.setName(enterParameters.stringEnter());
		System.out.println("Введіть номер кухні:");
		Cuisine cuisine = em.find(Cuisine.class, enterParameters.intEnter());
		meal.setCuisine(cuisine);
		System.out.println("Введіть короткий опис (Замість пробілів-'_'):");
		meal.setShortDescription(enterParameters.stringEnter().replace("_", " "));
		System.out.println("Введіть повний опис (Замість пробілів-'_'):");
		meal.setFullDescription(enterParameters.stringEnter().replace("_", " "));
		System.out.println("Введіть ціну:");
		meal.setPrice(new BigDecimal(enterParameters.stringEnter()));
		System.out.println("Введіть вагу:");
		meal.setWeight(enterParameters.intEnter());		
	}

	public void addMeal(EntityManager em) {	
		em.getTransaction().begin();
		Meal meal = new Meal();
		mealParametersEnter(meal, em);	
		em.persist(meal);
		em.getTransaction().commit();
	}

	public void updateMeal(EntityManager em) {
		em.getTransaction().begin();
		System.out.println("Введіть номер страви, яку потрібно змінити:");		
		Meal meal = em.find(Meal.class, enterParameters.intEnter());
		if (meal != null) {
			mealParametersEnter(meal, em);
		} else {
			System.out.println("Страви з таким номером не існує!");
		}
		em.persist(meal);
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

	public void selectMealView(EntityManager em) {
		List<MealView> views = em.createQuery("SELECT new ua.model.view.MealView(m.id, m.photoUrl, m.version, m.rate, m.name, m.fullDescription, m.price, m.weight, c.name) FROM Meal m JOIN m.cuisine c", MealView.class)
				.getResultList();
		views.forEach(System.out::println);		
	}

	public void selectMealViewByName(EntityManager em) {
		System.out.println("Введіть назву страви:");
		List<MealView> views = em.createQuery("SELECT new ua.model.view.MealView(m.id, m.photoUrl, m.version, m.rate, m.name, m.fullDescription, m.price, m.weight, c.name) FROM Meal m JOIN m.cuisine c WHERE m.name=?1", MealView.class)
				.setParameter(1, enterParameters.stringEnter())
				.getResultList();
		views.forEach(System.out::println);	
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

	public void criteriaSearch(EntityManager em) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<MealView> cq = cb.createQuery(MealView.class);
		Root<Meal> root = cq.from(Meal.class);
		Join<Meal, Cuisine> cuisineJoin = root.join(Meal_.cuisine);
		
		cq.multiselect(root.get(Meal_.id),
				root.get(Meal_.photoUrl),
				root.get(Meal_.version),
				root.get(Meal_.rate),
				root.get(Meal_.name),
				root.get(Meal_.fullDescription),
				root.get(Meal_.price),
				root.get(Meal_.weight),
				cuisineJoin.get(Cuisine_.name));

		List<Predicate> predicatesList = new ArrayList<>();

		System.out.println("Потрібен пошук по імені? Y/N");
		if (enterParameters.stringEnter().toLowerCase().equals("y")) {
			System.out.println("Введіть ім'я або частину імені:");
			Predicate namePredicate = cb.like(root.get(Meal_.name), enterParameters.stringEnter() + "%");
			predicatesList.add(namePredicate);
		}

		System.out.println("Потрібен пошук по кухні? Y/N");
		if (enterParameters.stringEnter().toLowerCase().equals("y")) {
			System.out.println("Введіть назву кухні:");
			Predicate cuisinePredicate = cuisineJoin.get(Cuisine_.name).in(enterParameters.stringEnter());
			predicatesList.add(cuisinePredicate);
		}
		
		if (!predicatesList.isEmpty()) {
			Predicate[] predicatesArray = new Predicate[predicatesList.size()];
			for (int i = 0; i != predicatesList.size(); i++) {
				predicatesArray[i] = predicatesList.get(i);
			}
			cq.where(predicatesArray);
		}

		List<MealView> meals=em.createQuery(cq).getResultList();
		System.out.println(meals);
	}
}
