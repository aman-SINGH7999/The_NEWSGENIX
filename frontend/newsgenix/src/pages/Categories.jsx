import React, {useState, useEffect} from 'react'
import NameNavebar from '../components/NameNavebar'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import BACKEND_URL from '../path'

export default function Categories() {
 const [mynews, setMynews] = useState({});

  useEffect(()=>{
    // console.log("clint : ",window.location.href)
    const newsId = window.location.href.split('/')[4];
    // console.log("clint : ",newsId)
    const getNews = async ()=>{
        const responce = await fetch(`${BACKEND_URL}/api/news`,{
          method : "get",
          headers : {
            "Content-Type" : "application/json",
            newsId : newsId,
          }
        })
        const data = await responce.json();
        if(data.success){
          setMynews(data.data);
        }
    }
    getNews();
  },[])

  return (
    <>
    <NameNavebar data = {{isLogin : false, clint : true}}/>
    <div className='container'>
      <Navbar/>
      <div><Hero /></div>
      <div className='row'>
          <div className="col-sm-10 m-auto my-3">
            <div className='h3'>{mynews.title}</div>
            <div className=''><img src={mynews.file} alt="" className='news-image'/></div>
            <div>{mynews.description}</div>
            <div>{mynews.news}</div>
          </div> 
        </div>
      </div>
      <Footer />
    </>
    
  )
}
