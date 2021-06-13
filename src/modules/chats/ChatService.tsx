import { some } from 'constants/constants';
import api from 'utils/helpers/api';
import { configs } from 'utils/helpers/config';
export const actionUploadFile = (data: any) => {
  return api({
    method: 'post',
    url: `${configs().UPLOAD_URL}/assets/file/upload`,
    data,
  });
  // return api({ method: 'post', url: '/chat/file/upload', data });
};
export const actionGetEmployeesInfo = () => {
  return api({ method: 'get', url: '/csp/employees/information' });
};
