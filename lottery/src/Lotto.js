import React, { useState } from 'react';
import styled from 'styled-components';

const Lotto = () => {
  //1~45까지의 배열
  const [Lottery, setLottery] = useState([]);
  //특정 번호 지운 배열
  const [expectNumber, setExpectNumber] = useState([]);
  //로또 번호 초기화
  const resetLottery = () => {
    setLottery(Array(45).fill().map((index, value) => value + 1));
    setExpectNumber([]);
  }
  //번호 지우기
  const onRemove = (e) => {
    setLottery(Lottery.filter(number => number !== parseInt(e.target.innerHTML)));
  }
  //추첨
  const getLottery = () => {
    //객체 깊은복사(JSON)
    let newArray = JSON.parse(JSON.stringify(Lottery));
    setExpectNumber(shuffleArray(newArray).splice(0, 7));
  }
  //배열 셔플
  const shuffleArray = newArray => {
    for (let i = 0; i < newArray.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      const tmp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = tmp;
    }
    return newArray;
  };

  return (
    <div>
      <div>
        <p style={{ "textAlign": "center", "fontSize": "3rem", "fontWeight": "800" }}>추첨 번호</p>
        <div style={lotteryBox}>
          {Lottery.map((num, index) => {
            return <Ball number key={index} onClick={onRemove}>{num} </Ball>
          })}
        </div>
      </div>
      <ButtonContainer>
        <Button onClick={resetLottery}>리셋</Button>
        <Button onClick={getLottery}>추첨</Button>
      </ButtonContainer>
      <div>
        <p style={{ "textAlign": "center", "fontSize": "3rem", "fontWeight": "800", "marginTop": "-1rem" }}>당첨 예측</p>
        <div style={lotteryBox}>
          {/*
        index 0~6까지 번호 출력 
        sort((a,b)=> a-b)) 올림차순으로 정렬
        */}
          {
            expectNumber.sort((a, b) => a - b).map((number, index) => {
              return <Ball number key={index}>{number} </Ball>
            })
          }
        </div>

      </div>
    </div >
  )
}

export default Lotto;
const ButtonContainer = styled.div`
display : flex;
justify-content: center;
`;
const Button = styled.button`
margin : 30px 5px;
width : 10rem;
height : 2rem;
border : none;
font-weight : 800;
background-color: #3d3d3d;
color : white;
`;

const lotteryBox = {
  "display": "flex",
  "justifyContent": "center",
  "flexWrap": "wrap"
}
const Ball = styled.span`
  display : flex;
  border-radius: 2rem;
  margin : 0 3px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color : white;
  width : 2rem;
  height : 2rem;
  cursor: pointer;
  background-color: ${props => {
    console.log(props.children[0])
    if (props.children[0] < 10) {
      return '#ff3838'
    } else if (props.children[0] < 20) {
      return '#7158e2'
    } else if (props.children[0] < 30) {
      return '#17c0eb'
    } else if (props.children[0] < 40) {
      return '#3ae374'
    } else {
      return '#c56cf0'
    }
  }};
`;