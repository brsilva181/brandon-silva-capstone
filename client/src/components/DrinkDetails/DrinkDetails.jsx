import React, { Component } from "react";
import drink from "../../assets/images/cocktail.jpg";
import "./DrinkDetails.scss";

export default class DrinkDetails extends Component {
    render() {
        return (
            <div className='drinkDetails'>
                <div className='drinkDetails__card'>
                    <img
                        className='drinkDetails__image'
                        src={drink}
                        alt='drink'
                    />
                    <p className='drinkDetails__title'>Barry</p>
                    <p className='drinkDetails__text'>
                        2oz Strawberry Schnapps
                    </p>
                    <p className='drinkDetails__text'>2oz Orange juice </p>
                    <p className='drinkDetails__text'>2oz Cranberry Juice</p>
                    <p className='drinkDetails__text'>
                        Pour schnapps, orange juice, and cranberry juice over
                        ice in a highball glass. Top with club soda and serve.
                    </p>
                </div>
            </div>
        );
    }
}
