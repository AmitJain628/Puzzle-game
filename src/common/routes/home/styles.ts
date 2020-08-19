import styled from 'styled-components';

export const StyledGrid = styled.div`
  .header {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 360px;
  }

  .btn-primary {
    background-color: #2ecd71 !important;
    border-color: #2ecd71 !important;
  }

  .score {
    font-size: 18px;
    font-weight: bold;
    color: black;
  }

  .suggestion {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .count {
    padding: 2px;
    font-size: 10pt;
    border-width: 1px;
    border-style: solid;
    background-color: #23221c;
    color: #686964;
  }

  .border {
    border: 1px solid #dee2e6 !important;
  }

  .border-dark {
    border-color: #343a40 !important;
  }

  .count span {
    text-align: center;
    font-size: 16pt;
    display: block;
  }
  .newgame {
    white-space: nowrap;
    margin-right: 10px;
    padding: 5px;
    background: linear-gradient(to bottom, #e0e0e0, #b0b0b0);
    cursor: pointer;
    margin: 0;
  }
`;
