import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'
import DeviceStorage from './storage'
import Storage from 'react-native-storage';
import {AsyncStorage}from 'react-native';
import {
	StorageKeys,InfoType,HourType,DayType
} from '../types'

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
			targetStep:''
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
		/*
		* 第一次启动
		* */
		// storage.save({key:StorageKeys.INFO,data:[...mockInfo]});
		// storage.save({key:StorageKeys.TODAY_STEP,data:[...mockTodayStep]});
		// storage.save({key:StorageKeys.WEEK_STEP,data:[...mockWeekStep]});
		// storage.save({key:StorageKeys.NOW_STEP,data:mockNowStep});
		// storage.save({key:StorageKeys.TARGET_STEP,data:mockTarget});
		
		// info
		storage.load({key:StorageKeys.INFO})
			.then(res=>{
				this.setInfo(new Map(res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.INFO)
			});
		// today
		storage.load({key:StorageKeys.TODAY_STEP})
			.then(res=>{
				this.setTodayStep(new Map(res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.TODAY_STEP)
			})
		// week
		storage.load({key:StorageKeys.WEEK_STEP})
			.then(res=>{
				this.setWeekStep(new Map(res))
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.WEEK_STEP)
			})
		// now
		storage.load({key:StorageKeys.NOW_STEP})
			.then(res=>{
				this.setNowStep(res)
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.NOW_STEP)
			})
		// target
		storage.load({key:StorageKeys.TARGET_STEP})
			.then(res=>{
				this.setTargetStep(res)
			})
			.catch(err=>{
				console.log('no data about' + StorageKeys.TARGET_STEP)
			})
		setTimeout(()=>this.setNowStep(6000),1000)
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
	
	
	setInfo(info){
		this.info.dispatch(info)
		// DeviceStorage.save(StorageKeys.INFO,info)
	}
	setTodayStep(todayStep){
		this.todayStep.dispatch(todayStep)
		// DeviceStorage.save(StorageKeys.TODAY_STEP,todayStep)
	}
	setWeekStep(weekStep){
		this.weekStep.dispatch(weekStep)
		// DeviceStorage.save(StorageKeys.WEEK_STEP,weekStep)
	}
	setNowStep(step){
		this.nowStep.dispatch(step)
		// DeviceStorage.save(StorageKeys.NOW_STEP,step)
	}
	setTargetStep(step){
		this.targetStep.dispatch(step)
		// DeviceStorage.save(StorageKeys.TARGET_STEP,step)
	}
}

