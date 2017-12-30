import React, {
	AsyncStorage
}from 'react-native';
import JsonUtils from './JsonUtils'

class DeviceStorage {
	static get(key) {
		return new Promise((resolve,reject)=>{
			AsyncStorage.getItem(key,(error,result)=> {
				if (error) reject(error);
				if (result !== null){
					result = JSON.parse(result);
					Array.isArray(result)
						? resolve(new Map(result))
						: resolve(result)
				} else {
					resolve(null)
				}
			})
		})
	}
	
	static save(key, value) {
		AsyncStorage.setItem(key, JSON.stringify(value))
	}
}

export default DeviceStorage;