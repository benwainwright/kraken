import { postEnhancedOutages } from "./post-enhanced-outages";
import { Api } from "../client/api";
import { mock } from "jest-mock-extended";
import { getSiteOutages } from "./get-site-outages";
import { when } from "jest-when";
import { EnhancedOutage } from "../types/enhanced-outage";
import { API_KEY } from "../constants/environment-variables";

jest.mock("../client/api");
jest.mock("./get-site-outages");

beforeEach(() => {
  jest.restoreAllMocks();
  process.env = {};
});

describe("post enhanced outages", () => {
  it("calls getSiteOutages and posts the results to postEnhancedOutages", async () => {
    process.env[API_KEY] = "foo";
    const mockApi = mock<Api>();

    const mockEnhancedOutages = mock<EnhancedOutage[]>();

    when(jest.mocked(getSiteOutages))
      .calledWith(mockApi, `norwich-pear-tree`, expect.anything())
      .mockResolvedValue(mockEnhancedOutages);

    jest.mocked(Api).mockReturnValue(mockApi);

    await postEnhancedOutages();

    expect(mockApi.postEnhancedOutages).toHaveBeenCalledWith(
      `norwich-pear-tree`,
      mockEnhancedOutages
    );
  });
});
