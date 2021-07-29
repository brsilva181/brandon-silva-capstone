import React, { Component } from "react";

class DrinkList extends Component {
    render() {
        const { drinks } = this.props;
        return (
            <div>
                {drinks.map((drink) => (
                    <div>
                        <p>{drink.name}</p>
                        {/* <img src={drink.img} /> */}
                        <p>
                            Ingredients:{" "}
                            {drink.ingredients
                                .map(
                                    ({ ingredient, measure }) =>
                                        `${measure} ${ingredient}`
                                )
                                .join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        );
    }
}

export default DrinkList;
