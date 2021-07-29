const data = require("../data/data.json");
const INGREDIENT_PREFIX = "strIngredient";
const MEASURE_PREFIX = "strMeasure";
const Drink = require("../models/drinks");
const mongoose = require("mongoose");

const dbURI =
    "mongodb+srv://brsilva181:Hakushaku12345@capstone.rsht6.mongodb.net/capstone?retryWrites=true&w=majority";

const Recipe = (data) => {
    const { strDrink, strGlass, strInstructions, strDrinkThumb } = data;
    let ingredients = [];
    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (key.includes(INGREDIENT_PREFIX) && value) {
            const ingredientNumber = key.replace(INGREDIENT_PREFIX, "");
            const matchingMeasure =
                data[`${MEASURE_PREFIX}${ingredientNumber}`];
            ingredients.push({
                ingredient: value.toLowerCase(),
                measure: matchingMeasure || null,
            });
        }
    });
    return {
        glass: strGlass,
        ingredients,
        instructions: strInstructions,
        name: strDrink,
        image: strDrinkThumb,
    };
};

const seedDatabase = async () => {
    await mongoose
        .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((err) => console.log("error connecting to mongoose", err));
    const parsedDrinks = data.map((drink) => {
        return Recipe(drink);
    });
    await Drink.insertMany(parsedDrinks);
    const seededDrinks = await Drink.find();
    console.log(`seeded ${seededDrinks.length} drinks`);
};

seedDatabase();
