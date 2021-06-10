import React, { useState } from 'react';
import styled from 'styled-components';
import data from './data';

const Lotto = () => {
  //1~45까지의 배열
  const [Lottery, setLottery] = useState([]);
  //특정 번호 지운 배열
  const [expectNumber, setExpectNumber] = useState([]);
  //중복 조회용 오브젝트
  const [duplicateRound, setDuplicatedRound] = useState("");
  //로또 번호 초기화
  const resetLottery = () => {
    //Lottery state에 45칸 짜리 배열을 1부터 45까지 순서대로 집어넣기
    setLottery(Array(45).fill().map((index, value) => value + 1));
    setDuplicatedRound("");
    setExpectNumber([]);
  }
  //번호 지우기
  const onRemove = (e) => {
    setLottery(Lottery.filter(number => number !== parseInt(e.target.innerHTML)));
  }
  //추첨
  const getLottery = () => {
    setDuplicatedRound("")
    //객체 깊은복사(JSON)
    let newArray = JSON.parse(JSON.stringify(Lottery));
    // setExpectNumber(shuffleArray(newArray).splice(0, 6));
    checkLottery(shuffleArray(newArray).splice(0, 6));
  }

  const checkLottery = (shuffledArray) => {
    //배열 순서대로 정렬
    shuffledArray.sort((a, b) => a - b);

    //object로 이루어진 배열에서 같은 값을 가진 object 검색
    //1번쨰~6번쨰 같은번호 대조
    let duplicateData = data.filter((object) => {
      if (object[1] === shuffledArray[0] &&
        object[2] === shuffledArray[1] &&
        object[3] === shuffledArray[2] &&
        object[4] === shuffledArray[3] &&
        object[5] === shuffledArray[4] &&
        object[6] === shuffledArray[5]) {
        return object
      }
    })
    // duplicateData가 존재하는지 존재하면 duplicatedRound state에 오브젝트의 rounds 값을 넣기
    if (duplicateData.length !== 0) {
      setDuplicatedRound(duplicateData[0].rounds);
    }
    //expectNumber state에 순서대로 정렬한 배열을 넣기
    setExpectNumber(shuffledArray)
    //보너스 번호는 어떻게 처리하지? => 보류
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
        {
          duplicateRound && <h1 style={{ "textAlign": "center" }}>{duplicateRound}회 <br />1등 당첨 번호 입니다.</h1>
        }
        <div style={lotteryBox}>
          {/*
        index 0~5까지 번호 출력 
        sort((a,b)=> a-b)) 올림차순으로 정렬
        */}
          {expectNumber &&
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
  margin : 5px 3px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color : white;
  width : 2rem;
  height : 2rem;
  cursor: pointer;
  background-color: ${props => {
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