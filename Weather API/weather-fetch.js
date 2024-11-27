function start(){
    const btnGetData = document.getElementById('btn');
    btnGetData.onclick = getForecastData;
}

async function getForecastData(){
    let searchTerm = document.getElementById('search').value;
    let outputSpan = document.getElementById('output');
    let wrongOutputSpan = document.getElementById('wrong-output');
    //console.log("\u{1F600}");
    outputSpan.style.display = "block";
    wrongOutputSpan.style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=7ff14b53c5883e2ce2c82dfda3e89fc8`;

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        let currentTemp = convertToCelcius(data.main.temp);
        let feelsLike = convertToCelcius(data.main.feels_like);

        outputSpan.innerHTML = "<b>" + data.name + ", " + data.sys.country + "</br></br>"
                             + currentTemp + "°C </b></br>"
                             + "Feels like " + feelsLike + "°C, " + data.weather[0].description + ", " + data.wind.speed + " speed of wind.</br>"

    }catch(error){
        outputSpan.style.display = "none";
        wrongOutputSpan.style.display = "block";
        console.error(error);
    }

}

function convertToCelcius(kelvin){
    return (kelvin - 273).toFixed(1);
}

setInterval(getForecastData,3600000);

window.onload = start;
