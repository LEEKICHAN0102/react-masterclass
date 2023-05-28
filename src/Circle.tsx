import styled from "styled-components";

interface ContainerProps{
  bgColor:string;
  borderColor:string;
}

const Container=styled.div<ContainerProps>`
  width:200px;
  height:200px;
  background-color:${(props)=>props.bgColor};
  border-radius:100px;
  border:1px solid ${props=>props.borderColor};
`;

interface CircleProps{
  bgColor:string;  
  borderColor?:string;
  text?:string;
}

function Circle({bgColor,borderColor,text="default"}:CircleProps){
  return (
    <Container bgColor={bgColor} borderColor={borderColor??bgColor} >
      {text}
    </Container>
  )
}

//옵셔널 프랍을 사용할 때 에러가 나지 않도록 default value를 선언 하도록 하자  syntax => key ?: value
//`${props=>props.valueName}`;

export default Circle;