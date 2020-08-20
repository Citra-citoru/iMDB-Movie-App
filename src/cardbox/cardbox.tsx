import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, Route} from "react-router-dom";
import Box from '@material-ui/core/Box';
import styled, {css} from 'styled-components';
import './cardbox.css';
import MovieDetails from '../movie-details/movie-details';

interface Iprops {
    id : number,
    imdbID : string,
    Title : string,
    Type : string,
    Year : string,
    Poster : string
}

const Card = styled.button `
    margin:2px;
    &:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.1)
    }
    align-items: center;
    border:none;
`;

export default function CardBox({
    id,
    imdbID,
    Title,
    Type,
    Year,
    Poster
} : Iprops) {

    const image = 'https://www.dropbox.com/s/zk08eb8n3xs8owh/image-not-found-scaled-1150x647.png?ra' +
            'w=1';
    return (
        <React.Fragment>
            <Card
                className="movie-box"
                onClick={(event) => window.location.href = `/MovieDetails/${imdbID}`}>
                {Poster != "N/A"
                    ? <img src={Poster} className="poster"/>
                    : <img src={image} className="poster"/>}
                <Box m={2}>
                    <Box >
                        <h3 style={{margin:0}}>{Title}</h3>
                        <Box display="flex" flexDirection="row" justifyContent="space-around">
                            <h4>imdbId: {imdbID}</h4>
                            <h4>Year: {Year}</h4>
                        </Box>
                    </Box>
                </Box>
            </Card>

            <Route path='/MovieDetails' component={MovieDetails}/>
        </React.Fragment>
    );
}
