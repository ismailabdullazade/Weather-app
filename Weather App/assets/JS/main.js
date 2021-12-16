const weatherForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateCity = async(city) => {
    const cityDet = await getCity(city);
    const weatherDet = await getWeather(cityDet.Key);
    return {
        cityDet: cityDet,
        weatherDet: weatherDet
    };
};
const updateUI = (data) => {
    /*     const cityDet = data.cityDet;
        const weatherDet = data.weatherDet; */
    const { cityDet, weatherDet } = data;

    let dnnImg = weatherDet.IsDayTime ? 'assets/images/dayninja.jpg' : 'assets/images/nightninja.jpg';

    /*  if (weatherDet.IsDayTime) {
         dnnImg = 'assets/images/dayninja.jpg';
     } else {
         dnnImg = 'assets/images/nightninja.jpg'
     } */
    time.setAttribute('src', dnnImg);

    const myIcon = `assets/icons/${weatherDet.WeatherIcon}.svg`;
    icon.setAttribute('src', myIcon);

    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDet.EnglishName}</h5>
    <div class="my-3">${weatherDet.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherDet.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
</div>
    `;
};
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = weatherForm.city.value.trim();
    weatherForm.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))


});