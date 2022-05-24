import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";

let object = { ids: [], name: "", cpf: "" };
let selectedSeats = [];

function Seat ({seatinfo}) {

    const [color, setColor] = React.useState("gray");

    function selected () {
        if(seatinfo.isAvailable){
            if (object.ids.includes(seatinfo.id)) {
                setColor("gray");
                object.ids = object.ids.filter(id => id !== seatinfo.id );
                selectedSeats = selectedSeats.filter(name => name !== seatinfo.name );
                
            } else {
                setColor("green");
                object.ids.push(seatinfo.id);
                selectedSeats.push(seatinfo.name);
            }
        } else {
            alert("Assento não disponível.");
        }

    }

    return (
        <button className={seatinfo.isAvailable ? color : "yellow"} onClick={selected} >{seatinfo.name}</button>
    );
}

function InputControl ({question, pholder, objEntry}) {

    const [content, setContent] = useState("");

    function getEntry (e) {
        setContent(e.target.value);
        objEntry === ".cpf" ? object.cpf = e.target.value : object.name = e.target.value;
    }

    return (
        <>
            <p>{question}</p>
            <input
            type="text"
            placeholder={pholder} 
            onChange={e => getEntry(e)} 
            value={content}
            ></input>
        </>
    )
}

export default function Reservation ({setSucessInfo}) {

    let navigate = useNavigate();
    let allMovieInfo = {}


    const { idSession } = useParams();
    const [items, setItems] = useState([]);
    const [infoFilme, setInfoFilme] = useState({});



    React.useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promisse.then((response) => {
            setItems(response.data.seats);
            allMovieInfo = response.data;
            object.movie = allMovieInfo.movie.title;
            object.time = allMovieInfo.name;
            object.day = allMovieInfo.day.date;
            console.log(object);
            let infoFilmeContent = {};
            infoFilmeContent.filmName = response.data.movie.title;
            infoFilmeContent.img = response.data.movie.posterURL;
            infoFilmeContent.day = response.data.day.weekday;
            infoFilmeContent.time = response.data.name;
            setInfoFilme(infoFilmeContent);
        });
    }, []);

    function createdObjectSend () {
        console.log(object);
    
        if (object.ids.length === 0) {
            alert("Você deve selecionar ao menos um assento.");
        } else {
            if (object.name.length === 0 || object.cpf.length === 0) {
                alert("Verifique os dados do usuário inseridos.")
            } else {
                const promisse = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', object) 
                promisse.then(() => {
                    object.seats = selectedSeats;
                    setSucessInfo(object);
                    navigate("/sucess");
                });
            }
        }
    }    

    return (
        <>
            <Instruction3>
                <p>Selecione o(s) assentos</p>
            </Instruction3>
            <Buttons>
                {items.map(seatinfo => <Seat seatinfo={seatinfo} />)}
            </Buttons>
            <Instruction4>
                <div>
                    <Circle></Circle>
                    <div>Selecionado</div>
                </div>
                <div>
                    <Circle1></Circle1>
                    <div>Disponível</div>
                </div>
                <div>
                    <Circle2></Circle2>
                    <div>Indisponível</div>
                </div>
            </Instruction4>
            <BuyerInfo>
                <InputControl question="Nome do comprador:" pholder="Digite seu nome..." objEntry={".name"} />
                <InputControl question="CPF do comprador:" pholder="Digite seu CPF..." objEntry={".cpf"}/>
            </BuyerInfo>
            <Confirm>
                <button onClick={createdObjectSend}>Reservar assento(s)</button>
            </Confirm>
            <Footer infoFilme={infoFilme}/>
        </>
    );
}

const Instruction3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    max-width: 375px;
    font-size: 24px;
    font-weight: 400;
`

const Buttons = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 375px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 24px;

    button {
        width: 26px;
        height: 26px;
        border-radius: 12px;
        margin: 0 3px 12px 3px;
        border-style: solid;
        font-size: 11px;
    }

    .gray {
        background-color: #c3cfd9;
    }

    .yellow {
        background-color: #fbe192;
    }

    .green {
        background-color: #8dd7cf;
    }
`

const Instruction4 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    max-width: 375px;
    font-size: 13px;
    font-weight: 400;
    padding: 0 50px;

    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const Circle = styled.div`
        width: 24px;
        height: 24px;
        border: solid 1px;
        border-color: lightgray;
        background-color: #8dd7cf;
        border-radius: 25px;
        margin-bottom: 4px;
`

const Circle1 = styled.div`
        width: 24px;
        height: 24px;
        border: solid 1px;
        border-color: lightgray;
        background-color: #c3cfd9;
        border-radius: 25px;
        margin-bottom: 4px;
`

const Circle2 = styled.div`
        width: 24px;
        height: 24px;
        border: solid 1px;
        border-color: lightgray;
        background-color: #fbe192;
        border-radius: 25px;
        margin-bottom: 4px;
`

const BuyerInfo = styled.div`
    width: 100%;
    max-width: 375px;
    padding: 50px 24px 30px 24px;
    font-size: 18px;

    input {
        width: 100%;
        height: 51px;
        margin: 5px 0 8px 0;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        font-size: 18px;
        font-style: italic;
        padding: 0 12px;
    }
`

const Confirm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 375px;

    button {
        width: 225px;
        height: 42px;
        color: white;
        background-color: #e8833a;
        font-size: 18px;
        border: none;
        border-radius: 3px;
    }


`

