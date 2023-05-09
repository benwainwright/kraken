import { EnhancedOutage } from '../types/enhanced-outage'
import { Outage } from '../types/outage'
import { SiteInfo } from '../types/site-info'

interface Api {
  getOutages: () => Promise<Outage[]>;
  getSiteInfo: (id: string) => Promise<SiteInfo>;
}

export const getSiteOutages = async (
  api: Api,
  siteId: string,
  cutOffDate: Date
): Promise<EnhancedOutage[]> => {
  const [outages, siteInfo] = await Promise.all([
    api.getOutages(),
    api.getSiteInfo(siteId),
  ])

  const deviceNames = Object.fromEntries(
    siteInfo.devices.map((device) => [device.id, device.name])
  )

  return outages
    .filter((outage) => outage.id in deviceNames)
    .filter((outage) => outage.begin > cutOffDate)
    .map((outage) => ({ ...outage, name: deviceNames[outage.id] }))
}
