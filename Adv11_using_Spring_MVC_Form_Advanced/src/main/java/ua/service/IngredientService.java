package ua.service;

import java.util.List;

import ua.entity.Ingredient;
import ua.model.view.IngredientView;

public interface IngredientService extends CrudService<Ingredient, Integer> {

	List<IngredientView> findAllView();
}
