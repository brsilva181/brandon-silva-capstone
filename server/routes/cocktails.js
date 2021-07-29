const express = require("express");
const router = express.Router();
const Drink = require("../models/drinks");

router.get("/", async (req, res) => {
    const { ids, ingredients, limit, numberOfAcceptableMissingIngredients } =
        req.query || {};
    const query = {};
    const ingredientsArr = [];
    if (ingredients) {
        ingredientsArr.push(...ingredients.split(","));
        if (ingredientsArr.length === 1) {
            query["ingredients.ingredient"] = { $in: ingredientsArr };
        } else {
            query.$and = ingredientsArr.map((ingredient) => ({
                "ingredients.ingredient": { $in: [ingredient] },
            }));
        }
    }
    if (ids) {
        const idsArr = ids.split(",");
        query._id = { $in: idsArr };
    }
    const parsedLimit = limit ? Number(limit) : undefined;
    const drinks = await Drink.find(query).limit(parsedLimit);
    if (!numberOfAcceptableMissingIngredients) {
        res.send(drinks);
        return;
    }
    const filteredDrinks = drinks.filter((drink) => {
        const numberOfMatchingIngredients = ingredientsArr.length;
        const numberOfMissingIngredients =
            drink.ingredients.length - numberOfMatchingIngredients;
        return (
            numberOfMissingIngredients <= numberOfAcceptableMissingIngredients
        );
    });
    res.send(filteredDrinks);
});

router.get("/find/:id", async (req, res) => {
    let { id } = req.params;
    res.status(200).json(await Drink.findById(id));
});

router.get("/random", async (req, res) => {
    res.status(200).json(await Drink.aggregate([{ $sample: { size: 1 } }]));
});

module.exports = router;
