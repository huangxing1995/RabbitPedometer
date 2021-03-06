import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native'
import ProgressCircle from './ProgressCircle'
import {pxToDp} from '../../util'
import LineChart from './LineChart'
import stepStore from '../../store'
import {wrapComponent} from "react-eflow";

export class Home extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
		accelerationObservable
			.subscribe(acceleration => stepStore.setAcceleration(acceleration));
	}
	
	componentWillUnmount(){
		accelerationObservable.stop();
	}
	
	render(){
		let {nowStep,todayStep,targetStep} = this.props;
		
		// alert(acceleration);
		let percent = Number(targetStep) ? Math.floor(Number(nowStep)/Number(targetStep)*100) : 0;
		if (percent>100) percent=100;
		let calorie = Math.floor(Number(nowStep)*0.075);
		let distance = (Number(nowStep)*0.0007).toFixed(1);
		return(
			<ScrollView style={styles.wrapper}>
				
				<View style={styles.progress}>
					<ProgressCircle
						percent={percent}
						radius={100}
						borderWidth={10}
						color="#f07848"
						shadowColor="#e0e0e0"
						bgColor="#f0f0f0"
					>
						<View style={styles.progressContent}>
							<View><Text style={{fontSize:12,color:'#f07848'}}>今日已完成</Text></View>
							<View><Text style={{fontSize:38,color:'#f07848'}}>{percent}%</Text></View>
							<TouchableOpacity>
								<Text style={{fontSize:14,color:'#f07848'}}>目标：{targetStep}</Text></TouchableOpacity>
						</View>
					</ProgressCircle>
				</View>
				
				<View style={styles.step}>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/calorie.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>{calorie}卡</Text>
					</View>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/running.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>{nowStep}步</Text>
					</View>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/distance.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>{distance}km</Text>
					</View>
				</View>
				
				<LineChart steps={todayStep}/>
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
		// borderBottomWidth:pxToDp(1),
		// borderBottomColor:'#f07848',
		backgroundColor:'#f0f0f0'
	},
	progress:{
		height:pxToDp(470),
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#f0f0f0'
	},
	progressContent:{
		height:pxToDp(200),
		width:pxToDp(250),
		// backgroundColor:'red',
		justifyContent:'space-around',
		alignItems:'center'
	},
	step:{
		height:pxToDp(180),
		margin:pxToDp(10),
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		backgroundColor:'#e0e0e0',
		borderRadius:pxToDp(20)
	},
	stepItem:{
		justifyContent:'center',
		alignItems:'center'
	},
	txt:{
		fontSize:24,
		color:'#f07848'
	},
	calorie:{},
	count:{},
	distance:{},
	detail:{
	
	},
})

export default wrapComponent(Home, [stepStore.todayStep,stepStore.nowStep,stepStore.targetStep,stepStore.acceleration])