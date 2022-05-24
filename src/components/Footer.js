import styled from "styled-components"

export default function Footer ({infoFilme}) {
    return (
        <>
        <Rodape>
            <Border>
               <img src={infoFilme.img !== undefined && infoFilme.img} alt="Movie Image"></img>
            </Border>
            <InfoFilme>
                <p>{infoFilme.filmName}</p>
                <p> {infoFilme.day !== undefined && infoFilme.time !== undefined && `${infoFilme.day} - ${infoFilme.time}`} </p>
            </InfoFilme>
        </Rodape>
        </>
    )
}

const Rodape = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    height: 117px;
    width: 100%;
    max-width: 375px;
    background-color: #c3cfd9;
    padding: 10px;

    img {
        height: 72px;
        width: 48px;
    }

`
const Border = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 89px;
    background-color: white;
`

const InfoFilme = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 24px;
    margin-left: 12px;
`
