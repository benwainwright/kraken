import { Device } from "./device";

export interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}
