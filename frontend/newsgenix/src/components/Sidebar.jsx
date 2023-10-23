import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import SidebarData from './SidebarData';

export default function Sidebar({data}) {
    const [view, setView] = useState(false);
    const [toggle, setToggle] = useState('View more');
    
    const handleClick = ()=>{
        setView(!view);
        if(!view){
            setToggle("Close");
        }else{
            setToggle('View more');
        }
    }

  return (
    <div className='sidebar border my-3'>
    <h3>Breaking News</h3>
    <hr />
    {
        data
        ? data.data.map((val, ind)=>{
            return (
                <>
                {
                    ind < 7 && val.braking.toLowerCase() === "yes"
                    ? <SidebarData val={{val}} />
                    : view && val.braking.toLowerCase() === "yes"
                    ? <SidebarData val={{val}} />
                    : null
                }
                </>
                )
            })
        : null
    }
    <Link to="#" className='container-fluid d-flex flex-column justify-content-center align-items-center ' style={{width:"100%"}} onClick={handleClick}>{toggle}</Link>
    </div>
  )
}
