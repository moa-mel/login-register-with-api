import React, { useState } from 'react'
import './styles.css'
import {Link, useNavigate } from 'react-router-dom'
import Arrowleft from '../../images/Arrow left 32px.png'
import Arrowright from '../../images/Arrow right 32px.png'
import axios from 'axios';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
      });

      const [error, setError] = useState('');
      const navigate = useNavigate()
     const handleChange = ({ currentTarget: input }) => {
       setData({ ...data, [input.name]: input.value });
     };

     const handleSubmit = async e => {
        e.preventDefault();
        try {
          const url = 'https://notes-vrqv.onrender.com/api/auth/login';
          const { data: res } = await axios.post(url, data);
          console.log(res)
          localStorage.setItem("token", res.token);
          navigate("/addbook")
        } catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
        }
      };

    return (
        <div className='login'>
              <div className='log-box'> 
                <div className='log-left'>
                    <div className='lg-fr'>
                    <h1 className='log-h1'>Welcome back</h1>
                    <form className='log-form' onSubmit={handleSubmit}>
                    <input
                  className="input-textt"
                  placeholder="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <input
                  className="input-textt"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                />
                  {error && <div>{error}</div>}
                 <button className='log-button'>Log in</button>
                 <div className="log-p">
                <p className="log-agreed">Don't have an account?</p>
                <Link to='/'>
                <p className="log-terms">Sign up</p>
                </Link>
              </div>
                    </form>
                </div>
                </div>
                <div className='log-right'>
                <div className='rr-side'>
            <h1 className='lr-h1'>We're here to optimise <br/>your work flow</h1>
            <p className='lr-p'>Your docs, projects, notes and remainders. <br/>Together
            </p>
            <p className='lr-p1'>Finally, all your work in one place</p>
            <div className='log-icon'> 
              <img src={Arrowleft} alt=''/>
              <img src={Arrowright} alt=''/>
            </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Login