const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
 
let ticketPrice = 0;
 

function populateMovieSelect(movies) {
  movies.forEach(movie => {
    const option = document.createElement('option');
    option.value = movie.price;
    option.dataset.id = movie.id;
    option.textContent = `${movie.name} (${movie.price} kr)`;
    movieSelect.appendChild(option);
  });
 
  
  const savedIndex = localStorage.getItem('selectedMovieIndex');
  if (savedIndex !== null) {
    movieSelect.selectedIndex = savedIndex;
  }
 
  ticketPrice = +movieSelect.value;
  updateSelectedCount();
}
 

function populateSeatUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add('selected');
      }
    });
  }
}
 
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}
 
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
 
  const selectedSeatIndices = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndices));
 
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}
 

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
 

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
 

fetchMovies()
  .then(movies => {
    populateMovieSelect(movies);
    populateSeatUI();
  })
  .catch(err => {
    console.error('Kunde inte hämta filmer:', err);
    movieSelect.innerHTML = '<option>Kunde inte ladda filmer</option>';
  });