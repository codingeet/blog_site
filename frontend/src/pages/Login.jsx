import React, { useState } from "react";
import "../styles/Login.css"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";



export default function Login() {
    const [isLoginForm, toggleLoginForm] = useState(true);
    const [openEye, toggleOpenEye] = useState(false);
    const handleClick = () => {
        toggleLoginForm(!isLoginForm)
    }
    return (
        <div className="container">
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
                            <button className="btn btn-primary  submit" type='button'>Login</button>
                        </div>

                        <p>Not a member ? <span className="link-button" onClick={() => toggleLoginForm(false)}> SignUp</span></p>
                    </div>
                    :
                    <div className="form">
                        <h3>SignUp Form</h3>
                        <div className='input-wrap'>
                            <input type="text" id="email" name="email" placeholder="Enter your Email" />
                        </div>
                        <div className='input-wrap'>
                            <input type="password" id="password" name="password" placeholder="Enter your Password" />
                        </div>
                        <div className='input-wrap'>
                            <input type="password" id="confirmpassword" name="Confirmpassword" placeholder="Confirm Password" />
                        </div>
                        <div className="button-wrapper">
                            <button className="btn btn-primary  submit" type='button'>SignUp</button>
                        </div>

                        <p>Already have an account ? <span className="link-button" onClick={() => toggleLoginForm(true)}> SignIn</span></p>
                    </div>
                }
            </div>
        </div>
    )
}