import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader/PageHeader";
import DrinkForm from "./components/DrinkForm/DrinkForm";
import DrinkList from "./components/DrinkList/DrinkList";
import React from "react";

class App extends React.Component {
    state = { drinks: [] };
    setDrinks = (drinks = []) => {
        this.setState({ drinks });
    };
    render() {
        return (
            <BrowserRouter>
                <PageHeader />
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={(routerProps) => (
                            <DrinkForm
                                {...routerProps}
                                setDrinks={this.setDrinks}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/list'
                        render={(routerProps) => (
                            <DrinkList
                                {...routerProps}
                                drinks={this.state.drinks}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
