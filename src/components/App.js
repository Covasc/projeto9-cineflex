import Header from './Header';
import MovieList from './MovieList';
import styled from 'styled-components';
import Session from './Session';
import Reservation from './Reservation';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Sucess from './Sucess';

export default function App () {

    const [sucessInfo, setSucessInfo] = useState({});
    console.log(sucessInfo);

    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Routes>
                    <Route path='/' element={<MovieList />} />
                    <Route path='/movie/:idMovie' element={<Session />} />
                    <Route path='/session/:idSession' element={<Reservation setSucessInfo={setSucessInfo}/>} />
                    <Route path='/sucess' element={<Sucess sucessInfo={sucessInfo} setSucessInfo={setSucessInfo}/>} />
                </Routes>
           </Container>
        </BrowserRouter>
    ) 
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif; 
`