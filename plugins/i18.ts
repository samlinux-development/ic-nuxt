import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {

  const translate = (key: string): string => {

    const translations: { [key: string]: string } = {
      'index.title': 'Push-Up Counter',
      'index.hello': 'Hello, Dev! So far, there have been __count__ push-ups completed. Let’s add yours to the count!',
      'index.totalPushUps': 'Awesome! We’ve crushed a total of __totalPushUps__ push-ups so far. Keep up the great work! 💪',
      'pushUps.title': 'Add new Push-Up',
      'pushUps.name': 'Name',
      'pushUps.count': 'Push ups performed',
      'pushUps.count2': 'Count',
      'pushUps.addBtn': 'Add Push-Up',
      'pushUps.loading': 'storing push-up...',
      'pushUps.list-title': 'Latest Push-Ups',
      'pushUps.list-empty': 'No push-ups stored yet.',
      'pushUps.list-loading': 'loading push-ups...',
      'pushUps.by': 'by',
      'pushUps.at': 'at',
      'pushUps.repetition': 'Reps',
      'pushUps.executionDetails':'Details',
      'pushUps.totalPushUpsPerExercise':'Total push-ups per exercise',
      'about.title': 'About this example',
      'about.info': 'This example demonstrates how to use Nuxt.js with the IC SDK. It stores push-ups on the Internet Computer and displays them in a list. More information will be added soon.',
      'about.github': 'View on GitHub'
          
    };
    return translations[key] || key;
  };

  // Inject $translate(key) in Vue, context, and store.
  nuxtApp.provide('translate', translate);

});