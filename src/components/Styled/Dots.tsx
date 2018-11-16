import React from 'react';
import styled, { keyframes } from 'styled-components';

const mengDot = keyframes`
  from { left: 0 }
  50% { left: 2em }
  to { left: 0 }
`;

const mengShadow = keyframes`
  from { opacity: 0.5 }
  70% { opacity: 0 }
  to { opacity: 0.2 }
`;

const DotsStyled = styled.span`
  font-size: 20px;
  display: block;
  width: 3em;
  position: relative;
  text-align: center;

  strong,
  :before,
  :after {
    display: inline-block;
    width: 1em;
    height: 1em;
    border-radius: 0.5em
  }

  strong {
    background-color: #000;
    opacity: 0.8;
    position: absolute;
    top: 0;
    z-index: 2
  }

  :before,
  :after  { content: ""; background-color: #222222; position: absolute; top: 0; z-index: 1 }
  :before { left: 0 }
  :after  { right: 0 }

  strong {
    animation-duration: 0.8s;
    animation-name: ${mengDot};
    animation-iteration-count: infinite;
  }

  :before, :after {
    animation-duration: 0.8s;
    animation-name: ${mengShadow};
    animation-iteration-count: infinite;
  }

  :after {
    animation-delay: 0.4s;
  }
`;

const Blocked = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dots = () => (
  <DotsStyled><strong/></DotsStyled>
);

export const BlockDots = () => (
  <Blocked><Dots/></Blocked>
);
