import React from 'react';
import WrappedMap from './parts/map.js';
import Weather from './parts/weather.js';


class App extends React.Component{

  constructor(props){
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let newDate = new Date()
    
    this.date = newDate.getDate();
    this.month = newDate.getMonth() ;
    this.time = newDate.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true })
    this.state = {
      latitude:null,
      longitude:null,
      userAddress:null,
      country:null,
    };
    this.getLocation = this.getLocation.bind(this)
    this.getCoordinates= this.getCoordinates.bind(this)
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this)
  }
  
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates,this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getCoordinates(position)
  {
    this.setState({
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    this.reverseGeocodeCoordinates()
  }
 
  reverseGeocodeCoordinates() {
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyBYAyWmzwqFn2kE11uQQDNTXa3yJv9hCoo`)
    .then(response => response.json())
    .then((data) => 
      this.setState({
      
      userAddress:data.results[11].formatted_address,
      country:data.results[13].formatted_address
    })
    )
    .catch(error => alert(error))
  }
 
  handleLocationError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
    }
  }
  componentDidMount() {
  }

  componentDidUpdate() {
  }
 
 render() {
    return (
      <div>
        <div style={{ margin:'40px' }}>
          <div  className="App">
            
            <button style={{color:'white',backgroundColor:'magenta'}} onClick={this.getLocation}>Show my address</button>
            <p style={{ fontSize :'15px', color:'red' }}> {this.time}, {this.months[this.month]} {this.date}</p>
            <p style={{ fontSize :'20px' }}>{this.state.userAddress}</p>
          </div>
          <Weather lat={this.state.latitude} lng={this.state.longitude} />
        </div>
        
        <div style={{width:'30vw', height:'50vh', marginRight:'150px',position:'relative', float:'right'}}>
          {
              this.state.latitude && this.state.longitude ?
                <WrappedMap lat={this.state.latitude}
                  lng={this.state.longitude}
                  googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYAyWmzwqFn2kE11uQQDNTXa3yJv9hCoo`}
                  loadingElement = {<div style={{ height:"100%" }} />}
                  containerElement = {<div style={{ height:"100%" }} />}
                  mapElement = {<div style={{ height:"100%" }} />}
                />
              :
              null
          }
        </div>
        
      </div>
    )
  }
  
}
export default App;
