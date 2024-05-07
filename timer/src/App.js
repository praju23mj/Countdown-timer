import './App.css';
import {useState,useEffect} from "react";

function App() {

  const [selectedDate, setSelectedDate]=useState(0);
  const [days,setDays]=useState(0);
  const [hours,setHours]=useState(0);
  const [mins,setMins]=useState(0);
  const [sec,setSec]=useState(0);
  const [error, setError] = useState(false);
  const[over,setOver]=useState(false);
  const [isRunning,setIsRunning]=useState(false)



  useEffect(() => {
    let interval;

    if (isRunning && selectedDate) {
      const calculateTime = () => {
        const time = selectedDate - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        if (days <= 99) {
          if(time>0){
            setHours(Math.floor(time / (1000 * 60 * 60) % 24));
            setMins(Math.floor((time / 1000 / 60) % 60));
            setSec(Math.floor((time / 1000) % 60));
          }else{
            clearInterval(interval);
            setDays(0);
            setOver(true);
          }
          
        } else {
          setIsRunning(false);
          clearInterval(interval);
          setError(true);
        }
      };

      interval = setInterval(calculateTime, 1000);
      calculateTime();
    }

    return () => clearInterval(interval);
  }, [selectedDate, isRunning, days]); 


  const handleClick=()=>{
    setIsRunning(!isRunning)


  }


  return (
    <div className="App">
      <div className="header"> 
      <h1><span className='head1'>Countdown</span> <span className='head2'>Timer</span></h1>
      </div>
      <div className="fill">
        <input type="datetime-local" id="meeting" onChange={(e)=>setSelectedDate(Date.parse(e.target.value))}/>
      </div>
      <div className="btn">
        <button onClick={handleClick}>
        {isRunning ? "Cancel Timer" : "Start Timer"}
        </button>
      </div>
      {over?(<p className="end">  &#127881; The Countdown is over! What's next on your adventure?  &#127881;</p>):error ? (
        <h3>Selected time is more than 100 days</h3>
      ):(
      <div className="display">
        <div className="display-box">
          <p>{days}</p>
          <p className='filt'>Days</p>
        </div>
        <div className="display-box">
          <p>{hours}</p>
          <p className='filt'>Hours</p>
        </div>
        <div className="display-box">
          <p>{mins}</p>
          <p className='filt'>Minutes</p>
        </div>
        <div className="display-box">
          <p>{sec}</p>
          <p className='filt'>Seconds</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
