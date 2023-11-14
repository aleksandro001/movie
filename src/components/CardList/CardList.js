import React, { Component } from 'react';
import CardMovie from '../CardMovie';
import { Row, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';
import NetworkState from '../NetworkState';

export default class CardList extends Component {
  static defaultProps = {
    movies: [],
  };
  static propTypes = {
    movies: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  };
  online = () => {
    this.setState((state) => ({
      online: (state.online = true),
    }));
  };
  offline = () => {
    this.setState((state) => ({
      online: (state.online = false),
    }));
  };
  render() {
    const { movies, loading, error, moviesIs } = this.props;
    const testConditionMov = movies.length === 0;
    const hasDate = !(loading || error);

    const errorMoviesIs = moviesIs ? (
      <Alert
        message="No movies by that name were found"
        description="You may have entered the movie title in error."
        type="error"
        closable
      />
    ) : null;
    const errorMessage = error ? (
      <Alert message="Data retrieval Error" description="Something went wrong." type="error" closable />
    ) : null;
    const LoadingSpin = loading ? <Spin size="large"></Spin> : null;
    const ListItems = hasDate
      ? movies.map((movie, index) => {
          return <CardMovie movie={movie} key={index} testConditionMov={testConditionMov} />;
        })
      : null;
    return (
      <NetworkState>
        <Row justify={'center'} style={{ gap: 15 }}>
          {errorMoviesIs}
          {ListItems}
          {LoadingSpin}
          {errorMessage}
        </Row>
      </NetworkState>
    );
  }
}
