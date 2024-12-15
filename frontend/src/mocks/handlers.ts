import { http, HttpResponse, delay } from 'msw'

export const handlers = [
    http.get('/api/stock/history/NVDA', async () => {
      await delay(150)
      return HttpResponse.json({
        symbol: 'NVDA',
        history: [{
                time: 23123234234234,
                price: 100
            }]
        })
    })
]