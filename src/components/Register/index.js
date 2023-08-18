import React, { useState, useEffect } from 'react'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import Arrowleft from '../../images/Arrow left 32px.png'
import Arrowright from '../../images/Arrow right 32px.png'
import axios from 'axios';


const Register = () => {
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setError('');
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url =
        'https://notes-vrqv.onrender.com/api/auth/register';
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("id", res.id);
      if (res.success) {
        setMsg(res.message);
        setSuccess(true);
        setError('');
      }
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

  useEffect(() => {
    console.log(success, 'success');
    if (success) {
      const timer = setTimeout(() => {
        navigate('/addbook');
        console.log('jo')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="register">
      <div className='reg-contain'>
        <div className='register-box'>
          <div className='reg-left'>
            <div className='rl-w'>
              <h1 className='reg-h1'> Create Account</h1>
              <p className='reg-p-up'>Let's get started with your 30days trial</p>
              <form className='reg-form' onSubmit={handleSubmit}>
                <input
                  className="input-text"
                  placeholder="Username"
                  name="userName"
                  type="text"
                  value={data.userName}
                  onChange={handleChange}
                />
                <input
                  className="input-text"
                  placeholder="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <input
                  className="input-text"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                />
                <input
                  className="input-text"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
                {error && <div>{error}</div>}
                {msg && <div>{msg}</div>}
                <button className='reg-button'>Create account</button>
                <div className="reg-p">
                  <p className="reg-agreed">Already have an account?</p>
                  <Link to='/login'>
                    <p className="reg-terms">Log in</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="reg-right">
            <div className='rr-side'>
              <h1 className='rr-h1'>We're here to optimise <br />your work flow</h1>
              <p className='rr-p'>Your docs, projects, notes and remainders. <br />Together
              </p>
              <p className='rr-p1'>Finally, all your work in one place</p>
              <div className='reg-icon'>
                <img src={Arrowleft} alt='' />
                <img src={Arrowright} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;