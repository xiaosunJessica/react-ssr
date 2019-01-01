import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import 'isomorphic-fetch';
export default class extends React.Component {
  static async getInitialProps({
    req, res, pathname, query, err, xhr
  }) {
    await fetch('http://www.baicu.com');
    // const data = await res.json();
    console.info(req.headers['user-agent'])
    return {
      username: 'sun'
    }
  }

  onGotoAbout = () => {
    Router.push('/about');
  }
  render() {
    const { username } = this.props;
    return (
      <div>
        1234556890
        <Link href="/home"><a>Home</a></Link>
        <span>{username}</span>
        <div onClick={this.onGotoAbout}>about</div>
      </div>
    )
  }
}