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


class LineChart extends Component{
	constructor(props){
		super(props)
	}
	getMaxHeight(arr){
		let max = 0;
		arr.forEach((item)=>max = max>item[1]?max:item[1])
		return max;
	}
	render(){
		let {steps} = this.props;
		this.maxHeight = this.getMaxHeight([...steps]);
		return(
			<View style={styles.wrapper}>
				<View style={styles.line}>
					{[...steps].map(([time,step], index) => {
						let height = (step / this.maxHeight * 110);
						return (
							<View style={{justifyContent:'center',alignItems:'center'}} key={index}>
								<View>
									<Text style={[styles.txt,{fontSize:12}]}>{step}</Text>
								</View>
								<View style={[styles.linearGradient,{marginBottom:height}]}/>
							</View>
						)
					})}
				</View>
				<View style={styles.time}>
					{[...steps].map(([time,step], index) => {
						return (
							<View key={index}>
								<Text style={[styles.txt,{fontSize:12}]} key={index}>{time}</Text>
							</View>
						)
					})}
				</View>
			</View>
		)
		
	}
}
const styles = StyleSheet.create({
	wrapper:{
		height:pxToDp(350),
		margin:pxToDp(10),
		backgroundColor:'#e0e0e0',
		borderRadius:pxToDp(20)
	},
	line:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'flex-end',
		borderBottomWidth:pxToDp(1),
		borderBottomColor:'#ff9048',
	},
	time:{
		height:pxToDp(50),
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
	},
	txt:{
		color:'#ff9048',
		fontSize:18,
	},
	linearGradient:{
		width:pxToDp(10),
		height:pxToDp(10),
		backgroundColor:'#ff9048',
		borderRadius:pxToDp(5)
	}
})
export default LineChart