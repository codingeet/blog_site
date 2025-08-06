import React, { useState } from "react";
import "../styles/Login.css"

export default function Login() {
    const [isLoginForm, toggleLoginForm] = useState(true);
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
                            <input type="password" id="password" name="password" placeholder="Enter your Password" />
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