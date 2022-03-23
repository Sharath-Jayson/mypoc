import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PayerStatusPage from './pages/PayerStatus';
import PayerStatusMUIPage from './pages/PayerStatusMUI';
import PayerConfigurationPage from './pages/PayerConfiguration';
import PayerConfigurationMUIPage from './pages/PayerConfigurationMUI';
import 'reactjs-popup/dist/index.css';
import NavbarSidebar from './layouts/NavbarSidebar';
import styled from 'styled-components';

const PageContainer = styled.div`
    flex: 4;
    padding left : 1rem;
`;

function App() {
  return (
    <Router>
      <NavbarSidebar>
        <PageContainer>
          <Switch>
            <Route exact path="/">
              <Redirect to="/payer-configuration" />
            </Route>
            <Route path="/payer-configuration">
              <PayerConfigurationPage />
            </Route>
            <Route path="/payer-configuration-mui">
              <PayerConfigurationMUIPage />
            </Route>
            <Route path="/payer-status">
              <PayerStatusPage />
            </Route>
            <Route path="/payer-status-mui">
              <PayerStatusMUIPage />
            </Route>
          </Switch>
        </PageContainer>
      </NavbarSidebar>
    </Router>
  );
}

export default App;
