import React from 'react';
import './App.css';

function App() {
  const model = process.env.REACT_APP_MODEL
  let image;
  switch (model) {
    case "jsg":
      image = require("./images/jsg/jsg.png")
      break;

    default:
      image = require("./images/jsg/jsg.png")
      break;
  }
  return (
    <img src={image} />
  );
}
export default App;
