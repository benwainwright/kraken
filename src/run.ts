import { postEnhancedOutages } from "./core/post-enhanced-outages";

const run = async () => {
  await postEnhancedOutages();
};

run().catch((error) => console.log(error));
