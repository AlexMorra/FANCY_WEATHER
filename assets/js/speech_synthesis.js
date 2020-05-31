let speech_btn = document.querySelector('.fa-volume-up');
speech_btn.addEventListener('click', speech_handler);

let volue_el = document.querySelector('.volume');
let volume = 0.5;
volue_el.textContent = `${volume * 100}%.`;

// INIT SpeechRecognition
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
export let control_recognition = new window.SpeechRecognition();
control_recognition.lang = 'ru-RU';
control_recognition.continuous = true;
control_recognition.start();

const synth = window.speechSynthesis;

function speech_handler() {
    speech_btn.classList.add('microphone-active');
    let language = document.querySelector("input[name=language]:checked").value;
    let city = document.querySelector('.location-name').textContent;
    let country = document.querySelector('.location-country').textContent;
    let date_time = document.querySelector('.weather-date').textContent;
    let date = date_time.split(' ').slice(0,3).join(' ');
    let time = date_time.split(' ').slice(-1)[0].slice(0,5);
    let degrees = document.querySelector('.weather-today-temp').textContent;
    let details = [...document.querySelector('.weather-details').children];
    let details_text = details.reduce((acc, el) => acc += el.textContent + '. ', '');
    let message = new SpeechSynthesisUtterance(`${city}${country}. ${date}, ${time}. ${degrees}°. ${details_text}`);
    message.lang = language;
    message.volume = volume;
    language === 'ru' ? message.rate = 1 : message.rate = 0.8;
    setTimeout(() => synth.speak(message), 250);
    message.addEventListener('end', () => {
        window.speechSynthesis.cancel();
        speech_btn.classList.remove('microphone-active');
    })
}

// VOICE CONTROL
window.addEventListener('load', voice_control);

function voice_control() {
    let speech_btn = document.querySelector('.fa-volume-up');
    control_recognition.onresult = (event) => {
        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            let transcript = event.results[i][0].transcript;
            if (transcript.toLowerCase().includes('скажи погоду')) speech_handler();
            if (transcript.toLowerCase().includes('сделай тише')) {
                speech_btn.style.transition = '0.5s all';
                speech_btn.style.color = 'yellow';
                setTimeout(() => speech_btn.style.color = 'white', 500);
                volume = +(volume - 0.1 < 0 ? 0 : volume - 0.1).toFixed(1);
            }
            if (transcript.toLowerCase().includes('сделай громче')) {
                speech_btn.style.transition = '0.5s all';
                speech_btn.style.color = 'green';
                setTimeout(() => speech_btn.style.color = 'white', 500);
                volume = +(volume + 0.1 > 1 ? 1 : volume + 0.1).toFixed(1);
            }
            setTimeout(() => speech_btn.removeAttribute('style'), 1000);
            volue_el.textContent = `${volume * 100}%.`
        }};
}
