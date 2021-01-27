import './App.css';
import Register from "./Components/Registration";
import Login from "./Components/Login/Login";
import ForgotPassword from './Components/ForgotPassword/Forgot';
import Reset from './Components/Reset/Reset'


import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} exact />
          <Route path="/resetpassword/:token" component={Reset} exact />
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;