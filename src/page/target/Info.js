import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native'
import Item from './Item'
import {pxToDp} from '../../util'
import stepStore from '../../store'
import {wrapComponent} from 'react-eflow'

export class Info extends Component{
	constructor(){
		super();
		this.newInfo = new Map();
		this.state = {
			isInEditMode:false,
			isClickCancel:false
		}
	}
	componentDidMount(){
		this.newInfo = this.props.info && this.props.info;
	}
	handleChangeInfo(type, value){
		this.newInfo.set(type,value)
	}
	handleSave(){
		stepStore.setInfo(this.newInfo);
		this.handleSwitchMode(this.state.isInEditMode)
	}
	handleCancel(){
		this.newInfo = this.props.info && this.props.info;
		this.handleSwitchMode(this.state.isInEditMode);
		this.setState({isClickCancel:true},()=>this.setState({isClickCancel:false}))
		
	}
	handleSwitchMode(mode){
		this.setState({isInEditMode:!mode})
	}
	render(){
		let {info} = this.props;
		
		let outEditModeView = (
			<View style={styles.footer}>
				<TouchableOpacity style={[styles.btn,styles.save]} onPress={()=>this.handleSwitchMode(this.state.isInEditMode)}>
					<Text style={{fontSize:18,color:'#ff4560'}}>修改</Text>
				</TouchableOpacity>
			</View>
		);
		let inEditModeView = (
			<View style={styles.footer}>
				<TouchableOpacity style={[styles.btn,styles.save]} onPress={()=>this.handleSave()}>
					<Text style={{fontSize:18,color:'#ff4560'}}>保存</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.btn,styles.cancel]}  onPress={()=>this.handleCancel()}>
					<Text style={{fontSize:18,color:'#666666'}}>取消</Text>
				</TouchableOpacity>
			</View>
		);
		
		
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
				<View style={styles.list}>
					{
						[...info].map((infoItem, index) => {
							return (
								<Item
									infoItem={infoItem}
									type={infoItem[0]}
									key={index}
									onChangeInfo={(type, value)=>this.handleChangeInfo(type, value)}
									isInEditMode={this.state.isInEditMode}
									isClickCancel={this.state.isClickCancel}
								/>)
						})
					}
				</View>
				{
					this.state.isInEditMode
					? inEditModeView
					: outEditModeView
				}
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
	list:{
		// height:pxToDp(500),
		// justifyContent:'center',
		// alignItems:'center',
		borderColor:"#aaaaaa",
		borderBottomWidth:pxToDp(1),
		borderTopWidth:pxToDp(1),
		paddingLeft:pxToDp(20),
		paddingRight:pxToDp(20)
	},
	item:{
		flex:1,
		height:pxToDp(90),
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		borderColor:"#cccccc",
		borderBottomWidth:pxToDp(1),
	},
	footer:{
		height:pxToDp(170),
		justifyContent:'space-between',
		marginTop:pxToDp(100)
	},
	btn:{
		height:pxToDp(70),
		justifyContent:'center',
		alignItems:'center',
		borderColor:"#aaaaaa",
		borderBottomWidth:pxToDp(1),
		borderTopWidth:pxToDp(1),
	},
	cancel:{},
	save:{},
	txt:{
		fontSize:16,
		color:'#222222'
	}
})
export default wrapComponent(Info, [stepStore.info])