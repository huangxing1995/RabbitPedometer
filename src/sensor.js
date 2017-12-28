import { Accelerometer, Gyroscope } from 'react-native-sensors';
const accelerationObservable = new Accelerometer({
	updateInterval: 100, // defaults to 100ms
});

// Normal RxJS functions
accelerationObservable
	.map(({ x, y, z }) => x + y + z)
	.subscribe(speed => console.log(`You moved your phone with ${speed}`));

setTimeout(() => {
	accelerationObservable.stop();
}, 1000);