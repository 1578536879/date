const week = require('../src/week')

//日期转为某年的第几周
describe('日期转为某年的第几周', () => {
    test('2020-2-2第5周', () => {
      expect(week.dayToWeek('2020-2-2')).toBe(5)
    })
  
    test('2020-13-1格式错误', () => {
      expect(week.dayToWeek('2020-13-1')).toBe(-1)
    })
  
    test('2020-1-32格式错误', () => {
      expect(week.dayToWeek('2020-1-32')).toBe(-1)
    })
  
    test('2019-12-31第53周', () => {
      expect(week.dayToWeek('2020-12-31')).toBe(53)
    })
  })

//获取某年某周一周的时间戳
describe('某年某周每天的时间戳', () => {
    test('2020第35周一周的时间戳', ()=>{
        expect(week.weekToDay('2020-35')).toStrictEqual(
            [ 1598227200000,
            1598313600000,
            1598400000000,
            1598486400000,
            1598572800000,
            1598659200000,
            1598745600000 ]
        )
    })
    
    test('2020第60周，格式错误', ()=>{
        expect(week.weekToDay('2020-60')).toBe(-1)
    })
    
    test('2020第1周一周的时间戳', ()=>{
        expect(week.weekToDay('2020-1')).toStrictEqual(
            [   1577664000000,
                1577750400000,
                1577836800000,
                1577923200000,
                1578009600000,
                1578096000000,
                1578182400000 ]
        )
    })
})

//获取某月的第几周
describe('某月的第几周', () => {
    test('2020-9-7第2周', () => {
        expect(week.monthWeek('2020-9-7')).toStrictEqual({
            month: 9,
            week: 1
        })
    })
    
    test('2020-9-7第2周', () => {
        expect(week.monthWeek('2020-9-1')).toStrictEqual({
            month: 8,
            week: 5
        })
    })
    
    test('2020-9-格式错误', () => {
        expect(week.monthWeek('2020-9-')).toBe(-1)
    })
    
    test('2020-13-1格式错误', () => {
        expect(week.monthWeek('2020-13-1')).toBe(-1)
    })
    
    test('2020-9-32格式错误', () => {
        expect(week.monthWeek('2020-9-32')).toBe(-1)
    })
})

//某月从1号开始每周的第一天
describe('某月从1号开始每周的第一天', () => {
    test('2020-2每周第一天', () => {
        expect(week.monthToWeek('2020-2')).toStrictEqual([
            1580515200000,
            1580688000000,
            1581292800000,
            1581897600000,
            1582502400000
        ])
    })

    test('2020-13格式错误', () => {
        expect(week.monthToWeek('2020-13')).toBe(-1)
    })

    test('2020-格式错误', () => {
        expect(week.monthToWeek('2020-')).toBe(-1)
    })

    test('2020-7每周第一天', () => {
        expect(week.monthToWeek('2020-7')).toStrictEqual([
            1593561600000,
            1593993600000,
            1594598400000,
            1595203200000,
            1595808000000
        ])
    })

    test('2021-3每周第一天', () => {
        expect(week.monthToWeek('2021-3')).toStrictEqual([
            1614556800000,
            1615161600000,
            1615766400000,
            1616371200000,
            1616976000000 
        ])
    })
})
