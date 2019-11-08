import request from '../utils/request';

export async function getInfo() {
  const res = await request('/api/getInfo');
  return res;
};

export async function updateInfoAsync() {
  const res = await request('/api/updateInfo');
  return res;
}


