import React from 'react';
import Board from "./Components/Board/Board";
import ModalContainer from "./Components/Modals/ModalContainer";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ViewTaskAlias from "./Components/ViewTaskAlias/ViewTaskAlias";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/:id"}>
                        <ViewTaskAlias/>
                    </Route>
                    <Route path="/">
                        <Board/>
                    </Route>
                </Switch>
            </Router>

            <ModalContainer/>
        </div>
    );
}

export default App;
