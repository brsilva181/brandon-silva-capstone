import React from "react";
import axios from "axios";
import "./DrinkForm.scss";

class DrinkForm extends React.Component {
    state = {
        ids: [],
        ingredients: [],
        numberOfIngredientFilters: 1,
    };

    handleSubmit = async (e) => {
        const LIMIT = 10;
        const BASE_URL = "http://localhost:9000/api/drinks";
        e.preventDefault();
        const { ids, ingredients } = this.state;
        const searchParams = new URLSearchParams();
        searchParams.append("limit", LIMIT);
        ids.length && searchParams.append("ids", ids);
        ingredients.length &&
            searchParams.append("ingredients", ingredients.filter(Boolean));
        console.log("what string did i send", searchParams.toString());
        const { data } = await axios.get(
            `${BASE_URL}?${searchParams.toString()}`
        );
        console.log("what data did i get?", data);
        this.props.setDrinks(data, () => this.props.history.push("/list"));
    };
    addIngredientFilter = () => {
        const currentNumberOfIngredientFilters =
            this.state.numberOfIngredientFilters;
        if (currentNumberOfIngredientFilters >= 15) return;
        this.setState({
            numberOfIngredientFilters: currentNumberOfIngredientFilters + 1,
        });
    };
    subtractIngredientFilter = (idx) => {
        const currentNumberOfIngredientFilters =
            this.state.numberOfIngredientFilters;
        if (currentNumberOfIngredientFilters <= 1) return;
        const ingredients = [...this.state.ingredients];
        ingredients[idx] = "";
        this.setState({
            numberOfIngredientFilters: currentNumberOfIngredientFilters - 1,
            ingredients,
        });
    };
    handleDrinkInput = (e) => {
        const ingredients = [...this.state.ingredients];
        const { name, value } = e.target;
        // ingredient-1
        const ingredientIdx = Number(name.split("-")[1]);
        ingredients[ingredientIdx] = value;
        this.setState({ ingredients });
    };
    render() {
        return (
            <form className='drinkForm' onSubmit={this.handleSubmit}>
                {Array(this.state.numberOfIngredientFilters)
                    .fill(null)
                    .map((_, idx) => (
                        <div className='drinkForm__container'>
                            <div className='drinkForm__input-container'>
                                <label
                                    className='drinkForm__label'
                                    htmlFor={`ingredient-${idx}`}
                                >
                                    Ingredient
                                </label>
                                <input
                                    className='drinkForm__input'
                                    type='text'
                                    id={`ingredient-${idx}`}
                                    name={`ingredient-${idx}`}
                                    onChange={this.handleDrinkInput}
                                />
                            </div>
                            <div className='drinkForm__button-container'>
                                <button
                                    className='drinkForm__control'
                                    type='button'
                                    onClick={() =>
                                        this.subtractIngredientFilter(idx)
                                    }
                                >
                                    Remove
                                </button>
                                <button
                                    className='drinkForm__control'
                                    type='button'
                                    onClick={() =>
                                        this.addIngredientFilter(idx)
                                    }
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                <button className='drinkForm__button'>Mix!</button>
            </form>
        );
    }
}

export default DrinkForm;
