import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../context'

export default function Navbar({pageVal}) {
  // const [page, setPage] = useState("");
  const {page, setPage} = useContext(Context);

  const handleClick = (e)=>{

    // console.log("00000000000000000000",e.target.innerHTML);
      setPage(e.target.innerHTML)
  }
  

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler ms-auto w-20" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                <Link className={`nav-link ${page==="Home"?"active":""}`} aria-current="page" to="/" value="" onClick={handleClick}>Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="General"?"active":""}`} aria-current="page" to="/" value="general" onClick={handleClick} >General</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Business"?"active":""}`} aria-current="page" to="/" value="business" onClick={handleClick} >Business</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Sports"?"active":""}`} aria-current="page" to="/" value="sports" onClick={handleClick} >Sports</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Entertainment"?"active":""}`} aria-current="page" to="/" value="entertainment" onClick={handleClick} >Entertainment</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Education"?"active":""}`} aria-current="page" to="/" value="education" onClick={handleClick} >Education</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Health"?"active":""}`} aria-current="page" to="/" value="health" onClick={handleClick} >Health</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${page==="Technology"?"active":""}`} aria-current="page" to="/" value="technology" onClick={handleClick} >Technology</Link>
                </li>
            </ul>
            
            </div>
        </div>
    </nav>
    </>
  )
}
