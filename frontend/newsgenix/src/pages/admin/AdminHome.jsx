import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
// import NameNavebar from '../../components/NameNavebar';

export default function AdminHome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(true);
    const [msg,setMsg] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            navigate('/admin/allnews');
        }
    },[])

    const loginUser = async (event)=>{
        event.preventDefault();
        const responce = await fetch('http://localhost:5000/admin',{
            method : "post",
            headers : {
                'Content-Type':"application/json"
            },
            body : JSON.stringify({
                email,
                password,
            })
        })
        const data = await responce.json();
         // console.log(data);
        setLogin(data.success);
        setMsg(data.message);
        setTimeout(() => {
            setLogin(true);
        }, 2000);
        // console.log(data.token);
        
        if(data.success){
            localStorage.setItem('user', JSON.stringify(data.userExists));
            localStorage.setItem('token', JSON.stringify(data.token));
            navigate('/admin/allnews');
        }
    }

  return (
    <>
    <div className='AdminLogin'>
        {
            login
            ?null
            : (<div className="alert alert-danger alert-dismissible">
                    <strong>Login Failed!</strong> {msg}
                </div>)
                
        }
        <div className="container admin-login">
            <div className="row">
                <div className="col-sm-6 border-end">
                    <div className='text-center' style={{marginBottom:"10px",fontSize:"2rem",fontWeight:"900"}}>
                        Welcome to <span style={{color:"yellow"}}>NEWSGENIX.COM</span>
                    </div>
                    <div className='my-5 container text-center'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti pariatur aliquid reprehenderit magnam sunt exercitationem laudantium nulla, accusantium, accusamus cum ducimus quo fuga facilis debitis ad eligendi reiciendis voluptatem voluptates!</p>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className='text-center'><h2>Login</h2></div>
                    <hr />
                    <form onSubmit={loginUser}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required="true" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required="true" />
                        </div>
                        <div className='button'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link className='btn btn-warning' to='/admin/signup'>New Reporter</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}
