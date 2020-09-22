import { extend } from 'umi-request';
import { notification } from 'antd';
import { getLocalStorage, getSessionStorage } from './stroge';

const codeMessage: {
  [key: number]: string;
} = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response.headers.get('Content-Type') === 'multipart/form-data;charset=utf-8') {
    return response
  }
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

const request = extend({
  errorHandler, // 错误处理
  timeout: 6000, // 超时
  credentials: 'same-origin', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  let UserData = getLocalStorage() || getSessionStorage();
  return (
    {
      options: {
        ...options,
        headers: {
          token: UserData ? UserData.token : null
        }
      },
    }
  );
});

// response拦截器, 处理response
request.interceptors.response.use(async (response, options) => {
  if (response.headers.get('Content-Type') === 'multipart/form-data;charset=utf-8') {
    console.log(response.headers.get('Content-Disposition'))
    let { name, type }: any = options.params;
    // 下载文件流处理
    response.arrayBuffer().then((res: any) => {
      let data = new Date().toLocaleString( )
      var blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      var objectUrl = URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = objectUrl;
      a.setAttribute("download", `${name}${data}.${type}`);
      a.click();
      document.body.removeChild(a);
    })
  } else {
    // 普通json处理
  response
    .clone()
    .json()
    .then((content: any) => {
      console.log(content)
      if (content.status.code === '100001') {
        notification.error({
          description: '登录失效请重新登录',
          message: content.status.msg,
        });
        // sessionStorage.clear();
        // localStorage.clear();
        // window.location.reload(true);
        return;
      }
      if (content.status.code && content.status.code !== '000000') {
        notification.error({
          description: '请求失败',
          message: content.status.msg,
        });
        return;
      }
    });
  }
  return response;
});

export default request;
