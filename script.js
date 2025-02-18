async function getCountryInfo() {
  const country = document.getElementById('countryInput').value.trim();
  if (!country) {
    alert('Please enter a country name');
    return;
  }
  const apiURL = `https://restcountries.com/v3.1/name/${country}`;
  

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const data = await response.json();
    const countryData = data[0];


    const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      countryData.name.common
    )}`;

    document.getElementById('result').innerHTML = `
            <div class="table-container">
                <table>
                    <tr><th colspan="2">Country Name: ${
                      countryData.name.common
                    }</th></tr>
                    <tr><td colspan="2" style="text-align: center;"><strong>Flag : </stong><img src="${
                      countryData.flags.svg
                    }" class="flag" alt="Flag"></td></tr>
                    <tr><td><strong>Capital</strong></td><td>${
                      countryData.capital ? countryData.capital[0] : 'N/A'
                    }</td></tr>
                    <tr><td><strong>Region</strong></td><td>${
                      countryData.region
                    }</td></tr>
                    <tr><td><strong>Subregion</strong></td><td>${
                      countryData.subregion
                    }</td></tr>
                    <tr><td><strong>Population</strong></td><td>${countryData.population.toLocaleString()}</td></tr>
                    <tr><td><strong>Languages</strong></td><td>${Object.values(
                      countryData.languages
                    ).join(', ')}</td></tr>
                    <tr><td><strong>Currency</strong></td><td>${
                      Object.values(countryData.currencies)[0].name
                    } (${
      Object.values(countryData.currencies)[0].symbol
    })</td></tr>
                    <tr><td><strong>Timezones</strong></td><td>${countryData.timezones.join(
                      ', '
                    )}</td></tr>
                    <tr><td><strong>Area (sq km)</strong></td><td>${countryData.area.toLocaleString()}</td></tr>
                
                </table>
            </div>

             <div class="wikipedia-link">
                <p>For more information, visit the <a href="${wikipediaUrl}" target="_blank">Wikipedia page of ${
      countryData.name.common
    }</a>.</p>
            </div>
        `;
  } catch (error) {
    document.getElementById(
      'result'
    ).innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
