import React, { Component } from "react";
import Reset from "../Reset/Reset.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import UserService from "../../Services/userService";
import { Link } from "react-router-dom";

const service = new UserService();
const passwordRegex = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$"
);
export default class reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirm: "",
      confirmErrFlag: false,
      confirmErrMsg: ""
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
      passwordErrFlag: false,
      passwordErrMsg: "",
      confirmErrFlag: false,
      confirmErrMsg: ""
    });

    let isvalid = false;
    if (this.state.password.length === 0) {
      this.setState({
        passwordErrFlag: true,
        passwordErrMsg: "Password is Required ",
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
    
    if (this.state.confirm.length === 0) {
        this.setState({
          confirmErrFlag: true,
          confirmErrMsg: "Confirmation is Required ",
        });
        isvalid = true;
      }
      if (this.state.password !== this.state.confirm) {
        this.setState({
          confirmErrFlag: true,
          confirmErrMsg: "Password does not match",
        });
        isvalid = true;
      }
    return isvalid;
  };
  
  submit = (e) => {
    e.preventDefault();
    if (this.validate()) console.log("You have entered wrong password");
    else {
      console.log("reset password successful", this.state.password);
      let userData = {
        newPassword: this.state.password
      };
      const token=this.props.match.params.token;
      console.log(token);
      service
        .resetpassword(userData,token)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className="Container">
        <div className="inner">
          <div className="header">
            <div>
            <b><h2><span style={{ color: "#4285F4" }}>F</span>
              <span style={{ color: "#DB4437" }}>u</span>
              <span style={{ color: "#F4B400" }}>n</span>
              <span style={{ color: "#4285F4" }}>d</span>
              <span style={{ color: "#0F9D58" }}>o</span>
              <span style={{ color: "#DB4437" }}>o</span></h2></b>
            </div>
          </div>
          <div>
            <span>Find Your Password</span>
          </div>
          <div className="resettext">Reset your Password</div>
          <div className="password1">
              <TextField
                error={this.state.passwordErrFlag}
                helperText={this.state.passwordErrMsg}
                type={this.state.hidden ? "text" : "password"}
                onChange={this.handleChange}
                size="medium"
                fullWidth
                label="Enter New Password"
                name="password"
                variant="outlined"
                required
              />
              </div>
              <div className="password2">
              <TextField
                error={this.state.confirmErrFlag}
                helperText={this.state.confirmErrMsg}
                type={this.state.hidden ? "text" : "password"}
                size="medium"
                onChange={this.handleChange}
                fullWidth
                label="Confirm Password"
                name="confirm"
                variant="outlined"
                required
              />
            </div>
            <div className="checkbox">
              <Checkbox onClick={this.toggleShow} color="primary" />
              <div className="show">
              <span>Show Password</span>
              </div>
            </div>
            <div className="resetbutton">
              <Button variant="contained"  color="primary" onClick={this.submit} component={Link} to="/login">
                Submit
              </Button>
            </div>
          </div>
        </div>
    );
  }
}