import React, {useState, useEffect} from 'react';
import {Box, Button} from '@material-ui/core';
import './movie-details.css';
import close from '../asset/close.png';
import { useHistory  } from "react-router-dom";
import {BrowserRouter as Router, Route, Link, RouteComponentProps} from "react-router-dom";

interface IMovie {
    Title : string,
    Year : string,
    Rated : string,
    Released : Date,
    Runtime : string,
    Genre : string,
    Director : string,
    Writer : string,
    Actors : string,
    Plot : string,
    Language : string,
    Country : string,
    Awards : string,
    Poster : string,
    Ratings : {
        Source: string,
        Value: string
    },
    Release : string,
    Response : string,
    RunTime : string,
    Type : string,
    Website : string,
    imdbID : string,
    imdbRating : string,
    imdbVotes : string
}
type TParams = {
    imdbID: string
};

const MovieDetails = ({match} : RouteComponentProps < TParams >) => {
    const API_KEY = "4329b554";
    const id : string = match.params.imdbID;
    const [data,
        setData] = useState < IMovie > ();

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(error => console.error(error));
    }, []);
    let history = useHistory();
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button onClick={()=>history.goBack()}><img className="close-img" src={close}/></Button>
            </Box>
            <Box className="movie" display="flex" flexDirection="column">
                <h2 className="center">{data?.Title}</h2>
                <img className="center" src={data?.Poster}/>
                <h4>Year: {data?.Year}</h4>
                <h4>Imdb Ratings: {data?.imdbRating}</h4>
                <h4>Plot: {data?.Plot}</h4>
                <h4>Actors: {data?.Actors}</h4>
                <h4>Genre: {data?.Genre}</h4>
                <h4>Language: {data?.Language}</h4>
                <h4>Awards: {data?.Awards}</h4>
                <h4>Country: {data?.Country}</h4>
                <h4>Director: {data?.Director}</h4>
                <h4>Writer: {data?.Writer}</h4>
            </Box>
        </React.Fragment>
    );

}
export default MovieDetails;
