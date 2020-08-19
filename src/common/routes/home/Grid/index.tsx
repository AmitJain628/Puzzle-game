import React from 'react';
import AppConstant from '@src/common/constants/appConstants';
import { INodes } from '@home/types';

import Row from './Row';
import { StyledGrid } from './style';

interface IProps {
    nodes: INodes;
}

const Grid = (props: IProps) => {
  const { nodes } = props;

  const rows = Object.keys(nodes).map(index => {
    return <Row key={index} color={AppConstant.COLORS[nodes[index].color]} size={AppConstant.SIZE} />;
  });

  return (
    <StyledGrid>
      {rows}
    </StyledGrid>
  );
};

export default Grid;
