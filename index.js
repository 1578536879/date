const week = require('./src/week')
const day = require('./src/days')
module.exports = {
    monthToWeek: week.monthToWeek,
    weekToDay: week.weekToDay,
    monthWeek: week.monthWeek,
    dayToWeek: week.dayToWeek,
    yearToDay: day.yearToDay,
    separateDays: day.separateDays,
    monthDays: day.monthDays,
    afterDay: day.afterDay
}