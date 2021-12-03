import React, {useState,useEffect} from 'react';

//This is weather component
function Weather(props) {
  const apiKey = "9ce3bc3b64d3ea837ba94b1b01a918e7";
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [temp, setTemp] = useState(0);
  const [next, setNext] = useState([]);

  useEffect(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lng}&appid=${apiKey}`

    ).then((response) => response.json())
    .then((data) => {
      setTemp((data.main.temp-273.15).toFixed(2))
    }
    
    )
    .catch((error) => console.log(error))
  });
  function fetchnextdays()
  {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lng}&appid=9ce3bc3b64d3ea837ba94b1b01a918e7`

    ).then((response) => response.json())
    .then((data) => {
      
      let j=0;
      for(let i=0;i<3;i++)
      {
        const s=data.list[j].dt_txt;
        const date=s.substr(8,2)
        const month = months[parseInt(s.substr(6,2))-1];
        const tempe = ((data.list[j].main.temp-273.15).toFixed(2))
        const desc= data.list[j].weather[0].description
        const p = (month +" "+ date + ",           " + tempe + " °C   ,"+ desc )
        setNext(oldArray => [...oldArray, p]);
        j+=8;
      }
      
    })
    .catch((error) => console.log(error))
  }
 
  return (
    <div style={{float:'left'}}>
      <div style={{fontSize:'30px'}}>{temp} °C</div>

      <button style={{marginTop:'20px'}} onClick={fetchnextdays}>Next 3 Days Forecast</button>
      <p style={{fontSize:'20px'}} >
        {next[0]}
      </p>
      <p style={{fontSize:'20px'}} >
        {next[1]}
      </p>
      <p style={{fontSize:'20px'}} >
        {next[2]}
      </p>
    </div>
  );
}

export default Weather;