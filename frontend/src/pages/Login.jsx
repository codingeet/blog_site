import React, { useState } from "react";
import "../styles/Login.css"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Alert from "../components/Alert";
import { isValidEmail } from "../helper";
const alertConfig = {
    type: 'error',
    msg: ''
};


export default function Login() {
    const [isLoginForm, toggleLoginForm] = useState(true);
    const [openEye, toggleOpenEye] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    const toggleAlert = () => {
        setAlert(!showAlert)
    };
    const handleOnchange = (event) => {
        setUserData(pre => ({ ...pre, [event.target.name]: event.target.value }));
    }
// ///login///

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(userData);
        

        if (!userData.email || !userData.password ) {
            alertConfig.type = "error";
            alertConfig.msg = "Atleast one input feild is empty";
            toggleAlert();
            return;
        }
        // email validation///
        if (!isValidEmail(userData.email)) {
            alertConfig.type = "error";
            alertConfig.msg = "Invalid Email";
            toggleAlert();
            return;
        }
    };
// //login//!!!!!!!!!!!!!!!!!!!
    const handleSignUp = (event) => {
        event.preventDefault();
        console.log(userData);
        

        if (!userData.name || !userData.email || !userData.password || !userData.confirmpassword) {
            alertConfig.type = "error";
            alertConfig.msg = "Atleast one input feild is empty";
            toggleAlert();
            return;
        }
        // email validation///
        if (!isValidEmail(userData.email)) {
            alertConfig.type = "error";
            alertConfig.msg = "Invalid Email";
            toggleAlert();
            return;
        }
        if (userData.password !== userData.confirmpassword) {
            alertConfig.type = "error";
            alertConfig.msg = "Confirm password not matched";
            toggleAlert();
            return;
        }
    };
    return (
        <div className="container">
            {showAlert && <Alert
                type={alertConfig.type}
                message={alertConfig.msg}
                onClose={toggleAlert}
            />}
            <div className="form-container">
                {isLoginForm ?
                    <div className="form">
                        <h3>Login Form</h3>
                        <div className='input-wrap'>
                            <input type="text" id="email" name="email" placeholder="Enter your Email" />
                        </div>
                        <div className='input-wrap'>
                            <input id="password" name="password" type={openEye ? "text" : "password"} placeholder="Enter your Password" className="ml-[-5vh] text-xl cursor-pointer hover:text-[red] duration-300" />
                            <span onClick={() => toggleOpenEye(!openEye)} className="eye-icon"> {openEye ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="btn btn-primary  submit" type='button' onClick={handleLogin}>Login</button>
                        </div>

                        <p>Not a member ? <span className="link-button" onClick={() => toggleLoginForm(false)}> SignUp</span></p>
                    </div>
                    :
                    <div className="form">
                        <h3>SignUp Form</h3>
                        <div className='input-wrap'>
                            <input type="text" id="name" name="name" onChange={handleOnchange} placeholder="Enter your Name" />
                        </div>
                        <div className='input-wrap'>
                            <input type="email" id="email" name="email" onChange={handleOnchange} placeholder="Enter your Email" />
                        </div>
                        <div className='input-wrap'>
                            <input type="password" id="password" name="password" onChange={handleOnchange} placeholder="Enter your Password" />
                        </div>
                       <div className='input-wrap'>
                            <input id="password" name="password" type={openEye ? "text" : "password"} placeholder="Confirm your password" className="ml-[-5vh] text-xl cursor-pointer hover:text-[red] duration-300" />
                            <span onClick={() => toggleOpenEye(!openEye)} className="eye-icon"> {openEye ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                        </div>
                        <div className="button-wrapper">
                            <button className="btn btn-primary  submit" type='button' onClick={handleSignUp}>SignUp</button>
                        </div>

                        <p>Already have an account ? <span className="link-button" onClick={() => toggleLoginForm(true)}> SignIn</span></p>
                    </div>
                }
            </div>
        </div>
    )
}