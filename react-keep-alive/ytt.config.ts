import { defineConfig } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'http://yapi.smart-xwork.cn',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'production',
    outputFilePath: 'src/apis/index.ts',
    requestFunctionFilePath: 'src/helpers/request.ts',
    dataKey: 'data',
    getRequestFunctionName(interfaceInfo, changeCase) {
      // 以接口全路径生成请求函数名
      // return changeCase.camelCase(interfaceInfo.path);

      // 若生成的请求函数名存在语法关键词报错、或想通过某个关键词触发 IDE 自动引入提示，可考虑加前缀，如:
      // return changeCase.camelCase(`api_${interfaceInfo.path}`)

      // 若生成的请求函数名有重复报错，可考虑将接口请求方式纳入生成条件，如:
      return changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.path}`);
    },
    projects: [
      {
        token: '40da341890b46bcae735015b7ab2344dcf236d77cf975dfb92ff88c445551d09',
        categories: [
          {
            id: 527178,
            outputFilePath: 'src/apis/doc.ts',
          },
        ],
      },
    ],
  },
]);
