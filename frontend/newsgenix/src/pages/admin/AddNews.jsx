import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import NameNavebar from '../../components/NameNavebar';
import Card2 from '../../components/Card2'
import BACKEND_URL from '../../path'

export default function AddNews() {
  const [reporter, setReporter] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [news, setNews] = useState("");
  const [braking, setBraking] = useState("");
  const [success, setSuccess] = useState(true);
  const [msg,setMsg] = useState("")
  const [cloud, setCloud] = useState(false);
  const navigate = useNavigate();

  const submitImage = async (pics)=>{
    // console.log("pics--------------------",pics)
    setCloud(true);
    const data = new FormData()
    data.append("file",pics)
    data.append("upload_preset","Newsgenix")
    data.append("cloud_name","amansing47")
    // console.log("----------DATA-----DATA------------",data);
    const imgUrl = await fetch("https://api.cloudinary.com/v1_1/amansing47/image/upload",{
      method:"post",
      body : data,
    })
    
    console.log("img : ", imgUrl)
    const data1 = await imgUrl.json();
    // const image_url = JSON.stringify(data1.url);
    console.log("img-url : ", data1.url)
    if(data1.url){
      setCloud(false);
      setFile(data1.url);
      console.log(data1.url);
    }
  }

  useEffect(()=>{
    const reporterData = JSON.parse(localStorage.getItem('user'));
    if(!reporterData){
      navigate('/admin');
    }else{
      console.log(reporterData._id)
      setReporter(reporterData._id);
    }
  },[])

  const addnews = async (e)=>{
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const responce = await fetch(`${BACKEND_URL}/admin/addnews`,{
      method : "post",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`,
      },

      body : JSON.stringify({
        reporter, 
        title,
        type,
        description,
        file,
        news,
        braking
      })
    })

    const data2 = await responce.json();

    setSuccess(data2.success);
    setMsg(data2.message);
    setTimeout(() => {
      setSuccess(true);
    }, 2000);

    if(data2.success){
        navigate('/admin/allnews');
    }
  }

  return (
    <>
    <NameNavebar data = {{isLogin : true}} />
    <Card2 data={{add_news:false, All_reporters:true, all_news:true}} />
    <div className='' style={{backgroundColor : "#aed6f2"}}>
        {
            success
            ?null
            : (<div className="alert alert-danger alert-dismissible">
                    <strong>Login Failed!</strong> {msg}
                </div>)   
        }
        <div className="container admin-add AdminSignup px-5">
          <h2>ADD NEWS</h2>
          <form onSubmit={addnews} >
            <div className="mb-3">
                <label htmlFor="title" className="form-label">News Title</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e)=> setTitle(e.target.value)} required="true" />
                
            </div>
            <div className="mb-3">
                <label htmlFor="sel1">News Type (select one):</label>
                <select className="form-control" id="sel1" value={type} onChange={(e)=> setType(e.target.value)} required="true" >
                <option>--------</option>
                  <option>General</option>
                  <option>Business</option>
                  <option>Sports</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Technology</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="Description" className="form-label">Description</label>
                <input type="text" className="form-control" id="Description" value={description} onChange={(e)=> setDescription(e.target.value)} required="true"  />
            </div>
            <div className="mb-3">
                <input type="file" id="myFile" accept='image/*' onChange={(e)=> submitImage(e.target.files[0])} name={file} required="true" />
                {
                  cloud 
                  ?<div class="spinner-border text-secondary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  : null
                }
                
            </div>
            <div className="mb-3">
                <label htmlFor="news-data" className="form-label">News Data</label>
                <textarea className="form-control" id="news-data" rows="3" value={news} onChange={(e)=> setNews(e.target.value)} required="true"  ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="sel2">Breaking News (select one):</label>
                <select className="form-control" id="sel2" value={braking} onChange={(e)=> setBraking(e.target.value)} required="true" >
                <option>--------</option>
                  <option>No</option>
                  <option>Yes</option>
                </select>
            </div>
            <div className='button'>
                <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
      </>
  )
}
