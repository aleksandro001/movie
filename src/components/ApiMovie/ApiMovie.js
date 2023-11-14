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
  options1 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  optionsSend(rated = 5) {
    return {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWQzMDVjZjFhNTI1ZmNiOTcyZWE2NzAxZWE1YzAzYyIsInN1YiI6IjY1MjgxYTBjNjI5YjJjMDBjNTlkZTQ0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JK3CU3804Dcjm3sFUeiJcir2ri1b_R1ERI8c0b2k3gk',
      },
      body: JSON.stringify({
        value: rated,
      }),
    };
  }
  getPoster = (value = 'return', page = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}&api_key=c9d305cf1a525fcb972ea6701ea5c03c`,
      this.options
    ).then((response) => response.json());
  };

  giveRating = (id, guestSessionId, rated) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}&api_key=c9d305cf1a525fcb972ea6701ea5c03c`,
      this.optionsSend(rated)
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  ratedMovies = (guestSessionId) => {
    return fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=c9d305cf1a525fcb972ea6701ea5c03c`,
      this.options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  genreList = () => {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options).then((response) =>
      response.json()
    );
  };

  auth = () => {
    return fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, this.options).then((response) =>
      response.json()
    );
  };
}
