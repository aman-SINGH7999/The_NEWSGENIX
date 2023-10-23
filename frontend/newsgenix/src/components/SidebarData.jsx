import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SidebarData({val}) {
    const navigate = useNavigate();

    const handleClickDetail = (e)=>{
        e.preventDefault();
        console.log("clicked", val.val._id)
        navigate(`/news/${val.val._id}`)
    }

  return (
    <> 
        <Link to="#" style={{textDecoration:"none", color:"black"}} onClick={handleClickDetail}>
            <div>
                <h5>{val.val.title}</h5>
                <p>{val.val.description}</p>
            </div>
        </Link>
        <hr />
    </>
  )
}
