import { some } from 'constants/constants';
import api from 'utils/helpers/api';

// employee
export const actionGetEmployees = (params: some) => {
  return api({ method: 'get', url: '/csp/employees/list-employee', params });
};
export const actionSearchEmployee = (params: some) => {
  return api({ method: 'post', url: '/csp/employees/search-ams', params });
};
export const actionGetDetailEmployee = (id: string | number) => {
  return api({
    method: 'get',
    url: '/csp/employees/get-detail',
    params: { id },
  });
};
export const actionOneEmployeeJoinMultiTeams = (data: some) => {
  return api({ method: 'post', url: '/csp/employees/join-team', data });
};

export const actionMultiEmployeesJoinOneTeam = (data: some) => {
  return api({ method: 'post', url: '/csp/team/join-team', data });
};

export const actionEmployeeDetail = (id: number) => {
  return api({
    method: 'get',
    url: `/csp/employees/get-detail?id=${id}`,
  });
};

export const actionAddEmployee = (data: some) => {
  return api({ method: 'post', url: '/csp/employees', data });
};
export const actionEditEmployee = (data: some) => {
  return api({ method: 'put', url: '/csp/employees', data });
};
export const actionDeleteEmployee = (id: string | number) => {
  return api({ method: 'delete', url: '/csp/employees', params: { id } });
};

// corporation
export const actionGetCorporations = (params: some) => {
  return api({ method: 'get', url: '/csp/corporations', params });
};
export const actionGetDetailCorporation = (id: string | number) => {
  return api({ method: 'get', url: '/csp/corporations', params: { id } });
};
export const actionAddCorporation = (data: some) => {
  return api({ method: 'post', url: '/csp/corporations', data });
};
export const actionEditCorporation = (data: some, id: string | number) => {
  return api({ method: 'put', url: '/csp/corporations', data, params: { id } });
};
export const actionDeleteCorporation = (id: string | number) => {
  return api({ method: 'delete', url: '/csp/corporations', params: { id } });
};

// tag
export const actionGetTags = (params: some) => {
  return api({ method: 'get', url: '/csp/tag/list-tag', params });
};
export const actionGetDetailTag = (id: string | number) => {
  return api({ method: 'get', url: '/csp/tag/get-detail', params: { id } });
};
export const actionAddTag = (data: some) => {
  return api({ method: 'post', url: '/csp/tag/create-tag', data });
};
export const actionEditTag = (data: some, params: some) => {
  return api({ method: 'put', url: '/csp/tag/update-tag', data, params });
};
export const actionDeleteTag = (id: string | number) => {
  return api({ method: 'delete', url: '/csp/tag/delete-tag', params: { id } });
};

// team
export const actionGetTeams = (params: some) => {
  return api({ method: 'get', url: '/csp/team/list-all-team', params });
};
export const actionGetDetailTeam = (id: string | number) => {
  return api({ method: 'get', url: '/csp/team/get-detail', params: { id } });
};
export const actionAddTeam = (data: some) => {
  return api({ method: 'post', url: '/csp/team/create-team', data });
};
export const actionEditTeam = (data: some) => {
  return api({ method: 'put', url: '/csp/team/update-team', data });
};
export const actionDeleteTeam = (id: string | number) => {
  return api({
    method: 'delete',
    url: '/csp/team/delete-team',
    params: { id },
  });
};

// shortcuts
export const actionGetShortcuts = (params: some) => {
  return api({ method: 'get', url: '/csp/shortcuts', params });
};
export const actionGetDetailShortcut = (id: string | number) => {
  return api({
    method: 'get',
    url: '/csp/shortcuts/get-detail',
    params: { id },
  });
};
export const actionAddShortcut = (data: some) => {
  return api({ method: 'post', url: '/csp/shortcuts', data });
};
export const actionEditShortcut = (data: some, id: string | number) => {
  return api({ method: 'put', url: '/csp/shortcuts', data, params: { id } });
};
export const actionDeleteShortcut = (id: string | number) => {
  return api({ method: 'delete', url: '/csp/shortcuts', params: { id } });
};
