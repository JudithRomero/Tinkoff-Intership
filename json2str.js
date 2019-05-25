const json2str = (json) => json.map(j => {
    const name = `Имя покупателя: ${j.name}`
    const cardNumber = `Номер карты: ${j.cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 **** **** $4')}`
    const date = new Date(j.date)
      .toLocaleString('ru', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        minute: '2-digit',
        hour: '2-digit'
      })
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1')
    const fullDate = `Дата и время операции: ${date}`
    const sum = `Сумма операции: ${j.currency}${(+j.amount).toLocaleString('en')}`
    return [name, cardNumber, fullDate, sum].join('\n')
  }).join('\n\n')

console.log(json2str([
  { "name": "Ashlynn Hartmann",
    "cardNumber": "4929289137092267",
    "date": "2019-01-24T17:39:07.347Z",
    "amount": "579.63",
    "currency": "$"
  },
  { "name":"Philip Stoltenberg",
    "cardNumber":"4916258329158678",
    "date": "2018-09-07T02:21:03.144Z",
    "amount": "10472.99",
    "currency": "$"
  }
]))
/*
Имя покупателя: Ashlynn Hartmann
Номер карты: 4929 **** **** 2267
Дата и время операции: 24.01.2019 22:39
Сумма операции: $579.63 
 
Имя покупателя: Philip Stoltenberg
Номер карты: 4916 **** **** 8678
Дата и время операции: 07.09.2018 07:21
Сумма операции: $10,472.99
*/
