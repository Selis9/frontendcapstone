import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import Parse from '../../parse.js';
import axios from 'axios';
import RelevantQ from './RelevantQ.jsx'

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      count: 4,
      questionQuery: '',
      showMore: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  handleChange(event) {
    this.setState({
      questionQuery: event.target.value
    });
  }

  handleShowMore() {
    this.setState({
      showMore: !this.state.showMore
    });
  }

  componentDidMount() {
    let params = `?product_id=40347`;
    Parse.getAll(`qa/questions`, params)
      .then((questions) => {
        let results = questions.data.results;
        return results.sort((a,b) => b.question_helpfulness - a.question_helpfulness);
      })
      .then((results) => {
        this.setState({
          questions: results
        })
      })
  }


  render() {

    return(
      <div className='questions'>
        <h2 className='qanda-heading'>QUESTIONS AND ANSWERS</h2>
        <div>
          <form>
            <input
              type='search'
              placeholder='Have a question? Search for answers...'
              name='questionQuery'
              onChange={this.handleChange}
            />
            <BiSearch />
          </form>
        </div>
        <div className='question-list'>
          {this.state.questions.slice(0, this.state.count).map(question => (
            <RelevantQ key={question.question_id} question={question} />
          ))}
        </div>
        <button onClick={this.handleShowMore}>{this.state.showMore ? 'Show Less' : 'More Answered Questions'}</button>
        <button> Add a Question + </button>
      </div>
    );
  }
}

export default QandA;