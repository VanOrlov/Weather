// API ключ
let apiKey = "ff187751989462547568c774f186bdd4";
let gorod = document.querySelector('.search')


const btn = document.querySelector('.search-button')
btn.addEventListener('click', () => {
    if(gorod.value){
        localStorage.setItem('city', gorod.value)
        let localCity = localStorage.getItem('city')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${localCity}&lang=ru&units=metric&appid=${apiKey}`;
        let deg = document.querySelector('.weather-deg')
        let city = document.querySelector('.weather-city')
        let under = document.querySelector('.under-value')
        document.querySelector('.error').classList.add('error-none')
        axios.get(url).then(res => {
            // Выводим результат в консоль браузера
            console.log(res.data);
            clouds(res)
            speed(res)
            visibility(res)
            temp(res)
            unix(res.data.sys.sunrise, res.data.sys.sunset)
            ymaps.ready(init(res.data.coord.lat, res.data.coord.lon));
            deg.innerHTML = `${Math.floor(res.data.main.temp)}°C`
            city.innerHTML = `${res.data.name}, ${res.data.sys.country}`
            under.innerHTML = `${(res.data.weather[0].description).toUpperCase()} - Небо затянуто на ${res.data.clouds.all}%`
        })
        .catch(() => {
            document.querySelector('.error').classList.remove('error-none')
        })
    }else{
        alert('Введите город');
    }
})




//функция перевода UNIX даты в обычную
function unix(rise, set){
    const riseSun = document.querySelectorAll('.temp-value')[2]
    const setSun = document.querySelectorAll('.temp-value')[3]

    let unix_timesrise = rise
    let date = new Date(unix_timesrise * 1000)
    let hoursrise = date.getHours()
    let minutesrise = "0" + date.getMinutes()
    let riseTime = hoursrise + ':' + minutesrise.substr(-2)
    riseSun.innerHTML = riseTime
    let unix_timesset = set
    let date1 = new Date(unix_timesset * 1000)
    let hours1 = date1.getHours()
    let minutes1 = "0" + date1.getMinutes()
    let setTime = hours1 + ':' + minutes1.substr(-2)
    setSun.innerHTML = setTime
}

// Изменение картинки в зависимости от погоды
function clouds (res){
    const icons = document.querySelectorAll('.img-weather')
    if(res.data.weather[0].main == 'Snow'){
        for (const iterator of icons) {
            iterator.src = '../img/menuicon/snow.png'
        }
    }
    else if(res.data.weather[0].main == 'Clear'){
        for (const iterator of icons) {
            iterator.src = '../img/menuicon/Sun.png'
        }
    }
    else if (res.data.weather[0].main == 'Clouds'){
        for (const iterator of icons) {
            iterator.src = '../img/menuicon/clouds.png'
        }
    }
    else if(res.data.weather[0].main == 'Rain'){
        for (const iterator of icons) {
            iterator.src = '../img/menuicon/rain.png'
        }
    }
}

function speed(res){
    let speed = document.querySelectorAll('.information-value')[0]
    speed.innerHTML = `${res.data.wind.speed} м/c`
    const veter = document.querySelectorAll('.information-under')[0]
    if(res.data.wind.speed < 2){
        veter.innerHTML = 'Лёгкий бриз'
    }
    else if (res.data.wind.speed < 4){
        veter.innerHTML = 'Ветер средней силы'
    }
    else if(res.data.wind.speed < 6){
        veter.innerHTML = 'Сильный ветер'
    }
    else{
        veter.innerHTML = 'Ураган'
    }
}

function visibility(res){
    let vis = document.querySelectorAll('.information-value')[1]
    vis.innerHTML = `${res.data.visibility / 1000} км`
    const vid = document.querySelectorAll('.information-under')[1]
    if (res.data.visibility < 500){
        vid.innerHTML = 'Ужасная видимость'
    }
    else if(res.data.visibility < 1000){
        vid.innerHTML = 'Плохая видимость'
    }
    else if(res.data.visibility < 3000){
        vid.innerHTML = 'Хорошая видимость'
    }
    else{
        vid.innerHTML = 'Отличная видимость'
    }
}

function temp(res){
    let min = document.querySelectorAll('.temp-value')[0]
    let max = document.querySelectorAll('.temp-value')[1]
    min.innerHTML = `${res.data.main.temp_min} °C`
    max.innerHTML = `${res.data.main.temp_max} °C`
}

// КАРТА

function init(lat, lon){
    let maps = document.getElementById('map')
    maps.innerHTML = ''
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [lat, lon],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 11
    });
}

// НАЧАЛЬНАЯ ЗАГРУЗКА СТРАНИЦЫ(Берём данные из localStorage)
document.addEventListener("DOMContentLoaded", () => {
    console.log(123);
    let localCity = localStorage.getItem('city')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${localCity}&lang=ru&units=metric&appid=${apiKey}`;
    let deg = document.querySelector('.weather-deg')
    let city = document.querySelector('.weather-city')
    let under = document.querySelector('.under-value')
    document.querySelector('.error').classList.add('error-none')
    axios.get(url).then(res => {
        //setTimeout для того, чтобы промис ymaps успевал сделать запрос, без этого решения не успевает(отладка загрузки данных на 200мс)
        setTimeout(() => { 
            // Выводим результат в консоль браузера
            console.log(res.data);
            clouds(res)
            speed(res)
            visibility(res)
            temp(res)
            unix(res.data.sys.sunrise, res.data.sys.sunset)
            deg.innerHTML = `${Math.floor(res.data.main.temp)}°C`
            city.innerHTML = `${res.data.name}, ${res.data.sys.country}`
            under.innerHTML = `${(res.data.weather[0].description).toUpperCase()} - Небо затянуто на ${res.data.clouds.all}%`
            ymaps.ready(init(res.data.coord.lat, res.data.coord.lon))
        },400)
    })
})