import React,{Component} from 'react';
import Forgot from '../ForgotPassword/Forgot.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from '../../Services/userService';

const service=new UserService();

const emailRegex=RegExp('^[a-zA-Z]+([\\d\\.\\+\\-][0-9a-zA-z]+)*@[\\da-zA-Z]+.[a-zA-Z]{2,4}(.[a-zA-Z]{2,3})*$')
 class ForgotPass extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            emailErrFlag:false,
            emailErrMsg:'',
        };
    }
        handleChange=(e)=>{
            this.setState({
                [e.target.name]:e.target.value
            })
        }
        validate=()=>{
            this.setState({
                emailErrFlag:false,
              emailErrMsg:'',
            })
    
            let isvalid=false
            if(this.state.email.length >0 && !emailRegex.test(this.state.email)){
                this.setState({
                    emailErrFlag:true,
                    emailErrMsg:'Email is invalid '
                })
                isvalid=true
            }
            if(this.state.email.length===0){
                this.setState({
                    emailErrFlag:true,
                    emailErrMsg:'Email is Required '
                })
                isvalid=true
            }
            return isvalid;
        }
    
        submit=(e)=>{
            e.preventDefault();
            if(this.validate())
                console.log('You have entered wrong password');
            else{
                console.log('login successful',this.state.email);
                let userData={
                    "email": this.state.email,
                }
                service.resetPass(userData).then(data=>{console.log(data);
                }).catch(error=>{
                    console.log(error);
                })
        }
    };
    render(){
        return(
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
                <span>Find Your Email</span>
            </div>
            <div className="forgottext">Enter your recovery email</div>
            <div className="forgotmail">
            <TextField  size="medium" error={this.state.emailErrFlag} helperText={this.state.emailErrMsg} label="Phone number or email" fullWidth  margin="normal" onChange={this.handleChange} name="email" variant="outlined"required/></div>
            <div className="forgotbutton">
            <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                </div>
            </div>
             </div>
        );
    }
}
export default ForgotPass;