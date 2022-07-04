import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import { Header, Footer, AuthContext, AuthRoute } from "./components";
import {
  AccountDetails,
  Cart,
  Error,
  Home,
  Orders,
  ProductControl,
  ProductDetails,
  SignIn,
  SignUp,
  Users,
} from "./pages/index";
import { UserRoles } from "./helpers/UserRoles";

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <AuthContext>
          <Header />
          <NotificationContainer />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route
                exact
                path="/certificates/:id"
                component={ProductDetails}
              />
              <Error path="/error" component={Error} />

              <AuthRoute
                path="/users/:id/cart/"
                component={Cart}
                requiredRoles={[UserRoles.user]}
              />
              <AuthRoute
                path="/users/:id/orders/:orderId"
                component={Cart}
                requiredRoles={[UserRoles.admin, UserRoles.user]}
              />
              <AuthRoute
                exact
                path="/users/:id"
                component={AccountDetails}
                requiredRoles={[UserRoles.admin, UserRoles.user]}
              />
              <AuthRoute
                exact
                path="/control/certificates/:action"
                component={ProductControl}
                requiredRoles={[UserRoles.admin]}
              />
              <AuthRoute
                exact
                path="/control/certificates/:id/:action"
                component={ProductControl}
                requiredRoles={[UserRoles.admin]}
              />
              <AuthRoute
                path="/control/users"
                component={Users}
                requiredRoles={[UserRoles.admin]}
              />
              <AuthRoute
                exact
                path="/users/:id/orders"
                component={Orders}
                requiredRoles={[UserRoles.admin, UserRoles.user]}
              />
            </Switch>
          </main>
          <Footer />
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}
