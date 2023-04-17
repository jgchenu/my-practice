/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { QueryStringArrayFormat, Method, RequestBodyType, ResponseBodyType, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
// prettier-ignore
import type { RequestConfig, RequestFunctionRestArgs } from 'yapi-to-typescript'
// @ts-ignore
import request from '../helpers/request'

type UserRequestRestArgs = RequestFunctionRestArgs<typeof request>

// Request: 目前 React Hooks 功能有用到
export type Request<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult,
> = (TRequestConfig['requestDataOptional'] extends true
  ? (requestData?: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
  : (requestData: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
  requestConfig: TRequestConfig
}

const mockUrl_0_0_0_0 = 'http://yapi.smart-xwork.cn/mock/169452' as any
const devUrl_0_0_0_0 = '' as any
const prodUrl_0_0_0_0 = '' as any
const dataKey_0_0_0_0 = 'data' as any

/**
 * 接口 [获取文档列表↗](http://yapi.smart-xwork.cn/project/169452/interface/api/2360258) 的 **请求类型**
 *
 * @分类 [文档项目↗](http://yapi.smart-xwork.cn/project/169452/interface/api/cat_527178)
 * @请求头 `GET /api/doc/list`
 * @更新时间 `2022-08-19 00:04:28`
 */
export interface GetApiDocListRequest {}

/**
 * 接口 [获取文档列表↗](http://yapi.smart-xwork.cn/project/169452/interface/api/2360258) 的 **返回类型**
 *
 * @分类 [文档项目↗](http://yapi.smart-xwork.cn/project/169452/interface/api/cat_527178)
 * @请求头 `GET /api/doc/list`
 * @更新时间 `2022-08-19 00:04:28`
 */
export interface GetApiDocListResponse {
  list?: {
    docId: number
    name: string
    content: string
  }[]
}

/**
 * 接口 [获取文档列表↗](http://yapi.smart-xwork.cn/project/169452/interface/api/2360258) 的 **请求配置的类型**
 *
 * @分类 [文档项目↗](http://yapi.smart-xwork.cn/project/169452/interface/api/cat_527178)
 * @请求头 `GET /api/doc/list`
 * @更新时间 `2022-08-19 00:04:28`
 */
type GetApiDocListRequestConfig = Readonly<
  RequestConfig<'http://yapi.smart-xwork.cn/mock/169452', '', '', '/api/doc/list', 'data', string, string, true>
>

/**
 * 接口 [获取文档列表↗](http://yapi.smart-xwork.cn/project/169452/interface/api/2360258) 的 **请求配置**
 *
 * @分类 [文档项目↗](http://yapi.smart-xwork.cn/project/169452/interface/api/cat_527178)
 * @请求头 `GET /api/doc/list`
 * @更新时间 `2022-08-19 00:04:28`
 */
const getApiDocListRequestConfig: GetApiDocListRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/api/doc/list',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'getApiDocList',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [获取文档列表↗](http://yapi.smart-xwork.cn/project/169452/interface/api/2360258) 的 **请求函数**
 *
 * @分类 [文档项目↗](http://yapi.smart-xwork.cn/project/169452/interface/api/cat_527178)
 * @请求头 `GET /api/doc/list`
 * @更新时间 `2022-08-19 00:04:28`
 */
export const getApiDocList = /*#__PURE__*/ (requestData?: GetApiDocListRequest, ...args: UserRequestRestArgs) => {
  return request<GetApiDocListResponse>(prepare(getApiDocListRequestConfig, requestData), ...args)
}

getApiDocList.requestConfig = getApiDocListRequestConfig

/* prettier-ignore-end */
