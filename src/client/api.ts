import { backOff } from 'exponential-backoff'
import fetch from 'node-fetch-commonjs'

import { Outage } from '../types/outage'
import { HTTP_HEADERS } from '../constants/http-headers'
import { SiteInfo } from '../types/site-info'

const API_BASE_PATH = 'https://api.krakenflex.systems/interview-tests-mock-api/v1'

type HttpMethod = 'GET' | 'POST';

export class Api {
  constructor(private key: string) {}

  private async request<T>(
    path: string,
    method: HttpMethod,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<T> {
    const url = `${API_BASE_PATH}${path}`

    const doFetch = async () => {
      const result = await fetch(url, {
        headers: {
          [HTTP_HEADERS.xApiKey]: this.key,
          [HTTP_HEADERS.contentType]: 'application/json',
        },
        method,
        body: JSON.stringify(body),
      })
      if (!result.ok) {
        throw new Error('HTTP Error Returned')
      }

      return result
    }

    const result = await backOff(doFetch)

    const response = await result.text()

    try {
      return JSON.parse(response) as T
    } catch {
      return response as T
    }
  }

  async getOutages(): Promise<Outage[]> {
    const outages = await this.request<Outage[]>('/outages', 'GET')

    return outages.map((outage) => ({
      ...outage,
      begin: new Date(outage.begin),
      end: new Date(outage.end),
    }))
  }

  async getSiteInfo(id: string): Promise<SiteInfo> {
    return await this.request(`/site-info/${id}`, 'GET')
  }

  async postEnhancedOutages(id: string, outages: Outage[]): Promise<void> {
    const serialisedOutages = outages.map((outage) => ({
      ...outage,
      begin: outage.begin.toISOString(),
      end: outage.end.toISOString(),
    }))

    return await this.request(`/site-outages/${id}`, 'POST', serialisedOutages)
  }
}
