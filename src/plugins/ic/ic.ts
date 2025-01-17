import { defineNuxtPlugin } from '#app';
import { getActor } from './actorSingleton';

type OptionsType = {
  agentOptions?: import("@dfinity/agent").HttpAgentOptions;
  actorOptions?: import("@dfinity/agent").ActorConfig;
};

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Hello from the IC plugin!');

  // Inject $getActor in Vue, context, and store.
  nuxtApp.provide('getActor', async(options: OptionsType) => {
    return await getActor(options);
  });
  
});
