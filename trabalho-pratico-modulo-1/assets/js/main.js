let confirmed = "";
let tconfirmed = "";
let death = "";
let tdeath = "";
let recovered = "";
let trecovered = "";
let active = "";
let tactive = "";
let combo = "";
let inputDate = "";
let activesTitle = "";
let allCountries = "";
let allDataFromAllCountries = "";
const oneDay = 86400000;

window.addEventListener("load", () => {
  confirmed = document.querySelector("#confirmed");
  tconfirmed = document.querySelector("#tconfirmed");
  death = document.querySelector("#death");
  tdeath = document.querySelector("#tdeath");
  recovered = document.querySelector("#recovered");
  trecovered = document.querySelector("#trecovered");
  activesTitle = document.querySelector("#actives");
  active = document.querySelector("#active");
  tactive = document.querySelector("#tactive");
  combo = document.querySelector("#combo");
  inputDate = document.querySelector("#today");

  combo.onchange = onComboChange;
  inputDate.onchange = onInputDate;
  doFetchCountriesAndSummary();
});

async function doFetchCountriesAndSummary() {
  const response = await Promise.allSettled([
    fetch("https://api.covid19api.com/countries"),
    fetch("https://api.covid19api.com/summary"),
  ]);

  if (response[0].status === "fulfilled") {
    allCountries = await response[0].value.json();
    populateComboCountries();
  }

  if (response[1].status === "fulfilled") {
    allDataFromAllCountries = await response[1].value.json();
    showGlobalInfo();
  }
}

function populateComboCountries() {
  allCountries = allCountries.sort((a, b) =>
    a.Country > b.Country ? 1 : a.Country < b.Country ? -1 : 0
  );
  allCountries.forEach(({ Country }) => {
    const option = document.createElement("option");
    option.textContent = Country;
    combo.appendChild(option);
  });
}

function showGlobalInfo() {
  const { TotalConfirmed, TotalDeaths, TotalRecovered } =
    allDataFromAllCountries.Global;
  console.log(TotalConfirmed, TotalDeaths, TotalRecovered);
  confirmed.textContent = formatToBrazilianPattern(TotalConfirmed);
  death.textContent = formatToBrazilianPattern(TotalDeaths);
  recovered.textContent = formatToBrazilianPattern(TotalRecovered);
  actives.textContent = "Atualização";
  active.textContent = new Date(
    allDataFromAllCountries.Global.Date
  ).toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function onComboChange(e) {
  const comboSelection = e.target.value;
  tconfirmed.textContent = "";
  tdeath.textContent = "";
  trecovered.textContent = "";
  tactive.textContent = "";
  if (comboSelection === "Global") {
    showGlobalInfo();
    return;
  }

  const { Countries } = allDataFromAllCountries;

  const countryFound = Countries.find(
    (country) => country.Country === comboSelection
  );

  renderCountryInfo(countryFound);
}

function formatToBrazilianPattern(value) {
  return value.toLocaleString("pt-br");
}

function renderCountryInfo(country) {
  actives.textContent = "Ativos";
  if (country === undefined) {
    confirmed.textContent = "";
    death.textContent = "";
    recovered.textContent = "";
    active.textContent = "";
    return;
  }

  const { TotalConfirmed, TotalDeaths, TotalRecovered } = country;
  confirmed.textContent = formatToBrazilianPattern(TotalConfirmed);
  death.textContent = formatToBrazilianPattern(TotalDeaths);
  recovered.textContent = formatToBrazilianPattern(TotalRecovered);
  active.textContent = "";
}

async function onInputDate(e) {
  const index = combo.selectedIndex;
  const country = combo.options[index].textContent;
  console.log(country);

  if (country === "Global") {
    window.alert("Por favor selecione um país");
    return;
  }

  const startDate = new Date(e.target.valueAsNumber);
  const lastDay = new Date(startDate - oneDay);
  const endDate = new Date(lastDay - oneDay);
  const formatedStartDate = startDate.toISOString();
  const formatedEndDate = endDate.toISOString();

  fetchDiaryCountryInfo(country, formatedEndDate, formatedStartDate);
}

async function fetchDiaryCountryInfo(country, endDate, startDate) {
  const fetchDay = await fetch(
    `https://api.covid19api.com/country/${country}?from=${endDate}&to=${startDate}`
  );

  const dailyInfo = await fetchDay.json();
  console.log(dailyInfo);
  calculateDeltaForKPIs(dailyInfo);
}

function calculateDeltaForKPIs(dailyInfo) {
  const yConfirmedDelta = dailyInfo[1].Confirmed - dailyInfo[0].Confirmed;
  const yDeathDelta = dailyInfo[1].Deaths - dailyInfo[0].Deaths;
  const yRecoveredDelta = dailyInfo[1].Recovered - dailyInfo[0].Recovered;
  const yActiveDelta = dailyInfo[1].Active - dailyInfo[0].Active;
  console.log(yConfirmedDelta, yDeathDelta, yRecoveredDelta, yActiveDelta);

  const tConfirmedDelta = dailyInfo[2].Confirmed - dailyInfo[1].Confirmed;
  const tDeathDelta = dailyInfo[2].Deaths - dailyInfo[1].Deaths;
  const tRecoveredDelta = dailyInfo[2].Recovered - dailyInfo[1].Recovered;
  const tActiveDelta = dailyInfo[2].Active - dailyInfo[1].Active;
  console.log(tConfirmedDelta, tDeathDelta, tRecoveredDelta, tActiveDelta);

  insertDailyData(
    tconfirmed,
    tConfirmedDelta,
    compareValue(tConfirmedDelta, yConfirmedDelta)
  );
  insertDailyData(tdeath, tDeathDelta, compareValue(tDeathDelta, yDeathDelta));
  insertDailyData(
    trecovered,
    tRecoveredDelta,
    compareValue(tRecoveredDelta, yRecoveredDelta)
  );
  insertDailyData(
    tactive,
    tActiveDelta,
    compareValue(tActiveDelta, yActiveDelta)
  );
}

function compareValue(today, yesterday) {
  return today < yesterday;
}

function insertDailyData(element, value, increase) {
  console.log(increase);
  if (increase) {
    element.innerHTML = `<img src='./assets/img/down.png'/> Diário: ${formatToBrazilianPattern(
      value
    )}`;
  } else {
    element.innerHTML = `<img src='./assets/img/up.png'/> Diário: ${formatToBrazilianPattern(
      value
    )}`;
  }
}
