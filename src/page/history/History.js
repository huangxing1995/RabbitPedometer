import React, { Component } from 'react';
import ColumnChart from './ColumnChart'
import stepStore from '../../store'
import {wrapComponent} from 'react-eflow'
import {pxToDp} from "../../util";
import {View} from 'react-native'

class History extends Component{
	
	render() {
		let {weekStep} = this.props;
		return (
			<ColumnChart steps={weekStep}/>
		);
	}
}


export default wrapComponent(History, [stepStore.weekStep])