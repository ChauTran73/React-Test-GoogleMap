/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js'
);
/* eslint-disable no-undef */
const firebaseConfig = {
  apiKey: 'AIzaSyDHKii9UCGTP5nBbUu9LUwklWXu2HNXA0g',
  authDomain: 'chat-9d098.firebaseapp.com',
  projectId: 'chat-9d098',
  storageBucket: 'chat-9d098.appspot.com',
  messagingSenderId: '689993042550',
  appId: '1:689993042550:web:6d3994d64eaf973f742d57',
  measurementId: 'G-E65E159VSL',
};
firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler((payload) => {
//   console.log('payload', payload);
//   const promiseChain = clients
//     .matchAll({
//       type: 'window',
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload?.data?.type);
//       }
//     })
//     .then(() => {
//       return registration.showNotification('my notification title');
//     });
//   return promiseChain;
// });
// eslint-disable-next-line
self.addEventListener('notificationclick', function (event) {
  // handle click notification
});
// eslint-disable-next-line
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  if (data?.data && data?.data?.type === 'chat') {
    const item = JSON.parse(data?.data?.data);
    let bodyMessage = '';
    if (item?.contentType === 'TEXT') bodyMessage = item?.content;
    if (item?.contentType === 'FILE') bodyMessage = 'File đính kèm';
    if (item?.contentType === 'EVENT') {
      const contentEvent = JSON.parse(item?.content);
      if (contentEvent?.type === 'REQUEST_VOTE')
        bodyMessage = 'Đã yêu cầu khách hàng vote';
      if (contentEvent?.type === 'VOTED') bodyMessage = 'Khách hàng đã vote';
      if (
        contentEvent?.type === 'ADD_MEMBER' ||
        contentEvent?.type === 'REMOVE_MEMBER'
      ) {
        const temp = contentEvent?.controlled;
        bodyMessage =
          contentEvent?.type === 'ADD_MEMBER'
            ? `${temp.join(',')} đã được thêm vào cuộc trò chuyện`
            : `${temp.join(',')} đã rời khỏi cuộc trò chuyện`;
      }
      if (contentEvent?.type === 'NEW_TICKET') bodyMessage = 'Có yêu cầu mới';
    }
    // eslint-disable-next-line
    self.registration.showNotification('Có tin nhắn mới', {
      body: bodyMessage,
      icon: './logo192.png',
    });
  }
});
