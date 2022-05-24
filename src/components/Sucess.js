import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Sucess ({sucessInfo, setSucessInfo}) {
    const {seats, movie, time, day, name, cpf} = sucessInfo;

    let navigate = useNavigate();

    function returnHome () {
        setSucessInfo({});
        navigate("/");
    }

    return (
        <>
        <Instruction4>
            <p>Pedido feito</p> 
            <p>com sucesso!</p>
        </Instruction4>
        <Information>
            <div>
                <Bold>Filme e Sessão</Bold>
                <p>{movie}</p>
                <p>{day} {time}</p>
            </div>
            <div>
                <Bold>Ingressos</Bold>
                {seats.map(list => <p>{`Assento ${list}`}</p>)}
            </div>
            <div>
                <Bold>Comprador</Bold>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </div>
        </Information>
        <div>
            <Botao onClick={returnHome}>Voltar para Home</Botao>
        </div>
        </>
    )
}

const Instruction4 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 110px;
    max-width: 375px;
    font-size: 24px;
    font-weight: 700;
    color: #247a6b;
    text-align: center;
`
const Information = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 375px;
    padding: 0 24px;
    font-size: 24px;
    font-weight: 400;

    >div {
        margin: 20px 0;
    }

    p {
        margin: 4px 0;
    }
`
const Bold = styled.p`
    font-weight: 700;
`

const Botao = styled.button`
    font-size: 18px;
    margin: 100px 8px 22px 0;
    background-color: #e8833a;
    color: white;
    width: 225px;
    height: 43px;
    border-radius: 3px;
    border-style: none;
`


