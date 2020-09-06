const YAER_MONTH = {
    leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    nonleap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
}

const YEAR_DAY = {
    leap: 366,
    nonleap: 365
}

/**
 * 
 * @param {Number} year 年份
 * @param {Number} month 月份
 * @return {Object} leap：是否为闰月；month：月份天数；year：某年天数
 */
let judgeLeap = function(year, month = 0){
    let flag
    if(parseInt(year % 400) === 0 || (parseInt(year % 4) === 0 && parseInt(year % 100) === 0)){
        flag = 'leap'
    }else{
        flag = 'nonleap'
    }
    let monthDay = YAER_MONTH[flag][month - 1]
    let yearDay = YEAR_DAY[flag]

    return {
        leap: flag === 'leap' ? true : false,
        month: monthDay,
        year: yearDay
    }
}

/**
 * 
 * @param {Number} year 年份
 * @param {Number} month 月份
 * @param {Number} day 日
 * @returns {Number} 某年的第几天
 */
let yearDay = function(year, month, day){
    let flag = judgeLeap(year, month).leap ? 'leap' : 'nonleap'
    let days = 0
    for(let i = 0; i < month - 1; i ++){
        days += YAER_MONTH[flag][i]
    }
    days += day
    return days
}

module.exports = {
    yearDay: yearDay,
    judgeLeap: judgeLeap,
    YAER_MONTH: YAER_MONTH,
    YEAR_DAY: YEAR_DAY
}