import React, {Component} from 'react'
import {StackNavigator} from 'react-navigation'
import Home from './page/home'
import History from './page/history'
import Target from './page/target'
import stepStore from './store'
const stackOptions = (navigation) => {
	return ({
		headerStyle:{
			backgroundColor: '#f0f0f0'
		},
		headerBackTitle:false,
		headerBackTitleStyle:{
			color:'white'
		},
		headerTitle:"兔子计步",
		headerTitleStyle:{
			color:'#000000',
			fontSize: 20,
		},
		// headerLeft: <Image
		// 	style={{width: (50),height: (80)}}
		// 	source={require('./resource/logo.png')}/>,
		// headerRight:
		// 	<View style={{paddingRight:(10)}}>
		// 		<TouchableOpacity onPress={()=>navigation.navigate('PersonalCenter')}>
		// 			<Image
		// 				style={{width: (50),height: (50)}}
		// 				source={require('./resource/personal.png')}/>
		// 		</TouchableOpacity>
		// 	</View>,
	})
	
};
stepStore.init();

const App = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({navigation}) => stackOptions(navigation)
	},
	History:{
		screen:History,
		navigationOptions:{
			headerStyle:{
				backgroundColor: '#f0f0f0'
			},
		}
	},
	Target:{
		screen:Target,
		navigationOptions:{
			headerStyle:{
				backgroundColor: '#f0f0f0'
			},
		}
	}
});

export default App
