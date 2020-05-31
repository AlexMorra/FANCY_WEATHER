let images = {};
let page = null;
let body = document.querySelector('body');
let btn_image = document.querySelector('.btn-image');

btn_image.addEventListener('click', refresh_image);

function refresh_image() {
    btn_image.removeEventListener('click', refresh_image);

    btn_image.classList.add('rotate');
    if (images.length) {
        body.style.backgroundImage = `url(${images.shift().urls.regular})`;
    } else {
        page += 1;
        get_images(page);
    }
    setTimeout(() => {
        btn_image.classList.remove('rotate');
        btn_image.addEventListener('click', refresh_image);
    }, 1000);
}

export default function get_images(current_weather) {
    // random page 0 - 50
    page = Math.floor(Math.random() * Math.floor(50));
    return fetch(`https://api.unsplash.com/search/photos?page=${page}&query=weather-${current_weather}&orientation=landscape&client_id=1TaQNdgdl0WFy2fd3rmPi7SrRJmYM_WlFR5vgUcOcZw`)
        .then(response => response.json())
        .then(response_data => {
            images = response_data.results;
            images.sort(() => 0.5 - Math.random());
            body.style.backgroundImage = `url(${images.shift().urls.regular})`;
        }).catch(error => console.log(error))
}