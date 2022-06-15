import axios from 'axios';

export const fetchUserToken = async (name, email) => {
  return await axios('https://api.supermetrics.com/assignment/register', {
    method: 'post',
    data: {
      client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
      name,
      email
    }
  }).then(res => res.data?.data?.sl_token)
}