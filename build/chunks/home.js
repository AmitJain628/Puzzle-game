require("source-map-support").install();
exports.ids = ["home"];
exports.modules = {

/***/ "./src/common/constants/appConstants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  SIZE: 12,
  COLORS: {
    0: 'green',
    1: 'blue',
    2: 'yellow',
    3: 'orange',
    4: 'red'
  }
});

/***/ }),

/***/ "./src/common/routes/home/ColourSelectors/Selector/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/ColourSelectors/Selector/style.ts");
var _jsxFileName = "/Users/amitjain/Test-project/src/common/routes/home/ColourSelectors/Selector/index.tsx";



const Selector = props => {
  const {
    color,
    colorIndex,
    fillColor,
    increaseSteps
  } = props;
  const className = `${color} selector`;

  const selectedColor = () => {
    increaseSteps();
    fillColor(colorIndex);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_1__["StyledSelector"], {
    className: className,
    onClick: selectedColor,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Selector);

/***/ }),

/***/ "./src/common/routes/home/ColourSelectors/Selector/style.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledSelector", function() { return StyledSelector; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledSelector = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "style__StyledSelector",
  componentId: "sc-1r55cad-0"
})([""]);

/***/ }),

/***/ "./src/common/routes/home/ColourSelectors/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_ColourSelectors_Selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/ColourSelectors/Selector/index.tsx");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/routes/home/ColourSelectors/style.ts");
var _jsxFileName = "/Users/amitjain/Test-project/src/common/routes/home/ColourSelectors/index.tsx";




const ColourSelectors = props => {
  const {
    colors,
    fillColor,
    increaseSteps
  } = props;
  const selectors = Object.values(colors).map((color, index) => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_home_ColourSelectors_Selector__WEBPACK_IMPORTED_MODULE_1__["default"], {
      color: color,
      key: index,
      colorIndex: index,
      fillColor: fillColor,
      increaseSteps: increaseSteps,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: undefined
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_2__["StyledSelectors"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, selectors);
};

/* harmony default export */ __webpack_exports__["default"] = (ColourSelectors);

/***/ }),

/***/ "./src/common/routes/home/ColourSelectors/style.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledSelectors", function() { return StyledSelectors; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledSelectors = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "style__StyledSelectors",
  componentId: "sc-14zti27-0"
})(["display:flex;width:50%;justify-content:center;padding:0px;padding-bottom:10px;margin-right:0px;cursor:pointer;margin:auto;.selector{margin-left:5px;margin-right:5px;border-radius:50px;min-width:50px;min-height:50px;}"]);

/***/ }),

/***/ "./src/common/routes/home/Grid/Row/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/Grid/Row/style.ts");
var _jsxFileName = "/Users/amitjain/Test-project/src/common/routes/home/Grid/Row/index.tsx";



const Row = props => {
  const {
    color,
    size
  } = props;
  const classString = `cell-${size}  ${color}`;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_1__["StyledRow"], {
    className: classString,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: undefined
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Row);

/***/ }),

/***/ "./src/common/routes/home/Grid/Row/style.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledRow", function() { return StyledRow; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledRow = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "style__StyledRow",
  componentId: "sc-1uk2ngq-0"
})([""]);

/***/ }),

/***/ "./src/common/routes/home/Grid/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/constants/appConstants.ts");
/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/routes/home/Grid/Row/index.tsx");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/routes/home/Grid/style.ts");
var _jsxFileName = "/Users/amitjain/Test-project/src/common/routes/home/Grid/index.tsx";





const Grid = props => {
  const {
    nodes
  } = props;
  const rows = Object.keys(nodes).map(index => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: index,
      color: _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_1__["default"].COLORS[nodes[index].color],
      size: _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_1__["default"].SIZE,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: undefined
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_style__WEBPACK_IMPORTED_MODULE_3__["StyledGrid"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, rows);
};

/* harmony default export */ __webpack_exports__["default"] = (Grid);

/***/ }),

/***/ "./src/common/routes/home/Grid/style.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledGrid", function() { return StyledGrid; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledGrid = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "style__StyledGrid",
  componentId: "grvkkx-0"
})(["display:flex;flex-wrap:wrap;min-width:360px;max-width:80vh;height:100vw;min-height:360px;max-height:80vh;border:1px solid #dee2e6 !important;border-color:#343a40 !important;margin:auto;.cell-3{width:33.33%;}.cell-4{width:25%;}.cell-5{width:20%;}.cell-6{width:16.66%;}.cell-7{width:14.28%;}.cell-8{width:12.5%;}.cell-9{width:11.11%;}.cell-10{width:10%;}.cell-11{width:9.09%;}.cell-12{width:8.33%;}"]);

/***/ }),

