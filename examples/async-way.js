const got = require('got')

const urls = [
    'https://api.iextrading.com/1.0/stock/aapl/company',
    'https://api.iextrading.com/1.0/stock/fb/company',
    'https://api.iextrading.com/1.0/stock/googl/company',
    'https://api.iextrading.com/1.0/stock/msft/company'
]

const main = async () => {
    const promises = urls.map(url => got.get(url, { json: true }))
    const responses = await Promise.all(promises)

    const result = responses
        .map(response => response.body)
        .filter(body => body.industry === 'Online Media')
        .map(body => body.companyName)

    console.log(result)
}

main()