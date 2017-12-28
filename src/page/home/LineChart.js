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
	render(){
		return(
			<View style={styles.wrapper}>
				<View style={styles.line}>
					{this.props.steps && this.props.steps.map((step, index, self) => {
						let height = (step / Math.max.apply(null,self) * 110);
						return (
							<View style={{justifyContent:'center',alignItems:'center'}} key={index}>
								<View>
									<Text style={[styles.txt,{fontSize:12}]}>{step}</Text>
								</View>
								<View style={[styles.linearGradient,{height}]}
								/>
							</View>
						)
					})}
				</View>
				<View style={styles.time}>
					{this.props.steps && this.props.steps.map((step, index) => {
						return (
							<View key={index}>
								<Text style={[styles.txt,{fontSize:12}]} key={index}>{index*6+':00'}</Text>
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
		// flexDirection:'row',
		// justifyContent:'space-around',
		// alignItems:'center',
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
})
export default LineChart