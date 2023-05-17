import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from "axios";


function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();


  async function Login() {
    
      const user = {

        email, 
        password, 

      }

      try {
        
        setloading(true);
        const result = (await axios.post('/api/users/login', user)).data

        localStorage.setItem('currentUser', JSON.stringify(result));
        window.location.href="/admin";
        seterror(false);

      } catch (error) {
  
        setloading(false);
        seterror(true);

      }
  }

  return (
    <div>
        {loading ? (<Loader/>) : (
    <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5 justify-content-center" style={{textAlign : 'center'}}>
          {error && (<Error message='Invalid Credentials'/>)}
            <div className="bs">
              <h2>Login</h2>
              <br/>
              Email: 
              <input type="text" className="form-control" placeholder="email" style={{textAlign : 'center'}}
              value={email} onChange={(e)=> {setemail(e.target.value)}}/>
              Password:
              <input type="text" className="form-control" placeholder="password" style={{textAlign : 'center'}}
              value={password} onChange={(e)=> {setpassword(e.target.value)}}/>

              <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
              {loading && (<Loader/>)}
            </div>
          </div>
        </div>
  
        )} 
          </div>
  )
}

export default Loginscreen