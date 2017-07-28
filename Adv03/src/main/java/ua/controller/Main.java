package ua.controller;

//Консольна менюшка з використанням Hibernate

import java.util.Scanner;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Main {
	private Scanner scanner = new Scanner(System.in);
	private Model model = new Model();
	
	private void start() {
		EntityManagerFactory factory = Persistence.createEntityManagerFactory("primary");
		EntityManager em = factory.createEntityManager();
		
		boolean isRun = true;

		while (isRun) {
			System.out.println("Головне меню \n" 
					+ "Щоб додати страву, введіть: 1 \n"
					+ "Щоб редагувати страву, введіть: 2 \n"
					+ "Щоб видалити страву, введіть: 3 \n"
					+ "Щоб вивести на екран меню, введіть: 4 \n"
					+ "Щоб додати кухню, введіть: 5 \n"
					+ "Щоб редагувати кухню, введіть: 6 \n"
					+ "Щоб видалити кухню, введіть: 7 \n"
					+ "Щоб вийти з програми, введіть: 0");

			switch (scanner.next()) {
			case "1":
				model.addMeal(em);
				break;
			case "2":
				model.updateMeal(em);
				break;
			case "3":
				model.deleteMeal(em);
				break;
			case "4":
				model.selectTable(em);
				break;
			case "5":
				model.addCuisine(em);
				break;
			case "6":
				model.updateCuisine(em);
				break;
			case "7":
				model.deleteCuisine(em);
				break;
			case "0":
				isRun = false;
				break;
			default:
				System.out.println("Неправильний вибір в меню!");
			}
		}
		em.close();
		factory.close();
	}
	
	public static void main(String[] args) {
		Main main = new Main();
		main.start();		
	}
}
