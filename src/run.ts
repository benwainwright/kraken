import { postEnhancedOutages } from './core/post-enhanced-outages'

const run = async () => {
  await postEnhancedOutages()
  console.log('Finished executing!')
}

run().catch((error) => console.log(error))
