import { Api } from '../client/api'
import { API_KEY } from '../constants/environment-variables'
import { getSiteOutages } from './get-site-outages'

export const postEnhancedOutages = async () => {
    const key = process.env[API_KEY]

    if (!key) {
        throw new Error('API_KEY not configured')
    }

    const cutOffDate = new Date('2022-01-01T00:00:00.000Z')
    const site = 'norwich-pear-tree'

    const api = new Api(key)
    const outages = await getSiteOutages(api, site, cutOffDate)
    await api.postEnhancedOutages(site, outages)
}
