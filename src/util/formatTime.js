export function formatTime() {
  let time = new Date();
  let week =  ['周日','周一','周二','周三','周四','周五','周六'];
  let
    year = time.getFullYear(),
    month = time.getMonth(),
    date = time.getDate(),
    day = time.getDay();
  return `${month}/${date} ${week[day]}`

}