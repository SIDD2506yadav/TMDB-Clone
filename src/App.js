import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Movie } from "./components/Movie/Movie";
import { Show } from "./components/Show/Show";
import { Search } from "./components/Search/Search";
import { Footer } from "./components/Footer/Footer";
import { Actor } from "./components/Actor/Actor";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/movie/:movieId">
                    <Movie />
                </Route>
                <Route path="/show/:showId">
                    <Show />
                </Route>
                <Route path="/actor/:actorId">
                    <Actor />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
