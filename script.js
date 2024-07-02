const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultDiv = document.getElementById("result");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.toLowerCase().trim();

// console.log(searchTerm);

if (!searchTerm) {
    showAlert("Please enter a character name");
    return;
  }

  fetchData(searchTerm)
    .then((data) => {
      console.log(data[0]);

      const filterData = data.filter(character => 
        character.name.toLowerCase().includes(searchTerm)
      );



      displayResult(filterData)
    })
    .catch((error) => {
      showErrorMessage(error);
    });
});

const fetchData = function () {
    const url = 'https://hp-api.herokuapp.com/api/characters';

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject("Data not coming");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

function displayResult(data) {
console.log(data);


resultDiv.innerHTML = ''; // Clear previous results
data.forEach(character => {

    const card = document.createElement('div');
    card.classList.add('card', 'mt-3');
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text"><strong>House:</strong> ${character.house}</p>
        <img src="${character.image}" alt="${character.name}" class="img-size mb-3">
        <p class="card-text"><strong>Actor:</strong> ${character.actor}</p>
      </div>
    `;
    resultDiv.appendChild(card);
  });

}

function showErrorMessage(error) {
    resultDiv.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;
}

function showAlert(message) {
    alert(message);
  }

// Example usage:
// const searchTerm = "Harry Potter"; // Replace with the character name you want to search for
