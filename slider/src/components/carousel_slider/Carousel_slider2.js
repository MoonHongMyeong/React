import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Slide = styled.div`
  width : 100vw;
  height : 345px;
  position : absolute;
  display:flex; 
  justify-content: center; 
  align-items: center; 
  z-index : -10;
  transition : all 0.5s ease-in-out;
  opacity : 0;
  

  &:nth-child(odd){
    background-color : #ff7675;
  }

  &:nth-child(even){
    background-color : #fab1a0;
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
export default function Carousel2() {
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

    if (currentSlide === 0) {
      slideRef.current.children[currentSlide].style = "display:flex; justify-content: center; align-items: center; transform : none; opacity :1;";
      slideRef.current.children[TOTAL_SLIDE - 1].style = "";
    } else {
      slideRef.current.children[currentSlide - 1].style = "";
      slideRef.current.children[currentSlide].style = "display:flex; justify-content: center; align-items: center; transform : none; opacity :1;";
    }

    return () => {

    }
  }, [currentSlide])

  return (
    <Container>
      <SliderContainer currentSlide={currentSlide} ref={slideRef}>
        <Slide><h1>1</h1></Slide>
        <Slide><h1>2</h1></Slide>
        <Slide><h1>3</h1></Slide>
        <Slide><h1>4</h1></Slide>
        {currentSlide}
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