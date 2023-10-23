import React from 'react'
import {useNavigate} from 'react-router-dom'



export default function Card({data}) {
    const navigate = useNavigate();

    const handleAddNews = (e)=>{
        e.preventDefault();
        navigate('/admin/addnews');
    }
    const handleAllReporters = (e)=>{
        e.preventDefault();
        navigate('/admin/allreporters');
    }

    const handleAllNews = (e)=>{
        e.preventDefault();
        navigate('/admin/allnews');
      }
  return (
    
    <div className='all-news'>
        {
            data.add_news ? <button className='btn float-end all-news-btn' onClick={handleAddNews}>Add News</button> : null
        }
        {
            data.All_reporters ? <button className='btn float-end all-news-btn mx-2' onClick={handleAllReporters}>All Reporters</button> : null
        }
        {
            data.all_news ? <button className='btn float-end all-news-btn mx-2' onClick={handleAllNews}>All News</button> : null
        }
    </div>               
  )
}
