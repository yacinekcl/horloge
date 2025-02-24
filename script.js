
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('sec');
const ampmElement = document.getElementById('ampm');
const dateElement = document.getElementById('date');
const formatToggleBtn = document.getElementById('format-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');
const imageUploadInput = document.getElementById('image-upload');


let is24HourFormat = true;
let isDarkMode = true;

// la date
const frenchDays = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

const frenchMonths = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

// horloge
function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';
    
    //  12-hour 
    if (!is24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
    }
    
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    ampmElement.textContent = ampm;
    
    
    const day = frenchDays[now.getDay()];
    const date = now.getDate();
    const month = frenchMonths[now.getMonth()];
    const year = now.getFullYear();
    
    dateElement.textContent = `${day} ${date} ${month} ${year}`;
}

formatToggleBtn.addEventListener('click', function() {
    is24HourFormat = !is24HourFormat;
    formatToggleBtn.textContent = is24HourFormat ? 'Mode 12 heures' : 'Mode 24 heures';
    updateClock();
});

// dark light
themeToggleBtn.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode', !isDarkMode);
    themeToggleBtn.textContent = isDarkMode ? 'Mode Clair' : 'Mode Sombre';
});

//  image 
imageUploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        
        reader.readAsDataURL(file);
    }
});


updateClock();
setInterval(updateClock, 1000);