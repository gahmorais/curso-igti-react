let divTotalConfirmed = "";
let divTotalDeath = "";
let divTotalRecovery = "";
let divUpdated = "";
let selectCountries = "";
let allCountries = "";

window.addEventListener("load", () => {
  divTotalConfirmed = document.querySelector("#div-totalConfirmed");
  divTotalDeath = document.querySelector("#div-totalDeath");
  divTotalRecovery = document.querySelector("#div-totalRecovery");
  divUpdated = document.querySelector("#div-updated");
  selectCountries = document.querySelector("#select-countries");
  doFetchCountriesCovid();
  
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

function populateSelectCountries() {
  let optionsCoutriesHTML = "";
  allCountries.forEach(({ Country, Slug, ISO2 }) => {
    let optionCoutriesHTML = `
      <option>${Country}</option>
      `;
    optionsCoutriesHTML += optionCoutriesHTML;
  });

  selectCountries.innerHTML = optionsCoutriesHTML;
}
