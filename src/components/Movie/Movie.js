import React, { Component } from 'react';
import { Layout, Space, Pagination, Input, Segmented } from 'antd';
import ApiMovie from '../ApiMovie';
import './Movie.css';
import CardList from '../CardList';
import debounce from 'lodash.debounce';
import { GenresContext } from '../GenreMovies';

export default class Movie extends Component {
  state = {
    movies: [],
    value: '',
    genres: [],
    onSearch: true,
    loading: false,
    moviesIs: false,
    error: false,
    page: 1,
    totalPages: 0,
    totalResults: 0,
  };

  api = new ApiMovie();
  onError = (err) => {
    this.setState((state) => ({
      error: (state.error = true),
      loading: (state.loading = false),
    }));
  };

  getResponse = (value, page) => {
    if (value === '') {
      this.setState((state) => ({
        moviesIs: (state.moviesIs = false),
      }));
      return null;
    }
    this.setState((state) => ({
      loading: (state.loading = true),
      moviesIs: (state.moviesIs = false),
    }));
    this.api
      .getPoster(value, page)
      .then((response) => {
        console.log(response);
        this.setState((state) => ({
          value: (state.value = value),
          movies: (state.movies = response.results),
          loading: (state.loading = false),
          totalPage: (state.totalPages = response.total_pages),
          totalResults: (state.totalResults = response.total_results),
        }));
        if (!response.results.length) {
          this.setState((state) => ({
            moviesIs: (state.moviesIs = true),
          }));
        }
      })
      .catch(this.onError);
  };
  onChange = (e) => {
    this.setState((state) => ({
      page: 1,
    }));
    this.getResponse(e.target.value, 1);
  };

  onChangePage = (page) => {
    this.setState((state) => ({
      page: page,
    }));
    this.getResponse(this.state.value, page);
  };
  onChangeTab = (value) => {
    if (value === 'Rated') {
      this.ratedGuest();
      this.setState((state) => {
        return { onSearch: (state.onSearch = false) };
      });
    } else if (value === 'Search') {
      this.setState((state) => {
        return { onSearch: (state.onSearch = true) };
      });
    }
  };
  addGuestSessionId = () => {
    this.api
      .auth()
      .then((response) => {
        window.localStorage.setItem('movieDb', response.guest_session_id);
        console.log(response.guest_session_id);
      })
      .catch((err) => console.error(err));
  };
  myStorageIs = () => {
    const myStorage = window.localStorage;
    if (!myStorage.getItem('movieDb')) {
      this.addGuestSessionId();
    }
  };
  ratedGuest = () => {
    this.api.ratedMovies(window.localStorage.getItem('movieDb'));
  };
  getGenre = () => {
    this.api
      .genreList()
      .then((response) => {
        this.setState((state) => {
          return { genres: (state.genres = response.genres) };
        });
      })
      .catch((err) => console.error(err));
  };
  componentDidMount() {
    this.myStorageIs();
    this.getGenre();
  }

  render() {
    const { movies, loading, error, moviesIs, page, totalResults, onSearch, genres } = this.state;
    const { Search } = Input;
    const { Content } = Layout;
    const { Header, Footer } = Layout;
    const search = onSearch ? <Search placeholder="Type to search..." onChange={debounce(this.onChange, 700)} /> : null;
    return (
      <GenresContext.Provider value={genres}>
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={[0, 48]}
        >
          <Layout>
            <Header className={'headerStyle'}>
              <Segmented options={['Search', 'Rated']} onChange={this.onChangeTab} />
              {search}
            </Header>
            <Content className={'contentStyle'}>
              <CardList movies={movies} loading={loading} error={error} moviesIs={moviesIs} />
            </Content>
            <Footer className={'footerStyle'}>
              <Pagination current={page} total={totalResults} onChange={this.onChangePage} pageSize={20} />
            </Footer>
          </Layout>
        </Space>
      </GenresContext.Provider>
    );
  }
}
