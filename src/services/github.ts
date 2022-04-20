import callAPI from './config';

interface ParamsTypes {
  sort: string;
  page: string;
  per_page: string;
}

export const getListRepo = async (params: ParamsTypes) => {
  const url = `${process.env.REACT_APP_API_URL}/users/abbisatria/repos`

  return callAPI({
    url,
    method: 'GET',
    params
  })
}

export const getLanguage = async (url: string) => {

  return callAPI({
    url,
    method: 'GET'
  })
}