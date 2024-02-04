import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './App/store';
import { Provider } from 'react-redux';

import NewGame from './NewGame/NewGame';
import ScoreSheet from './ScoreSheet/ScoreSheet';
import NewRoundOverlay from './NewRoundOverlay/NewRoundOverlay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <NewGame />
    <ScoreSheet />
    <NewRoundOverlay />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
