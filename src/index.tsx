import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'mobx-react';
import columnStore from "./store/ColumnStore";
import tasksStore from './store/TasksStore';
import modalStore from './store/ModalStore';
import boardStore from './store/BoardStore';

ReactDOM.render(
    <Provider columnsStore={columnStore}
              tasksStore={tasksStore}
              boardStore={boardStore}
              modalStore={modalStore}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
