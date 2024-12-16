import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon,divIcon, map } from "leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from "leaflet"
import { Link } from "react-router-dom";
/* 
Commands: 
 npm install 16 ~para bajar de version de node
 npm install react@^18.0.0 react-dom@^18.0.0 ~para bajar de version de react
 npm install react-leaflet
 npm i react-leaflet-cluster 
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

  const pets = [
    {
      name: "Buddy",
      species: "Perro",
      breed: "Golden Retriever",
      color: "Dorado",
      gender: "Macho",
      description: "Es un perro amigable, le gusta jugar con pelotas y es muy sociable.",
      photo_1: "https://example.com/photos/buddy1.jpg",
      photo_2: "https://example.com/photos/buddy2.jpg",
      photo_3: "https://example.com/photos/buddy3.jpg",
      photo_4: "https://example.com/photos/buddy4.jpg",
      date: "2024-12-01",
      zone: "Parque Central, Ciudad",
      pet_status: "Estoy perdido",
      geocode: [-34.9059, -56.1918]
    },
    {
      name: "Luna",
      species: "Gato",
      breed: "Siames",
      color: "Blanco con manchas marrones",
      gender: "Hembra",
      description: "Es una gata tranquila, pero asustadiza con desconocidos. Lleva un collar rojo.",
      photo_1: "https://example.com/photos/luna1.jpg",
      photo_2: "https://example.com/photos/luna2.jpg",
      photo_3: "https://example.com/photos/luna3.jpg",
      photo_4: "https://example.com/photos/luna4.jpg",
      date: "2024-12-03",
      zone: "Barrio Las Flores, Ciudad",
      pet_status: "Estoy perdido",
      geocode: [-34.8428, -56.2231]
    },
    {
      name: "Max",
      species: "Perro",
      breed: "Pastor Alemán",
      color: "Negro y marrón",
      gender: "Macho",
      description: "Es un perro obediente y lleva un arnés azul.",
      photo_1: "https://example.com/photos/max1.jpg",
      photo_2: "https://example.com/photos/max2.jpg",
      photo_3: "https://example.com/photos/max3.jpg",
      photo_4: "https://example.com/photos/max4.jpg",
      date: "2024-12-05",
      zone: "Calle Principal, Ciudad",
      pet_status: "Estoy perdido",
      geocode: [-34.9115, -56.1564]
    },
    {
      name: "Mimi",
      species: "Gato",
      breed: "Persa",
      color: "Gris",
      gender: "Hembra",
      description: "Tiene el pelo largo y suave, es muy curiosa y siempre busca lugares altos.",
      photo_1: "https://example.com/photos/mimi1.jpg",
      photo_2: "https://example.com/photos/mimi2.jpg",
      photo_3: "https://example.com/photos/mimi3.jpg",
      photo_4: "https://example.com/photos/mimi4.jpg",
      date: "2024-12-06",
      zone: "Zona Comercial, Ciudad",
      pet_status: "Estoy perdido",
      geocode: [-34.7687, -55.9992]
    },
    {
      name: "Rocky",
      species: "Perro",
      breed: "Bulldog Francés",
      color: "Blanco y negro",
      gender: "Macho",
      description: "Es juguetón y siempre lleva una bufanda azul en invierno.",
      photo_1: "https://example.com/photos/rocky1.jpg",
      photo_2: "https://example.com/photos/rocky2.jpg",
      photo_3: "https://example.com/photos/rocky3.jpg",
      photo_4: "https://example.com/photos/rocky4.jpg",
      date: "2024-12-07",
      zone: "Parque de los Patos, Ciudad",
      pet_status: "Estoy perdido",
      geocode: [-34.9271, -56.1588]
    }
  ];
  
// const createCustomClusterIcon = (cluster) => {
  //   return new divIcon({
  //     html: <div></div>
  //   })
  // }
  

    const getStatusClass = (status) =>{
      switch (status){
 //       case "Encontrado":
   //     return "bg-success";
        case "Estoy perdido":
          return "bg-danger"; // Rojo
     //   case "Buscando a su familia":
    //      return "bg-warning"; // Amarillo
   //     default:
    //      return "bg-secondary"; // Gris
      }
    };


  return (
    <MapContainer center={[-34.91709426939976, -56.16318765994477]} zoom={13} style={{width: "100vw", height:"100vh"}}> //Asi se centra el mapa en un lugar: -34.91709426939976, -56.16318765994477
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
      >
      </TileLayer>
      <MarkerClusterGroup
      chunkedLoading
      // iconCreateFunction={createCustomClusterIcon}
      > //Esto es para agrupar los markers. chunkedLoading es para la performance
      {pets.map(pet => (
        <Marker position={pet.geocode} icon={CustomIcon}>
          <Popup>
            <div className="card-body h-auto">
       <div classname="rounded" > 
            <img className="img-fluid" src='https://www.akc.org/wp-content/uploads/2020/07/Golden-Retriever-puppy-standing-outdoors-500x486.jpg'></img>
            <Link to="" style={{ textDecoration: 'none' }} ><p className={`mt-0 text-center text-light text-uppercase bold ${getStatusClass(pet.pet_status)}`}>{pet.pet_status}</p></Link>
            </div>
              <ul className="list adlam-display  ">
              <li>
                  <span className=' fw-bold'>Nombre: </span><span className="text-black">{pet.name}</span>
                </li>          
                   <li>
                  <span className='fw-bold'>Sexo: </span><span className="text-black">{pet.gender}</span>
                </li>
                <li>
                  <span className='fw-bold'>Raza: </span><span className="text-black">{pet.breed}</span>
                </li>
                <li>
                  <span className='fw-bold'>Color: </span><span className="text-black">{pet.color}</span>
                </li>
   
                <li>
                  <span className='fw-bold'>Especie: </span><span className="text-black">{pet.species}</span>
                </li>
              </ul>
              
            </div>
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default Map
