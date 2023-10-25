import { Component } from 'react';

export default class ApiMovie extends Component {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWQzMDVjZjFhNTI1ZmNiOTcyZWE2NzAxZWE1YzAzYyIsInN1YiI6IjY1MjgxYTBjNjI5YjJjMDBjNTlkZTQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JK3CU3804Dcjm3sFUeiJcir2ri1b_R1ERI8c0b2k3gk',
    },
  };

  getPoster = fetch(
    'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
    this.options
  )
    .then((response) => response.json())
    .then((response) => response.results);
}
