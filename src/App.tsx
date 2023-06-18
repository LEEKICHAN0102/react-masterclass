import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Popular from "./Routes/Popular";
import Now from "./Routes/Now";
import Coming from "./Routes/Coming";
import Header from "./Components/Header";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={["/", "/movies/:movieId"]}>
          <Popular />
        </Route>
        <Route path="/now-playing" component={Now}>
          <Now />
        </Route>
        <Route path="/now-playing/movie/:movieId" component={Now}>
          <Now />
        </Route>
        <Route path="/coming-soon" component={Coming}>
          <Coming />
        </Route>
        <Route path="/coming-soon/movie/:movieId" component={Coming}>
          <Coming />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;