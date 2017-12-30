import React, { Component } from 'react';
import {
	TouchableOpacity,
	Image,
} from 'react-native';
import History from './History'
export default class extends Component {
	
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
	};
	
	render() {
		return(
			<History/>
		)
	}
}


