package ua.controller;

import java.util.Scanner;

public class EnterParameters {
	private Scanner scanner = new Scanner(System.in);

	public String stringEnter() {
		return scanner.next();
	}

	public int intEnter() {
		int i = 0;
		try {
			i = scanner.nextInt();
		} catch (Exception e) {
			System.out.println("Введіть число!");
			scanner.next();
		}
		return i;
	}
}
