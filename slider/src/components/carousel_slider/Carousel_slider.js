import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
//캐러셀 슬라이드 ver.1
//
const Slide = styled.div`
  width : 100vw;
  height : 345px;
  display : flex;
  justify-content : center;
  align-items : center;
  z-index: -10;

  &:nth-child(odd){
    background-color : #D6A2E8;
  }

  &:nth-child(even){
    background-color : #3B3B98;
  }
`;

const Container = styled.div`
  width : 100vw
`;

const SliderContainer = styled.div`
  width : 400vw;
  display : flex;
`;

const TOTAL_SLIDE = 4;

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef("");

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDE - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    };
  }

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDE - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translate3d(-${currentSlide}00vw,0,0)`;
    return () => {
    };
  }, [currentSlide]);



  return (
    <Container>
      <SliderContainer currentSlide={currentSlide} ref={slideRef}>
        <Slide><h1>1</h1></Slide>
        <Slide><h1>2</h1></Slide>
        <Slide><h1>3</h1></Slide>
        <Slide><h1>4</h1></Slide>
      </SliderContainer>
      <button onClick={prevSlide} style={styles.prevBtn}><i className="fas fa-chevron-left"></i></button>
      <button onClick={nextSlide} style={styles.nextBtn}><i className="fas fa-chevron-right"></i></button>
    </Container>

  );
}

const styles = {
  prevBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    fontSize: "1.5rem",
    color: "white",
    backgroundColor: "#2f2f2f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "210px",
    left: "5%"
  },
  nextBtn: {
    width: "40px",
    height: "40px",
    border: "none",
    fontSize: "1.5rem",
    color: "white",
    backgroundColor: "#2f2f2f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "210px",
    right: "5%"
  }
}