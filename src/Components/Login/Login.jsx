import React from "react";
import "../Login/Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import UserService from "../../Services/userService";


const service = new UserService();

const emailRegex = RegExp("^[a-zA-Z]+([\\d\\.\\+\\-][0-9a-zA-z]+)*@[\\da-zA-Z]+.[a-zA-Z]{2,4}(.[a-zA-Z]{2,3})*$");
const passwordRegex = RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$');


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailErrFlag: false,
            emailErrMsg: "",
            password: "",
            passwordErrFlag: false,
            passwordErrMsg: "",
         
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
            emailErrFlag: false,
            emailErrMsg: "",
            passwordErrFlag: false,
            passwordErrMsg: ""
        });

        let isvalid = false;
        if (this.state.email.length > 0 && !emailRegex.test(this.state.email)) {
            this.setState({
                emailErrFlag: true,
                emailErrMsg: "Email is invalid ",
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
        if (this.state.password.length > 0 && !passwordRegex.test(this.state.password)) {
            this.setState({
                passwordErrFlag: true,
                passwordErrMsg: "Password is invalid "
            })
            isvalid = true
        }
        if (this.state.password.length === 0) {
            this.setState({
                passwordErrFlag: true,
                passwordErrMsg: "Password is Required "
            })
            isvalid = true
        }
        return isvalid;
    };

    submit = (e) => {
        e.preventDefault();
        if (this.validate()) console.log("login failed");
        else {
            console.log("login successful", this.state.email, this.state.password);
            let userData = {
                email: this.state.email,
                password:this.state.password
              };
              service
                .login(userData)
                .then((data) => {
                  console.log(data);
                  localStorage.setItem('userLoginData',JSON.stringify(data.data));
                  localStorage.setItem('userToken',data.data.id);
                    setTimeout(()=>{
                      this.setState({
                        redirect:true 
                      })
                    },1000);
                  })
                .catch((error) => {
                  console.log(error);
                });
        }
    };
    render() {

        return (
            <div className="Main">
                <div className="inner-content">
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
                        <span>Sign In</span>
                    </div>
                    <div className="logintext">Use Your Fundoo Account</div>
                    <div className="login">
                        <TextField
                            size="medium"
                            error={this.state.emailErrFlag}
                            helperText={this.state.emailErrMsg}
                            label="Email or phone"
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            name="email"
                            variant="outlined"
                            required
                        />
                    </div>
                    <div className="password">
                        <TextField
                            size="medium"
                            error={this.state.passwordErrFlag}
                            helperText={this.state.passwordErrMsg}
                            type={this.state.hidden ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            label="Password"
                            name="password"
                            variant="outlined"
                            required
                        />
                    </div>
                    <div className='checkbox'>
                        <Checkbox onClick={this.toggleShow} color="primary" />
                        <div className= 'text'>
                        <span>Show Password</span>
                        </div>
                    </div>
                    <div className='sample'>
                        <Button component={Link} to="/forgotPassword" color="primary">
                            Forgot Password?
                    </Button>
                    </div>

                    <div className="loginbutton">
                        <Button component={Link} to="/" color="primary">Create account</Button>
                        <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}