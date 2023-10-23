import { Component } from 'react';
import React from 'react';
import { Layout, Space, Pagination, Input, Rate, Card, Segmented, Image, Button, Progress, Row } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import ApiMovie from '../ApiMovie';
import './Movie.css';
import moment from 'moment';

export default class Movie extends Component {
  state = {
    movies: [],
  };
  api = new ApiMovie();
  trunc(n, useWordBoundary) {
    if (this.length <= n) {
      return this;
    }
    let subString = this.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + ' ...';
  }

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
  getTime(set) {
    const date = new Date(set);
    const parsedDate = moment(date);
    if (parsedDate._isValid) {
      return formatDistanceToNow(parsedDate._d, { addSuffix: true });
    }
    return '';
  }

  render() {
    const { movies } = this.state;
    const testConditionMov = movies.length === 0;
    const { Meta } = Card;
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { Header, Footer, Content } = Layout;
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
            <Row justify={'center'} style={{ gap: 15 }}>
              {movies.map((movie, i) => {
                return (
                  <Card
                    className="gutter-row"
                    key={i}
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
                      extra={
                        <Progress
                          size={30}
                          trailColor={'#E9D100'}
                          type="circle"
                          format={(percent) => 6.8}
                          percent={0}
                        />
                      }
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
              })}
            </Row>
          </Content>
          <Footer className={'footerStyle'}>
            <Pagination defaultCurrent={1} total={50} />
          </Footer>
        </Layout>
      </Space>
    );
  }
}
