import React,{Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	Image,
	TouchableOpacity
} from 'react-native'
import {pxToDp} from "../../util";

export default class Item extends Component{
	
	constructor(props){
		super(props);
	}
	componentDidMount(){
	}
	
	render(){
		let right = this.props.isInEditMode
			? <View style={styles.right}>
					<Text style={styles.txt}>{this.props.itemValue}</Text>
					<Image source={require('../../../resource/go.png')} style={{width:pxToDp(40),height:pxToDp(40)}}/>
				</View>
			:	<Text style={styles.txt}>{this.props.itemValue}</Text>;
		return(
			<TouchableOpacity style={styles.item} onPress={()=>{this.props.isInEditMode&&this.props.handleModify(this.props.type)}}>
				<Text style={styles.txt}>{this.props.itemKey}</Text>
				{right}
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	item:{
		flex:1,
		height:pxToDp(90),
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		borderColor:"#cccccc",
		borderBottomWidth:pxToDp(1),
		marginLeft:pxToDp(10)
	},
	right:{
		flexDirection:'row',
		height:pxToDp(90),
		justifyContent:'center',
		alignItems:'center'
	},
	txt:{
		fontSize:16,
		color:'#222222'
	}
})