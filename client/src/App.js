import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageHeader from "./components/PageHeader/PageHeader";
import DrinkForm from "./components/DrinkForm/DrinkForm";
import DrinkList from "./components/DrinkList/DrinkList";
import React from "react";
import "./App.scss";
import DrinkDetails from "./components/DrinkDetails/DrinkDetails";

class App extends React.Component {
    state = { drinks: [] };
    setDrinks = (drinks = [], cb) => {
        this.setState({ drinks }, () => {
            cb?.();
        });
    };
    render() {
        return (
            <BrowserRouter>
                <div className='app'>
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
                        <Route
                            exact
                            path='/details'
                            render={(routerProps) => (
                                <DrinkDetails
                                    {...routerProps}
                                    drinks={this.state.drinks}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
