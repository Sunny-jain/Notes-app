import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/Mynotes/MyNotes";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import Profile from "./screens/Profile/Profile";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route
          exact
          path="/"
          component={({ history }) => <LandingPage history={history} />}
        />
        <Route
          exact
          path="/mynotes"
          component={() => <MyNotes search={search} />}
        />
        <Route exact path="/login" component={() => <LoginPage />} />
        <Route exact path="/register" component={() => <RegisterPage />} />
        <Route exact path="/createnote" component={() => <CreateNote />} />
        <Route exact path="/note/:id" component={() => <SingleNote />} />
        <Route exact path="/profile" component={() => <Profile />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
