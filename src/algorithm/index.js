//存放三轴数据
var ValueNum = 4;
//用于存放计算阈值的波峰波谷差值
var tempValue = [];
var tempCount = 0;
//是否上升的标志位
var isDirectionUp = false;
//持续上升次数
var continueUpCount = 0;
//上一点的持续上升的次数，为了记录波峰的上升次数
var continueUpFormerCount = 0;
//上一点的状态，上升还是下降
var lastStatus = false;
//波峰值
var peakOfWave = 0;
//波谷值
var valleyOfWave = 0;
//此次波峰的时间
var timeOfThisPeak = 0;
//上次波峰的时间
var timeOfLastPeak = 0;
//当前的时间
var timeOfNow = 0;
//当前传感器的值
var gravityNew = 0;
//上次传感器的值
var gravityOld = 0;
//动态阈值需要动态的数据，这个值用于这些动态数据的阈值
var InitialValue =  1.3;
//初始阈值
var ThreadValue = 2.0;
//波峰波谷时间差
var TimeInterval = 250;

//步数少于10步时的计步
var count = 0;
//步数大于10步的计步
var mCount = 0;

var myDate = new Date()



export default function onSensorChanged(acc) {
    
    gravityNew = Math.sqrt(acc.x*acc.x + acc.y*acc.y + acc.z*acc.z)
    detectorNewStep(gravityNew)
    return mCount
}




function detectorNewStep(values) {
    if (gravityOld == 0) {
        gravityOld = values;
    } else {
        if (detectorPeak(values, gravityOld)) {
            timeOfLastPeak = timeOfThisPeak;
            timeOfNow = myDate.getMilliseconds();
            if (timeOfNow - timeOfLastPeak >= TimeInterval
                && (peakOfWave - valleyOfWave >= ThreadValue)) {
                timeOfThisPeak = timeOfNow;
                /*
                 * 更新界面的处理，不涉及到算法
                 * 一般在通知更新界面之前，增加下面处理，为了处理无效运动：
                 * 1.连续记录10才开始计步
                 * 2.例如记录的9步用户停住超过3秒，则前面的记录失效，下次从头开始
                 * 3.连续记录了9步用户还在运动，之前的数据才有效
                 * */
                countStep(timeOfLastPeak, timeOfThisPeak);
            }
            if (timeOfNow - timeOfLastPeak >= TimeInterval
                && (peakOfWave - valleyOfWave >= InitialValue)) {
                timeOfThisPeak = timeOfNow;
                ThreadValue = peakValleyThread(peakOfWave - valleyOfWave);
            }
        }
    }
    gravityOld = values;
}

/*
     * 检测波峰
     * 以下四个条件判断为波峰：
     * 1.目前点为下降的趋势：isDirectionUp为false
     * 2.之前的点为上升的趋势：lastStatus为true
     * 3.到波峰为止，持续上升大于等于2次
     * 4.波峰值大于20
     * 记录波谷值
     * 1.观察波形图，可以发现在出现步子的地方，波谷的下一个就是波峰，有比较明显的特征以及差值
     * 2.所以要记录每次的波谷值，为了和下次的波峰做对比
     * */
function detectorPeak(newValue, oldValue) {
    lastStatus = isDirectionUp;
    if (newValue >= oldValue) {
        isDirectionUp = true;
        continueUpCount++;
    } else {
        continueUpFormerCount = continueUpCount;
        continueUpCount = 0;
        isDirectionUp = false;
    }

    if (!isDirectionUp && lastStatus
        && (continueUpFormerCount >= 2 || oldValue >= 20)) {
        peakOfWave = oldValue;
        return true;
    } else if (!lastStatus && isDirectionUp) {
        valleyOfWave = oldValue;
        return false;
    } else {
        return false;
    }
}

function countStep(timeOfLastPeak, timeOfThisPeak) {
    if (timeOfThisPeak - timeOfLastPeak <= 3000) {
        if (count < 9) {
            count++;
        } else if (count == 9) {
            count++;
            mCount += count;
        } else {
            mCount++;
        }
    } else {//超时
        count = 1;//为1,不是0
    }

}

/*
     * 阈值的计算
     * 1.通过波峰波谷的差值计算阈值
     * 2.记录4个值，存入tempValue[]数组中
     * 3.在将数组传入函数averageValue中计算阈值
     * */
function peakValleyThread(value) {
    var tempThread = ThreadValue;
    if (tempCount < ValueNum) {
        tempValue[tempCount] = value;
        tempCount++;
    } else {
        tempThread = averageValue(tempValue, ValueNum);
        for (var i = 1; i < ValueNum; i++) {
            tempValue[i - 1] = tempValue[i];
        }
        tempValue[ValueNum - 1] = value;
    }
    return tempThread;

}

/*
     * 梯度化阈值
     * 1.计算数组的均值
     * 2.通过均值将阈值梯度化在一个范围里
     * */
function averageValue(value, n) {
    var ave = 0;
    for (var i = 0; i < n; i++) {
        ave += value[i];
    }
    ave = ave / ValueNum;
    if (ave >= 8)
        ave = 4.3;
    else if (ave >= 7 && ave < 8)
        ave = 3.3;
    else if (ave >= 4 && ave < 7)
        ave = 2.3;
    else if (ave >= 3 && ave < 4)
        ave = 2.0;
    else {
        ave = 1.3;
    }
    return ave;
}

