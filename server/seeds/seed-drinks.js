const axios = require("axios");
const fs = require("fs");
const { chunk } = require("lodash");

const ALL_DRINKS_URL =
    "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic";

const ID_LOOKUP_BASE_URL =
    "https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=";

const seedDatabase = async () => {
    const { data: allDrinksData } = await axios.get(ALL_DRINKS_URL);

    const resolvedDrinks = [];
    const brokenDrinks = [];

    const resolveDrinkRequests = allDrinksData.drinks.map(async (drink) => {
        const url = ID_LOOKUP_BASE_URL + drink.idDrink;

        try {
            const { data: resolvedDrinkData } = await axios.get(url);

            const resolvedDrink = resolvedDrinkData.drinks?.[0];

            if (resolvedDrink) resolvedDrinks.push(resolvedDrink);
        } catch (err) {
            brokenDrinks.push({ drink, url });
        }
    });

    for (const requestChunk of chunk(resolveDrinkRequests, 100)) {
        await Promise.all(requestChunk);
    }

    fs.writeFile(
        __dirname + "/./bad-data.json",
        JSON.stringify(brokenDrinks),
        (err) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("done writing bad data!", brokenDrinks.length);
            }
        }
    );

    fs.writeFile(
        __dirname + "/./data.json",
        JSON.stringify(resolvedDrinks),
        (err) => {
            if (err) {
                console.log("err", err);
            } else {
                console.log("done writing good data!", resolvedDrinks.length);
            }
        }
    );
};

seedDatabase();
