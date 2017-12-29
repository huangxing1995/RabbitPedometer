import React,{Component} from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
	Picker
} from 'react-native'
import {pxToDp} from '../../util'

export default class Info extends Component{
	constructor(){
		super()
		this.state = {
			isInEditMode:false,
			firstName:"Judy",
			lastName:"Huang",
			birth:"1996/4/5",
			height:"188",
			sex:"女",
			target:8000,
		}
	}
	render(){
		return(
			<ScrollView style={styles.wrapper} contentContainStyle={styles.contentStyle}>
				<View style={styles.header}>
					<View style={styles.photo}>
						<Image
							style={{width: pxToDp(150),height: pxToDp(150)}}
							source={require('../../../resource/nick.jpg')}
							// resizeMode='cover'
						/>
					</View>
					<View style={styles.name}>
						<Text style={{fontSize:26,fontWeight:'bold'}}>Judy</Text>
					</View>
				</View>
				<View style={styles.list}>
					<View style={styles.item}>
						<Text>姓名</Text>
						<Text>{this.state.firstName}</Text>
					</View>
					<View style={styles.item}>
						<Text>出生年月</Text>
						{/*<Picker*/}
							{/*selectedValue={this.state.birth}*/}
							{/*onValueChange={(birth) => this.setState({birth})}>*/}
							{/*<Picker.Item label="male" value="男" />*/}
							{/*<Picker.Item label="female" value="女" />*/}
						{/*</Picker>*/}
						<Text>{this.state.birth}</Text>
					</View>
					<View style={styles.item}>
						<Text>性别</Text>
						<Text>{this.state.sex}</Text>
					</View>
					<View style={styles.item}>
						<Text>身高</Text>
						<Text>{this.state.height}</Text>
					</View>
					<View style={[styles.item,{borderBottomWidth:pxToDp(0)}]}>
						<Text>步行目标</Text>
						<Text>{this.state.target}</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={[styles.btn,styles.save]}>
						<Text style={{fontSize:18,color:'#ff7890'}}>保存</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.btn,styles.cancel]}>
						<Text style={{fontSize:18,color:'#666666'}}>取消</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

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
		borderWidth:pxToDp(5),
		borderColor:'#aaaaaa'
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
		height:pxToDp(80),
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		borderColor:"#aaaaaa",
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
	save:{}
})