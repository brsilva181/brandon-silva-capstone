import React, { Component } from "react";
import "./DrinkList.scss";

class DrinkList extends Component {
    render() {
        const { drinks } = this.props;
        console.log("what are the drinks?", drinks);
        return (
            <div className='drinkList'>
                {drinks.map((drink) => (
                    <div>
                        <p className='drinkList__card'>{drink.name}</p>
                        <img
                            className='drinkList__image'
                            src={drink.imageSource}
                            alt='drink'
                        />
                        <p>
                            Ingredients:{" "}
                            {drink.ingredients.map(
                                ({ ingredient, measure }) => (
                                    <>
                                        <p>
                                            {measure} {ingredient}
                                        </p>
                                        <br />
                                    </>
                                )
                            )}
                        </p>
                    </div>
                ))}
            </div>
            // <div className='drinkList'>
            //     <div className='drinkList__card'>
            //         <img className='drinkList__image' src={drink} alt='drink' />
            //         <p className='drinkList__text'>Barry</p>
            //     </div>
            //     <div className='drinkList__card'>
            //         <img className='drinkList__image' src={drink} alt='drink' />
            //         <p className='drinkList__text'>Other Barry</p>
            //     </div>
            // </div>
        );
    }
}

export default DrinkList;
