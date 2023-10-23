import React,{useEffect, useState}  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NameNavebar from '../../components/NameNavebar';
import Card2 from '../../components/Card2'

export default function AllReporter() {
  const [reporters, setReporters] = useState([]);
  const [reporter, setReporter] = useState({});
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect( ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if(!user){
        navigate('/admin');
    }else{ 
      setReporter(user);
      setToken(token);
      const allUser = async ()=>{
          const responce = await fetch('http://localhost:5000/admin/reporters',{
            method : "get",
            headers : {
              "Content-Type" : "application/json",
              Authorization : `Bearer ${token}`,
              reporter : user._id,
            },
          })

          const data = await responce.json();
          setReporters(data.user);
        }
        allUser();
    }
  },[]);

const handleRemove = async (e)=>{
    e.preventDefault();
    console.log("user : ", e.target.value);
    const responce = await fetch('http://localhost:5000/admin/reporters/remove',{
        method : "get",
        headers : {
            id : e.target.value,
            Authorization : `Bearer ${token}`,
        }
    })
    const data = await responce.json();
    if(data.success){
      setReporters(data.user);
    }
}

const handleCreate = async (e)=>{
    e.preventDefault();
    console.log("user : ", e.target.value);
    const responce = await fetch('http://localhost:5000/admin/reporters/create',{
        method : "get",
        headers : {
            id : e.target.value,
            Authorization : `Bearer ${token}`,
        }
    })
    const data = await responce.json();
    if(data.success){
      setReporters(data.user);
    }
}

const handleDelete = async (e)=>{
    e.preventDefault();
    console.log("user : ", e.target.value);
    const responce = await fetch('http://localhost:5000/admin/reporters/delete',{
        method : "get",
        headers : {
            id : e.target.value,
            Authorization : `Bearer ${token}`,
        }
    })
    const data = await responce.json();
    if(data.success){
      setReporters(data.user);
    }
}

  return (
    <>
    <NameNavebar data = {{isLogin : true}}/>
    <Card2 data={{add_news:true, All_reporters:false, all_news:true}} />
    <div className='container mb-3'>
      <div className="col-sm-10 m-auto">
        {
          reporters ?
          reporters.filter((val)=>val.email !== reporter.email).map((val, ind)=>{
            return(
              <>
              <div className='all-reporter mt-3'>
                <div className='h4'>{val.name}</div>
                {
                    val.isAdmin ? <div className=''>Admin</div> : <div className=''>Reporter</div>
                }
                {
                    reporter.isAdmin ? <div className='reporter'>
                        {
                            val.isAdmin ? <button className='btn btn-warning' value={val._id} onClick={handleRemove}>Remove Admin</button> 
                            : <button className='btn btn-warning' value={val._id} onClick={handleCreate}>Create Admin</button>
                        }
                        <button className='btn btn-danger mt-2' value={val._id} onClick={handleDelete}>Delete</button>
                    </div> : null
                }
              </div><hr />
              </>
            )
          }) 
          : <div><div>No Any Reporters Are Joined..</div><hr /></div>
        }
      </div>
    </div>
    </>
  )
}
