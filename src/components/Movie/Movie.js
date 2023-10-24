import { Component } from 'react';
import React from 'react';
import { Layout, Space, Pagination, Input, Segmented } from 'antd';
import ApiMovie from '../ApiMovie';
import './Movie.css';
import CardList from '../CardList';

export default class Movie extends Component {
  state = {
    movies: [],
  };
  api = new ApiMovie();

  getResponse = () => {
    this.api.getPoster.then((response) => {
      this.setState((state) => ({
        movies: (state.movies = response),
      }));
    });
    setTimeout(() => console.log(this.state.movies), 5000);
  };
  componentDidMount() {
    this.getResponse();
  }

  render() {
    const { movies } = this.state;
    const { Search } = Input;
    const { Content } = Layout;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { Header, Footer } = Layout;
    return (
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header className={'headerStyle'}>
            <Segmented options={['Search', 'Rated']} />
            <Search placeholder="Type to search..." onSearch={onSearch} style={{}} />
          </Header>
          <Content className={'contentStyle'}>
            <CardList movies={movies} />
          </Content>
          <Footer className={'footerStyle'}>
            <Pagination defaultCurrent={1} total={50} />
          </Footer>
        </Layout>
      </Space>
    );
  }
}
