import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from "axios";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
    duration : 2000
});

function Signupscreen() {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();


  async function Signup() {

    if (name && email){
  const user = {

        name, 
        email, 

      }

      try {
        setloading(true);
        const result = (await axios.post('/api/users/signup', user)).data
        setloading(false);
        seterror(false);
        Swal.fire('Congratulations, you have registered to our newsletter! Thank you!', 'success').then(result=>{
            window.location.href="/home";
            return result;
        })
        return result;
      } catch (error) {
        setloading(false);
        seterror(true);
        Swal.fire('OOps', 'Something went wrong', 'error');
        return console.log(error);
      }
    } 
    else {
        Swal.fire('OOps', 'Something went wrong', 'error');
        return console.log(error); 
    }
    
    
  }

  return (
    <div>
        {loading ? (<Loader/>) : (
    <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5 justify-content-center" style={{textAlign : 'center'}}>
          {error && (<Error message='Invalid Credentials'/>)}
            <div className="bs">
              <h2>Signup</h2>
              <br/>
              Name: 
              <input type="text" className="form-control" placeholder="name" style={{textAlign : 'center'}}
              value={name} onChange={(e)=> {setname(e.target.value)}}/>
              Email:
              <input type="text" className="form-control" placeholder="email" style={{textAlign : 'center'}}
              value={email} onChange={(e)=> {setemail(e.target.value)}}/>

              <button className="btn btn-primary mt-3" onClick={Signup}>Signup</button>
              {loading && (<Loader/>)}
            </div>
          </div>
        </div>
  
        )} 
          </div>
  )
}

export default Signupscreen