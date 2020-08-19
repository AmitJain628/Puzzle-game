import React from 'react';
import Selector from '@home/ColourSelectors/Selector';

import { StyledSelectors } from './style';

interface IProps {
  colors: {[id: number]: string};
  increaseSteps(): void;
  fillColor(colorIndex: number): void;
}

const ColourSelectors = (props: IProps) => {

  const {colors, fillColor, increaseSteps} = props;

  const selectors = Object.values(colors).map((color: string, index: number) => {
    return <Selector color={color} key={index} colorIndex={index} fillColor={fillColor} increaseSteps={increaseSteps} />;
  });

  return (
    <StyledSelectors>{selectors}</StyledSelectors>
  );
};

export default ColourSelectors;
