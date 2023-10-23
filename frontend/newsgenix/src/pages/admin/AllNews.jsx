import React,{useEffect, useState}  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NameNavebar from '../../components/NameNavebar';
import Card2 from '../../components/Card2'
import BACKEND_URL from '../../path'

export default function AllNews() {
  const [newsdata, setNewsdata] = useState([]);
  const [reporter, setReporter] = useState({})
  const [change, setChange] = useState(false);
  const [msg,setMsg] = useState("")
  const navigate = useNavigate();

  useEffect( ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if(!user){
        navigate('/admin');
    }else{
      setReporter(user);
    const getdata = async ()=>{
        const responce = await fetch(`${BACKEND_URL}/admin/allnews`,{
          method : "get",
          headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
            // reporter : user._id,
          },
        })
        // console.log("-----------mydata : ---", responce)
        const data = await responce.json();
        setNewsdata(data.data);
        // console.log("   data:        ",data.data[0])
        // console.log("NEWS DATA : ",newsdata)
        // console.log("----------------------", Array.isArray(newsdata))
      }
      getdata();
    }
  },[]);

  const handleDelete = async (e)=>{
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const responce = await fetch(`${BACKEND_URL}/admin/delete`,{
        method : "get",
        headers : {
            id : e.target.value,
            Authorization : `Bearer ${token}`,
        }
    })

    const resp = await responce.json();

    setChange(resp.success);
    setMsg(resp.message);
     setTimeout(() => {
      setChange(false);
     }, 3000);

    if(resp){
      setNewsdata(resp.data);
        navigate('/admin/allnews');
    }
  }

  const handleUpdate = (e)=>{
    e.preventDefault();
    const id = e.target.value;
    if(id){
        navigate(`/admin/update/${id}`);
    }
  }

  return (
    <>
    <NameNavebar data = {{isLogin : true}}/>
    <Card2 data={{add_news:true, All_reporters:true, all_news:false}} />
    {
      change
      ?(<div className="alert alert-success alert-dismissible position-fixed m-auto">
              <strong>Delete : </strong> {msg}
          </div>)
      : null
                
    }
    <div className='container allNews'>
      <div className="col-sm-8 mt-3">
        {
          newsdata ?
          newsdata.filter((val)=> (val.reporter === reporter._id || reporter.isAdmin)).map((val, ind)=>{
            return(
                <div className="card mb-3" >
                  <Link to="#" style={{textDecoration:"none", color:"black"}}>
                  <div className="row g-0">
                    <div className="col-md-4">
                    <img src={val.file} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{val.title}</h5>
                          <p className="card-text">{val.description}</p>
                          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                          <button className='btn btn-warning' value={val._id} onClick={handleUpdate}>Update</button>
                          <button className='btn btn-danger mx-3' value={val._id} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                  </div>
                  </Link>
              </div>
            )
          }) 
          : <div>NO NEWS ADDED BY YOU</div>

        }
        <hr />
        <Link to='#' className='container-fluid d-flex flex-column justify-content-center align-items-center ' style={{width:"100%"}}>view more</Link>
      </div>
    </div>
    </>
  )
}
