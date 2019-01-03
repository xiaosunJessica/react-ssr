import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import 'isomorphic-fetch';
export default class extends React.Component {
	//server
  static async getInitialProps({
    req, res, pathname, query, err, xhr
  }) {
		if (!process.browser) {
			const data = await fetch('http://api.football-data.org/v1/competitions/426/leagueTable');
			const _data = await data.json();
			return {
				username: 'sun',
				data: _data
			}
		} else {
			return {
				username: 'yaqin',
				data: JSON.parse(sessionStorage.getItem('bpl'))
			}
		}
	}
	
	// browser
	componentDidMount = () => {
		console.info('------componentDidMojt-----', sessionStorage.getItem('bpl'))
		if (!sessionStorage.getItem('bpl')) sessionStorage.setItem('bpl', JSON.stringify(this.props.data))
	}

  onGotoAbout = () => {
    Router.push('/about');
  }
  render() {
    const { username } = this.props;
    return (
      <div>
				<Head>
					<title>test head</title>
					<link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css" />
				</Head>
        1234556890
        <Link href="/home"><a>Home</a></Link>
        <span>{username}</span>
        <div onClick={this.onGotoAbout}>about</div>
				<table className="pure-table">
					<thead>
						<tr>
							<th>Position</th>
							<th>Team</th>
							<th>P</th>
							<th>GL</th>
							<th>W</th>
							<th>D</th>
							<th>L</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.data.standing.map((standing, i) => {
								const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
								return (
									<tr key={i} className={oddOrNot}>
										<td>{standing.position}</td>
										<td><img className="pure-img logo" style={{maxWidth: 100}} src={standing.crestURI} /></td>
										<td>{standing.points}</td>
										<td>{standing.goals}</td>
										<td>{standing.wins}</td>
										<td>{standing.draws}</td>
										<td>{standing.losses}</td>
										<td><Link href={`/detail?id=${standing.position}`}><a>More...</a></Link></td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
      </div>
    )
  }
}