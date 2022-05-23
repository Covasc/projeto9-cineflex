import Header from './Header';
import MovieList from './MovieList';
import styled from 'styled-components';
import Session from './Session';
import Reservation from './Reservation';
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App () {
    return (
        <BrowserRouter>
            <Container>
                <Routes>
                    <Route path='/' element={<MovieList />} />
                    <Route path='/movie/:idMovie' element={<Session />} />
                    <Route path='/session/:idSession' element={<Reservation />} />
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