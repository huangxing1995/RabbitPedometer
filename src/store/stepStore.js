import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'
import DeviceStorage from './storage'
import Storage from 'react-native-storage';
import {AsyncStorage}from 'react-native';
import {
	StorageKeys,InfoType,HourType,DayType
} from '../types'
import RNSensors from 'react-native-sensors';
import onSensorChanged from '../algorithm'

const { Accelerometer } = RNSensors;

const accelerationObservable = new Accelerometer({
	updateInterval: 100, // defaults to 100ms
});
global.accelerationObservable = accelerationObservable;



const mockInfo = new Map([
	[InfoType.FIRST_NAME,'Nick'],
	[InfoType.LAST_NAME,'Judy'],
	[InfoType.AGE,'18'],
	[InfoType.HEIGHT,'172'],
	[InfoType.SEX,'male'],
	[InfoType.TARGET,'9000'],
]);
const mockTodayStep = new Map([
	[HourType.Hour_00,'111'],
	[HourType.Hour_06,'222'],
	[HourType.Hour_12,'333'],
	[HourType.Hour_18,'444'],
	[HourType.Hour_24,'555'],
]);
const mockWeekStep = new Map([
	[DayType.DAY_1,'1000'],
	[DayType.DAY_2,'2000'],
	[DayType.DAY_3,'3000'],
	[DayType.DAY_4,'4000'],
	[DayType.DAY_5,'5000'],
	[DayType.DAY_6,'6000'],
	[DayType.DAY_7,'7000'],
]);
const mockNowStep = '8000';
const mockTarget = '9000';

export default class StepStore extends Store {
	constructor(options) {
		super(options);
		this.initState({
			info:new Map(),
			todayStep:new Map(),
			weekStep:new Map(),
			nowStep:'',
			targetStep:'',
			}
		);
	}
	
	init() {
		// 读取本地缓存内容
		// DeviceStorage.get(StorageKeys.INFO)
		// 	.then((data)=>{
		// 		if(!data) data = mockInfo;
		// 		this.setInfo(data)
		// 	})
		// 	.catch((err)=>alert('error'))
		// DeviceStorage.get(StorageKeys.TODAY_STEP)
		// 	.then((data)=>{
		// 		if(!data) data = mockTodayStep;
		// 		this.setTodayStep(data)
		// 	})
		// 	.catch((err)=>alert('error'))
		//
		// DeviceStorage.get(StorageKeys.WEEK_STEP)
		// 	.then((data)=>{
		// 		if(!data) data = mockWeekStep;
		// 		this.setWeekStep(data)
		// 	})
		// 	.catch((err)=>alert('error'))
		// DeviceStorage.get(StorageKeys.NOW_STEP)
		// 	.then((data)=>{
		// 		if(!data) data = mockNowStep;
		// 		this.setNowStep(data)
		// 	})
		// 	.catch((err)=>alert('error'))
		// DeviceStorage.get(StorageKeys.TARGET_STEP)
		// 	.then((data)=>{
		// 		if(!data) data = mockTarget;
		// 		this.setTargetStep(data)
		// 	})
		// 	.catch((err)=>alert('error'))
		//
		//
		/*******************************************************************************/
		var storage = new Storage({
			size: 1000,
			storageBackend: AsyncStorage,
			defaultExpires: 1000 * 3600 * 24 * 7,
			enableCache: true,
		})
		global.storage = storage;
		
		// info
		storage.load({key:StorageKeys.INFO})
			.then(res=>{
				this.setInfo((res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.INFO);
				this.setInfo([...mockInfo])
			});
		// today
		storage.load({key:StorageKeys.TODAY_STEP})
			.then(res=>{
				this.setTodayStep((res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.TODAY_STEP)
				this.setTodayStep([...mockTodayStep])
			})
		// week
		storage.load({key:StorageKeys.WEEK_STEP})
			.then(res=>{
				this.setWeekStep((res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.WEEK_STEP)
				this.setWeekStep([...mockWeekStep])
				
			})
		// now
		storage.load({key:StorageKeys.NOW_STEP})
			.then(res=>{
				this.setNowStep(res)
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.NOW_STEP)
				this.setNowStep(mockNowStep)
				
			})
		// target
		storage.load({key:StorageKeys.TARGET_STEP})
			.then(res=>{
				this.setTargetStep(res)
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.TARGET_STEP)
				this.setTargetStep(mockTarget)
			})
		// setTimeout(()=>this.setNowStep(6000),1000)
	}
	info(){
		return this.info.data;
	}
	nowStep(){
		return this.nowStep.data;
	}
	todayStep(){
		return this.todayStep.data;
	}
	weekStep(){
		return this.weekStep.data;
	}
	targetStep(){
		let data = this.info().data;
		let target = data.get(TARGET);
		this.targetStep.dispatch(target);
		
		return this.targetStep.data;
	}
	acceleration(){
		return this.acceleration.data;
	}
	
	setInfo(info){ // [[],[]]
		info = new Map(info)
		this.info.dispatch((info));
		this.setTargetStep(info.get(InfoType.TARGET));
		storage.save({key:StorageKeys.INFO, data:[...info]})
	}
	setTodayStep(todayStep){// [[],[]]
		todayStep = new Map(todayStep)
		this.todayStep.dispatch((todayStep))
		storage.save({key:StorageKeys.TODAY_STEP, data:[...todayStep]})
	}
	setWeekStep(weekStep){// [[],[]]
		weekStep = new Map(weekStep)
		this.weekStep.dispatch((weekStep))
		storage.save({key:StorageKeys.WEEK_STEP, data:[...weekStep]})
	}
	setNowStep(step){ //''
		this.nowStep.dispatch(step)
		storage.save({key:StorageKeys.NOW_STEP, data:step})
	}
	setTargetStep(step){ // ''
		this.targetStep.dispatch(step);
		storage.save({key:StorageKeys.TARGET_STEP, data:step})
	}
	
	setAcceleration(acc){
		let step = onSensorChanged(acc);
		this.acceleration.dispatch(step)
		console.log(step);
	}
}

