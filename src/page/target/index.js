import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,StyleSheet} from 'react-native'


export default class Target extends Component{
	
	static navigationOptions = ({navigation}) => {
		let {goBack} = navigation;
		return {
			headerLeft:(
				<TouchableOpacity onPress={()=>goBack()} style={{flexDirection:'row'}}>
					<Image source={require('../../../resource/back.png')} style={{width:20,height:20}}/>
				</TouchableOpacity>),
			headerTitle:"锻炼计划",
			headerTitleStyle:{
				color:'#000000',
				fontSize: 18,
			},
		}
		
	}
	render(){
		return(
			<View style={styles.wrapper}>
				<Text>this target page</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		backgroundColor:"#f5fcff"
	}
})