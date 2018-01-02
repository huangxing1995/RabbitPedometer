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

const WEATHER_URL = "https://v.juhe.cn/weather/index?cityname=%E9%95%BF%E6%B2%99&dtype=&format=1&key=d5ddd399a8bb6f8e598d99959a5efb7b"

export default class extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			weather:'',
		}
	}
	componentWillMount(){
		this.fetchWeather(WEATHER_URL)
			.then((data) => {
				if (data.resultcode == 200){
					let {weather,temperature,exercise_index} = data.result.today;
					let todayWeather = `今日天气:${weather} ${temperature} ${exercise_index}运动`
					this.setState({weather:todayWeather});
				}
				
			})
			.catch((err)=>{
				console.log('error, cannot get weather')
			})
	}
	fetchWeather(url){
		return new Promise((resolve, reject) => {
			fetch(url,{
				mode: 'no-cors'
			})
				.then((res) => {
					return res.json();
				})
				.then((json) =>{
					resolve(json)
				})
				.catch((error) => {
					reject(error)
				})
			// setTimeout(() => resolve(data),1000)
		})
	}
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
					
					<View><Text style={{fontSize:12,color:"#333333"}}>{this.state.weather}</Text></View>
					
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
	banner:{
		height:pxToDp(30),
		padding:pxToDp(10),
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#e0e0e0',
		borderRadius:pxToDp(20)
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