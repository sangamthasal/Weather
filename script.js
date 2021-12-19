

const API_KEY = '9158c8369ff384284f960a1d00eafa39' ;






function datetime(){

 
    let daandti = new Date();
  time = daandti.getHours() +":"+ daandti.getMinutes();
   
  document.getElementById('time').innerHTML =  time ;
    


} setInterval(datetime , 0000);


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




let element = document.createElement('h3');
 element.id="date";
 let d = new Date();
 let day = document.createTextNode(d.getFullYear() +" "+ month [d.getUTCMonth()] +" "+d.getDate());

  element.appendChild(day);
   
    document.getElementById('block').appendChild(element);



 


function getweatherdata(){
   
  navigator.geolocation.getCurrentPosition((success)=>{
     console.log(success);

     let { latitude , longitude } =success.coords;

     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res=>res.json()).then(data =>{
               
               console.log(data);
            })
     
  })
}

getweatherdata();