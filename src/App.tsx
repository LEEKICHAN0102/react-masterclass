import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Popular from "./Routes/Popular";
import Now from "./Routes/Now";
import Coming from "./Routes/Coming";
import Search from "./Routes/Search";
import Header from "./Components/Header";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={["/", "/movies/:movieId"]}>
          <Popular />
        </Route>
        <Route path="/now-playing">
          <Now />
        </Route>
        <Route path="/coming-soon">
          <Coming />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;