// import {yearDay, YAER_MONTH, judgeLeap} from '../public/common'

const common = require('../public/common')

/**
 * 日期转为某年的第几周
 * @param {String} data 年-月-日
 * @returns {Number} 某年第几周
 */
let dayToWeek = function(data){
    let year = parseInt(data)
    let index1 = data.indexOf('-')
    let index2 = data.lastIndexOf('-')
    let month = parseInt(data.substr(index1 + 1, index2 - 1))
    let day = parseInt(data.substr(index2 + 1, data.length - 1))
    let days = common.yearDay(year, month, day)
    if(days === -1 || !year || !month || !day){
        return -1
    }
    let week = 0
    let startDay = new Date(`${year}-1-1`).getDay()
    if(startDay !== 1){
        week += 1
    }
    // startDay -= 1
    days -= (7 - startDay + 1)
    week += parseInt(days / 7)
    if(parseInt(days % 7) !== 0){
        week ++
    }
    return week
}

/**
 * 获取某年某周一周的时间戳
 * @param {String} data 年-周数
 * @returns {Array} 这一周每天的时间戳
 */
let weekToDay = function(data){
    let year = parseInt(data)
    let index = data.indexOf('-')
    let week = parseInt(data.substr(index + 1, data.length - 1))
    if(week < 0 || week > year / 7 || !year || !week){
        return -1
    }
    let startDay = new Date(`${year}-1-1`).getDay() - 1
    let lastDay
    let month
    if(week * 7 < 31){
        let day = week * 7 - startDay
        month = 1
        lastDay = `${year}-1-${day} 8:0:0`
    }else {
        let weekDay = +week * 7 - startDay
        let flag = common.judgeLeap(year).leap ? 'leap' : 'nonleap'
        let d = common.YAER_MONTH[flag]
        let days = 0
        for(let i = 0; i < 12; i++){
            days = d[i]
            if(days <= weekDay){
                weekDay -= days
            }else{
                if(weekDay === 0){
                    weekDay = days
                }
                month = i + 1
                break
            }
        }
        lastDay = `${year}-${month}-${weekDay} 8:0:0`
    }
    let result = []
    lastDay = new Date(lastDay)
    day = new Date(lastDay)
    result.push(day.getTime())
    if(isNaN(day.getTime())){
        return -1
    }
    for(let i = 1; i < 7; i++){
        day = lastDay.setDate(lastDay.getDate() - 1)
        result.unshift(new Date(day).getTime())
    }
    return result
}

/**
 * 获取某月的第几周
 * @param {String} data 年-月-日
 * @returns {Object} month：月份；week：周数
 */
let monthWeek = function(data){
    let year = parseInt(data)
    let index1 = data.indexOf('-')
    let index2 = data.lastIndexOf('-')
    let month = parseInt(data.substr(index1 + 1, index2 - 1))
    let day = parseInt(data.substr(index2 + 1, data.length - 1)) 
    if(month < 1 || month > 12 || !year || !month || !day){
        return -1
    }
    let startDay = new Date(`${year}-${month}-1`).getDay() - 1
    let week 
    if(day <= 7 - startDay){
        startDay = new Date(`${year}-${month-1}-1`).getDay() - 1
        let days = common.judgeLeap(year, month - 1).month
        days -= (7 - startDay)
        days += 1
        if(days % 7 !== 0){
            week = parseInt(days / 7) + 1
        }else{
            week = parseInt(days / 7)
        }
        month -= 1
    }else{
        let days = common.judgeLeap(year, month).month
        if(days < day){
            return -1
        }
        day -= (7 - startDay)
        day += 1
        if(day % 7 !== 0){
            week = parseInt(day / 7) + 1
        }else{
            week = parseInt(day / 7)
        }
    }
    return {
        month: month,
        week: week
    }
}

/**
 * 某月从1号开始每周的第一天
 * @param {String} data 年-月
 * @returns {Array} 某月每周开始第一天
 */
let monthToWeek = function(data){
    let year = parseInt(data)
    let index = data.indexOf('-')
    let month = parseInt(data.substr(index + 1, data.length- 1))
    if(!month || !year || month > 12 || month < 1){
        return -1
    }
    let startDay = new Date(`${year}-${month}-1 8:0:0`).getDay() - 1
    let days = common.judgeLeap(year, month).month
    let day = new Date(`${year}-${month}-1 8:0:0`)
    let startWeekDay = new Date(`${year}-${month}-1 8:0:0`)
    let week = []
    week.push(startWeekDay.getTime())
    startWeekDay = day.setDate(day.getDate() + (7 - startDay))
    week.push(new Date(startWeekDay).getTime())
    days = days - (7 - startDay) - 7
    for(let i = 0; i < parseInt(days / 7); i++) {
        startWeekDay = day.setDate(day.getDate() + 7)
        week.push(new Date(startWeekDay).getTime())
    }
    if(parseInt(days % 7) !== 0){
        startWeekDay = day.setDate(day.getDate() + 7)
        week.push(new Date(startWeekDay).getTime())    
    }
    return week
}

module.exports = {
    weekToDay: weekToDay,
    monthToWeek: monthToWeek,
    monthWeek: monthWeek,
    dayToWeek: dayToWeek
}