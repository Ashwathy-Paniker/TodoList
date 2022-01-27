import React, { useEffect, useState, useRef } from 'react'
import { FormControl, TextField, Button } from '@mui/material';
import { Col, Container, Form, FormLabel, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
// import ReactHtmlParser from 'react-html-parser';

export default function Home() {
    const [data, setData] = useState({});
    const [userdata, setuserdata] = useState([]);
    const titleRef = useRef(null);
    const prioRef = useRef(null);
    //const user = JSON.parse(localStorage.getItem('user'))

    const addtask = () => {
        if (prioRef.current.value <= 5) {
            console.log(titleRef.current.value)
            const user = JSON.parse(localStorage.getItem('user'))
            const task = { title: titleRef.current.value, priority: prioRef.current.value, flag: false }
            user.TaskList = [...user.TaskList, task]
            localStorage.setItem('user', JSON.stringify(user));
            titleRef.current.value = ""
            prioRef.current.value = ""
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
            alert("Your Task Added")
        }
        else {
            alert("Please Enter Priority between 1 to 5")
        }
    }
    const handler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
    }

    const logout = () => {
        let data = JSON.parse(localStorage.getItem('user'))
        axios.put(`http://localhost:3001/user/${data.id}`, data)
        localStorage.removeItem('user');
    }

    const deletes = (index) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const bool = window.confirm("Are you sure you want to delete this?")
        if (bool == true) {
            user.TaskList.splice(index, 1)
            setData({ ...user });
            localStorage.setItem('user', JSON.stringify(user));
        }
        const user1 = JSON.parse(localStorage.getItem('user'))
        const userd = user1.TaskList
        setuserdata([...userd])
    }

    const update = (index) => {
        let temp=JSON.parse(localStorage.getItem('user'));
        temp.TaskList[index].flag=!temp.TaskList[index].flag
        localStorage.setItem('user',JSON.stringify(temp))
        const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
    }
    useEffect(() => {
        if (localStorage.getItem('user') != undefined) {
            const user1 = JSON.parse(localStorage.getItem('user'))
            const userd = user1.TaskList
            setuserdata([...userd])
        }
    }, [])

    return (
        <div className="container cardH">
            <div className="container-fluid">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand">My Todo App</a>
                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item"><Link to="/login"><Button onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i></Button></Link>
                    </li>
                </ul>
            </nav></div>
            {localStorage.getItem('user') != undefined ?
                <div class="container">
                    <div class="container">
                        <h2 class="text-center">Add Task:</h2>
                        <div className="container text-center">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Add ToDos Items </span>
                                </div>
                                <TextField style={{ width: '80%' }} inputRef={titleRef} type="text" label="Title" />
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Add Item Priority</span>
                                </div>
                                <TextField style={{ width: '80%' }} inputRef={prioRef} type="text" label="Priority" />
                            </div>

                            <br />
                            <div class="container text-center">
                                <button onClick={addtask} className="btn btn-primary" >Add Task</button>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-center mt-5">Todo List</h2>
                    <div className="container scrollit1" >

                        <table className="table table-borderless table-hover">
                            <thead className="bg-dark text-white">
                                <th>Task</th>
                                <th>Priority</th>
                                <th className="text-center" colSpan="2">Actions</th>
                            </thead>
                            {userdata.length ?
                                <tbody>
                                    {userdata.map((task, index) => {
                                        return <tr key={index}>
                                            {task.flag ?
                                                <td style={{ width: "80%", textDecoration:"line-through", color:"red" }}>{task.title}</td>
                                                :
                                                <td >{task.title}</td>}
                                            <td >{task.priority}</td>
                                            <td className="text-center"><button onClick={() => update(index)} className="btn btn-outline-success"><i class="fa fa-check" aria-hidden="true"></i></button></td>
                                            <td className="text-center"><button onClick={() => deletes(index)} className="btn btn-outline-danger"><i class="fa fa-times" aria-hidden="true"></i></button></td>

                                        </tr>

                                    })}
                                </tbody>
                                :
                                <tbody className="container text-center"><tr><td colSpan="4">No Task Found</td></tr></tbody>
                                }

                        </table>
                    </div>

                </div>
                :
                <h1 className="container">404 Page NotFound</h1>
            }

        </div>
    )
}