export interface INodes {
  [id: number]: INode;
}

export interface IEdgeNodes {
  [index: number]: IEdge[];
}

export interface INode {
  id: number;
  color: number;
}

export interface IEdge {
  sourceId: number;
  distId: number;
  weight: number;
}
