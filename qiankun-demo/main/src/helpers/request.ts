import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { RequestBodyType, RequestFunctionParams } from 'yapi-to-typescript';

const ERR_NETWORK_CODE = [
  AxiosError.ERR_NETWORK,
  AxiosError.ETIMEDOUT,
  AxiosError.ECONNABORTED,
  AxiosError.ERR_BAD_REQUEST,
];

async function makeRequest<TResponseData>(payload: RequestFunctionParams): Promise<TResponseData> {
  // 基础 URL，可以从载荷中拉取或者写死
  const baseUrl = __MOCK__ ? payload.mockUrl : payload.prodUrl;
  // 完整 URL
  const url = `${baseUrl}${payload.path}`;

  const headers: AxiosRequestConfig['headers'] = payload.requestHeaders || {};

  const { requestBodyType, method } = payload;

  if (requestBodyType === RequestBodyType.json) {
    headers['Content-Type'] = 'application/json; charset=UTF-8';
  } else if (requestBodyType === RequestBodyType.form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  }

  let requestData: AxiosRequestConfig['data'] = payload.data || {};
  if (payload.hasFileData) {
    requestData = payload.getFormData();
  }

  let params: AxiosRequestConfig['params'] = {};
  if (method === 'GET' || requestBodyType === RequestBodyType.query) {
    params = payload.rawData;
  }

  // axios 选项
  const axiosOptions: AxiosRequestConfig = {
    headers,
    data: requestData,
    params,
  };

  let fetchRes: AxiosResponse<TResponseData>;
  let fetchErr: AxiosError<TResponseData>;
  // 发起请求
  try {
    fetchRes = await axios(url, axiosOptions);
  } catch (error) {
    fetchErr = error;
  }

  // 网络错误
  if (fetchErr) {
    throw fetchErr;
  }

  // 请求结果处理
  return fetchRes.data;
}

export default async function request<TResponseData>(payload: RequestFunctionParams): Promise<TResponseData> {
  try {
    return makeRequest(payload);
  } catch (e) {
    const err = e as AxiosError<TResponseData>;
    const { code } = err;
    // 网络错误处理,可能是超时与波动引起的，尝试重试
    if (ERR_NETWORK_CODE.includes(code)) {
      return makeRequest<TResponseData>(payload);
    } // 状态错误处理
    if (err.response.status === 401) {
      // 用户未登录处理
      // 推荐在此处发起登录逻辑
    } else {
      throw err;
    }
  }
}
