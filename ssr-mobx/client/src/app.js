import React from 'react';
export default class extends React.Component {
  constructor() {
    super();
    this.state= {
      count: 0
    }
    this.onClickEvent = this.onClickEvent.bind(this)
  }
  onClickEvent(){
    this.setState({
      count: this.state.count + 1
    }, () =>{
      console.info(this.state.count, '--------------this.state.count')
    })
  }
	render() {
		return (
			<div>
				<div>hello world, It's the home about the APPs</div>
        <button onClick={this.onClickEvent}>点击我</button>
			</div>
		)
	}
}