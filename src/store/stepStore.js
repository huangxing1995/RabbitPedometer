import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'

const FIRST_NAME = '姓';
const LAST_NAME = '名';
const AGE = '年龄';
const HEIGHT = '身高';
const SEX = '性别';
const TARGET = '目标步数';

const TIME_00 = '0时'
const TIME_06 = '6时'
const TIME_12 = '12时'
const TIME_18 = '18时'
const TIME_24 = '24时'
const TIME_NOW = (new Date()).getHours().toString()+'时';

const DAY_1 = '1日'
const DAY_2 = '2日'
const DAY_3 = '3日'
const DAY_4 = '4日'
const DAY_5 = '5日'
const DAY_6 = '6日'
const DAY_7 = '7日'

export default class StepStore extends Store {
	// static StateKeys = {
	// 	init: '',
	// };
	//
	constructor(options) {
		super(options);
		this.initState({
			info:new Map(),
			todayStep:new Map(),
			weekStep:new Map(),
			nowStep:String,
			targetStep:String
			}
		);
		// this.info.flowFrom(this.init);
		// this.todayStep.flowFrom(this.init);
		// this.weekStep.flowFrom(this.init);
	}
	
	init() {
		// this.init.dispatch('111')
		// 读取本地缓存内容
		const mockInfo = new Map([
			[FIRST_NAME,'Nick'],
			[LAST_NAME,'Judy'],
			[AGE,'18'],
			[HEIGHT,'172'],
			[SEX,'male'],
			[TARGET,'9000'],
		]);
		const mockTodayStep = new Map([
			[TIME_00,'111'],
			[TIME_06,'222'],
			[TIME_12,'333'],
			[TIME_18,'444'],
			[TIME_24,'555'],
		]);
		const mockWeekStep = new Map([
			[DAY_1,'1000'],
			[DAY_2,'2000'],
			[DAY_3,'3000'],
			[DAY_4,'4000'],
			[DAY_5,'5000'],
			[DAY_6,'6000'],
			[DAY_7,'7000'],
		]);
		this.setInfo(mockInfo);
		this.setNowStep((3435).toString());
		this.setTodayStep(mockTodayStep);
		this.setWeekStep(mockWeekStep);
		this.setTargetStep((8000).toString())
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
	setNowStep(step){
		this.nowStep.dispatch(step)
	}
	setInfo(info){
		this.info.dispatch(info)
	}
	setTodayStep(todayStep){
		this.todayStep.dispatch(todayStep)
	}
	setWeekStep(weekStep){
		this.weekStep.dispatch(weekStep)
	}
	setTargetStep(step){
		this.targetStep.dispatch(step)
	}
	
}

