import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  axios  from "axios"
export default function request() {

const _URL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%20B08LweSGKH0PzBZYR5S5ujwA4D926Esy%20&q=37.42%2C-122.084"

const myFetch = fetch(_URL);

myFetch(_URL).then(function(response) {
    if(response.ok) {
      response.json().then(function(json) {
        _URL = json;
        initialize();
      });
    } else {
      console.log('Network request for _URL failed with response ' + response.status + ': ' + response.statusText);
    }
  });
  


  return (
    <View>
      <Text>request :</Text>
    </View>
  )
}

const styles = StyleSheet.create({})