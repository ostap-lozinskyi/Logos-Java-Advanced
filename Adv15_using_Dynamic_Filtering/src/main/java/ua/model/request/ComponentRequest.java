package ua.model.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import ua.entity.Ingredient;
import ua.entity.Ms;
import ua.validation.annotation.UniqueComponent;
import ua.validation.flag.ComponentFlag;

@UniqueComponent(message = "Such a Component already exists", groups = { ComponentFlag.class})
public class ComponentRequest {

	private Integer id;

	@NotNull(message = "This field cannot be blank", groups = { ComponentFlag.class })
	private Ingredient ingredient;

	@NotBlank(message = "This field cannot be blank", groups = { ComponentFlag.class })
	@Pattern(regexp = "^[1-9][0-9]*| *$", message = "The 'Amount' should be a number and can not begin with a zero symbol", groups = {
			ComponentFlag.class })
	private String amount;

	@NotNull(message = "This field cannot be blank", groups = { ComponentFlag.class })
	private Ms ms;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public Ms getMs() {
		return ms;
	}

	public void setMs(Ms ms) {
		this.ms = ms;
	}
}
