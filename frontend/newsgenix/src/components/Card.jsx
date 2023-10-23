import React from 'react'
import {format} from 'timeago.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Card({data}) {
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        console.log("clicked", data)
        navigate(`/news/${data._id}`)
    }

  return (
    <> 
        <Link to ="#" style={{textDecoration:"none", color:"black"}} onClick={handleClick}>
            <div className="card mb-3" >
            <div className="row g-0">
                <div className="col-md-4">
                <img src={data.file} className="img-fluid rounded-start" alt="..." style={{height : "200px"}}/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                </div>
                <p className='ms-3'> Update : {format(data.updatedAt)} </p>
                </div>
            </div>
            </div>
        </Link>
    </>
  )
}
