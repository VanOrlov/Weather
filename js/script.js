// API ключ
let apiKey = "ff187751989462547568c774f186bdd4";
//Переменная с инпутом для города
let gorod = document.querySelector('.input')
//Переменная с кнопкой
let but = document.querySelector('.button')
//Добавляем слушатель клика по кнопке
but.addEventListener('click', function(){
    //Если инпут не пустой то:
    if (gorod.value != ''){
        //Убираем возможно существующий класс wrong у ипнута для города
        gorod.classList.remove('wrong')
        // Формируем url для GET запроса
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${gorod.value}&lang=ru&units=metric&appid=${apiKey}`;
        //Создаем переменные с каждым слайдом у слайдера
        let result1 = document.querySelector('#result1')
        let result2 = document.querySelector('#result2')
        let result3 = document.querySelector('#result3')
        axios.get(url).then(res => {
            // Выводим результат в консоль браузера
            console.log(res.data);
            //Добавляем в каждый слайд контент из res.data
            result1.textContent = `Температура ${res.data.main.temp} C°`
            result2.textContent = `Скорость ветра ${res.data.wind.speed} м/с`
            result3.textContent = res.data.weather[0].description.charAt(0).toUpperCase() + res.data.weather[0].description.slice(1)
        })
    }else{
        //если ипут пустой, то добавляем класс wrong
        gorod.classList.add('wrong')
        //Удаляем класс wrong через 1.5 секунды
        setTimeout(function(){
            gorod.classList.remove('wrong')
        },1500)
    }
})


//Создаём свайпер
new Swiper('.swiper', {
    //добавляем точки для навигации
    pagination: {
        el: '.swiper-pagination',
        //делаем точки кликабельными
        clickable: true
    },
    //делаем горизонтальную ориентацию у сладйера
    direction: 'vertical'
})
