/* Global Variables */
let Url = "https://api.openweathermap.org/data/2.5/forecast?zip=", 
 apiKey = "&units=metric&appid=834f67f9fbd8063374b8d61f5a0fbf95",           
 generateBTn = document.querySelector("#generate"),          
 dateToday = document.querySelector("#date"),               
 tempToday = document.querySelector("#temp"),                 
 feelingToday = document.querySelector("#content"),
 d = new Date(),
  newDate=(d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getFullYear();

/* trigger a callback function with a click event on button */
generateBTn.addEventListener("click",()=>{    
    const zipValue = document.querySelector("#zip").value;
    const feelingValue = document.querySelector("#feelings").value;
    weatherInfo(Url,zipValue,apiKey) //trigger another callback function
    .then((getdata)=>{
            console.log(getdata);
            //Add data to POST request
            postData("/postData",{
                date:newDate,
                temp:getdata.list[0].main.temp, 
                content:feelingValue
            })
            updateUI(); //trigger another callback function
        })
});

// Function to GET Web API Data
const weatherInfo = async (Url,zipValue,apiKey)=>{
    const response = await fetch(Url+zipValue+apiKey)
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
    const response = await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Create JSON string from a JS object
    });
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
};

// Function to GET Project Data
const updateUI = async ()=>{
    const request = await fetch("/receivedData");
    try{
        const allData = await request.json();
        dateToday.innerText = `Date: ${allData[0].date}`;
        tempToday.innerText =  `Temperature: ${allData[0].temp}`;
        feelingToday.innerText = `I feel: ${allData[0].content}`;
    }
    catch(error){
        console.log("error",error);
    }
}