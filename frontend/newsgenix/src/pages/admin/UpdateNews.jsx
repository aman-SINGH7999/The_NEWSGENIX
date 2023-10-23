import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import NameNavebar from '../../components/NameNavebar';
import Card2 from '../../components/Card2'

export default function UpdateNews() {
  const [id, setId] = useState("");
  const [reporter, setReporter] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [news, setNews] = useState("");
  const [braking, setBraking] = useState("");
  const [success, setSuccess] = useState(true);
  const [msg,setMsg] = useState("")
  const navigate = useNavigate();

  useEffect( ()=>{
    const reporterData = JSON.parse(localStorage.getItem('user'));
    if(!reporterData){
      navigate('/admin');
    }else{
      console.log(reporterData._id)
      setReporter(reporterData._id);
      const newsId = window.location.href.split('/')[5];
      console.log("NEWS ID : ",newsId)
      const myfunc = async ()=>{
          const token = JSON.parse(localStorage.getItem('token'));
          const responce = await fetch('http://localhost:5000/admin/getnews',{
              method : "get",
              headers : {
                  "Content-Type" : "application/json",
                  Authorization : `Bearer ${token}`,
                  newsId : newsId,
                },
          })
          console.log(responce)
          const myData = await responce.json();

          setSuccess(myData.success);
          setMsg(myData.message);
          setTimeout(() => {
            setSuccess(true);
          }, 2000);

          const data = myData.data;
          setId(data._id);
          setTitle(data.title);
          setReporter(data.reporter);
          setType(data.type);
          setDescription(data.description);
          setFile(data.file);
          setNews(data.news);
          setBraking(data.braking);
          console.log(title)
          console.log(description)
          console.log("-----------------------------------------------",data);
      }
      myfunc();
    }
  },[])

  const Updatenews = async (e)=>{
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const responce = await fetch('http://localhost:5000/admin/update',{
      method : "post",
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`,
      },

      body : JSON.stringify({
        id,
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

    console.log("********************************",data2)
    if(data2.success){
        navigate('/admin/allnews');
    }
  }

  return (
    <>
    <NameNavebar data = {{isLogin : true}}/>
    <Card2 data={{add_news:false, All_reporters:true, all_news:true}} />
    <div className='AdminSignup'>
        {
            success
            ?null
            : (<div className="alert alert-danger alert-dismissible">
                    <strong>Login Failed!</strong> {msg}
                </div>)   
        }
        <div className="container admin-add">
          <h2>UPDATE NEWS</h2>
          <form onSubmit={Updatenews} >
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
            {/* <div className="mb-3">
                <input type="file" id="myFile" accept='image/*' onChange={(e)=> submitImage(e.target.files[0])} name={file} required="true" />
            </div> */}
            <div className="mb-3">
                <label htmlFor="news-data" className="form-label">News Data</label>
                <textarea className="form-control" id="news-data" rows="5" value={news} onChange={(e)=> setNews(e.target.value)} required="true"  ></textarea>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
      </>
  )
}
