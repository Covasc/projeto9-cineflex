import styled from 'styled-components';

export default function Header () {
    return (
        <Top>
            <h1>CINEFLEX</h1>
        </Top>
    );
}

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 375px;
    height: 67px;
    text-align: center;
    background-color: #c3cfd9;
    color: #e8833a;
    font-size: 34px;
    font-weight: 400;
`



