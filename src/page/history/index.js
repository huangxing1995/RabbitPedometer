import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native';
import ColumnChart from './ColumnChart'
export default class History extends Component {
	
	static navigationOptions = ({navigation}) => {
		let {goBack} = navigation;
		return {
			headerLeft:(
				<TouchableOpacity onPress={()=>goBack()} style={{flexDirection:'row'}}>
					<Image source={require('../../../resource/back.png')} style={{width:20,height:20}}/>
				</TouchableOpacity>),
			headerTitle:"历史记录",
			headerTitleStyle:{
				color:'#000000',
				fontSize: 18,
			},
		}
	}
	
	render() {
		let steps = [2000,3000,4000,10000,20000,40000,100];
		return (
			<ColumnChart steps={steps}/>
		);
	}
}


