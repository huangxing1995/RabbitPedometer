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

const LastSevenDay = 7

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
		this.step = 0;
		this.step_Hours = [0, 0, 0, 0, 0];
		this.LastSevenDay_step = [0,0,0,0,0,0,0];
	}
	
	init() {
		// 读取本地缓存内容
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
		// this.acceleration.dispatch(acc);
		this.step = onSensorChanged(acc);
		console.log(this.step);
		
		this.setNowStep(this.step);
		
		this.acceleration.dispatch(this.step);
		
			this.setNowStep('2000');
			this.setTargetStep('12000');
			this.setTodayStep([
				[HourType.Hour_00,'1000'],
				[HourType.Hour_06,'1000'],
				[HourType.Hour_12,'1000'],
				[HourType.Hour_18,'1000'],
				[HourType.Hour_24,'1000'],
			]);
			this.setWeekStep([...mockWeekStep]);
	
		
		// var myDate = new Date()
		// var Hour = myDate.getHours()
		// var Minutes = myDate.getMinutes();
		// var Seconds = myDate.getSeconds();
		// var Hours = [0, 6, 12, 18, 24];
		// var temp_left = 0;
		// for(var i = 0; i < 5; i++) {
		// 	if(Hour > Hours[i])
		// 		temp_left++;
		// }
		// if(Minutes === 0 && Seconds === 0) {
		// 	if(Hour === 0) {
		// 		this.step = 0;
		// 		this.step_Hours = [0, 0, 0, 0, 0];
     //    this.step_Hours[0] = this.step
		// 	}
		// 	if(Hour === 6) {
		// 		this.step_Hours[1] = this.step
		// 	}
		// 	if(Hour === 12) {
		// 		this.step_Hours[2] = this.step
		// 	}
		// 	if(Hour === 18) {
		// 		this.step_Hours[3] = this.step
		// 	}
		// }
		// if(Hour === 23 && Minutes === 59 && Seconds === 59) {
		// 	this.step_Hours[4] = this.step
		// 	this.step = 0
		// 	this.LastSevenDay_step.shift();
		// 	this.LastSevenDay_step.push(this.step_Hours[4])
		// }
		//
		// var today_step = new Map()
		// var HoursType = [HourType.Hour_00, HourType.Hour_06, HourType.Hour_12, HourType.Hour_18, HourType.Hour_24]
		//
		// for(var i = 0; i < temp_left; i++) {
		// 	today_step.set(HoursType[i], this.step_Hours[i].toString())
		// }
		// today_step.set(Hour + "时", this.step.toString())
		// for(var i = temp_left; i < 5; i++) {
     //  today_step.set(HoursType[i], this.step_Hours[i].toString())
		// }
		// this.setTodayStep([...today_step]);
		//
		// var	week_step = new Map()
		//
		// week_step.set(DayType.DAY_1, this.LastSevenDay_step[0].toString())
		// week_step.set(DayType.DAY_2, this.LastSevenDay_step[1].toString())
		// week_step.set(DayType.DAY_3, this.LastSevenDay_step[2].toString())
		// week_step.set(DayType.DAY_4, this.LastSevenDay_step[3].toString())
		// week_step.set(DayType.DAY_5, this.LastSevenDay_step[4].toString())
		// week_step.set(DayType.DAY_6, this.LastSevenDay_step[5].toString())
		// week_step.set(DayType.DAY_7, this.LastSevenDay_step[6].toString())
		// this.setWeekStep([...week_step])
	}
}

