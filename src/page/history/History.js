import React, { Component } from 'react';
import ColumnChart from './ColumnChart'
import stepStore from '../../store'
import {wrapComponent} from 'react-eflow'
import {pxToDp} from "../../util";

class History extends Component{
	
	render() {
		let {weekStep} = this.props;
		return (
			<ColumnChart
				steps={weekStep}
				bgColor={'#ff9048'}
				width={pxToDp(720)}
				height={pxToDp(350)}
				columnColor={'#f0d800'}
			/>
		);
	}
}


export default wrapComponent(History, [stepStore.weekStep])