import {Link} from 'react-router-dom';
import axios from "axios";
import {useState, useContext} from "react";
import { UserContext, BASE_URL } from '../context';
import './liquidGlass.css';

function CustomerLogin(props){
    const baseUrl = 'http://127.0.0.1:8000/api/';
    const [formError,setFormError]=useState(false);
    const [errorMsg,seterrorMsg]=useState('');
    const [loginFormData, setLoginFormData]=useState({
        "username":'',
        "password":''
    });
    const userContext = useContext(UserContext);

    const inputHandler =(event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]:event.target.value
        })
    };
    
    const submitHandler =(event) => {
        const formData=new FormData();
            formData.append('username',loginFormData.username);
            formData.append('password',loginFormData.password);

            //SUBMIT DATA
            axios.post(`${BASE_URL}/customer/login/`,formData)
            .then(function (response){
                if(response.data.bool==false){
                    setFormError(true);
                    seterrorMsg(response.data.user)
                }else{
                    console.log(response.data);
                    const userData = { 
                      login: true, 
                      id: response.data.id, 
                      username: response.data.user,
                      customer_id: response.data.id // Store customer_id in userContext
                    };
                    if (userContext && typeof userContext.setUserContext === "function") {
                      userContext.setUserContext(userData);
                    }
                    localStorage.setItem('userContext', JSON.stringify(userData));
                    localStorage.setItem('customer_id',response.data.id);
                    localStorage.setItem('customer_login',true);
                    localStorage.setItem('customer_username',response.data.user);
                    setFormError(false);
                    seterrorMsg('')
                }
            })
            .catch(function(error){
                console.log(error);
            });
    };

    const checkCustomer = localStorage.getItem('customer_login');
    if(checkCustomer){
        window.location.href='/dashboard'
    }
    const buttonEnable=(loginFormData.username!='') && (loginFormData.password!='')

    return (
        <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh", maxWidth: "100vw" }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="glass-card shadow p-4 animate__animated animate__fadeInDown">
                        <section className="container mtopcon">
                            <div className="row">
                                <div className="col-12 reglogincon">
                                    <div className="card shadow-sm border border-secondary border-opacity-10">
                                        <div className="card-header"><h5>Login</h5></div>
                                        <div className="card-body">                          
                                                {formError &&
                                                    <p className='text-danger'>{errorMsg}</p>
                                                }
                                                <div className="mb-3">
                                                    <label htmlFor="lnm" className="form-label">User Name</label>
                                                    <input type="text" name='username' value={loginFormData.username} onChange={inputHandler} className="form-control" id="lnm"/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                                                    <input type="password" name='password' value={loginFormData.password} onChange={inputHandler} className="form-control" id="InputPassword1"/>
                                                </div>
                                                <div className="mb-3 form-check">
                                            <p>
                                              Dont have an account? <Link to="/register">Register</Link>
                                            </p>
                                            <p>
                                              <span className="text-muted">Are you a vendor?</span>{" "}
                                              <Link to="/seller/login">Vendor Login</Link>
                                            </p>
                                        </div>
                                        <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="col-12 btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerLogin;
