
const currentTime= document.getElementById('time');
const todayday= document.getElementById('day');
const todaysDate= document.getElementById('date');
const currentTimeZone= document.getElementById('timezone');
const currentinfo = document.getElementById('weatherinfo');
const humidity = document.getElementById('humidity');
const other = document.getElementById('future');
const today = document.getElementById('current');


const API_KEY = '9158c8369ff384284f960a1d00eafa39' ;

const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const day = new Array();
day[1] = "Monday";
day[2] = "Tuesday";
day[3] = "Wednesday";
day[4] = "Thursday";
day[5] ="Friday";
day[6] = "Saturday";
day[7] = "Sunday";



  

  setInterval(() => {
    let d1 = new Date();
    
      currentTime.innerHTML =( (d1.getHours()) < 10 ? "0"+ (d1.getHours()) : (d1.getHours()) ) +":"+ ( ( d1.getMinutes() ) < 10 ? "0" + ( d1.getMinutes() ) : (d1.getMinutes() ) );
      todayday.innerHTML=   day[d1.getDay()];
     todaysDate.innerHTML = (  ( d1.getDate() ) < 10 ? "0" +(d1.getDate()) : (d1.getDate()) )+" "+ (month[d1.getMonth()]+" "+ d1.getFullYear());
    

     }, 0000);



   getweatherdata();

function getweatherdata(){
   
navigator.geolocation.getCurrentPosition((success)=>{
console.log(success);
  
let { latitude , longitude } =success.coords;
  
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data =>{
       
console.log(data);
 showdata(data);
 


   
  }
 )
       
})
}
  
  



  function showdata(data){

    let{humidity,pressure,sunrise,sunset,wind_speed,} =  data.current;


    
     
   currentTimeZone.innerHTML = data.timezone;
 

   
   
    currentinfo.innerHTML = 
     ` <div id="humidity">
     <div> Humidity :</div>
     <div> ${humidity}</div>
     </div>

     <div id="pressure">
     <div> Pressure :</div>
     <div> ${pressure} </div>
     </div>
     
     <div id="windspeed">
     <div>Wind speed :</div> 
     <div> ${wind_speed} </div>
     </div>

     <div id="sunrise">
     <div> Sunrise :</div>
     <div> ${window.moment(sunrise * 1000).format(`HH:mm a`)} </div>
     </div>
     
     <div id="sunset">
      <div> Sunset :</div>
      <div> ${window.moment(sunset * 1000).format(`HH:mm a`)} </div>
     </div> `;
 
   
  

       let otherforcast= '';
      
         
       data.daily.forEach((day , idx ) => {
           if(idx == 0)
           {
           today.innerHTML = ` <div class="days">${window.moment(day.dt*1000).format(`ddd`)}</div>
           <img src="/image/weatericon.png" alt="icon">
          <div class="day">Day :${day.temp.day}&#176; C</div>
          <div class="night">Night :${day.temp.night}&#176; C</div> 
          `;
          
        
           }

            else{
                otherforcast +=  ` 
  
                <div class="current">
                <div class="days">${window.moment(day.dt*1000).format(`ddd`)}</div>
               <img src="/image/weatericon.png" alt="icon">
                <div class="day">day : ${day.temp.day}&#176; C</div>
                <div class="night">night : ${day.temp.night}&#176; C</div>
                   </div> 
                  
               
                `;
               

                
              
            }
    


        }
       )
        
         other.innerHTML =  otherforcast;
     
    }