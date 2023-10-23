import React,{useEffect, useState, useContext} from 'react'
import NameNavebar from '../components/NameNavebar'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import {Context} from '../context'
import BACKEND_URL from '../path'

export default function Home() {
  const [data, setData] = useState([]);
  const [view, setView] = useState(false);
  const [toggle, setToggle] = useState('View more');

  const {page, setPage} = useContext(Context);

  const handleClick = ()=>{
      setView(!view);
      if(!view){
          setToggle("Close");
      }else{
          setToggle('View more');
      }
  }

  useEffect( ()=>{
    const getData = async ()=>{
      // console.log(`${BACKEND_URL}/api`)
        const responce = await fetch(`${BACKEND_URL}/api`,{
          method : "get",
          headers : {
            "Content-Type" : "application/json",
          }
        })
        const alldata = await responce.json();
        if(alldata){
          setData(alldata.data)
          // console.log("..my data : ",alldata.data)
          // console.log("..Set data : ",data)
        }
    }
    getData();
  },[])

  

  return (
    <>
    <NameNavebar data = {{isLogin : false, clint : true}}/>
    <div className='container'>
      <Navbar />
      <div><Hero /></div>
      <div className='row'>
          <div className='col-sm-4 '>
            <Sidebar data = {{data}}/>
              
          </div>
          <div className="col-sm-8 my-3">
              <h3>Latest News</h3>
              {
                data 
                ? data.filter((val)=> (page.toLowerCase() === "home" || val.type.toLowerCase() === page.toLowerCase()) ).map((val,ind)=>{
                  return (
                    <>
                {
                    ind < 10
                    ?
                    <> 
                        <Card  data={val}/>
                    </>
                    : view
                    ? 
                    <>  
                        <Card  data={{
                          title : val.title,
                          file : val.file,
                          description : val.description,
                          news : val.news,
                        }}/>
                    </>
                    : null
                }
                </>  
                  )
                })
                : null
              }
              
              <hr />
              <Link to='#' className='container-fluid d-flex flex-column justify-content-center align-items-center ' style={{width:"100%"}} onClick={handleClick}>{toggle}</Link>
          </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
