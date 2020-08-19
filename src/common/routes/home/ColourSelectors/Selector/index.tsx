import React from 'react';

import { StyledSelector } from './style';

interface IProps {
    color: string;
    colorIndex: number;
    increaseSteps(): void;
    fillColor(colorIndex: number): void;
  }

const Selector = (props: IProps) => {

    const {color, colorIndex, fillColor, increaseSteps} = props;

    const className = `${color} selector`;

    const selectedColor = () => {
      increaseSteps();
      fillColor(colorIndex);
    };

  return (
    <StyledSelector className={className} onClick={selectedColor} />
  );
};

export default Selector;
