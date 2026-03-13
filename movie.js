class Movie {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
 
async function fetchMovies() {
  const response = await fetch('http://localhost:3000/movies');
  const data = await response.json();
  return data.map(m => new Movie(m.id, m.name, m.price));
}