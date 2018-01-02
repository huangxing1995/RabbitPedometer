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
import BottomModal from './BottomModal'
import Item from './InfoItem'
import {pxToDp} from '../../util'
import {InfoType} from '../../types'
const {FIRST_NAME,LAST_NAME,AGE,HEIGHT,SEX,TARGET} = InfoType;
// const TEXT = 0, RATIO = 1;
export class InfoList extends Component{
	constructor(props){
		super(props);
		let {info} = props;
		this.oldInfo = info;
		this.state = {
			isInEditMode:false,
			isModalVisible: false,
			modalType:null,
			[FIRST_NAME]:info.get(FIRST_NAME),
			[LAST_NAME]:info.get(LAST_NAME),
			[AGE]:info.get(AGE),
			[SEX]:info.get(SEX),
			[HEIGHT]:info.get(HEIGHT),
			[TARGET]:info.get(TARGET),
		}
	}
	componentWillReceiveProps(props){
		let {info} = props;
		this.oldInfo = info;
		this.setState({
			[FIRST_NAME]:info.get(FIRST_NAME),
			[LAST_NAME]:info.get(LAST_NAME),
			[AGE]:info.get(AGE),
			[SEX]:info.get(SEX),
			[HEIGHT]:info.get(HEIGHT),
			[TARGET]:info.get(TARGET),
		})
	}
	handleSwitchMode(){
		let prevMode = this.state.isInEditMode;
		this.setState({
			isInEditMode:!prevMode
			})
	}
	handleSave(){
		this.handleSwitchMode();
		let map = new Map();
		map.set(FIRST_NAME,this.state[FIRST_NAME])
		map.set(LAST_NAME,this.state[LAST_NAME])
		map.set(AGE,this.state[AGE])
		map.set(SEX,this.state[SEX])
		map.set(HEIGHT,this.state[HEIGHT])
		map.set(TARGET,this.state[TARGET])
		this.props.handleSave(map);
		
	}
	handleCancel(){
		this.handleSwitchMode();
		this.setState({
			[FIRST_NAME]:this.oldInfo.get(FIRST_NAME),
			[LAST_NAME]:this.oldInfo.get(LAST_NAME),
			[AGE]:this.oldInfo.get(AGE),
			[SEX]:this.oldInfo.get(SEX),
			[HEIGHT]:this.oldInfo.get(HEIGHT),
			[TARGET]:this.oldInfo.get(TARGET),
		})
	}
	
	handleModalSave(type, newData){
		// console.log(type,newData)
		this.setState({ isModalVisible: !this.state.isModalVisible });
		this.setState({[type]: newData})
	}
	handleModalCancel(){
		this.setState({ isModalVisible: !this.state.isModalVisible })
	}
	handleModify(type){
		this.setState({modalType:type});
		// 调出modal
		this.setState({ isModalVisible: !this.state.isModalVisible })
	}
	_renderList = () => {
		let {info} = this.props;
		let list = [];
		for (let [key ,value] of info){
			list.push(
				<Item
					key={key}
					type={key}
					itemKey={key}
					itemValue={this.state[key]}
					isInEditMode={this.state.isInEditMode}
					handleModify={(type)=>this.handleModify(type)}
				/>
			)
		}
		return(
			<View style={styles.list}>
				{list}
			</View>
		)
	}
	_renderBtn = () => {
		let outEditModeView = (
			<View style={styles.footer}>
				<TouchableOpacity style={[styles.btn,styles.save]} onPress={()=>this.handleSwitchMode()}>
					<Text style={{fontSize:18,color:'#ffffff'}}>修改</Text>
				</TouchableOpacity>
			</View>
		);
		let inEditModeView = (
			<View style={styles.footer}>
				<TouchableOpacity style={[styles.btn,styles.save,{backgroundColor:'#00aaff'}]} onPress={()=>this.handleSave()}>
					<Text style={{fontSize:18,color:'#ffffff'}}>保存</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.btn,styles.cancel]}  onPress={()=>this.handleCancel()}>
					<Text style={{fontSize:18,color:'#ffffff'}}>取消</Text>
				</TouchableOpacity>
			</View>
		);
		return this.state.isInEditMode
			? inEditModeView
			: outEditModeView
	}
	
	render(){
		return(
			<View style={{flex:1,		backgroundColor:"#fcfcfc",}}>
				{this._renderList()}
				{this._renderBtn()}
				<BottomModal
					isModalVisible={this.state.isModalVisible}
					type={this.state.modalType}
					defaultValue={this.state[this.state.modalType]}
					handleModalSave={(type,newData)=>this.handleModalSave(type,newData)}
					handleModalCancel={()=>this.handleModalCancel()}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	list:{
		flex:1,
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
		height:pxToDp(200),
		justifyContent:'space-between',
		marginTop:pxToDp(100)
	},
	btn:{
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
		backgroundColor:'#e0e0e0',
	},
	save:{
		backgroundColor:'#f07848',
	},
	txt:{
		fontSize:16,
		color:'#ffffff'
	}
});
export default InfoList