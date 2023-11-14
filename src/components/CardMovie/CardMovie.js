import React, { Component } from 'react';
import { Image, Rate, Card } from 'antd';
import moment from 'moment/moment';
import { formatDistanceToNow } from 'date-fns';
import ApiMovie from '../ApiMovie';
import GenreMovies from '../GenreMovies';
import AssessmentCircle from '../AssessmentCircle';

export default class CardMovie extends Component {
  api = new ApiMovie();
  trunc(n, useWordBoundary) {
    if (this.length <= n) {
      return this;
    }
    let subString = this.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + ' ...';
  }
  getTime(set) {
    const date = new Date(set);
    const parsedDate = moment(date);
    if (parsedDate._isValid) {
      return formatDistanceToNow(parsedDate._d, { addSuffix: true });
    }
    return '';
  }

  render() {
    const { movie, testConditionMov } = this.props;
    const { Meta } = Card;

    const onChangeRate = (value) => {
      this.api.giveRating(movie.id, window.localStorage.getItem('movieDb'), value);
      // console.log(`value:${value} movie.id:${movie.id} local:${window.localStorage.getItem('movieDb')}`);
    };
    return (
      <Card
        className="gutter-row"
        hoverable={true}
        bordered={false}
        style={{}}
        bodyStyle={{
          display: 'flex',
          padding: 0,
          width: 451,
          height: 270,
        }}
      >
        <Image
          preview={false}
          style={{ width: 180, height: 270, objectFit: 'cover' }}
          src={
            testConditionMov
              ? ``
              : movie.poster_path === null
              ? `https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`
              : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          }
        />
        <Card
          title={testConditionMov ? `` : `${movie.original_title}`}
          extra={<AssessmentCircle movieVote={movie.vote_average} />}
          bordered={false}
          bodyStyle={{
            whiteSpace: 'normal',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '80%',
          }}
          style={{
            borderBottom: 'none',
            boxShadow: 'none',
            textAlign: 'left',
            padding: '0px 10px',
          }}
        >
          <p style={{ fontSize: 12, lineHeight: '22px', color: '#827E7E' }}>
            {testConditionMov ? `` : `${this.getTime(movie.release_date)}`}
          </p>
          <GenreMovies genreId={movie.genre_ids} />
          <Meta
            style={{ fontSize: 12, paddingBottom: 10 }}
            description={testConditionMov ? `` : `${this.trunc.apply(movie.overview, [155, true])}`}
          />
          <Rate
            onChange={onChangeRate}
            style={{ fontSize: 15, paddingBottom: 10 }}
            allowHalf
            defaultValue={0}
            count={10}
          />
        </Card>
      </Card>
    );
  }
}
