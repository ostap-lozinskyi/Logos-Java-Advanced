package ua.model.view;

public class PlaceView {
	
	private Integer id;
	
	private int countOfPeople;

	private int number;

	public PlaceView(Integer id, int countOfPeople, int number) {
		this.id = id;
		this.countOfPeople = countOfPeople;
		this.number = number;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getCountOfPeople() {
		return countOfPeople;
	}

	public void setCountOfPeople(int countOfPeople) {
		this.countOfPeople = countOfPeople;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}
	
}
