import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CadastrarAluno from './components/CadastrarAluno';
import CadastrarImc from './components/CadastrarImc';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/aluno/cadastrar" component={CadastrarAluno} />
                <Route path="/imc/cadastrar" component={CadastrarImc} />
            </Switch>
        </Router>);};
export default App;