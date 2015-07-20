/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='../Commits/Commits.d.ts' />

import React = require('react');
import request = require('superagent');
import CommitsTable = require('../Commits/CommitsTable.react');
import config = require('../config');

interface HomePageState {
  commits: Commit[];
}

class HomePage extends React.Component<any, HomePageState> {

  constructor() {
    super();
    this.state = {
      commits: []
    };
  }

  componentDidMount() {
    request
      .get(config.apiBaseUrl + '/commits')
      .accept('application/json')
      .end((err: any, res: request.Response) => {
        this.setState({
          commits: <Commit[]>res.body
        });
      });
  }

  render() {
    return React.DOM.div(null,
      React.DOM.h1(null, 'Hello world'),
      React.createElement(CommitsTable, <CommitsTable.Props>{
        commits: this.state.commits
      })
    );
  }
}

export = HomePage;
