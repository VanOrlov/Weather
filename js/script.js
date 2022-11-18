// API ключ
let apiKey = "ff187751989462547568c774f186bdd4";
// Город погода которого нужна

let gorod = document.querySelector('.input')

let but = document.querySelector('.button')

but.addEventListener('click', function(){
    if (gorod.value != ''){
        // Формируем url для GET запроса
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${gorod.value}&lang=ru&units=metric&appid=${apiKey}`;
        let result1 = document.querySelector('#result1')
        let result2 = document.querySelector('#result2')
        let result3 = document.querySelector('#result3')
        axios.get(url).then(res => {
            // Выводим результат в консоль браузера
            console.log(res.data);
            result1.textContent = `Температура ${res.data.main.temp} C°`
            result2.textContent = `Скорость ветра ${res.data.wind.speed} м/с`
            result3.textContent = res.data.weather[0].description.charAt(0).toUpperCase() + res.data.weather[0].description.slice(1)
        })
    }else{
        alert('Введите город!')
    }
})

new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    direction: 'vertical'
})
