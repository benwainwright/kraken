import { Api } from './api'
import nock from 'nock'

describe('the API clas', () => {
  it('retries the request if a 500 is returned', async () => {
    const key = 'the-api-key'

    const nockScope = nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
    nockScope.get('/interview-tests-mock-api/v1/outages').reply(500)
    nockScope.get('/interview-tests-mock-api/v1/outages').reply(200, [
      {
        id: '44c02564-a229-4f51-8ded-cc7bcb202566',
        begin: '2022-01-01T00:00:00.000Z',
        end: '2022-01-02T12:01:59.123Z',
      },
    ])

    const api = new Api(key)

    const result = await api.getOutages()

    expect(JSON.stringify(result)).toStrictEqual(
      JSON.stringify([
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          begin: new Date('2022-01-01T00:00:00.000Z'),
          end: new Date('2022-01-02T12:01:59.123Z'),
        },
      ])
    )
  })

  it('should correctly return the outages from the outages method', async () => {
    const key = 'the-api-key'

    nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
      .get('/interview-tests-mock-api/v1/outages')
      .reply(200, [
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          begin: '2022-01-01T00:00:00.000Z',
          end: '2022-01-02T12:01:59.123Z',
        },
      ])

    const api = new Api(key)

    const result = await api.getOutages()

    expect(JSON.stringify(result)).toStrictEqual(
      JSON.stringify([
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          begin: new Date('2022-01-01T00:00:00.000Z'),
          end: new Date('2022-01-02T12:01:59.123Z'),
        },
      ])
    )
  })

  it('should convert dates to date objects', async () => {
    const key = 'the-api-key'

    nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
      .get('/interview-tests-mock-api/v1/outages')
      .reply(200, [
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          begin: '2022-01-01T00:00:00.000Z',
          end: '2022-01-02T12:01:59.123Z',
        },
      ])

    const api = new Api(key)

    const result = await api.getOutages()

    expect(result[0].begin).toBeInstanceOf(Date)
    expect(result[0].end).toBeInstanceOf(Date)
  })

  it('should correctly return the site info from the API', async () => {
    const key = 'the-api-key'

    const id = '123'

    const testData = {
      id: 'pear-tree',
      name: 'Pear Tree',
      devices: [
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          name: 'Partridge',
        },
      ],
    }

    nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
      .get(`/interview-tests-mock-api/v1/site-info/${id}`)
      .reply(200, testData)

    const api = new Api(key)

    const result = await api.getSiteInfo(id)

    expect(result).toStrictEqual(testData)
  })

  it('should correctly return the site info from the API', async () => {
    const key = 'the-api-key'

    const id = '123'

    const testData = {
      id: 'pear-tree',
      name: 'Pear Tree',
      devices: [
        {
          id: '44c02564-a229-4f51-8ded-cc7bcb202566',
          name: 'Partridge',
        },
      ],
    }

    nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
      .get(`/interview-tests-mock-api/v1/site-info/${id}`)
      .reply(200, testData)

    const api = new Api(key)

    const result = await api.getSiteInfo(id)

    expect(result).toStrictEqual(testData)
  })

  it('should correctly post data to site-outages', async () => {
    const key = 'the-api-key'

    const id = '123'

    const testData = [
      {
        id: '44c02564-a229-4f51-8ded-cc7bcb202566',
        name: 'Partridge',
        begin: new Date('2022-01-01T00:00:00.000Z'),
        end: new Date('2022-01-02T12:01:59.123Z'),
      },
    ]

    const postedData = testData.map((outage) => ({
      ...outage,
      begin: outage.begin.toISOString(),
      end: outage.end.toISOString(),
    }))

    const api = new Api(key)

    const nockScope = nock('https://api.krakenflex.systems', {
      reqheaders: {
        'content-type': 'application/json',
        'x-api-key': key,
      },
    })
      .post(`/interview-tests-mock-api/v1/site-outages/${id}`, postedData)
      .reply(200)

    await api.postEnhancedOutages(id, testData)

    expect(nockScope.isDone()).toBeTruthy()
  })
})
