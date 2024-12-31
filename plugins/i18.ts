import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Hello from the plugin!');

  const translate = (key: string): string => {

    const translations: { [key: string]: string } = {
      'greetings.hello': 'Hello, Roland, you did __count__ pushUps!',
      'greetings.hello2': 'Hello, Pusher!',
    };
    return translations[key] || key;
  };

  // Inject $translate(key) in Vue, context, and store.
  nuxtApp.provide('translate', translate);

});