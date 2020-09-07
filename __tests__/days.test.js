const days = require('../src/days')

//某年某月天数
describe('某年某月天数', () => {
  test('2020-2月份的天数', () => {
    expect(days.monthDays('2020-2')).toBe(29)
  })

  test('2020-9月份天数', () => {
    expect(days.monthDays('2020-9')).toBe(30)
  })

  test('2020-13月份天数', () => {
    expect(days.monthDays('2020-13')).toBe(-1)
  })
})

//某两天间隔天数
describe('两天间隔天数', () => {
  test('2020-4-5和2020-4-9间隔日期', () => {
    expect(days.separateDays('2020-4-5', '2020-4-9')).toBe(3)
  })
  
  test('2020-4-31和2020-4-9日期错误', () => {
    expect(days.separateDays('2020-4-31', '2020-4-9')).toBe(-1)
  })
  
  test('2020-13-3和2020-4-9月份错误', () => {
    expect(days.separateDays('2020-13-3', '2020-4-9')).toBe(-1)
  })
  
  test('2019-12-5和2020-3-9间隔日期', () => {
    expect(days.separateDays('2019-12-5', '2020-3-9')).toBe(94)
  })
  
  test('2018-1-5和2020-1-5间隔日期', () => {
    expect(days.separateDays('2018-1-5', '2020-1-5')).toBe(729)
  })
  
  test('2018-5-5和2020-2-5间隔日期', () => {
    expect(days.separateDays('2018-5-5', '2020-2-5')).toBe(640)
  })
  
  test('2020-5-5和2020-5-5间隔日期', () => {
    expect(days.separateDays('2020-5-5', '2020-5-5')).toBe(0)
  })
  
  test('2020-5-5和2020-5-6间隔日期', () => {
    expect(days.separateDays('2020-5-5', '2020-5-6')).toBe(0)
  })
  
  test('2020-5-10和2020-5-5间隔日期', () => {
    expect(days.separateDays('2020-5-10', '2020-5-5')).toBe(4)
  })
})

//获取某天是今年第几天
describe('某天是某年的第几天', () => {
  test('2020-5-10是第131天', () => {
    expect(days.yearToDay('2020-5-10')).toBe(131)
  })

  test('2020-1-1是第1天', () => {
    expect(days.yearToDay('2020-1-1')).toBe(1)
  })

  test('2020-13-10格式错误', () => {
    expect(days.yearToDay('2020-13-10')).toBe(-1)
  })

  test('2020-2-30格式错误', () => {
    expect(days.yearToDay('2020-2-30')).toBe(-1)
  })
})
