import React, { useState, useEffect } from 'react'
import { Card, TextField, FormControl ,CardContent, Button, Alert} from '@mui/material'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [data,setData]= useState([]);
    const [flag,setflag]= useState(0);
    const [error,seterror]= useState('')
    useEffect(()=>{
        axios.get('http://localhost:3001/user')
        .then(res=>{
            setData(res.data)
        })
    },[])

    const handler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
    }

    const checkdata=()=>{
        console.log(data)
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        data.forEach(ele=>{
            if(email===ele.Email && password===ele.Pass){
                setflag(1);
                localStorage.setItem('user',JSON.stringify(ele));
                console.log("done")
            }
        })
        if(!flag){
            seterror("Email or Password does not match")
        }
    }

    return (
        <div>
            {!flag?
            <div className="container card1">
            <h1 className="text-center ">Login Here </h1><hr />
            <table className="container">
                <tbody>
                 {error.length > 1 && <Alert severity="warning">{error}</Alert>}
                    <div class="input-group mb-3" style={{height:"50px"}}>
                        <div class="input-group-prepend">
                            <span class="input-group-text" ><i class="fa fa-paper-plane"></i></span><br />
                        </div>
                        <input type="text"style={{height:"50px"}} className="form-control" placeholder="Enter Email Id" id="email" name="email" onChange={handler} />
                    </div>

                    <div class="input-group mb-3"  style={{height:"50px"}}>
                        <div class="input-group-prepend">
                            <span class="input-group-text" ><i class="fa fa-lock"></i></span><br />
                        </div>
                        <input type="text" style={{height:"50px"}} className="form-control"  placeholder="Enter Password" id="password" name="password" onChange={handler} />
                    </div>

                    <div className=" container text-center"><button type="button" class="btn btn-primary btn-lg " onClick={checkdata}>Sign In</button></div>

                </tbody>
            </table><hr/>
        </div>
                : <Redirect to="/home"></Redirect> }
        </div>
    )
}
