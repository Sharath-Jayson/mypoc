import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PayerStatusPage from './pages/PayerStatus';
import PayerConfigurationPage from './pages/PayerConfiguration';
import 'reactjs-popup/dist/index.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/payer-configuration" />
        </Route>
        <Route path="/payer-configuration">
          <PayerConfigurationPage />
        </Route>
        <Route path="/payer-status">
          <PayerStatusPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
