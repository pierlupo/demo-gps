import  axios  from "axios"


const URL ="http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%20B08LweSGKH0PzBZYR5S5ujwA4D926Esy%20&q=37.421998%2C%20-122.084"

export async function requestGet(){
    const response = await axios.get(URL)

    const dataget = []
    for(const key in response.data){
        const responseObj = {
            id : key,
            country : response.data[key].country,
            GeoPosition : response.data[key].GeoPosition,
        };
        dataget.push(responseObj)
    }
    return dataget;
}


export async function requestGetWithResponse(data){
    const response = await axios.get(URL,data)
    // .name pour recup la clé firebase
    const id = response.data.country
    return id;
}
