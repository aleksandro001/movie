import React, { Component } from 'react';
import CardMovie from '../CardMovie';
import { Row } from 'antd';

export default class CardList extends Component {
  render() {
    const { movies } = this.props;
    const testConditionMov = movies.length === 0;
    const ListItems = movies.map((movie, index) => {
      return <CardMovie movie={movie} key={index} testConditionMov={testConditionMov} />;
    });
    return (
      <Row justify={'center'} style={{ gap: 15 }}>
        {ListItems}
      </Row>
    );
  }
}
