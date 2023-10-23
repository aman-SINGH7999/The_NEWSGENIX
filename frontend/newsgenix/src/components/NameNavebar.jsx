import React ,{useState, useEffect, useRef} from 'react'
import { Link, useNavigate} from 'react-router-dom'

export default function NameNavebar({data}) {
  const navigate = useNavigate();
  const newDate = new Date();
  // console.log("-------------------",newDate.current.getFullYear())
  const [currentHours, setCurrentHours] = useState(newDate.getHours());
  const [currentMinutes, setCurrentMinutes] = useState(newDate.getMinutes());
  const [currentSeconds, setCurrentSeconds] = useState(newDate.getSeconds());
  const [day, setDay] = useState(newDate.getDay());
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(newDate.getFullYear());
  const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  setInterval(() => {
    const date = new Date();
    setCurrentHours(date.getHours());
    setCurrentMinutes(date.getMinutes());
    setCurrentSeconds(date.getSeconds());
    setDay(date.getDate());
    setYear(date.getFullYear());
    setMonth(monthName[date.getMonth()]);
    // console.log(day);
  }, 1000);

  const logout = (e)=>{
      e.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/admin');
  }
  const apply = (e)=>{
    e.preventDefault();
    navigate('/admin');
  }
  return (
    <>
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid main-navbar ">
                <Link className="navbar-brand" to="/">
                    NEWSGENIX
                </Link>
                <div className=''>
                {
                  data.clint 
                  ? <div className='Navbar-btn'><button className='btn btn-navbar' onClick={apply}>Reporter</button></div>
                  : null
                }
                {
                  data.isLogin 
                  ? <div className='Navbar-btn'><button className='btn btn-navbar' onClick={logout}>Logout</button></div> 
                  : null
                }
                <div className='text-white'>{day} {month} {year}  {currentHours}:{currentMinutes}:{currentSeconds}</div>
                </div>
        </div>
        </nav>
    </div>
    </>
  )
}
