import React from "react";
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.scss";

// Main component
const CatFlixApplication = () => {
  return (
    <Provider store={store}>
    <Container className='container' fluid>
      <MainView />
    </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");

if (container) {
  const root = createRoot(container);
  // Tells React to render your app in the root DOM element
  root.render(<CatFlixApplication />);
} else {
  console.error("Could not find #root element to mount React app.");
}