import React, { Component } from 'react';
import { Button, Space } from 'antd';

export const GenresContext = React.createContext();
export default class GenreMovies extends Component {
  render() {
    const { genreId } = this.props;
    return (
      <GenresContext.Consumer>
        {(genres) => {
          const gens = genreId.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return (
              <Button key={genreId} size={'small'}>
                {genre.name}
              </Button>
            );
          });
          return (
            <Space wrap style={{ paddingBottom: '10px' }}>
              {gens}
            </Space>
          );
        }}
      </GenresContext.Consumer>
    );
  }
}
