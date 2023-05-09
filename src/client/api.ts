import { Outage } from "../types/outage";
import fetch from "node-fetch-commonjs";
import { HTTP_HEADERS } from "../constants/http-headers";

const API_BASE_PATH = `https://api.krakenflex.systems/interview-tests-mock-api/v1`;

type HttpMethod = "GET" | "POST";

export class Api {
  constructor(private key: string) {}

  private async request<T>(
    path: string,
    method: HttpMethod,
    body?: Record<string, unknown>
  ): Promise<T> {
    const url = `${API_BASE_PATH}${path}`;

    const result = await fetch(url, {
      headers: {
        [HTTP_HEADERS.xApiKey]: this.key,
        [HTTP_HEADERS.contentType]: "application/json",
      },
      method,
    });

    return (await result.json()) as T;
  }

  async getOutages(): Promise<Outage[]> {
    return this.request<Outage[]>(`/outages`, "GET");
  }

  async getSiteInfo(id: string) {}

  async postEnhancedOutages(id: string) {}
}
