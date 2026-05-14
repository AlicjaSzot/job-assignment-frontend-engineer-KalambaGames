import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import Article from "./pages/Article/Article";
import ArticleList from "./pages/ArticleList/ArticleList";
import Editor from "./pages/Editor/Editor";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Logout from "./pages/Logout/Logout";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

function App(): React.ReactElement {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginRegister} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={LoginRegister} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/article/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
