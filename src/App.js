import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Header, Footer, AuthContext, RequireAuth } from "./components";
import {
  AccountDetails,
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
                <Route path="/users/:id" component={AccountDetails} />
              </RequireAuth>
            </Switch>
          </main>
          <Footer />
        </AuthContext>
      </div>
    </BrowserRouter>
  );
}
