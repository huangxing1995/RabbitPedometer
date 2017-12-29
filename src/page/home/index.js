import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native'
import PercentageCircle from 'react-native-percentage-circle';
import {pxToDp} from '../../util'
import LineChart from './LineChart'
import ColumnChart from '../history/ColumnChart'

export default class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			steps:[1000,2000,3000,4000,6000]
		}
	}
	render(){
		return(
			<ScrollView style={styles.wrapper}>
				<TouchableOpacity style={styles.date} onPress={()=>this.props.navigation.navigate('History')}>
					<View style={{width:pxToDp(50),height:pxToDp(50)}}/>
					<View><Text>12月28号</Text></View>
					<View >
						<Image source={require('../../../resource/history.png')} style={{width:pxToDp(50),height:pxToDp(50)}}/>
					</View>
				</TouchableOpacity>
				<View style={styles.progress}>
					<PercentageCircle
						radius={100}
						percent={50}
						color={"#f07848"}
						innerColor={'#f0f0f0'}
						borderWidth={10}
					>
						<View style={styles.progressContent}>
							<View><Text style={{fontSize:12,color:'#f07848'}}>今日已完成</Text></View>
							<View><Text style={{fontSize:38,color:'#f07848'}}>50%</Text></View>
							<TouchableOpacity onPress={()=>this.props.navigation.navigate('Target')}>
								<Text style={{fontSize:14,color:'#f07848'}}>目标：8000</Text></TouchableOpacity>
						</View>
					</PercentageCircle>
				</View>
				<View style={styles.step}>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/calorie.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>300卡</Text>
					</View>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/running.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>4000步</Text>
					</View>
					<View style={styles.stepItem}>
						<Image source={require('../../../resource/distance.png')} style={{width:pxToDp(70),height:pxToDp(70)}}/>
						<Text style={styles.txt}>2.9km</Text>
					</View>
				</View>
				<LineChart steps={this.state.steps}/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
		backgroundColor:'#f0f0f0'
	},
	date:{
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