import React, { useState } from "react";
import "../styles/Login.css"

export default function AuthForm() {
    const [isLoginForm, toggleLoginForm] = useState(true);
    return (
        <div className="container">
            <div className="form-container">

                {isLoginForm ? <>
                    <div className="form">
                        <h2>Login Form</h2>
                        <div className='email-wrap'>
                            <input type="text" id="email" name="email" placeholder="Enter your Email" />
                        </div>
                        <div className='passward-wrap'>
                            <input type="text" id="password" name="password" placeholder="Enter your Password" />
                        </div>
                        <button>Login</button>
                        <p>Not a member ? <span className="link-button" onClick={() => toggleLoginForm(false)}> SignUp</span></p>
                    </div>
                </> : <>
                    <div className="form">
                        <h2>SignUp Form</h2>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder=" Confirm Password" />
                        <button>SignUp</button>
                        <p>Already have an account ? <span className="link-button" onClick={() => toggleLoginForm(true)}> SignIn</span></p>
                    </div>
                </>}
            </div>
        </div>
    )
}