const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        glass: {
            default: "Glass",
            type: String,
        },
        instructions: {
            default: "Mix it all together in glass",
            type: String,
        },
        ingredients: [
            {
                ingredient: String,
                measure: String,
            },
        ],
        imageSource: {
            default:
                "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
            type: String,
        },
    },
    { timestamps: true }
);

const Drink = mongoose.model("Drink", drinkSchema);
module.exports = Drink;
