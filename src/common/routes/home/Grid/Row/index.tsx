import React from 'react';

import { StyledRow } from './style';

interface IProps {
    color: string;
    size: number;
}

const Row = (props: IProps) => {

 const {color, size} = props;

  const classString = `cell-${size}  ${color}`;

  return (
    <StyledRow className={classString} />
  );
};

export default Row;
