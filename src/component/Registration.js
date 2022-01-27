import React, { useState, useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {Card,TextField, FormControl, CardContent, Button, Alert,FormControlLabel,Checkbox } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForUserName = RegExp(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

export default function Registration() {
  const [state, setState] = useState();
  const [data, setdata] = useState('');
  const [flag1, setflag1] = useState(0);
  const [errors, seterror] = useState(' ');

  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "fname":
        let error = regForName.test(value)? " ": "First Name should be character";
        seterror(error);
        break;
      case "lname":
        let error2 = regForName.test(value)
          ? " "
          : "Last Name should be character";
        seterror(error2);
        
        break;
      case "username":
        let error3 = regForUserName.test(value) ? " " : "Invalid Username";
        seterror(error3);
        
        break;
      case "email":
        let error4 = regForEmail.test(value) ? " " : "Enter Correct Email-Id";
        seterror(error4);
        
        break;
      case "password":
        let error5 = regForpassword.test(value)
          ? " "
          : "Password Should Contain atleast 8 character with Upper, lower and special character";
        seterror(error5);
        setdata(value)
        break;
      case "cpassword":
        let error6 = value === data ? "" : "Password does not match";
        seterror(error6);
        break;
    }
  };
  const validate=()=>{
    if (!errors.length > 0) {
        setflag1(1);  
      let formData = {
        fName: document.getElementById("fname").value,
        lName: document.getElementById("lname").value,
        uName: document.getElementById("uname").value,
        Email: document.getElementById("email").value,
        Pass: document.getElementById("password").value,
        TaskList: []
      };
      console.log(formData)
      setState(formData)
      axios.post(`http://localhost:3001/user`,formData)
      alert("Form Submitted Successfully");
    }
     else {
      seterror("Enter all details");
    }
  };
  return (
    <div>
        {!flag1?
      
      <div>
         <div className="container card" >
                    <h1 className="text-center">Register Here</h1><hr />
                  
                    <table className="container-fluid ">
                        <tbody>
                       {errors.length > 1 && <Alert severity="warning">{errors}</Alert>}
                        <div class="input-group mb-3" style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-user"></i></span>
                                </div>
                                <input type="text" style={{height:"50px"}} className="form-control" placeholder="Enter First Name"name="fname" id="fname" onChange={handler} />
                              
                        </div>
                        <div class="input-group mb-3 "style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-user"></i></span><br />
                                </div>
                                <input type="text" style={{height:"50px"}} className="form-control" placeholder="Enter Last Name" name="lname" id="lname" onChange={handler} />
                                
                        </div>

                        <div class="input-group mb-3"style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-user"></i></span><br />
                                </div>
                                <input type="text"style={{height:"50px"}} className="form-control" placeholder="Enter User Name" name="uname" id="uname" onChange={handler} />
                                
                        </div>

                        <div class="input-group mb-3"style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-paper-plane"></i></span><br />
                                </div>
                                <input type="text"style={{height:"50px"}} className="form-control" placeholder="Enter Email Id" id="email" name="email" onChange={handler} />
                            </div>

                            <div class="input-group mb-3"style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-lock"></i></span><br />
                                </div>
                                <input type="text"style={{height:"50px"}} className="form-control" placeholder="Enter Password" id="password" name="password" onChange={handler} />
                            </div>

                            <div class="input-group mb-3"style={{height:"50px"}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text" ><i class="fa fa-lock"></i></span><br />
                                </div>
                                <input type="text"style={{height:"50px"}} className="form-control"  placeholder="Enter Confirm Password" id="cpassword" name="cpassword" onChange={handler} />
                            </div>
                            <div className=" container text-center"><button type="button" class="btn btn-primary btn-lg " onClick={validate}>Submit</button></div>

                        </tbody>
                    </table>
                    {/* </div> */}
                    <hr/>
                    </div>

         
        </div>
      :
      <Redirect to="/login"></Redirect> }
    </div>
  );
}
