import React, { useEffect, useState } from 'react';
import { calculateConnectedNode, createNodes, getEdgeWeights, updateColor } from '@home/utils';
import { IEdgeNodes, INodes } from '@home/types';
import AppConstant from '@src/common/constants/appConstants';
import ColourSelectors from '@home/ColourSelectors';
import Grid from '@home/Grid';

import { StyledGrid } from './styles';

const Home: React.FC = () => {
  const [nodes, setNodes] = useState<INodes>({});
  const [nodeEdges, setNodeEdges] = useState<IEdgeNodes>();
  const [stepsCount, setStepsCount] = useState<number>(0);
  const [suggestedColor, setSuggestedColor] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
     const initNodes = createNodes();
     const edgesByNode = getEdgeWeights(initNodes);
     setNodesState(initNodes, edgesByNode);
    }
  }, []);

  const setNodesState = (newNodes: INodes, newNodeEges: IEdgeNodes) => {
    setNodes(newNodes);
    setNodeEdges(newNodeEges);
    getSuggestedColor(newNodes, newNodeEges);
  };

  const increaseSteps = () => {
    setStepsCount(stepsCount + 1);
  };

  const getSuggestedColor = (newNodes: INodes, newNodeEges: IEdgeNodes) => {
        const colors = Object.keys(AppConstant.COLORS);
        let max = Number.MIN_SAFE_INTEGER;
        let color = -1;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < colors.length; i++) {
          const updatedNode: INodes = {...newNodes};
          const updatedNodeEges: IEdgeNodes = {...newNodeEges};
          updateColor(Number(colors[i]), updatedNode, updatedNodeEges);
          const colorCount = calculateConnectedNode(updatedNodeEges);
          if (colorCount > max) {
            max = colorCount;
            color = i;
          }
        }

        setSuggestedColor(color);
  };

  const fillColor = (colorIndex: number) => {
    const newNodes: INodes = {...nodes};
    const newNodeEges: IEdgeNodes = {...nodeEdges};
    updateColor(colorIndex, newNodes, newNodeEges);
    setNodesState(newNodes, newNodeEges);
  };

  return (
       <StyledGrid>
        <div className='header'>
          <div >
            <div className='score lead'>Number of moves: <span>{stepsCount}</span></div>
          </div>
        </div>
        <div>
            <div className='suggestion score'>Suggestion by Computer: <span>{AppConstant.COLORS[suggestedColor]}</span></div>
        </div>
         <ColourSelectors colors={AppConstant.COLORS} fillColor={fillColor} increaseSteps={increaseSteps} />
        <div>
          <Grid nodes={nodes}  />
        </div>
       </StyledGrid>
  );
};

export default Home;
