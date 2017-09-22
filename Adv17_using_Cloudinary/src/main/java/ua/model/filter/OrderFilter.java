package ua.model.filter;

import java.util.ArrayList;
import java.util.List;

public class OrderFilter {

	private List<String> mealName = new ArrayList<>();
	
	private List<String> placeNumber = new ArrayList<>();

	public List<String> getMealName() {
		return mealName;
	}

	public void setMealName(List<String> mealName) {
		this.mealName = mealName;
	}

	public List<String> getPlaceNumber() {
		return placeNumber;
	}

	public void setPlaceNumber(List<String> placeNumber) {
		this.placeNumber = placeNumber;
	}

}
