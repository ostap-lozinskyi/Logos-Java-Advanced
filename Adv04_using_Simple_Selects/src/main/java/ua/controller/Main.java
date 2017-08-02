package ua.controller;

//Закінчити консольне меню, використовуючи агрегатні функції.

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
					+ "Щоб вивести на екран страву за іменем, введіть: 4 \n"
					+ "Щоб вивести на екран меню, введіть: 5 \n"
					+ "Щоб додати кухню, введіть: 6 \n"
					+ "Щоб вибрати три страви, введіть: 7 \n"
					+ "Щоб здійснити пошук страви за проміжком цін, введіть: 8 \n"
					+ "Щоб здійснити пошук страви за першою буквою або частиною назви, введіть: 9 \n"
					+ "Щоб вивести страву з найменшою ціною, введіть: 10 \n"
					+ "Щоб вивести середнє значення цін в меню, введіть: 11 \n"
					+ "Щоб вивести вагу всіх страв у меню, введіть: 12 \n"
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
				model.selectMealByName(em);
				break;
			case "5":
				model.selectMeal(em);
				break;
			case "6":
				model.addCuisine(em);
				break;
			case "7":
				model.selectMealByIdList(em);
				break;
			case "8":
				model.selectMealByPriceInterval(em);
				break;
			case "9":
				model.selectMealByLetter(em);
				break;
			case "10":
				model.selectBiggestPrice(em);
				break;
			case "11":
				model.selectAvgPrice(em);
				break;
			case "12":
				model.selectSumWeight(em);
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
