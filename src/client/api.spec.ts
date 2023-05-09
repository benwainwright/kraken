import { Api } from "./api";
import nock from "nock";

describe("the API clas", () => {
  it("should correctly return the outages from the outages method as a typed object", async () => {
    const key = "the-api-key";

    nock("https://api.krakenflex.systems", {
      reqheaders: {
        "content-type": "application/json",
        "x-api-key": key,
      },
    })
      .get("/interview-tests-mock-api/v1/outages")
      .reply(200, [
        {
          id: "44c02564-a229-4f51-8ded-cc7bcb202566",
          begin: "2022-01-01T00:00:00.000Z",
          end: "2022-01-02T12:01:59.123Z",
        },
      ]);

    const api = new Api(key);

    const result = await api.getOutages();

    expect(JSON.stringify(result)).toStrictEqual(
      JSON.stringify([
        {
          id: "44c02564-a229-4f51-8ded-cc7bcb202566",
          begin: new Date("2022-01-01T00:00:00.000Z"),
          end: new Date("2022-01-02T12:01:59.123Z"),
        },
      ])
    );
  });
});
