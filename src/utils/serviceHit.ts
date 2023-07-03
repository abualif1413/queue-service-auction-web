export enum HTTP_REQUEST_METHOD {
  POST = 'post',
  GET = 'get',
}

export enum HTTP_REQUEST_ENDPOINT {
  USER_REGISTER_NEW = '/user/register-new',
  USER_LOGIN_ATTEMPT = '/user/login-attempt',
  ADD_NEW_ITEM = '/item/new',
  MY_ITEM_LIST = '/item/my-list',
  BROWSE_LIST = '/item/browse-list',
  GET_ITEM_DATA = '/item/get-data',
  PLACE_BID = '/bid/place-new',
  ALL_BID = '/bid/all-bids',
}

export const serviceHit = async <T, K>(
  endpoint: HTTP_REQUEST_ENDPOINT | string,
  method: HTTP_REQUEST_METHOD,
  body?: T,
  headers?: HeadersInit
) => {
  const rawResponse = await fetch(`${process.env.REACT_APP_SERVICE_HOST}${endpoint}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const content = (await rawResponse.json()) as K;

  return content;
};
