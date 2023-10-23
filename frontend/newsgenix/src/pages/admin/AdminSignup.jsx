import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import NameNavebar from '../../components/NameNavebar';
import BACKEND_URL from '../../path'

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [login, setLogin] = useState(true);
  const [msg, setMsg] = useState("")
  const navigate = useNavigate();

  useEffect(()=>{
      const user = localStorage.getItem('user');
      if(user){
          navigate('/admin/allnews');
      }
  },[])

  const createUser = async (e)=>{
      e.preventDefault();
          const responce = await fetch(`${BACKEND_URL}/admin/signup`,{
              method : "post",
              headers : {
                "Content-Type" : "application/json",
              },
              body : JSON.stringify({
                name,
                email,
                password,
                password2,
                address,
              })
          })
          const data = await responce.json();
          console.log("data :  -- ", data)

            setMsg(data.message);
            setLogin(data.success);
            setTimeout(() => {
                setLogin(true);
            }, 2000);

          if(data.success){
              navigate('/admin');
          }
  }

  return (
    <>
    <div className='fixed-top'><NameNavebar data = {{isLogin : false}}/></div>
    <div className='' >
        {
            login
            ? null
            : (<div className="alert alert-danger alert-dismissible">
                    <strong>Registration Failed!</strong> {msg}
            </div>)
                
        }
        <div className="container admin-signup my-2">
            <div className="row">  
                <div className="col-sm-6 m-auto AdminSignup">
                <h2 className='m-auto mb-3'>Signup</h2><hr />
                  <form onSubmit={createUser} >
                    <div className="mb-3">
                          <label htmlFor="name" className="form-label">Your Name</label>
                          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required="true" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="signup-email" className="form-label">Email address</label>
                          <input type="email" className="form-control" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} required="true" />
                          <div id="" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="Password1" className="form-label">Password</label>
                          <input type="password" className="form-control" id="Password1" value={password} onChange={(e) => setPassword(e.target.value)} required="true" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="Password2" className="form-label">Confirm Password</label>
                          <input type="password" className="form-control" id="Password2" value={password2} onChange={(e) => setPassword2(e.target.value)} required="true" />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="address" className="form-label">Address</label>
                          <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required="true" />
                      </div>
                      <div className='button'>
                          <button type="submit" className="btn btn-primary">Apply</button>
                      </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
