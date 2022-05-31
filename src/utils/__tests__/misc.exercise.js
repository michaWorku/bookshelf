import {formatDate} from '../misc'

test('formatDate formats the date to look nice', ()=>{
    expect(formatDate(new Date('July 15, 1995'))).toBe('Jul 95')
})

