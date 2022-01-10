/* Global Variables */
let Url = "https://api.openweathermap.org/data/2.5/forecast?zip=", 
 apiKey = "&units=imperial&appid=834f67f9fbd8063374b8d61f5a0fbf95",           
 generateBTn = document.querySelector("#generate"),          
 dateToday = document.querySelector("#date"),               
 tempToday = document.querySelector("#temp"),  
 city = document.querySelector("#city"),  
 error = document.querySelector("#error"),                 
 country = document.querySelector("#country"),                
 feelingToday = document.querySelector("#content"),
 d = new Date(),
  newDate=(d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear();

/* trigger a callback function with a click event on button */
generateBTn.addEventListener("click",()=>{    
    const zipValue = document.querySelector("#zip").value;
    const feelingValue = document.querySelector("#feelings").value;
    const fullUrl = `${Url}${zipValue}${apiKey}`;
    weatherInfo(fullUrl,zipValue) //trigger another callback function
    .then((getdata)=>{
            postData("/postData",{
                date:newDate,
                city:getdata.city.name,
                country:getdata.city.country,
                temp:`${getdata.list[0].main.temp} °F`, 
                content:feelingValue
            })
            updateUI(); //trigger another callback function
            
        })
});

// Function to GET Web API Data
const weatherInfo = async (Link,zipC)=>{
    if(zipC.length != 5 ){
        error.innerText = "Enter a valid zip code value";
         return false;
     }
    const response = await fetch(Link) 
    try{
        const getdata = await response.json();  
            return getdata;   
    }
    catch(error){
        console.log("error",error);
    }

};

// Function to POST Web API Data
const postData = async (url="",data = {})=>{
    console.log(data);
    const res = await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) 
    });
    try{
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
};

// Function to GET Project Data
const updateUI = async ()=>{
    const req = await fetch("/receivedData");
    try{
        const allData = await req.json();
        dateToday.innerText = `Date: ${allData[0].date}`;
        city.innerText =  `City: ${allData[0].city}`;
        country.innerText = `Country: ${allData[0].country}`;
        tempToday.innerText =  `Temperature: ${allData[0].temp}`;
        feelingToday.innerText = `I feel: ${allData[0].content}`;
    }
    catch(error){
        console.log("error",error);
    }
}