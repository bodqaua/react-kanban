import React from 'react';
import Board from "./Components/Board/Board";
import ModalContainer from "./Components/Modals/ModalContainer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BoardWrapper from "./Components/BoardWrapper/BoardWrapper";
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/:id"}>
                        <Board/>
                    </Route>
                    <Route path="/">
                        <BoardWrapper/>
                    </Route>
                </Switch>
            </Router>

            <ModalContainer/>
        </div>
    );
}

export default App;
