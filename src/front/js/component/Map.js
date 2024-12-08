import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon,divIcon } from "leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from "leaflet"
/* 
Commands: 
 nvm install 16 ~para bajar de version de node
 npm install react@^18.0.0 react-dom@^18.0.0 ~para bajar de version de react
 npm install react-leaflet
 npm i react-leaflet-cluster 


var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20

  https://tile.openstreetmap.org/{z}/{x}/{y}.png
});




 */
const Map = () => {
  const MarcadorDePrueba = { geocode: [-34.90937546329044, -56.17280532526599], popUp: "Hola soy un marcador de prueba" }
  const MarcadorDePrueba2 = { geocode: [-34.91158014490245, -56.16774456039812], popUp: "Hola soy el  marcador de prueba 2" }
  //Para agregar un icono personalizado:
  const CustomIcon = L.divIcon({
    html: '<i class="fa-solid fa-paw"></i>',
    className: "custom-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  })



  // const createCustomClusterIcon = (cluster) => {
  //   return new divIcon({
  //     html: <div></div>
  //   })
  // }

  return (
    <MapContainer center={[-34.91709426939976, -56.16318765994477]} zoom={13}> //Asi se centra el mapa en un lugar: -34.91709426939976, -56.16318765994477
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
      >
      </TileLayer>

      <MarkerClusterGroup
      chunkedLoading
      // iconCreateFunction={createCustomClusterIcon}
      > //Esto es para agrupar los markers. chunkedLoading es para la performance
      <Marker position={MarcadorDePrueba.geocode} icon={CustomIcon}>
        <Popup>
          <h5>Se perdio Dobby</h5>
          <ul>
            <li>Nombre: Dobby</li>
            <li>Raza: Labrador</li>
            <li>Sexo: Masculino</li>
          </ul>
        </Popup>
      </Marker>
      <Marker position={MarcadorDePrueba2.geocode} icon={CustomIcon}>
        <Popup>
          {MarcadorDePrueba2.popUp}
        </Popup>
      </Marker>
      </MarkerClusterGroup>
      
    </MapContainer>
  )
}

export default Map