/***/ "./src/common/routes/home/index.tsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/common/routes/home/utils/index.ts");
/* harmony import */ var _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/common/constants/appConstants.ts");
/* harmony import */ var _home_ColourSelectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/common/routes/home/ColourSelectors/index.tsx");
/* harmony import */ var _home_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/common/routes/home/Grid/index.tsx");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/common/routes/home/styles.ts");
var _jsxFileName = "/Users/amitjain/Test-project/src/common/routes/home/index.tsx";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Home = () => {
  const [nodes, setNodes] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [nodeEdges, setNodeEdges] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [stepsCount, setStepsCount] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [suggestedColor, setSuggestedColor] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (typeof window !== 'undefined') {
      const initNodes = Object(_home_utils__WEBPACK_IMPORTED_MODULE_1__["createNodes"])();
      const edgesByNode = Object(_home_utils__WEBPACK_IMPORTED_MODULE_1__["getEdgeWeights"])(initNodes);
      setNodesState(initNodes, edgesByNode);
    }
  }, []);

  const setNodesState = (newNodes, newNodeEges) => {
    setNodes(newNodes);
    setNodeEdges(newNodeEges);
    getSuggestedColor(newNodes, newNodeEges);
  };

  const increaseSteps = () => {
    setStepsCount(stepsCount + 1);
  };

  const getSuggestedColor = (newNodes, newNodeEges) => {
    const colors = Object.keys(_src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_2__["default"].COLORS);
    let max = Number.MIN_SAFE_INTEGER;
    let color = -1; // tslint:disable-next-line:prefer-for-of

    for (let i = 0; i < colors.length; i++) {
      const updatedNode = _objectSpread({}, newNodes);

      const updatedNodeEges = _objectSpread({}, newNodeEges);

      Object(_home_utils__WEBPACK_IMPORTED_MODULE_1__["updateColor"])(Number(colors[i]), updatedNode, updatedNodeEges);
      const colorCount = Object(_home_utils__WEBPACK_IMPORTED_MODULE_1__["calculateConnectedNode"])(updatedNodeEges);

      if (colorCount > max) {
        max = colorCount;
        color = i;
      }
    }

    setSuggestedColor(color);
  };

  const fillColor = colorIndex => {
    const newNodes = _objectSpread({}, nodes);

    const newNodeEges = _objectSpread({}, nodeEdges);

    Object(_home_utils__WEBPACK_IMPORTED_MODULE_1__["updateColor"])(colorIndex, newNodes, newNodeEges);
    setNodesState(newNodes, newNodeEges);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles__WEBPACK_IMPORTED_MODULE_5__["StyledGrid"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "score lead",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: undefined
  }, "Number of moves: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: undefined
  }, stepsCount)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "suggestion score",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: undefined
  }, "Suggestion by Computer: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: undefined
  }, _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_2__["default"].COLORS[suggestedColor]))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_home_ColourSelectors__WEBPACK_IMPORTED_MODULE_3__["default"], {
    colors: _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_2__["default"].COLORS,
    fillColor: fillColor,
    increaseSteps: increaseSteps,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_home_Grid__WEBPACK_IMPORTED_MODULE_4__["default"], {
    nodes: nodes,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/common/routes/home/styles.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledGrid", function() { return StyledGrid; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const StyledGrid = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({
  displayName: "styles__StyledGrid",
  componentId: "sc-1q1frcn-0"
})([".header{margin-top:10px;display:flex;align-items:center;justify-content:center;min-width:360px;}.btn-primary{background-color:#2ecd71 !important;border-color:#2ecd71 !important;}.score{font-size:18px;font-weight:bold;color:black;}.suggestion{display:flex;align-items:center;justify-content:center;margin-top:20px;margin-bottom:20px;}.count{padding:2px;font-size:10pt;border-width:1px;border-style:solid;background-color:#23221c;color:#686964;}.border{border:1px solid #dee2e6 !important;}.border-dark{border-color:#343a40 !important;}.count span{text-align:center;font-size:16pt;display:block;}.newgame{white-space:nowrap;margin-right:10px;padding:5px;background:linear-gradient(to bottom,#e0e0e0,#b0b0b0);cursor:pointer;margin:0;}"]);

/***/ }),

