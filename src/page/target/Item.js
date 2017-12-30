import React,{Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform
} from 'react-native'
import {pxToDp} from "../../util";

export default class Item extends Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			key:'',
			value:null
		}
	}
	componentDidMount(){
		let {infoItem} = this.props;
		if (infoItem.length){
			this.setState({key:infoItem[0],value:infoItem[1]})
		}
	}
	
	handleSubmit(){
		this.props.onChangeInfo(this.props.type,this.state.value)
	}
	render(){
		const underlineColorAndroid = Platform.OS === 'android' ? {underlineColorAndroid:'transparent',padding:0}:null;
		return(
			<View style={styles.item}>
				<Text style={styles.txt}>{this.state.key}</Text>
				<TextInput
					style={[{width:80,height: 40, borderColor: 'transparent', borderWidth: 1},underlineColorAndroid]}
					onChangeText={(value) => this.setState({value})}
					value={this.state.value}
					onEndEditing={()=>this.handleSubmit()}
					editable={this.props.isInEditMode}
				/>
			</View>
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
	},
	txt:{
		fontSize:16,
		color:'#222222'
	}
})