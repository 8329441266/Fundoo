import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import '../Components/Registration.css';
import logo from '../Components/account.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default class RegistrationForm extends React.Component {
  render() {

    return (
      <div className="main">
        <div className="lcontainer">
          <div className="title">
            <b><h2><span style={{ color: "#4285F4" }}>F</span>
              <span style={{ color: "#DB4437" }}>u</span>
              <span style={{ color: "#F4B400" }}>n</span>
              <span style={{ color: "#4285F4" }}>d</span>
              <span style={{ color: "#0F9D58" }}>o</span>
              <span style={{ color: "#DB4437" }}>o</span></h2></b>
          </div>
          <div className="head"><h1> Create your Fundoo Account</h1></div>
          <div className={useStyles.root} noValidate autoComplete="off">
            <div className="parent">
              <div className="sample">
                <TextField size="small" id="outlined-basic" label="First Name" variant="outlined" />
              </div>
              <TextField size="small" id="outlined-basic" label="Last Name" variant="outlined" />
            </div>
            <div className="email">
              <TextField size="small" id="outlined-basic" style={{ width: '141%' }} label="Username" variant="outlined" width="500px" />
              <p><span class="textline">You can use letters, numbers and periods</span></p>
            </div>
            <div className="emp">
              <div className="sample">
                <TextField size="small" id="outlined-basic" label="password" variant="outlined" />
              </div>
              <TextField size="small" id="outlined-basic" label="confirm" variant="outlined" />
            </div>
            <div>
              <p><span class="text">Use 8 or more characters with a mix of letters, numbers & symbols</span></p>
            </div>

            <div className="box">
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <p>show password</p>
            </div>


            <Button className="button1" variant="contained" color="primary">  Next </Button>
            <Button className="button2" color="primary">Sign in instead</Button>
          </div>
        </div>

        <div className="rcontainer">
          <img src={logo} style={{ height: 260 }} alt="Signup logo" />
          <p><span>One account. All of Google  working <br /> for you.</span></p>

        </div>
      </div>



    );
  }

}