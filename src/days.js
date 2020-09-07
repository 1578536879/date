const common = require('../public/common')
/**
 * 某年某月天数
 * @param {String} data 格式：年-月
 * @return {Number} 某月天数
 */
let monthDays = function(data){
    let index = data.indexOf('-')
    let year = parseInt(data)
    let month = parseInt(data.substr(index + 1, data.length -1))
    if(month < 1 || month > 12 || !year || !month){
        return -1
    }
    let res = common.judgeLeap(year, month)
    return res.month
}

/**
 * 某两天间隔天数
 * @param {String} day1 格式：年-月-日 
 * @param {String} day2 格式：年-月-日 
 * @return {Number} 某天与某天相隔天数
 */
let separateDays = function(day1, day2){
    let year = parseInt(day1)
    let index1 = day1.indexOf('-')
    let index2 = day1.lastIndexOf('-')
    let month = parseInt(day1.substr(index1 + 1, index2 - 1))
    let day = parseInt(day1.substr(index2 + 1, day1.length - 1))
    day1 = {
        year: year,
        month: month,
        day: day
    }
    if(month > 12 || month < 0 || day < 0 || day > 31){
        return -1
    }
    year = parseInt(day2)
    index1 = day2.indexOf('-')
    index2 = day2.lastIndexOf('-')
    month = parseInt(day2.substr(index1 + 1, index2 - 1))
    day = parseInt(day2.substr(index2 + 1, day2.length - 1))
    day2 = {
        year: year,
        month: month,
        day: day
    }
    if(month > 12 || month < 0 || day < 0 || day > 31){
        return -1
    }
    if(new Date(`${day1.year}-${day1.month}-${day1.day}`).getTime() === new Date(`${day2.year}-${day2.month}-${day2.day}`).getTime()){
        return 0
    }
    if(new Date(`${day1.year}-${day1.month}-${day1.day}`).getTime() > new Date(`${day2.year}-${day2.month}-${day2.day}`).getTime()){
        let buf = {
            year: day1.year,
            month: day1.month,
            day: day1.day
        }
        day1 = {
            year: day2.year,
            month: day2.month,
            day: day2.day  
        }
        day2 = buf
    }
    let days = 0
    if(day1.year !== day2.year){
        for(let i = day1.year + 1; i < day2.year; i++){
            let yearDay = common.judgeLeap(i)
            days += yearDay.year
        }
        for(let i = day1.month + 1; i <= 12; i++){
            let monthDay = common.judgeLeap(day1.year, i)
            days += monthDay.month
        }
        for(let i = 1; i < day2.month; i++){
            let monthDay = common.judgeLeap(day2.year, i)
            days += monthDay.month
        }
        let monthDay = common.judgeLeap(day1.year, day1.month)
        days += (monthDay.month - day1.day)
        days += (day2.day - 1)
    }else{
        if(day1.month !== day2.month){
            let monthDay = common.judgeLeap(day1.year, day1.month)
            if(monthDay.month < day1.day){
                return -1
            }
            days += (monthDay.month - day1.day - 1)
            monthDay = common.judgeLeap(day2.year, day2.month)
            if(monthDay.month < day2.day){
                return -1
            }
            days += day2.day - 1
        }else{
            for(let i = day1.month + 1; i < day2.month; i++){
                let monthDay = common.judgeLeap(day1.year, i)
                days += monthDay.month
            }
            let monthDay = common.judgeLeap(day2.year, day2.month)
            if(monthDay.month < day2.day){
                return -1
            }
            days += (day2.day - 1 - day1.day)
        }
    }
    return days
}

/**
 * 获取某天是今年第几天
 * @param {String} data 格式为：年-月-日
 * @returns {Number} 此年第几天
 */
let yearToDay = function(data){
    let year = parseInt(data)
    let index1 = data.indexOf('-')
    let index2 = data.lastIndexOf('-')
    let month = parseInt(data.substr(index1 + 1, index2 - 1))
    let day = parseInt(data.substr(index2 + 1, data.length - 1))
    if(month < 1 || month > 12 || !year || !month || !day){
        return -1
    }
    let res = common.yearDay(year, month, day)
    return res
}

module.exports = {
    yearToDay: yearToDay,
    separateDays: separateDays,
    monthDays: monthDays
}