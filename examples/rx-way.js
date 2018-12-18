const got = require('got')
const { from } = require('rxjs')
const { mergeMap, map, filter } = require('rxjs/operators')

const urls = [
    'https://api.iextrading.com/1.0/stock/aapl/company',
    'https://api.iextrading.com/1.0/stock/fb/company',
    'https://api.iextrading.com/1.0/stock/googl/company',
    'https://api.iextrading.com/1.0/stock/msft/company'
]

const main = () => {
    const source = from(urls).pipe(
        mergeMap(url => from(got.get(url, { json: true }))),
        map(response => response.body),
        filter(body => body.industry === 'Online Media'),
        map(body => body.companyName)
    )

    return source.subscribe(
        next => console.log(next),
        err => console.log(err)
    )
}

main()