const fetchCountry = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => displayCountry(data))
}

fetchCountry();

const displayCountry = countries => {
    const allCountry = document.getElementById('countries');
    countries.forEach(country => {
        allCountry.innerHTML += `
        <tr>
            <td class="fs-5 text-center">${country.name}</td>
            <td class="fs-5 text-center"><img src="${country.flag}" class="w-25" alt=""></td>
            <td class="fs-5 text-center"><button onclick="showCountryDetails('${country.name}')" type="button" class="btn btn-info fw-bold">Details</button>
            </td>
        </tr>
        <tr id="${country.name}">

        </tr>
        `
    })
}

const showCountryDetails = country => {
    let url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    fetch(url).then(resp => resp.json()).then(data => callCountry(data[0]))
}

const callCountry = countryInfo => {
    let countryDetails = document.getElementById(`${countryInfo.name}`);
    countryDetails.innerHTML = `
    <tr>
        <td colspan="3">
        <div class="card mb-3">
            <img src="${countryInfo.flag}" class="card-img-top" alt="...">
            <div class="card-header bg-transparent border-success">Country Details</div>
            <div class="card-body">
                <h2 class="card-title">${countryInfo.name}</h2>
                <hr>
                <h4 class="card-text">Capital -------- ${countryInfo.capital}</h4>
                <h4 class="card-text">Region -------- ${countryInfo.region}</h4>
                <h4 class="card-text">Subregion -------- ${countryInfo.subregion}</h4>
                <h4 class="card-text">Population -------- ${countryInfo.population}</h4>
                <h4 class="card-text">Area -------- ${countryInfo.area}</h4>
                <h4 class="card-text">Currencies -------- ${countryInfo.currencies[0].name}</h4>
                <h4 class="card-text">Languages -------- ${countryInfo.languages[0].name} -- ${countryInfo.languages[0].nativename}</h4>
                <h4 class="card-text">Timezones -------- ${countryInfo.timezones[0]}</h4>
                <h4 class="card-text">Borders -------- ${[...countryInfo.borders]}</h4>
                <h4 class="card-text">CallingCodes -------- ${countryInfo.callingCodes[0]}</h4>
            </div>
            <div class="card-footer bg-transparent border-success"><button onclick="hideCountryDetails('${countryInfo.name}')" type="button" class="btn btn-info fw-bold">Hide Details</button></div>
        </div>
        </td>
    </tr>  
    `
}

const hideCountryDetails = countryInfoName => {
    let country = document.getElementById(countryInfoName);
    country.textContent = '';
}