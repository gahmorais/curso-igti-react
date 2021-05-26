let divTotalConfirmed = "";
let divTotalDeath = "";
let divTotalRecovery = "";
let divUpdated = "";
let selectCountries = "";
let allCountries = "";
let allDataFromAllCountries = "";
let inputDate = ''

window.addEventListener("load", () => {
  divTotalConfirmed = document.querySelector("#div-totalConfirmed");
  divTotalDeath = document.querySelector("#div-totalDeath");
  divTotalRecovery = document.querySelector("#div-totalRecovery");
  divUpdated = document.querySelector("#div-updated");
  selectCountries = document.querySelector("#select-countries");
  inputDate = document.querySelector('#today')
  selectCountries.onchange = onSelectedCountry;
  inputDate.onchange = onInputDate;
  doFetchCountriesCovid();
  doFetchSummaryAllCountries();
});

function render() {
  populateSelectCountries();
}
async function doFetchCountriesCovid() {
  try {
    const data = await fetch("https://api.covid19api.com/countries");
    allCountries = await data.json();
    render();
  } catch (erro) {
    console.log(erro);
  }
}

async function doFetchSummaryAllCountries() {
  try {
    const data = await fetch("https://api.covid19api.com/summary");
    allDataFromAllCountries = await data.json();
  } catch (erro) {
    console.log(erro);
  }
}

function populateSelectCountries() {
  let optionsCoutriesHTML = "";
  allCountries = allCountries.sort((a, b) => a.Country > b.Country ? 1 : a.Country < b.Country ? -1 : 0);
  allCountries.forEach(({ Country, Slug, ISO2 }) => {
    let optionCoutriesHTML = `
      <option>${Country}</option>
      `;
    optionsCoutriesHTML += optionCoutriesHTML;
  });

  selectCountries.innerHTML += optionsCoutriesHTML;
}

function onSelectedCountry(e) {
  const selectedCountry = e.target.value;
  const { Countries } = allDataFromAllCountries;
  const countryFound = Countries.find(
    (country) => country.Country === selectedCountry
  );
  renderDataFromSelectedCountry(countryFound);
}

async function onInputDate(e){
  const index = selectCountries.selectedIndex
  const currentCountry = selectCountries.options[index].textContent
  const currentDay = '2021-05-25T19:51:51.609Z'
  const lastDay = e.target.value
  const fetchDay = await fetch(`https://api.covid19api.com/country/${currentCountry}?from=${lastDay}T00:00:00Z&to=${currentDay}T00:00:00Z`)
  const json = await fetchDay.json()

}

function renderDataFromSelectedCountry(country) {
  if (country === undefined) {
    divTotalConfirmed.innerHTML = `

    <span>Total Confirmados</span>
    <span>Não há dados para este país</span>
    `;
    divTotalDeath.innerHTML = `
    <span>Total de Mortos</span>
    <span>Não há dados para este país</span>
    `;
    divTotalRecovery.innerHTML = `
    <span>Total de Recuperados</span>
    <span>Não há dados para este país</span>
    `;
    divUpdated.innerHTML = `
    <span>Atualização</span>
    <span>Não há dados para este país</span>
    `;
    return;
  }

  const format = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const { TotalConfirmed, TotalDeaths, TotalRecovered } = country;
  const formatedDate = new Date(country.Date).toLocaleDateString(
    "pt-br",
    format
  );

  divTotalConfirmed.innerHTML = `

    <span>Total Confirmados</span>
    <span>${TotalConfirmed.toLocaleString("pt-br")}</span>
    `;
  divTotalDeath.innerHTML = `
    <span>Total de Mortos</span>
    <span>${TotalDeaths.toLocaleString("pt-br")}</span>
    `;
  divTotalRecovery.innerHTML = `
    <span>Total de Recuperados</span>
    <span>${TotalRecovered.toLocaleString("pt-br")}</span>
    `;
  divUpdated.innerHTML = `
    <span>Atualização</span>
    <span>${formatedDate}</span>
    `;
}
