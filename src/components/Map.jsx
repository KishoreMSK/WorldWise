import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
export default function Map() {
  const {cities} = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(()=>{
    if(mapLat && mapLng)
        setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
        <Marker position={[city.position.lat, city.position.lng]}key={city.id}>
          <Popup>
            <span>{city.emoji}</span><span>{city.cityName}</span>
          </Popup>
        </Marker>)
        )}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}
//As the mapContainer wont update automatically so we need to create custom component to change the position value dynamically
function ChangeCenter({position}){
    const map = useMap(); //usemap allows us to get access the current position of the map
    map.setView(position); //setview will set the position in map
    return null
}

function DetectClick(){
  const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?${e.latlng.lat}&${e.latlng.lng}`)
    })
}