import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
	TextInput,
	Platform
} from 'react-native'
import {pxToDp} from '../../util'

const FIRST_NAME = '姓';
const LAST_NAME = '名';
const AGE = '年龄';
const HEIGHT = '身高';
const SEX = '性别';
const TARGET = '目标步数';

const KEY = 0;
const VALUE = 1;

class Item extends Component{
	static defaultProps = {
		pair:['','未设置']
	}
	constructor(props){
		super(props);
		this.map = new Map([
			[FIRST_NAME,'Judy'],
			[LAST_NAME,'Smith'],
			[AGE,'18'],
			[HEIGHT,'168cm'],
			[SEX,'female'],
			[TARGET,'8000'],
		]);
		this.state = {
			text:''
		}
	}
	componentDidMount(){
		let v = this.map.get(this.props.infoItem);
		this.setState({text:v})
	}
	render(){
		const underlineColorAndroid = Platform.OS == 'android' ? {underlineColorAndroid:'transparent',padding:0}:null;
		return(
			<View style={styles.item}>
				<Text style={styles.txt}>{this.props.infoItem}</Text>
				{/*<Text style={styles.txt}>{this.map.get(this.props.infoItem)}</Text>*/}
				<TextInput
					style={[{width:80,height: 40, borderColor: 'transparent', borderWidth: 1},underlineColorAndroid]}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
				/>
			</View>
		)
	}
}
export default class Info extends Component{
	constructor(){
		super();
		this.state = {
			info: [FIRST_NAME,LAST_NAME,AGE,HEIGHT,SEX,TARGET]
		}
	}
	componentWillMount(){
	}
	render(){
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
						this.state.info.map((infoItem, index) => {
							return <Item infoItem={infoItem} key={index}/>
						})
					}
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={[styles.btn,styles.save]}>
						<Text style={{fontSize:18,color:'#ff4560'}}>保存</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.btn,styles.cancel]}>
						<Text style={{fontSize:18,color:'#666666'}}>取消</Text>
					</TouchableOpacity>
				</View>
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