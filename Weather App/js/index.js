

function showSuccessMessage() {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('weatherResult').style.display = 'block';

}


function showErrorMessage() {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('weatherResult').style.display = 'none';
}

//downloader
async function getW() {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('weatherResult').style.display = 'none';
    document.getElementById('weatherResult').innerHTML = '';
    document.getElementById('error-message').innerHTML = '';
    const apiK = '83082ac72b80bd863d27b13a296add21';
    const city = document.getElementById('cityInput').value;
    if (city) {
        const cityS = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apiK;
        try {
            const rCityS = await fetch(cityS);
            const JSONrS = await rCityS.text();
            const JSONcs = JSON.parse(JSONrS);
            document.getElementById('weatherResult').innerHTML = 'Looking up '+city+'...';
            showSuccessMessage();
            const lon = String(JSONcs[0].lon);
            const lat = String(JSONcs[0].lat);
            const weaR = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apiK;
            const rWearF = await fetch(weaR);
            const JSONwf = await rWearF.text();
            const JSONwr = JSON.parse(JSONwf); 
            console.log(JSONwr);
            const Wmain = JSONwr.weather[0].main;
            const WmainD = JSONwr.weather[0].description;
            const mTemp = JSONwr.main.temp
            const FeelLike = JSONwr.main.feels_like  
            console.log(Wmain+''+mTemp+''+FeelLike); 
            
            
            document.getElementById('weatherResult').innerHTML ='Weather :'+Wmain+'<br>'+'Description : '+WmainD+'<br>'+'Temperature : '+mTemp+'<br>'+'Feels like: '+FeelLike;
            showSuccessMessage();
            
        } catch (error) {
            document.getElementById('error-message').innerHTML = '<strong>Error : </strong>'+error;
            showErrorMessage();
        }
    } else {
        document.getElementById('error-message').innerHTML = '<strong>Error : </strong>'+'Enter city name!';
        showErrorMessage();
    }
}