import { defineNuxtPlugin } from '#app';
import { getActor } from './actorSingleton';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Hello from the IC plugin!');

  // Inject $getActor in Vue, context, and store.
  nuxtApp.provide('getActor', getActor);
});
