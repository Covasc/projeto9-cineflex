import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";


const moviesURL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

export default function MovieList () {
    
    const [items, setItems] = useState([]);

    React.useEffect(() => {
        const promisse = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promisse.then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <div>
            <Instruction>
                <p>Selecione o Filme</p>
            </Instruction>
            <MoviesList>
                    {items.map(item => <li><Link to={`/movie/${item.id}`}><div><img src={item.posterURL} alt="Movie Image" /></div></Link></li>)}
            </MoviesList>
        </div>  
    );
}

const Instruction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    max-width: 375px;
    font-size: 24px;
    font-weight: 400;
`

const MoviesList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 375px;
    height: 100%;
    padding: 0 30px;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 145px;
        height: 209px;
        background-color: white;
        margin-bottom: 11px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
    img {
        width: 129px;
        height: 193px;
    }
`
