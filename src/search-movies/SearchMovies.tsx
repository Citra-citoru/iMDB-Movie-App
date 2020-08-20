import React, {useState} from 'react';
import { forwardRef } from 'react';
import './SearchMovies.css';
import CardBox from '../cardbox/cardbox';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import {Link, Route, Redirect} from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import MaterialTable, { Column } from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AppsIcon from '@material-ui/icons/Apps';
import TocIcon from '@material-ui/icons/Toc';

const tableIcons = {
    Add: forwardRef<SVGSVGElement, {}>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef<SVGSVGElement, {}>((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef<SVGSVGElement, {}>((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef<SVGSVGElement, {}>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef<SVGSVGElement, {}>((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef<SVGSVGElement, {}>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef<SVGSVGElement, {}>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef<SVGSVGElement, {}>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement, {}>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement, {}>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef<SVGSVGElement, {}>((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef<SVGSVGElement, {}>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef<SVGSVGElement, {}>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef<SVGSVGElement, {}>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef<SVGSVGElement, {}>((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const Frame = styled.div `
    display: flex;
    flex-direction: row;
    align-self: center;
    justify-content: center;
    width: 80rem;
    height: 4rem;
`;

const SearchButton = styled.button `
width: 9rem;
height: 3.8rem;
color: rgba(0,0,0,0.75);
background-color: 1px solid grey;
border-radius: 7px;
font-size: 1.4rem;
cursor: pointer;
transition: background-color 250ms;
&:hover{
    background-color: rgba(0,0,0,0.1);
    color: white;
}
`;

const SearchInput = styled.input `
width:45rem;
height: 4rem;
margin:2px;
font-size: 1.4rem;
padding: 0.5rem 2rem;
line-height: 2.8rem;
border-radius: 7px;
border: 1px solid #ddd;
margin-bottom: 1rem;
`;

const SwitchButton = styled.button`
width:32px;
height: 32px;
border:none;
border-radius: 50%;
&:hover{
    background-color: rgba(0,0,0,0.1);
    color: white;
}
&:active{
    background-color: rgba(0,0,0,0.1);
    color: white;
}
`;

interface IMovies {
    Title : string,
    Year : string,
    imdbID : string,
    Type : string,
    Poster : string
}
const columns =  [
    {title: 'imdbID', field: 'imdbID' },
    {title: 'Title', field: 'Title' },
    {title: 'Year', field: 'Year' },
    {title: 'Type', field: 'Type' }
]

interface TableState {
    columns: Array<Column<IMovies>>;
    data: IMovies[];
};

export default function SearchMovies() {
    const API_KEY = "4329b554";
    const [query,
        setQuery] = useState('pokemon');
    const [data,
        setData] = useState < IMovies[] > ([]);
    const [isTable, setIsTable] = useState(false);

    const searchMovies = async(event : React.FormEvent < HTMLFormElement >) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            const result = await response.json();
            setData(result.Search);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <h1 className="title">IMDB Movie Search</h1>
            <form className="form" onSubmit={searchMovies}>
                <Frame>
                    <SearchInput
                        className="input"
                        type="text"
                        name="query"
                        placeholder="i. e. Pokemon"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}/>
                    <SearchButton className="button" type="submit">
                        Search</SearchButton>
                </Frame>
            </form>
            <div>
                <Box className="box-icon" display="flex" flexDirection="row" justifyContent="flex-end" m={2}>
                    <SwitchButton onClick = {()=>setIsTable(false)}><AppsIcon className="icon"/></SwitchButton>
                    <SwitchButton onClick = {()=>setIsTable(true)}><TocIcon className="icon"/></SwitchButton>
                </Box>
                {isTable === false? 
                 <Box
                    className="movie-card-box"
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    alignContent="flex-start">
                    {data == undefined? <h4>Movie not found</h4>:data != undefined && data.map((result, index) => (
                        <li key={index}>
                            <CardBox
                                id={index}
                                Title={result.Title}
                                Year={result.Year}
                                imdbID={result.imdbID}
                                Type={result.Type}
                                Poster={result.Poster}/>
                        </li>
                    ))}
                </Box>
                :
               <Box className="table">
               <MaterialTable
                columns={columns}
                data={data}
                icons={tableIcons}
                options={{
                    search: false,
                    showTitle: false,
                    actionsColumnIndex: -1
                  }}
                  actions={[
                    {
                     icon: () => <ChevronRight />,
                      tooltip: 'view',
                      onClick:  (event, rowData) => ( window.location.href = `/MovieDetails/${Object.values(rowData)[2]}`)
                    }
                ]}
                />
               </Box>}
            </div>
        </React.Fragment>
    );
}