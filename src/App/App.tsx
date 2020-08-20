import React from 'react';
import SearchMovies from '../search-movies/SearchMovies';
import MovieDetails from '../movie-details/movie-details';
import { Link, Route, Switch } from "react-router-dom";
import './App.css';
export default function App(){
return(
    <div className="container">
    <Switch>
    <Route exact path="/" component={SearchMovies} />
    <Route path="/MovieDetails/:imdbID" component={MovieDetails} />
    </Switch>
</div>
);
}