import { some } from 'constants/constants';
import logo from 'assets/icons/logo192.png';

const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getSendMessage = (
  contentMessage: string,
  typeMessage: string,
  chatGroupId: string,
  ticketId: string
) => {
  return JSON.stringify({
    headers: {
      command: 'sendCSGroupMessage',
    },
    body: {
      transactionId: `${new Date().getTime()}`,
      envelop: {
        content: contentMessage,
        contentType: typeMessage,
        receiver: chatGroupId,
        receiverType: 'GROUP',
        extraInfos: { ticketId },
      },
    },
  });
};
export const formatBytes = (a: number, b = 2) => {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  );
};
export const showNotification = (item: some) => {
  navigator.serviceWorker.ready.then((registration) => {
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
    if (registration) {
      registration.showNotification('Có tin nhắn mới', {
        body: bodyMessage,
        icon: logo,
      });
    }
  });
};
