import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

// to allow for lazy loading, so that only the bundle required by the client will be loaded on use
// Suspense provides a fallback rendering while the requested content loads
const Login = lazy(() => import('./pages/login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading. . .</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