/***/ "./src/common/routes/home/utils/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIndex", function() { return getRandomIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sameColor", function() { return sameColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNodes", function() { return createNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEdgeWeight", function() { return setEdgeWeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEdgeWeights", function() { return getEdgeWeights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateColor", function() { return updateColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateConnectedNode", function() { return calculateConnectedNode; });
/* harmony import */ var _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/common/constants/appConstants.ts");

const getRandomIndex = () => {
  let index = 0;

  for (let iCtr = 1, max = Object.keys(_src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].COLORS).length; iCtr < max; iCtr++) {
    if (Math.random() < 1 / (iCtr + 1)) {
      index = iCtr;
    }
  }

  return index;
};
const sameColor = (nodeAId, nodeBId, nodes) => {
  return nodes[nodeAId].color === nodes[nodeBId].color;
};
const createNodes = () => {
  const nodes = {};
  const totalSize = _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE * _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE;

  for (let i = 0; i < totalSize; i++) {
    const node = {
      id: i,
      color: getRandomIndex()
    };
    nodes[i] = node;
  }

  return nodes;
};
const setEdgeWeight = (id, nodes, edgesByNode) => {
  const node = nodes[id];
  const nodeId = node.id;
  const edges = [];
  const topIndex = nodeId - _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE;
  const rightIndex = nodeId + 1;
  const bottomIndex = nodeId + _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE;
  const leftIndex = nodeId - 1;

  if (topIndex >= 0) {
    const w = sameColor(nodeId, topIndex, nodes) ? 0 : 1;
    edges.push({
      sourceId: nodeId,
      distId: topIndex,
      weight: w
    });
  }

  if (rightIndex % _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE > 0) {
    const w = sameColor(nodeId, rightIndex, nodes) ? 0 : 1;
    edges.push({
      sourceId: nodeId,
      distId: rightIndex,
      weight: w
    });
  }

  if (bottomIndex < _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE * _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE) {
    const w = sameColor(nodeId, bottomIndex, nodes) ? 0 : 1;
    edges.push({
      sourceId: nodeId,
      distId: bottomIndex,
      weight: w
    });
  }

  if (nodeId % _src_common_constants_appConstants__WEBPACK_IMPORTED_MODULE_0__["default"].SIZE !== 0) {
    const w = sameColor(nodeId, leftIndex, nodes) ? 0 : 1;
    edges.push({
      sourceId: nodeId,
      distId: leftIndex,
      weight: w
    });
  }

  edgesByNode[nodeId] = edges;
};
const getEdgeWeights = nodes => {
  const edgesByNode = {};
  Object.keys(nodes).forEach(id => {
    setEdgeWeight(Number(id), nodes, edgesByNode);
  });
  return edgesByNode;
};
const updateColor = (colorIndex, newNodes, newNodeEges) => {
  const seenIds = [];
  const processing = [0];
  const updateEdgeWeights = [];

  while (processing.length > 0) {
    const currentNodeId = processing.pop();

    if (typeof currentNodeId !== 'undefined') {
      const newNode = {
        id: currentNodeId,
        color: colorIndex
      };
      newNodes[currentNodeId] = newNode;
      updateEdgeWeights.push(currentNodeId);
      seenIds.push(currentNodeId);
      newNodeEges[currentNodeId].forEach(edge => {
        if (updateEdgeWeights.indexOf(edge.distId) !== -1) {
          updateEdgeWeights.push(edge.distId);
        }

        if (seenIds.indexOf(edge.distId) > -1) {
          return;
        }

        if (edge.weight === 0) {
          processing.push(edge.distId);
        }
      });
    }
  }

  updateEdgeWeights.forEach(nodeId => setEdgeWeight(nodeId, newNodes, newNodeEges));
};
const calculateConnectedNode = newNodeEges => {
  const processing = [0];
  let count = 1;
  const seenIds = [];

  while (processing.length > 0) {
    const currentNodeId = processing.pop();

    if (typeof currentNodeId !== 'undefined') {
      seenIds.push(currentNodeId);
      newNodeEges[currentNodeId].forEach(edge => {
        if (seenIds.indexOf(edge.distId) > -1) {
          return;
        }

        if (edge.weight === 0) {
          processing.push(edge.distId);
          count++;
        }
      });
    }
  }

  return count;
};

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2hvbWUuanMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9jb25zdGFudHMvYXBwQ29uc3RhbnRzLnRzIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvY29tbW9uL3JvdXRlcy9ob21lL0NvbG91clNlbGVjdG9ycy9TZWxlY3Rvci9pbmRleC50c3giLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcm91dGVzL2hvbWUvQ29sb3VyU2VsZWN0b3JzL1NlbGVjdG9yL3N0eWxlLnRzIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvY29tbW9uL3JvdXRlcy9ob21lL0NvbG91clNlbGVjdG9ycy9pbmRleC50c3giLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcm91dGVzL2hvbWUvQ29sb3VyU2VsZWN0b3JzL3N0eWxlLnRzIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvY29tbW9uL3JvdXRlcy9ob21lL0dyaWQvUm93L2luZGV4LnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9HcmlkL1Jvdy9zdHlsZS50cyIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9HcmlkL2luZGV4LnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9HcmlkL3N0eWxlLnRzIiwiL1VzZXJzL2FtaXRqYWluL1Rlc3QtcHJvamVjdC9zcmMvY29tbW9uL3JvdXRlcy9ob21lL2luZGV4LnRzeCIsIi9Vc2Vycy9hbWl0amFpbi9UZXN0LXByb2plY3Qvc3JjL2NvbW1vbi9yb3V0ZXMvaG9tZS9zdHlsZXMudHMiLCIvVXNlcnMvYW1pdGphaW4vVGVzdC1wcm9qZWN0L3NyYy9jb21tb24vcm91dGVzL2hvbWUvdXRpbHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBTSVpFOiAxMixcbiAgQ09MT1JTOiB7XG4gICAgMDogJ2dyZWVuJyxcbiAgICAxOiAnYmx1ZScsXG4gICAgMjogJ3llbGxvdycsXG4gICAgMzogJ29yYW5nZScsXG4gICAgNDogJ3JlZCcsXG4gIH0sXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgU3R5bGVkU2VsZWN0b3IgfSBmcm9tICcuL3N0eWxlJztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBjb2xvckluZGV4OiBudW1iZXI7XG4gICAgaW5jcmVhc2VTdGVwcygpOiB2b2lkO1xuICAgIGZpbGxDb2xvcihjb2xvckluZGV4OiBudW1iZXIpOiB2b2lkO1xuICB9XG5cbmNvbnN0IFNlbGVjdG9yID0gKHByb3BzOiBJUHJvcHMpID0+IHtcblxuICAgIGNvbnN0IHtjb2xvciwgY29sb3JJbmRleCwgZmlsbENvbG9yLCBpbmNyZWFzZVN0ZXBzfSA9IHByb3BzO1xuXG4gICAgY29uc3QgY2xhc3NOYW1lID0gYCR7Y29sb3J9IHNlbGVjdG9yYDtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ29sb3IgPSAoKSA9PiB7XG4gICAgICBpbmNyZWFzZVN0ZXBzKCk7XG4gICAgICBmaWxsQ29sb3IoY29sb3JJbmRleCk7XG4gICAgfTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRTZWxlY3RvciBjbGFzc05hbWU9e2NsYXNzTmFtZX0gb25DbGljaz17c2VsZWN0ZWRDb2xvcn0gLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdG9yO1xuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRTZWxlY3RvciA9IHN0eWxlZC5kaXZgYDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0b3IgZnJvbSAnQGhvbWUvQ29sb3VyU2VsZWN0b3JzL1NlbGVjdG9yJztcblxuaW1wb3J0IHsgU3R5bGVkU2VsZWN0b3JzIH0gZnJvbSAnLi9zdHlsZSc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICBjb2xvcnM6IHtbaWQ6IG51bWJlcl06IHN0cmluZ307XG4gIGluY3JlYXNlU3RlcHMoKTogdm9pZDtcbiAgZmlsbENvbG9yKGNvbG9ySW5kZXg6IG51bWJlcik6IHZvaWQ7XG59XG5cbmNvbnN0IENvbG91clNlbGVjdG9ycyA9IChwcm9wczogSVByb3BzKSA9PiB7XG5cbiAgY29uc3Qge2NvbG9ycywgZmlsbENvbG9yLCBpbmNyZWFzZVN0ZXBzfSA9IHByb3BzO1xuXG4gIGNvbnN0IHNlbGVjdG9ycyA9IE9iamVjdC52YWx1ZXMoY29sb3JzKS5tYXAoKGNvbG9yOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gPFNlbGVjdG9yIGNvbG9yPXtjb2xvcn0ga2V5PXtpbmRleH0gY29sb3JJbmRleD17aW5kZXh9IGZpbGxDb2xvcj17ZmlsbENvbG9yfSBpbmNyZWFzZVN0ZXBzPXtpbmNyZWFzZVN0ZXBzfSAvPjtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkU2VsZWN0b3JzPntzZWxlY3RvcnN9PC9TdHlsZWRTZWxlY3RvcnM+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xvdXJTZWxlY3RvcnM7XG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFNlbGVjdG9ycyA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiA1MCU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiAwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW46IGF1dG87XG4gIC5zZWxlY3RvciB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xuICAgIG1pbi13aWR0aDogNTBweDtcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xuICB9XG5gO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgU3R5bGVkUm93IH0gZnJvbSAnLi9zdHlsZSc7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xufVxuXG5jb25zdCBSb3cgPSAocHJvcHM6IElQcm9wcykgPT4ge1xuXG4gY29uc3Qge2NvbG9yLCBzaXplfSA9IHByb3BzO1xuXG4gIGNvbnN0IGNsYXNzU3RyaW5nID0gYGNlbGwtJHtzaXplfSAgJHtjb2xvcn1gO1xuXG4gIHJldHVybiAoXG4gICAgPFN0eWxlZFJvdyBjbGFzc05hbWU9e2NsYXNzU3RyaW5nfSAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUm93O1xuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRSb3cgPSBzdHlsZWQuZGl2YGA7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFwcENvbnN0YW50IGZyb20gJ0BzcmMvY29tbW9uL2NvbnN0YW50cy9hcHBDb25zdGFudHMnO1xuaW1wb3J0IHsgSU5vZGVzIH0gZnJvbSAnQGhvbWUvdHlwZXMnO1xuXG5pbXBvcnQgUm93IGZyb20gJy4vUm93JztcbmltcG9ydCB7IFN0eWxlZEdyaWQgfSBmcm9tICcuL3N0eWxlJztcblxuaW50ZXJmYWNlIElQcm9wcyB7XG4gICAgbm9kZXM6IElOb2Rlcztcbn1cblxuY29uc3QgR3JpZCA9IChwcm9wczogSVByb3BzKSA9PiB7XG4gIGNvbnN0IHsgbm9kZXMgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHJvd3MgPSBPYmplY3Qua2V5cyhub2RlcykubWFwKGluZGV4ID0+IHtcbiAgICByZXR1cm4gPFJvdyBrZXk9e2luZGV4fSBjb2xvcj17QXBwQ29uc3RhbnQuQ09MT1JTW25vZGVzW2luZGV4XS5jb2xvcl19IHNpemU9e0FwcENvbnN0YW50LlNJWkV9IC8+O1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRHcmlkPlxuICAgICAge3Jvd3N9XG4gICAgPC9TdHlsZWRHcmlkPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3JpZDtcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkR3JpZCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWluLXdpZHRoOiAzNjBweDtcbiAgbWF4LXdpZHRoOiA4MHZoO1xuICBoZWlnaHQ6IDEwMHZ3O1xuICBtaW4taGVpZ2h0OiAzNjBweDtcbiAgbWF4LWhlaWdodDogODB2aDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RlZTJlNiAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICMzNDNhNDAgIWltcG9ydGFudDtcbiAgbWFyZ2luOiBhdXRvO1xuICAuY2VsbC0zIHtcbiAgICB3aWR0aDogMzMuMzMlO1xuICB9XG4gIC5jZWxsLTQge1xuICAgIHdpZHRoOiAyNSU7XG4gIH1cbiAgLmNlbGwtNSB7XG4gICAgd2lkdGg6IDIwJTtcbiAgfVxuICAuY2VsbC02IHtcbiAgICB3aWR0aDogMTYuNjYlO1xuICB9XG4gIC5jZWxsLTcge1xuICAgIHdpZHRoOiAxNC4yOCU7XG4gIH1cbiAgLmNlbGwtOCB7XG4gICAgd2lkdGg6IDEyLjUlO1xuICB9XG4gIC5jZWxsLTkge1xuICAgIHdpZHRoOiAxMS4xMSU7XG4gIH1cbiAgLmNlbGwtMTAge1xuICAgIHdpZHRoOiAxMCU7XG4gIH1cbiAgLmNlbGwtMTEge1xuICAgIHdpZHRoOiA5LjA5JTtcbiAgfVxuICAuY2VsbC0xMiB7XG4gICAgd2lkdGg6IDguMzMlO1xuICB9XG5gO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVDb25uZWN0ZWROb2RlLCBjcmVhdGVOb2RlcywgZ2V0RWRnZVdlaWdodHMsIHVwZGF0ZUNvbG9yIH0gZnJvbSAnQGhvbWUvdXRpbHMnO1xuaW1wb3J0IHsgSUVkZ2VOb2RlcywgSU5vZGVzIH0gZnJvbSAnQGhvbWUvdHlwZXMnO1xuaW1wb3J0IEFwcENvbnN0YW50IGZyb20gJ0BzcmMvY29tbW9uL2NvbnN0YW50cy9hcHBDb25zdGFudHMnO1xuaW1wb3J0IENvbG91clNlbGVjdG9ycyBmcm9tICdAaG9tZS9Db2xvdXJTZWxlY3RvcnMnO1xuaW1wb3J0IEdyaWQgZnJvbSAnQGhvbWUvR3JpZCc7XG5cbmltcG9ydCB7IFN0eWxlZEdyaWQgfSBmcm9tICcuL3N0eWxlcyc7XG5cbmNvbnN0IEhvbWU6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbbm9kZXMsIHNldE5vZGVzXSA9IHVzZVN0YXRlPElOb2Rlcz4oe30pO1xuICBjb25zdCBbbm9kZUVkZ2VzLCBzZXROb2RlRWRnZXNdID0gdXNlU3RhdGU8SUVkZ2VOb2Rlcz4oKTtcbiAgY29uc3QgW3N0ZXBzQ291bnQsIHNldFN0ZXBzQ291bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW3N1Z2dlc3RlZENvbG9yLCBzZXRTdWdnZXN0ZWRDb2xvcl0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgIGNvbnN0IGluaXROb2RlcyA9IGNyZWF0ZU5vZGVzKCk7XG4gICAgIGNvbnN0IGVkZ2VzQnlOb2RlID0gZ2V0RWRnZVdlaWdodHMoaW5pdE5vZGVzKTtcbiAgICAgc2V0Tm9kZXNTdGF0ZShpbml0Tm9kZXMsIGVkZ2VzQnlOb2RlKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZXROb2Rlc1N0YXRlID0gKG5ld05vZGVzOiBJTm9kZXMsIG5ld05vZGVFZ2VzOiBJRWRnZU5vZGVzKSA9PiB7XG4gICAgc2V0Tm9kZXMobmV3Tm9kZXMpO1xuICAgIHNldE5vZGVFZGdlcyhuZXdOb2RlRWdlcyk7XG4gICAgZ2V0U3VnZ2VzdGVkQ29sb3IobmV3Tm9kZXMsIG5ld05vZGVFZ2VzKTtcbiAgfTtcblxuICBjb25zdCBpbmNyZWFzZVN0ZXBzID0gKCkgPT4ge1xuICAgIHNldFN0ZXBzQ291bnQoc3RlcHNDb3VudCArIDEpO1xuICB9O1xuXG4gIGNvbnN0IGdldFN1Z2dlc3RlZENvbG9yID0gKG5ld05vZGVzOiBJTm9kZXMsIG5ld05vZGVFZ2VzOiBJRWRnZU5vZGVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IE9iamVjdC5rZXlzKEFwcENvbnN0YW50LkNPTE9SUyk7XG4gICAgICAgIGxldCBtYXggPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcbiAgICAgICAgbGV0IGNvbG9yID0gLTE7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZE5vZGU6IElOb2RlcyA9IHsuLi5uZXdOb2Rlc307XG4gICAgICAgICAgY29uc3QgdXBkYXRlZE5vZGVFZ2VzOiBJRWRnZU5vZGVzID0gey4uLm5ld05vZGVFZ2VzfTtcbiAgICAgICAgICB1cGRhdGVDb2xvcihOdW1iZXIoY29sb3JzW2ldKSwgdXBkYXRlZE5vZGUsIHVwZGF0ZWROb2RlRWdlcyk7XG4gICAgICAgICAgY29uc3QgY29sb3JDb3VudCA9IGNhbGN1bGF0ZUNvbm5lY3RlZE5vZGUodXBkYXRlZE5vZGVFZ2VzKTtcbiAgICAgICAgICBpZiAoY29sb3JDb3VudCA+IG1heCkge1xuICAgICAgICAgICAgbWF4ID0gY29sb3JDb3VudDtcbiAgICAgICAgICAgIGNvbG9yID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdWdnZXN0ZWRDb2xvcihjb2xvcik7XG4gIH07XG5cbiAgY29uc3QgZmlsbENvbG9yID0gKGNvbG9ySW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IG5ld05vZGVzOiBJTm9kZXMgPSB7Li4ubm9kZXN9O1xuICAgIGNvbnN0IG5ld05vZGVFZ2VzOiBJRWRnZU5vZGVzID0gey4uLm5vZGVFZGdlc307XG4gICAgdXBkYXRlQ29sb3IoY29sb3JJbmRleCwgbmV3Tm9kZXMsIG5ld05vZGVFZ2VzKTtcbiAgICBzZXROb2Rlc1N0YXRlKG5ld05vZGVzLCBuZXdOb2RlRWdlcyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICAgICA8U3R5bGVkR3JpZD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2hlYWRlcic+XG4gICAgICAgICAgPGRpdiA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2NvcmUgbGVhZCc+TnVtYmVyIG9mIG1vdmVzOiA8c3Bhbj57c3RlcHNDb3VudH08L3NwYW4+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Z2dlc3Rpb24gc2NvcmUnPlN1Z2dlc3Rpb24gYnkgQ29tcHV0ZXI6IDxzcGFuPntBcHBDb25zdGFudC5DT0xPUlNbc3VnZ2VzdGVkQ29sb3JdfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICA8Q29sb3VyU2VsZWN0b3JzIGNvbG9ycz17QXBwQ29uc3RhbnQuQ09MT1JTfSBmaWxsQ29sb3I9e2ZpbGxDb2xvcn0gaW5jcmVhc2VTdGVwcz17aW5jcmVhc2VTdGVwc30gLz5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8R3JpZCBub2Rlcz17bm9kZXN9ICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICA8L1N0eWxlZEdyaWQ+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRHcmlkID0gc3R5bGVkLmRpdmBcbiAgLmhlYWRlciB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWluLXdpZHRoOiAzNjBweDtcbiAgfVxuXG4gIC5idG4tcHJpbWFyeSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJlY2Q3MSAhaW1wb3J0YW50O1xuICAgIGJvcmRlci1jb2xvcjogIzJlY2Q3MSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnNjb3JlIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6IGJsYWNrO1xuICB9XG5cbiAgLnN1Z2dlc3Rpb24ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cblxuICAuY291bnQge1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBmb250LXNpemU6IDEwcHQ7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjMyMjFjO1xuICAgIGNvbG9yOiAjNjg2OTY0O1xuICB9XG5cbiAgLmJvcmRlciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RlZTJlNiAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmJvcmRlci1kYXJrIHtcbiAgICBib3JkZXItY29sb3I6ICMzNDNhNDAgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5jb3VudCBzcGFuIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxNnB0O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIC5uZXdnYW1lIHtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICBwYWRkaW5nOiA1cHg7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2UwZTBlMCwgI2IwYjBiMCk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuYDtcbiIsImltcG9ydCBBcHBDb25zdGFudCBmcm9tICdAc3JjL2NvbW1vbi9jb25zdGFudHMvYXBwQ29uc3RhbnRzJztcbmltcG9ydCB7IElFZGdlLCBJRWRnZU5vZGVzLCBJTm9kZSwgSU5vZGVzIH0gZnJvbSAnQGhvbWUvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tSW5kZXggPSAoKTogbnVtYmVyID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcblxuICBmb3IgKFxuICAgIGxldCBpQ3RyID0gMSwgbWF4ID0gT2JqZWN0LmtleXMoQXBwQ29uc3RhbnQuQ09MT1JTKS5sZW5ndGg7XG4gICAgaUN0ciA8IG1heDtcbiAgICBpQ3RyKytcbiAgKSB7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCAxIC8gKGlDdHIgKyAxKSkge1xuICAgICAgaW5kZXggPSBpQ3RyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn07XG5cbmV4cG9ydCBjb25zdCBzYW1lQ29sb3IgPSAobm9kZUFJZDogbnVtYmVyLCBub2RlQklkOiBudW1iZXIsIG5vZGVzOiBJTm9kZXMpID0+IHtcbiAgcmV0dXJuIG5vZGVzW25vZGVBSWRdLmNvbG9yID09PSBub2Rlc1tub2RlQklkXS5jb2xvcjtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlcyA9ICgpID0+IHtcbiAgY29uc3Qgbm9kZXM6IElOb2RlcyA9IHt9O1xuICBjb25zdCB0b3RhbFNpemUgPSBBcHBDb25zdGFudC5TSVpFICogQXBwQ29uc3RhbnQuU0laRTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsU2l6ZTsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZTogSU5vZGUgPSB7XG4gICAgICBpZDogaSxcbiAgICAgIGNvbG9yOiBnZXRSYW5kb21JbmRleCgpLFxuICAgIH07XG4gICAgbm9kZXNbaV0gPSBub2RlO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldEVkZ2VXZWlnaHQgPSAoXG4gIGlkOiBudW1iZXIsXG4gIG5vZGVzOiBJTm9kZXMsXG4gIGVkZ2VzQnlOb2RlOiBJRWRnZU5vZGVzXG4pID0+IHtcbiAgY29uc3Qgbm9kZSA9IG5vZGVzW2lkXTtcbiAgY29uc3Qgbm9kZUlkID0gbm9kZS5pZDtcbiAgY29uc3QgZWRnZXM6IElFZGdlW10gPSBbXTtcblxuICBjb25zdCB0b3BJbmRleCA9IG5vZGVJZCAtIEFwcENvbnN0YW50LlNJWkU7XG4gIGNvbnN0IHJpZ2h0SW5kZXggPSBub2RlSWQgKyAxO1xuICBjb25zdCBib3R0b21JbmRleCA9IG5vZGVJZCArIEFwcENvbnN0YW50LlNJWkU7XG4gIGNvbnN0IGxlZnRJbmRleCA9IG5vZGVJZCAtIDE7XG5cbiAgaWYgKHRvcEluZGV4ID49IDApIHtcbiAgICBjb25zdCB3ID0gc2FtZUNvbG9yKG5vZGVJZCwgdG9wSW5kZXgsIG5vZGVzKSA/IDAgOiAxO1xuICAgIGVkZ2VzLnB1c2goeyBzb3VyY2VJZDogbm9kZUlkLCBkaXN0SWQ6IHRvcEluZGV4LCB3ZWlnaHQ6IHcgfSk7XG4gIH1cblxuICBpZiAocmlnaHRJbmRleCAlIEFwcENvbnN0YW50LlNJWkUgPiAwKSB7XG4gICAgY29uc3QgdyA9IHNhbWVDb2xvcihub2RlSWQsIHJpZ2h0SW5kZXgsIG5vZGVzKSA/IDAgOiAxO1xuICAgIGVkZ2VzLnB1c2goeyBzb3VyY2VJZDogbm9kZUlkLCBkaXN0SWQ6IHJpZ2h0SW5kZXgsIHdlaWdodDogdyB9KTtcbiAgfVxuXG4gIGlmIChib3R0b21JbmRleCA8IEFwcENvbnN0YW50LlNJWkUgKiBBcHBDb25zdGFudC5TSVpFKSB7XG4gICAgY29uc3QgdyA9IHNhbWVDb2xvcihub2RlSWQsIGJvdHRvbUluZGV4LCBub2RlcykgPyAwIDogMTtcbiAgICBlZGdlcy5wdXNoKHsgc291cmNlSWQ6IG5vZGVJZCwgZGlzdElkOiBib3R0b21JbmRleCwgd2VpZ2h0OiB3IH0pO1xuICB9XG5cbiAgaWYgKG5vZGVJZCAlIEFwcENvbnN0YW50LlNJWkUgIT09IDApIHtcbiAgICBjb25zdCB3ID0gc2FtZUNvbG9yKG5vZGVJZCwgbGVmdEluZGV4LCBub2RlcykgPyAwIDogMTtcbiAgICBlZGdlcy5wdXNoKHsgc291cmNlSWQ6IG5vZGVJZCwgZGlzdElkOiBsZWZ0SW5kZXgsIHdlaWdodDogdyB9KTtcbiAgfVxuXG4gIGVkZ2VzQnlOb2RlW25vZGVJZF0gPSBlZGdlcztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRFZGdlV2VpZ2h0cyA9IChub2RlczogSU5vZGVzKTogSUVkZ2VOb2RlcyA9PiB7XG4gIGNvbnN0IGVkZ2VzQnlOb2RlOiBJRWRnZU5vZGVzID0ge307XG4gIE9iamVjdC5rZXlzKG5vZGVzKS5mb3JFYWNoKGlkID0+IHtcbiAgICBzZXRFZGdlV2VpZ2h0KE51bWJlcihpZCksIG5vZGVzLCBlZGdlc0J5Tm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBlZGdlc0J5Tm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVDb2xvciA9IChcbiAgY29sb3JJbmRleDogbnVtYmVyLFxuICBuZXdOb2RlczogSU5vZGVzLFxuICBuZXdOb2RlRWdlczogSUVkZ2VOb2Rlc1xuKSA9PiB7XG4gIGNvbnN0IHNlZW5JZHM6IG51bWJlcltdID0gW107XG4gIGNvbnN0IHByb2Nlc3NpbmcgPSBbMF07XG4gIGNvbnN0IHVwZGF0ZUVkZ2VXZWlnaHRzOiBudW1iZXJbXSA9IFtdO1xuICB3aGlsZSAocHJvY2Vzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgY3VycmVudE5vZGVJZCA9IHByb2Nlc3NpbmcucG9wKCk7XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50Tm9kZUlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgbmV3Tm9kZSA9IHsgaWQ6IGN1cnJlbnROb2RlSWQsIGNvbG9yOiBjb2xvckluZGV4IH07XG4gICAgICBuZXdOb2Rlc1tjdXJyZW50Tm9kZUlkXSA9IG5ld05vZGU7XG4gICAgICB1cGRhdGVFZGdlV2VpZ2h0cy5wdXNoKGN1cnJlbnROb2RlSWQpO1xuICAgICAgc2Vlbklkcy5wdXNoKGN1cnJlbnROb2RlSWQpO1xuICAgICAgbmV3Tm9kZUVnZXNbY3VycmVudE5vZGVJZF0uZm9yRWFjaCgoZWRnZTogSUVkZ2UpID0+IHtcbiAgICAgICAgaWYgKHVwZGF0ZUVkZ2VXZWlnaHRzLmluZGV4T2YoZWRnZS5kaXN0SWQpICE9PSAtMSkge1xuICAgICAgICAgIHVwZGF0ZUVkZ2VXZWlnaHRzLnB1c2goZWRnZS5kaXN0SWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWVuSWRzLmluZGV4T2YoZWRnZS5kaXN0SWQpID4gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkZ2Uud2VpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgcHJvY2Vzc2luZy5wdXNoKGVkZ2UuZGlzdElkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZUVkZ2VXZWlnaHRzLmZvckVhY2goKG5vZGVJZDogbnVtYmVyKSA9PlxuICAgIHNldEVkZ2VXZWlnaHQobm9kZUlkLCBuZXdOb2RlcywgbmV3Tm9kZUVnZXMpXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlQ29ubmVjdGVkTm9kZSA9IChuZXdOb2RlRWdlczogSUVkZ2VOb2Rlcyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IHByb2Nlc3NpbmcgPSBbMF07XG4gIGxldCBjb3VudCA9IDE7XG4gIGNvbnN0IHNlZW5JZHM6IG51bWJlcltdID0gW107XG4gIHdoaWxlIChwcm9jZXNzaW5nLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBjdXJyZW50Tm9kZUlkID0gcHJvY2Vzc2luZy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIGN1cnJlbnROb2RlSWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBzZWVuSWRzLnB1c2goY3VycmVudE5vZGVJZCk7XG4gICAgICBuZXdOb2RlRWdlc1tjdXJyZW50Tm9kZUlkXS5mb3JFYWNoKChlZGdlOiBJRWRnZSkgPT4ge1xuICAgICAgICBpZiAoc2Vlbklkcy5pbmRleE9mKGVkZ2UuZGlzdElkKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGdlLndlaWdodCA9PT0gMCkge1xuICAgICAgICAgIHByb2Nlc3NpbmcucHVzaChlZGdlLmRpc3RJZCk7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvdW50O1xufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUZBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFFQTtBQUNBO0FBUUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFFQTtBQUNBO0FBT0E7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUVBO0FBQ0E7QUFNQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3BCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3pCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9