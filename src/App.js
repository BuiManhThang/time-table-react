import './App.css';
import SignUp from './components/SignUp/SignUp';
import TimeTable from './components/TimeTable/TimeTable';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Loading from './components/Loading/Loading';
import Message from './components/Message/Message';
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { SubjectProvider } from './context/SubjectContext';
import { LoadingProvider } from './context/LoadingContext';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <LoadingProvider>
        <Loading></Loading>
        <Message></Message>
        <Router>
          <AuthProvider>
            <Switch>
                <PrivateRoute path='/' exact>
                  <FormProvider>
                    <SubjectProvider>
                      <TimeTable></TimeTable>
                    </SubjectProvider>
                  </FormProvider>
                </PrivateRoute>
                <Route path='/sign-up'>
                    <SignUp></SignUp>
                </Route>
                <Route path='/sign-in'>
                    <SignIn></SignIn>
                </Route>
                <Route path='/reset-password'>
                    <ResetPassword></ResetPassword>
                </Route>
            </Switch>
          </AuthProvider>
        </Router>
      </LoadingProvider>
    </div>
  );
}

export default App;
