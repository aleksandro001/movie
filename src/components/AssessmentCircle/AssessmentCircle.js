import React, { Component } from 'react';
import { Progress } from 'antd';
export default class AssessmentCircle extends Component {
  render() {
    const { movieVote } = this.props;
    const rounded = (movieVote) => +movieVote.toFixed(1);
    const color = (value) => {
      if (value >= 7) return '#66E900';
      else if (value >= 5) return '#E9D100';
      else if (value >= 3) return '#E97E00';
      else if (value >= 0) return '#E90000';
    };
    return (
      <Progress
        size={30}
        trailColor={color(rounded(movieVote))}
        type="circle"
        format={(percent) => rounded(movieVote)}
        percent={0}
      />
    );
  }
}
