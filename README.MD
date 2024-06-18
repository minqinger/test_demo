### 快速上手
```
# 初始化安装依赖
npm i

# 清理所有依赖
npm run clean

# 开发模式启动
npm run dev

# 构建生产用的包
npm run build

```

##### 修改开发模式后端api地址的2种方法
1. `适合生产环境使用` 复制后重命名根目录下的.env.example为.env, 将里面的API_BASE_URL改为自己需要配置的地址
2. `适合开发环境使用` vue.config.js内devServer.proxy.pamirs.target的值修改为自己需要配置的地址

> 方法1的优先级高于方法2，如果想要方法2生效，需要把方法1的配置删除

### 目录结构
```
├── public 发布用的目录，index.html入口文件将在这里
│   
├── src 源代码
│   ├── actions 扩展动作的目录
│   ├── assets css/image等静态资源目录
│   ├── component vue组件目录
│   ├── field 模型字段对应控件目录
│   ├── layout 布局控件目录
│   ├── middleware 中间件
│   │   └── network-interceptor 网络请求拦截处理
│   ├── view 自定义视图目录 
│   └── main.ts 应用入口文件 这里会注册providers/application.ts
├── .env.example 启动的环境变量，后端api的请求地址在这里
├── package.json 包描述文件
├── tsconfig.json ts配置文件，可配置语法校验
└── vue.config.js vue的配置文件，里面可以配置webpack参数和开发模式的后端api请求地址

```
