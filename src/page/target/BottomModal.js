import Modal from 'react-native-modal'
import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	TextInput,
	ScrollView,
} from 'react-native'
import {pxToDp} from "../../util";
import {InfoType} from '../../types'
import RadioForm from 'react-native-simple-radio-button';
export default class BottomModal extends Component{
	constructor(props){
		super(props);
		this.state={
			text:''
		}
		this.radio_props = [
			{label: '男', value: 'male' },
			{label: '女', value: 'female' }
		];
	}
	
	handleModalSave(){
		this.props.handleModalSave(this.props.type, this.state.text)
	}
	handleModalCancel(){
		this.props.handleModalCancel();
	}
	handleModalShow(){
		this.setState({text:this.props.defaultValue})
	}
	handleModalHide(){
		this.setState({text:''})
	}
	
	_renderContent(){
		let keyboardType;
		if (this.props.type === InfoType.FIRST_NAME
			|| this.props.type === InfoType.LAST_NAME
			|| this.props.type === InfoType.LAST_NAME ){
			keyboardType = 'default'
		} else {
			keyboardType = 'numeric'
		}
		return(
			<View style={styles.header}>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					multiline={false}
					autoFocus={true}
					keyboardType={keyboardType}
					underlineColorAndroid={"transparent"}
				/>
			</View>
		)
	}
	
	render(){
		return(
			<Modal
				isVisible={this.props.isModalVisible}
				style={{justifyContent:'center', alignItems:'center',}}
				onModalShow={()=>this.handleModalShow()}
				onModalHide={()=>this.handleModalHide()}
				avoidKeyboard={true}
			>
				<View style={styles.wrapper}>
					{this._renderContent()}
					<View style={styles.footer}>
						<TouchableOpacity
							onPress={()=>this.handleModalSave()}
							style={[styles.btn,styles.save]}>
							<Text style={styles.txt}>确认</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={()=>this.handleModalCancel()}
							style={[styles.btn,styles.cancel]}>
							<Text style={styles.txt}>取消</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	wrapper:{
		width:pxToDp(700),
		height:pxToDp(300),
		justifyContent:'space-around',
		alignItems:'center',
		borderRadius:pxToDp(20),
		backgroundColor:'#f0f0f0',
	},
	header:{
		width:pxToDp(700),
		height:pxToDp(150),
		justifyContent:'center',
		alignItems:'center',
		marginLeft:pxToDp(50),
		marginRight:pxToDp(50),
	},
	input:{
		width:pxToDp(600),
		height:pxToDp(100),
		marginLeft:pxToDp(50),
		padding: 0,
	},
	footer:{
		width:pxToDp(700),
		height:pxToDp(100),
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		borderRadius:pxToDp(20),
	},
	
	btn:{
		width:pxToDp(300),
		height:pxToDp(80),
		margin:pxToDp(10),
		backgroundColor:'#e0e0e0',
		borderRadius:pxToDp(20),
		justifyContent:'center',
		alignItems:'center',
		borderColor:"transparent",
		borderBottomWidth:pxToDp(1),
		borderTopWidth:pxToDp(1),
	},
	cancel:{
		backgroundColor:'#cccccc',
	},
	save:{
		backgroundColor:'#00aaff',
	},
	txt:{
		fontSize:16,
		color:'#ffffff'
	}
});