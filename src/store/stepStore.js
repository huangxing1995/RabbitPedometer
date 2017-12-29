import {Store,dispatch,data,stateKey,param,flowFrom} from 'react-eflow'


export default class StepStore extends Store {
	
	static StateKeys = {
		init: '',
	};
	
	constructor(options) {
		super(options);
		this.initState({
			info:new Map(),
			todayStep:new Map(),
			weekStep:new Map(),
			}
		);
		this.getTodayOnHistory.flowFrom(this.init)
	}
	
	init() {
		this.init.dispatch('111')
	}
	
}

