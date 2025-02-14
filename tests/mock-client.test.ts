import { Option } from "effect";
import { MockClient } from "effect-http";

import { exampleApiGet, exampleApiPostNullableField } from "./examples";
import { runTestEffect } from "./utils";

test("random example", async () => {
  const client = MockClient.make(exampleApiGet);
  const response = await runTestEffect(client.getValue({}));

  expect(typeof response).toEqual("number");
});

test("custom response", async () => {
  const client = MockClient.make(exampleApiGet, {
    responses: { getValue: 12 },
  });
  const response = await runTestEffect(client.getValue({}));

  expect(response).toEqual(12);
});

test("response schema with `optionFromNullable`", async () => {
  const client = MockClient.make(exampleApiPostNullableField);
  const response = await runTestEffect(client.test());

  expect(Option.isOption(response.value)).toBe(true);
});
