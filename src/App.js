import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  Header,
  Footer,
  AuthContext,
  RequireAuth,
  UserPages,
} from "./components";
import {
  AccountDetails,
  Cart,
  Home,
  ProductDetails,
  SignIn,
  SignUp,
} from "./pages/index";

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <AuthContext>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/certificates/:id" component={ProductDetails} />

              <RequireAuth>
                <Route exact path="/users/:id" component={AccountDetails} />

                <UserPages>
                  <Route path="/users/:id/cart/" component={Cart} />
                </UserPages>
              </RequireAuth>
            </Switch>
          </main>
          <Footer />
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}
