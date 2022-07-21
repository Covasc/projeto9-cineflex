import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Footer from "./Footer";   
import { Link, useParams } from "react-router-dom";


export default function Session () {


    const { idMovie } = useParams();    
    const [items, setItems] = useState({});
    const [infoFilme, setInfoFilme] = useState({});

    console.log(items)

    React.useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        promisse.then((response) => {
            let infoFilmeContent = {};
            setItems(response.data);
            infoFilmeContent.filmName = response.data.title;
            infoFilmeContent.img = response.data.posterURL;
            console.log(infoFilmeContent);
            setInfoFilme(infoFilmeContent);
        }); 
    }, []);



    
    return (
        <>
        <Instruction2>
            <p>Selecione o horário</p>
        </Instruction2>
        <SessionInfo>
            {items.days?.map(obj => (
                <>
                    <div>   
                        <p>{obj.weekday} - {obj.date}</p>
                    </div>
                    <div>
                        {obj.showtimes.map(list => <Link to={`/session/${list.id}`}><button>{list.name}</button></Link>)}
                    </div>
                </>
            ) 
            )}
        </SessionInfo>
        <Footer infoFilme={infoFilme}/>
        </>   
    );
}

const Instruction2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    max-width: 375px;
    font-size: 24px;
    font-weight: 400;
`

const SessionInfo = styled.div`
    width: 100%;
    max-width: 375px;
    font-size: 20px;
    padding: 0 24px;

    p {
        margin-bottom: 22px;
    }

    button {
        font-size: 18px;
        margin: 0 8px 22px 0;
        background-color: #e8833a;
        color: white;
        width: 83px;
        height: 43px;
        border-radius: 3px;
        border-style: none;
    }
`
