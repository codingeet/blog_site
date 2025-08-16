import React, { useState } from "react";
import "../styles/Login.css"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Alert from "../components/Alert";
import { isValidEmail } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authThunk";
const alertConfig = {
    type: 'error',
    msg: ''
};


export default function Login() {
    const [isLoginForm, toggleLoginForm] = useState(true);
    const [openEye, toggleOpenEye] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
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
        if (!userData.email || !userData.password) {
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
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            }),
            credentials: "include"   // to set the http only coockie in the browser which has requested
        }).then((res) => {
            console.log("Ressss;;;;", res);

            if (res.ok) {
            }
            return res.json();
        }).catch((err) => {
        });
    };

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
        if (userData.password.length < 6) {
            alertConfig.type = "error";
            alertConfig.msg = "Atleast 6 character required in password";
            toggleAlert();
            return;
        }
        ////api call////
        dispatch(registerUser({
            name: userData.name,
            email: userData.email,
            password: userData.password
        }));
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
                            <input type="text" id="email" name="email" onChange={handleOnchange} placeholder="Enter your Email" />
                        </div>
                        <div className='input-wrap'>
                            <input id="password" name="password" onChange={handleOnchange} type={openEye ? "text" : "password"} placeholder="Enter your Password" className="ml-[-5vh] text-xl cursor-pointer hover:text-[red] duration-300" />
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
                            <input id="confirmpassword" name="confirmpassword" type={openEye ? "text" : "password"} onChange={handleOnchange} placeholder="Confirm your password" />
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