import React, { Component } from 'react';
import { Button, Image, Progress, Rate, Space, Card } from 'antd';
import moment from 'moment/moment';
import { formatDistanceToNow } from 'date-fns';

export default class CardMovie extends Component {
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
          extra={<Progress size={30} trailColor={'#E9D100'} type="circle" format={(percent) => 6.8} percent={0} />}
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
          <Space wrap style={{ paddingBottom: '10px' }}>
            <Button size={'small'}>Action</Button>
            <Button size={'small'}>Drama</Button>
          </Space>
          <Meta
            style={{ fontSize: 12, paddingBottom: 10 }}
            description={testConditionMov ? `` : `${this.trunc.apply(movie.overview, [155, true])}`}
          />
          <Rate style={{ fontSize: 15, paddingBottom: 10 }} allowHalf defaultValue={7} count={10} />
        </Card>
      </Card>
    );
  }
}
