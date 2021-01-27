import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import '../Components/Registration/Registration.css';
import logo from '../Components/Registration/account.svg'
// import { Link } from "react-router-dom";
import UserService from "../Services/userService";




const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
const service = new UserService();
const nameRegex = RegExp("^[A-Z][a-z]{2,}$");
const emailRegex = RegExp("^[a-zA-Z]+([\\d\\.\\+\\-][0-9a-zA-z]+)*@[\\da-zA-Z]+.[a-zA-Z]{2,4}(.[a-zA-Z]{2,3})*$");
const passwordRegex = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$");

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:null,
      hidden: false,
      firstName: '',
      firstNameErrFlag: false,
      firstNameErrMsg: '',
      lastName: '',
      lastNameErrFlag: false,
      lastNameErrMsg: "",
      email: "",
      emailErrFlag: false,
      emailErrMsg: "",
      password: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirm: "",
      confirmErrFlag: false,
      confirmErrMsg: "",
      res:"",
    };
    this.toggleShow = this.toggleShow.bind(this);
    
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    this.setState({
      firstNameErrFlag: false,
      firstNameErrMsg: "",
      lastNameErrFlag: false,
      lastNameErrMsg: "",
      emailErrFlag: false,
      emailErrMsg: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
    });

    let isvalid = false;
    if (this.state.firstName.length === 0) {
      this.setState({
        firstNameErrFlag: true,
        firstNameErrMsg: "First Name is Required",
      });
      isvalid = true;
    }

    if (this.state.lastName.length === 0) {
      this.setState({
        lastNameErrFlag: true,
        lastNameErrMsg: "Last Name is Required ",
      });
      isvalid = true;
    }
    if (this.state.email.length === 0) {
      this.setState({
        emailErrFlag: true,
        emailErrMsg: "Email is Required ",
      });
      isvalid = true;
    }
    if (this.state.password.length === 0) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "Password is Required ",
      });
      isvalid = true;
    }
    if (this.state.confirm.length === 0) {
      this.setState({
        confirmErrFlag: true,
        confirmErrMsg: "Confirmation is Required ",
      });
      isvalid = true;
    }
    if (
      this.state.firstName.length > 0 &&
      !nameRegex.test(this.state.firstName)
    ) {
      this.setState({
        firstNameErrFlag: true,
        firstNameErrMsg: "First Name is invalid ",
      });
      isvalid = true;
    }
    if (
      this.state.lastName.length > 0 &&
      !nameRegex.test(this.state.lastName)
    ) {
      this.setState({
        lastNameErrFlag: true,
        lastNameErrMsg: "Last Name is invalid ",
      });
      isvalid = true;
    }
    if (this.state.email.length > 0 && !emailRegex.test(this.state.email)) {
      this.setState({
        emailErrFlag: true,
        emailErrMsg: "Email is invalid ",
      });
      isvalid = true;
    }
    if (
      this.state.password.length > 0 &&
      !passwordRegex.test(this.state.password)
    ) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "Password is invalid ",
      });
      isvalid = true;
    }
    if (this.state.password !== this.state.confirm) {
      this.setState({
        confirmErrFlag: true,
        confirmErrMsg: "Password not match",
      });
      isvalid = true;
    }
    return isvalid;
  };
  submit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      console.log("login failed");
    } else {
      console.log("login successful", this.state.email, this.state.password);
      let userData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        service: "advance",
        email: this.state.email,
        password: this.state.password,
      };
      service
        .registration(userData)
        .then((data) => {
          this.setState({
            snackbaropen: true,
            snackbarmsg: "User account created Successfully",
            res:"success"
          });
        })
        .catch((error) => {
          this.setState({ res:"error" });
        });
    }
  };

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
                <TextField size="small" id="outlined-basic" label="First Name" variant="outlined"
                    error={this.state.firstNameErrFlag}
                    helperText={this.state.firstNameErrMsg}
                    onChange={this.handleChange}
                    name="firstName"
                    required />
              </div>
              <TextField size="small" id="outlined-basic" label="Last Name" variant="outlined"
                error={this.state.lastNameErrFlag}
                helperText={this.state.lastNameErrMsg}
                name="lastName"
                onChange={this.handleChange}
                fullWidth
                required />
            </div>
            <div className="email">
              <TextField size="small" id="outlined-basic" style={{ width: '141%' }} label="Email Address" variant="outlined" width="500px"
                
                error={this.state.emailErrFlag}
              helperText={this.state.emailErrMsg}
              onChange={this.handleChange}
              name="email"
              fullWidth
              required />
              <p><span class="textline">You can use letters, numbers and periods</span></p>
            </div>
            <div className="emp">
              <div className="sample">
                <TextField size="small" id="outlined-basic" label="password" variant="outlined"
                    error={this.state.passwordErrFlag}
                    helperText={this.state.passwordErrMsg}
                    type={this.state.hidden ? "text" : "password"}
                    onChange={this.handleChange}
                    name="password"
                    required />
              </div>
              <TextField size="small" id="outlined-basic" label="confirm" variant="outlined"
                 error={this.state.confirmErrFlag}
                 helperText={this.state.confirmErrMsg}
                 type={this.state.hidden ? "text" : "password"}
                 onChange={this.handleChange}
                 name="confirm"
                 fullWidth
                 required />
            </div>
            <div>
              <p><span class="text">Use 8 or more characters with a mix of letters, numbers & symbols</span></p>
            </div>

          
             <div className="checkbox1">
            <Checkbox onClick={this.toggleShow} color="primary"/>
            <span>Show Password</span>
          </div>


            <Button className="button1" variant="contained" color="primary" type="submit" onClick={this.submit} > Next </Button>
            <Button className="button2" color="primary">Sign in instead</Button>
          </div>
        </div>

        <div className="rcontainer">
          <img src={logo} style={{ height: 260 }} alt="Signup logo" />
          <p><span>One account. All of Google  working <br /> for you.</span></p>

        </div>
      </div>
    )
  }
}

