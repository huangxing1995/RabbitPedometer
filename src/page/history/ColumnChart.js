import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet
} from 'react-native';
import {pxToDp} from '../../util'

class ColumnChart extends Component{
	constructor(props){
		super(props)
	}
	getMaxHeight(arr){
		let max = 0;
		arr.forEach((item)=>max = max>item[1]?max:item[1])
		if (max > 2000) return max;
		else return 2000;
	}
	getAverage(steps){ //map
		let i = 0,sum = 0;
		for (let [k,v] of steps){
			sum += Number(v);
			i++;
		}
		return Math.ceil(sum/i)
	}
	render(){
		let steps = this.props.steps; // map
		this.maxHeight = this.getMaxHeight([...steps]);
		return(
			<ScrollView
				style={styles.wrapper}
				contentContainerStyle={styles.contentStyle}
			>
				<View>
					<Image
						style={{height:pxToDp(500)}}
						source={require('../../../resource/judy.jpg')}
						resizeMode='contain'/>
				</View>
				<View style={styles.chart}>
					<View style={styles.header}>
						<View><Text style={[styles.txt,{fontSize:16}]}>步数</Text></View>
						<View><Text style={[styles.txt,{fontSize:16}]}>本周平均{this.getAverage(steps)}步</Text></View>
					</View>
					<View style={styles.column}>
						{[...steps].map(([day, step], index) => {
							let height = (step / this.maxHeight * 110);
							
							return (
								<View style={{justifyContent:'center',alignItems:'center'}} key={index}>
									<View style={{width:pxToDp(50),justifyContent:'center',alignItems:'center'}}>
										<Text style={[styles.txt,{fontSize:8}]}>{step}</Text>
									</View>
									<View style={[styles.linearGradient,{height}]}
									/>
								</View>
							)
						})}
					</View>
					<View style={styles.time}>
						{[...steps].map(([day,step], index) => {
							return (
								<View key={index}>
									<View style={{width:pxToDp(50),justifyContent:'center',alignItems:'center'}}>
										<Text style={[styles.txt,{fontSize:12}]} key={index}>{day}</Text>
									</View>
								</View>
							)
						})}
					</View>
				</View>
				<View style={styles.photo}>
					<Image
						style={{width: pxToDp(100),height: pxToDp(100)}}
						source={require('../../../resource/nick.jpg')}
						resizeMode='cover'/>
				</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	wrapper:{
		backgroundColor:'#f0f0f0',
		flex:1,
		flexDirection:'column',
		
	},
	contentStyle:{
		justifyContent:'center',
		alignItems:'center'
	},
	txt:{
		color:'white',
		fontSize:14,
	},
	chart:{
		width:pxToDp(720),
		height:pxToDp(350),
		backgroundColor:'#ff9048',
		borderRadius:pxToDp(10),
		marginTop:pxToDp(80),
		// padding:pxToDp(20)
	},
	photo:{
		width:pxToDp(100),
		height:pxToDp(100),
		backgroundColor:'black',
		borderRadius:pxToDp(50),
		position:'absolute',
		top:pxToDp(450),
		overflow:'hidden',
		borderWidth:pxToDp(1),
		borderColor:'#f0f0f0',
	},
	header:{
		height:pxToDp(50),
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		borderBottomWidth:pxToDp(1),
		borderBottomColor:'#ff9048',
		padding:pxToDp(10)
	},
	column:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'flex-end',
		borderBottomWidth:pxToDp(1),
		borderBottomColor:'#ffd800',
	},
	time:{
		height:pxToDp(50),
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
	},
	linearGradient:{
		width:pxToDp(10),
		height:pxToDp(10),
		backgroundColor:'#f0d800',
		borderRadius:pxToDp(5)
	}
});

export default ColumnChart