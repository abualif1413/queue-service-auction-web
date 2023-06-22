export enum HTTP_REQUEST_METHOD {
  POST = 'post',
  GET = 'get',
}

export enum HTTP_REQUEST_ENDPOINT {
  USER_REGISTER_NEW = '/user/register-new',
  USER_LOGIN_ATTEMPT = '/user/login-attempt',
}

export const serviceHit = async <T, K>(
  endpoint: HTTP_REQUEST_ENDPOINT,
  method: HTTP_REQUEST_METHOD,
  body?: T
) => {
  var formData = new FormData();

  if (body) {
    const keys = Object.keys(body);
    type ObjectKey = keyof typeof body;
    keys.forEach((key) => {
      const myVar = key as ObjectKey;
      const data = body[myVar] as string;
      formData.append(key, data);
    });
  }

  const rawResponse = await fetch(`${process.env.REACT_APP_SERVICE_HOST}${endpoint}`, {
    method: method,
    body: body ? JSON.stringify(body) : '',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const content = (await rawResponse.json()) as K;
  return content;
};