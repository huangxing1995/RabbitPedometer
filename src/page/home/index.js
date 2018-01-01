import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native'
import {pxToDp} from '../../util'
import Home from './Home'

export default class extends Component{
	render(){
		let date = new Date()
		let month = date.getMonth() + 1;
		let day = date.getDay();
		return(
			<ScrollView style={styles.wrapper}>
				<View style={styles.header}>
					<TouchableOpacity onPress={()=>this.props.navigation.navigate('Target')}>
						<Image source={require('../../../resource/person.png')} style={{width:pxToDp(60),height:pxToDp(60)}}/>
					</TouchableOpacity>
					<View><Text>{`${month}月${day}日`}</Text></View>
					<TouchableOpacity onPress={()=>this.props.navigation.navigate('History')}>
						<Image source={require('../../../resource/history.png')} style={{width:pxToDp(50),height:pxToDp(50)}}/>
					</TouchableOpacity>
				</View>
				<Home/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
		backgroundColor:'#f0f0f0'
	},
	header:{
		height:pxToDp(100),
		justifyContent:'space-between',
		alignItems:'center',
		flexDirection:'row',
		padding:pxToDp(10),
		backgroundColor:'#f0f0f0'
	},
})