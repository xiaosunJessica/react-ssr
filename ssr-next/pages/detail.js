import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import 'isomorphic-fetch';
export default class extends React.Component {
	static async getInitialProps({query}) {
		const { id } = query;
		if (!process.browser) {
			const data = await fetch('http://api.football-data.org/v1/competitions/426/leagueTable');
			const _data = await data.json();
			console.info(id)
			return {
				data: _data,
				standing: _data.standing.filter(s => s.position == id)
			}
		} else {
			const bplData = JSON.parse(sessionStorage.getItem('bpl'))
			return {
				standing: bplData.standing.filter(s => s.position === id)
			}
		}
	}

	componentDidMount = () => {
		if (!sessionStorage.getItem('bpl')) sessionStorage.setItem('bpl', JSON.stringify(this.props.data))
	}
	render() {
		const teamData = this.props.standing[0] || {}
		console.info(teamData, this.props.standing)
		return (
			<div>
				<Head>
					<title>detail</title>
					<link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css" />
				</Head>
				<div className="pure-g">
							<div className="pure-u-8-24"></div>
							<div className="pure-u-4-24">
									<h2>{teamData.teamName}</h2>
									<img src={teamData.crestURI} className="pure-img"/>
									<h3>Points: {teamData.points}</h3>
							</div>
							<div className="pure-u-12-24">
									<ul>
											<li><strong>Goals</strong>: {teamData.goals}</li>
											<li><strong>Wins</strong>: {teamData.wins}</li>
											<li><strong>Losses</strong>: {teamData.losses}</li>
											<li><strong>Draws</strong>: {teamData.draws}</li>
											<li><strong>Goals Against</strong>: {teamData.goalsAgainst}</li>
											<li><strong>Goal Difference</strong>: {teamData.goalDifference}</li>
											<li><strong>Played</strong>: {teamData.playedGames}</li>
									</ul>
									<Link href="/"><a>Home</a></Link>
							</div>
					</div>
			</div>
		)
	}
}