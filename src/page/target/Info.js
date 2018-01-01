import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native'
import {pxToDp} from '../../util'
import stepStore from '../../store'
import {wrapComponent} from 'react-eflow'
import InfoList from './InfoList'
export class Info extends Component{
	constructor(){
		super();
	}
	
	handleSave(newInfo){
		stepStore.setInfo(newInfo);
		
	}
	handleCancel(){
	
	}
	
	render(){
		let {info} = this.props;
		return(
			<ScrollView style={styles.wrapper} contentContainStyle={styles.contentStyle}>
				<View style={styles.header}>
					<View style={styles.photo}>
						<Image
							style={{width: pxToDp(150),height: pxToDp(150)}}
							source={require('../../../resource/nick.jpg')}
							resizeMode='cover'
						/>
						<View style={styles.fixCircleClipping}/>
					</View>
					<View style={styles.name}>
						<Text style={{fontSize:26,fontWeight:'bold'}}>Judy</Text>
					</View>
				</View>
				<InfoList
					info={info}
					handleSave={(newInfo)=>this.handleSave(newInfo)}
					handleCancel={()=>this.handleCancel()}
				/>
			</ScrollView>
		)
	}
}
const circleFixBorder = 75;
const styles = StyleSheet.create({
	wrapper:{
		backgroundColor:"#fcfcfc",
		flex:1,
	},
	contentStyle:{
		justifyContent:'flex-start',
		alignItems:'center'
	},
	header:{
		height:pxToDp(250),
		alignItems:'center',
		marginTop:pxToDp(50)
	},
	photo:{
		width:pxToDp(150),
		height:pxToDp(150),
		borderRadius:pxToDp(75),
		overflow:'hidden',
		borderWidth:pxToDp(2),
		borderColor:'#aaaaaa'
	},
	fixCircleClipping: {
		position: 'absolute',
		top: -circleFixBorder,
		bottom: -circleFixBorder,
		right: -circleFixBorder,
		left: -circleFixBorder,
		borderRadius: 150 / 2 + 150 / 2,
		borderWidth: circleFixBorder,
		borderColor: "#fcfcfc"
	},
	name:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
});

export default wrapComponent(Info, [stepStore.info])