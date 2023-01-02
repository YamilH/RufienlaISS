const mymap = L.map('ISSMap').setView([0, 0], 1);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);


const ISSIcon = L.icon({
    iconUrl: 'rufiprueba.png',
    iconSize: [70, 70],
    iconAnchor: [25, 25],
});
const marker = L.marker([0, 0], {icon: ISSIcon}).addTo(mymap);



const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
    mymap.setView([latitude, longitude], 3);
        firstTime = false;
    }
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    
    
    console.log(latitude);
    console.log(longitude);
}





getISS();

setInterval(getISS, 1000);


function play() {
    const audio = document.getElementById('audio');
    audio.play();
}

