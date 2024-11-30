import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;
  border-radius: 28px;
  background-image: linear-gradient(
    to right,
    rgba(31, 118, 146, 0.5),
    rgba(67, 56, 135, 0.5)
  );
  box-shadow: 5px 5px 10px #c1ced7, -5px -5px 10px #ffffff;
  height: 100%;
  max-height: 350px;
`;

const BoxDisplay = ({ width, children, aspect = "9 / 16" }) => {
  return (
    <StyledDiv
      style={
        width ? { width: width, aspectRatio: aspect } : { aspectRatio: aspect }
      }>
      {children}
    </StyledDiv>
  );
};

export default BoxDisplay;
