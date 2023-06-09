import { when } from 'jest-when'

import { getSiteOutages } from './get-site-outages'

describe('getSiteOutages', () => {
  it('Given the set of data for the kingfisher site, it returns the correct set out outages to be sent to the POST endpoint', async () => {
    const initialOutagesTestData = [
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: new Date('2021-07-26T17:09:31.036Z'),
        end: new Date('2021-08-29T00:37:42.253Z'),
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: new Date('2022-05-23T12:21:27.377Z'),
        end: new Date('2022-11-13T02:16:38.905Z'),
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        begin: new Date('2022-12-04T09:59:33.628Z'),
        end: new Date('2022-12-12T22:35:13.815Z'),
      },
      {
        id: '04ccad00-eb8d-4045-8994-b569cb4b64c1',
        begin: new Date('2022-07-12T16:31:47.254Z'),
        end: new Date('2022-10-13T04:05:10.044Z'),
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        begin: new Date('2022-07-12T16:31:47.254Z'),
        end: new Date('2022-10-13T04:05:10.044Z'),
      },
      {
        id: '27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1',
        begin: new Date('2021-07-12T16:31:47.254Z'),
        end: new Date('2022-10-13T04:05:10.044Z'),
      },
    ]

    const initialSiteInfoTestData = {
      id: 'kingfisher',
      name: 'KingFisher',
      devices: [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1',
        },
        {
          id: '086b0d53-b311-4441-aaf3-935646f03d4d',
          name: 'Battery 2',
        },
      ],
    }

    const api = {
      getOutages: jest.fn(),
      getSiteInfo: jest.fn(),
    }

    api.getOutages.mockReturnValue(initialOutagesTestData)

    when(api.getSiteInfo)
      .calledWith('kingfisher')
      .mockReturnValue(initialSiteInfoTestData)

    const result = await getSiteOutages(
      api,
      'kingfisher',
      new Date('2022-01-01T00:00:00.000Z')
    )

    const expectedResult = [
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1',
        begin: '2022-05-23T12:21:27.377Z',
        end: '2022-11-13T02:16:38.905Z',
      },
      {
        id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
        name: 'Battery 1',
        begin: '2022-12-04T09:59:33.628Z',
        end: '2022-12-12T22:35:13.815Z',
      },
      {
        id: '086b0d53-b311-4441-aaf3-935646f03d4d',
        name: 'Battery 2',
        begin: '2022-07-12T16:31:47.254Z',
        end: '2022-10-13T04:05:10.044Z',
      },
    ]

    const resultSerialised = result.map((resultItem) => ({
      ...resultItem,
      begin: resultItem.begin.toISOString(),
      end: resultItem.end.toISOString(),
    }))

    expect(resultSerialised).toEqual(expectedResult)
  })
})
