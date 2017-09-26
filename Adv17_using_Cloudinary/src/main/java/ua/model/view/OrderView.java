package ua.model.view;

public class OrderView {
	
	private Integer id;

	private Integer place;
	
	private Integer status;
	
	public OrderView(Integer id, Integer place, Integer status) {
		this.id = id;
		this.place = place;
		this.status = status;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}
