import { Button, LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import  axios  from "axios"

import { requestGet } from './util/http'
export default function App() {

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [localisationFetch, setLocalisationFetch] = useState({ville: "", pays: ""})
  const [localisationAxios, setLocalisationAxios] = useState({ville: "", pays: ""})
  const [getPosition, setGetPosition] = useState(true)
  // const _URL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%20B08LweSGKH0PzBZYR5S5ujwA4D926Esy%20&q=-3.5662%2C%2023.3522"

  useEffect(()=>{
    Geolocation.requestAuthorization()
    Geolocation.getCurrentPosition( position=> {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    },
    error => console.log(error),
    {enableHighAccuracy : true, timeout : 20000, maximumAge: 1000}
    )
    // Geolocation.watchPosition(
    //     position=> {
    //       setLatitude(position.coords.latitude)
    //       setLongitude(position.coords.longitude)
    //     },
    //     error => console.log(error),
    //     {enableHighAccuracy : true, timeout : 20000, maximumAge: 1000}
    // );

  },[getPosition])
  const _API_KEY = "B08LweSGKH0PzBZYR5S5ujwA4D926Esy"
  const _URL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${_API_KEY}&q=${latitude}%2C${longitude}`

  function getApiWithFetch(){
  console.log("demande API with Fetch");
  console.log(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${_API_KEY}&q=${latitude}%2C${longitude}`)
  fetch(_URL)
  .then(response => response.json())
  .then(data => setLocalisationFetch({ville: data.LocalizedName, pays: data.Country.LocalizedName}))
  .catch(error => console.error(error))
  }

  function getApiWithAxios(){
    console.log(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${_API_KEY}&q=${latitude}%2C${longitude}`);
    axios.get(_URL)
    .then(response => setLocalisationAxios({ville : response.data.LocalizedName, pays: response.data.Country.LocalizedName}))
    .catch(error => console.error(error))
  }

  function reload(){
    setGetPosition(state => !state)
  }
  return (
    <View style={styles.bg}>
      <Button title="get coord" onPress={reload}></Button>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitutde: {longitude}</Text>
      <Button title="Get LOcalisation with Fetch" onPress={getApiWithFetch}></Button>
      <Text>Localisation : {localisationFetch.pays},{localisationFetch.ville}</Text>
      <Button title="Get LOcalisation with Axios" onPress={getApiWithAxios}></Button>
      <Text>Localisation : {localisationAxios.pays},{localisationAxios.ville}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  bg : {
    flex:1,
    backgroundColor: "grey",
  }
})