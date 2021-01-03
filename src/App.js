import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

// import asyncComponent from './hoc/asyncComponent/asyncComponent';
// const asyncCheckout = asyncComponent(() => {
//     return import('./containers/Checkout/Checkout');
// });
// const asyncOrders = asyncComponent(() => {
//     return import('./containers/Orders/Orders');
// });
// const asyncAuth = asyncComponent(() => {
//     return import('./containers/Auth/Auth');
// });

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const loading = (
    <Spinner/>
);

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        // For Unauthenticated User
        let routes = (
            <React.Suspense fallback={loading}>
                <Switch>
                    <Route path="/auth" render={() => <Auth />} />
                    <Route path="/" exact render={() => <BurgerBuilder />} />
                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        );

        // For Authenticated User
        if (this.props.isAuthenticated) {
            routes = (
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route path="/checkout" render={() => <Checkout />} />
                        <Route path="/orders" render={() => <Orders />} />
                        <Route path="/logout" render={() => <Logout />} />
                        <Route path="/auth" render={() => <Auth />} />
                        <Route
                            path="/"
                            exact
                            render={() => <BurgerBuilder />}
                        />
                        <Redirect to="/" />
                    </Switch>
                </React.Suspense>
            );
        }

        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authChekState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
