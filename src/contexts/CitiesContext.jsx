import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'

function CitiesProvider({children}){
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setIsCurrentCity] = useState({})
  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // console.log(data);
        setCities(data)
      } catch (e) {
        alert('There is an error in fetching cities')
      } finally { 
        setIsLoading(false)
      }
    }
    fetchCities()
  },[])
  async function getCity(id){
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setIsCurrentCity(data)
      } catch (e) {
        alert('There is an error in fetching cities')
      } finally { 
        setIsLoading(false)
      }
    }
    return(
        <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            setCities,
            currentCity,
            setIsCurrentCity,
            getCity
        }}
        >
            {children}
        </CitiesContext.Provider>
    )
}
function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) //occurs when we try to access this context outside the children comp of provider
      throw new Error('CitiesContext was used outside of the CitiesProvider')
    return context
}
export {CitiesProvider, useCities}