import { get , getFile, post } from './http'
// export const api1 = p1 => get('https://xxx/v5/weather?city=qingdao&key=1b47b16e4aa545eaa55a66f859ac0089', p1)
// export const api2 = p2 => get('https://xxx/v5/weather?city=taian&key=1b47b16e4aa545eaa55a66f859ac0089', p2)

// 用户
export const selectR7AndR28 = p => get('/concreteStrength/selectR7AndR28', p)
export const pageConcreteStrength = p => get('/concreteStrength/pageConcreteStrength', p)
export const exportDefaultTemplate = p => getFile('/concreteStrength/exportDefaultTemplate', p)
// export const exportUser = p => getFile('/concreteStrength/exportUser', p)
export const piliangjisuan = p => post('/concreteStrength/piliangjisuan', p)
