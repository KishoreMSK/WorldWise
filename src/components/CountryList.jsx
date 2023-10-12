import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

export default function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr,city) => 
    {if(!arr.map((el) => el.country).includes(city.country))
        return [...arr,{country: city.country,emoji: city.emoji}]
    else 
       return arr}
    ,[])

  return <ul className={styles.countryList}>
    {countries.map((country,i) => (
        <CountryItem country={country} key={i}/>
    ))}
  </ul>;
}
