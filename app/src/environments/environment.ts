// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_url: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyDTBGAcIwgo6ZpJom0DHkJe71qcKCf2F54',
    authDomain: 'mypassword-297516.firebaseapp.com',
    // databaseURL:
    // 'https://mypassword-297516-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: 'myPassword',
    // storageBucket: '<your-storage-bucket>',
    // messagingSenderId: '<your-messaging-sender-id>',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
