
function mapToObj(map){
	let obj = Object.create(null);
	for (let [k,v] of map){
		obj[k] = v;
	}
	return obj;
}
function objToMap(obj){
	let map = new Map();
	for (let k of Object.keys(obj)){
		map.set(k,obj[k])
	}
	return map;
}

let JsonUtils = {
	mapToObj,
	objToMap,

}
export default JsonUtils