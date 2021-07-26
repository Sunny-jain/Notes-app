import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from 'react-router-dom'
import MyNotes from "./screens/Mynotes/MyNotes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path = '/' component = {() => <LandingPage />} />
        <Route exact path = '/mynotes' component = {() => <MyNotes />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
