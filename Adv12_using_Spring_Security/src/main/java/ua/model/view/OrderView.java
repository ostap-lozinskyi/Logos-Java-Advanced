package ua.model.view;

public class OrderView {
	
	private Integer id;

	private Integer place;

	public OrderView(Integer id, Integer place) {
		this.id = id;
		this.place = place;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getPlace() {
		return place;
	}

	public void setPlace(Integer place) {
		this.place = place;
	}

}
