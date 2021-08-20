import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/Mynotes/MyNotes";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route
          exact
          path="/"
          component={({ history }) => <LandingPage history={history} />}
        />
        <Route exact path="/mynotes" component={() => <MyNotes />} />
        <Route exact path="/login" component={() => <LoginPage />} />
        <Route exact path="/register" component={() => <RegisterPage />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
