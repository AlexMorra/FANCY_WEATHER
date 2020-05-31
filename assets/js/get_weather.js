export default function get_weather(location, lang) {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=e6737aa0836d4d5e83d192721201305&q=${location}&days=3&lang=${lang}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(response_data => response_data)
        .catch(error => console.log(error))
}