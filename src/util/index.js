function formateTime(str) {
    //将日期字符串转为时间戳
    str = str.replace(/-/g, "/");
    return new Date(str).getTime();
}

function timeToString(time) {
    //将时间戳转为字符串
    let str = "";
    let data = new Date(Number(time));
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = data.getDate();
    day = day < 10 ? "0" + day : day;
    str = year + '-' + month + '-' + day + " 00:00:00";
    return str;
}

// function formateTime(str) {
//     //将日期字符串转为时间戳
//     str = str.replace(/-/g, "/");
//     return new Date(str).getTime();
// }

// function timeToString(time) {
//     //将时间戳转为字符串
//     return `${new Date(Number(time)).pattern('yyyy-MM-dd')} 00:00:00`;
// }
//搜索条件 时间默认当天 00:00:00-23:59:59
let myDate = new Date();
let tomorrowTimestamp = myDate.getTime();
let tomorrowTime = timeToString(tomorrowTimestamp);
let tomorrowTimes = formateTime(tomorrowTime) + 24 * 3600000;
let tomorrow = timeToString(tomorrowTimes);
let todayYear = myDate.getFullYear(); //获取年份
let todayMonth = myDate.getMonth() + 1; //获取月份
todayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;

let todayDate = myDate.getDate(); //获取月份
let todayDate1 = myDate.getDate(); //获取月份

todayDate = todayDate < 10 ? '0' + todayDate : todayDate; //当天

export function getDate(index) { // 获取7天之前的时间
    var date = new Date(); //当前日期
    var newDate = new Date();
    newDate.setDate(date.getDate() + index); //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
    let getMonth = newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
    let getDate = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    var time = newDate.getFullYear() + "-" + getMonth + "-" + getDate;
    return time;
}

export let thirtyAgoDate = getDate(-30) + ' 00:00:00';
export let sevenAgoDate = getDate(-7) + ' 00:00:00';
export let toadyDate = getDate(0) + ' 00:00:00';
let threeAgoDate = getDate(-3)
let defaultTime = todayYear + '-' + todayMonth + '-' + todayDate; //2018-02-08
let default7Ago = todayYear + '-' + todayMonth + '-' + sevenAgoDate; //2018-02-08

let defaultSameTime = todayYear + '-' + todayMonth + '-01'; // 2018-02-01

export let EDFAULT_TIME = defaultTime; //2018-01-17

let hours = myDate.getHours(); //获取当前小时数(0-23)
let minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
let seconds = myDate.getSeconds(); //获取当前秒数(0-59)

export let EDFAULT_STARTTIME = sevenAgoDate; //2018-01-17 00:00:00
export let EDFAULT_THREE_AGOTIME = threeAgoDate + ' 00:00:00'; //2018-01-17 00:00:00

export let EDFAULT_STARTSAMETIME = defaultSameTime + ' 00:00:00'; //2018-01-17 00:00:00

export let EDFAULT_ENDTIME = defaultTime + ' 24:00:00'; //2018-01-17 23:59:59

export let EDFAULT_END_TIME = defaultTime + ' 00:00:00';

export let EDFAULT_TOMORROW = tomorrow; //2018-01-18 00:00:00

//重新打开地区tree，取消上次选中效果   areaData是@/config/areaCode.js地区json包
export function areaTreeInit(areaData) {
    for (var i = 0; i < areaData.length; i++) {
        areaData[i].checked = false;
        if (areaData[i].children) {
            for (var j = 0; j < areaData[i].children.length; j++) {
                areaData[i].children[j].checked = false;
            }
        }
    }
}

// 时间验证规则
//开始时间

export const validateStart = (rule, value, callback) => {
    // 验证开始时间
    if (value == "") {
        callback(new Error("请输入开始时间"));
    } else {
        if (this.formData.queryEndTime !== "") {
            // 对结束时间单独验证
            this.$refs.form.validateField("queryEndTime");
        }
        callback();
    }
};

export const validateEnd = (rule, value, callback) => {
    // 验证结束时间

    if (value == "") {
        callback(new Error("请输入结束时间"));
    } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
            // 判断开始时间是否大于结束时间
            callback(new Error("开始时间大于结束时间"));
        } else {
            callback();
        }
    }
};