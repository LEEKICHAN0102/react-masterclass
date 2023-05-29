import {useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container =styled.div`
  padding:0px 20px;
  max-width:480px;
  margin: 0 auto;
`;


const Header =styled.header`
  height:10vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Title = styled.h1`
  margin-top:30px;
  font-size:48px;
  color:${props=>props.theme.accentColor};
`;

const Loader=styled.div`
  text-align:center;
  align-items:center;
  display:block;
  margin-top:30px;
`;

interface RouteParams{
  coinId:string
}

interface RouteState{
  name:string;
}

function Coin(){
  const [loading,setLoading] = useState(true);
  const {coinId}=useParams<RouteParams>();
  const {state}=useLocation<RouteState>();
  return <Container>
  <Header>
    <Title>{state?.name ||"업데이트 중.."}</Title>
  </Header>
  {loading ? <Loader>코인 불러오는 중</Loader>:null}
  </Container>
}

export default Coin;