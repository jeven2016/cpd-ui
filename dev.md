### 创建工程

**融合 eslint & prettier**
- create-react-app文档地址：https://create-react-app.dev/docs/production-build
- typescript 工程

```javascript
yarn create react-app my-app --template typescript
```

- init eslint 并得到.eslintrc.json 文件

```javascript
yarn run eslint --init
```

- 修改 eslint 配置文件
- 安装 prettier 格式化插件

```javascript
yarn add eslint-config-prettier eslint-plugin-prettier prettier --dev
```

**eslint-config-prettier** - Turns off all rules that are unnecessary or might conflict with Prettier.  
**eslint-plugin-prettier** - Runs Prettier as an ESLint rule  
更新 eslint 配置文件，添加 "plugin:prettier/recommended"

- 创建 prettier 文件，并添加配置

```javascript
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "jsxBracketSameLine": true
}
```

在 package.json 中添加命令

```javascript
"lint": "eslint .",
 "lint:fix": "eslint --fix",
 "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
```

### 在工程中使用环境变量

```javascript
.env: Default.
.env.local: Local overrides. This file is loaded for all environments except test.
.env.development, .env.test, .env.production: Environment-specific settings.
.env.development.local, .env.test.local, .env.production.local: Local overrides of environment-specific settings.
```

- 变量文件的加载的优先级

```javascript
npm start: .env.development.local, .env.local, .env.development, .env
npm run build: .env.production.local, .env.local, .env.production, .env
npm test: .env.test.local, .env.test, .env (note .env.local is missing)
```

- 然后可以在变量文件中添加变量定义

```javascript
DOMAIN = www.example.com;
REACT_APP_FOO = $DOMAIN / foo;
REACT_APP_BAR = $DOMAIN / bar;
```

- 运行时指定模式

```javascript
//使用变量而非变量文件时
REACT_APP_NOT_SECRET_CODE=abcdef npm start

//使用变量文件
NODE_ENV=production npm start
```

- 代码中可以使用

```javascript
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

- html 中可以使用

```javascript
<title>%REACT_APP_WEBSITE_NAME%</title>
```


## TODO
* Redux Thunk Redux的异步处理中间件
* Redux Saga Redux中间件,用于管理应用程序 Side Effect(副作用，例如异步获取数据，访问浏览器缓存等)
* react-copy-to-clipboard 基于React的复制到剪切板组件
* qrcode.react 基于React的生成二维码的组件
* react-syntax-highlighter 基于React的代码高亮组件
* react-highlight-words 基于React的关键字高亮

AntV 包含 G2、G6、F2、L7 以及一套完整的图表使用和设计规范, 提供强大的数据可视化需求

G2Plot 基于G2封装的开箱即用的可视化组件库

recharts 使用React和D3构建的自定义的图表库

Viser 支持多种主流框架的可视化库
react-image-crop 强大的图片裁切库

react-sparklines 基于数据自动生成趋势线

dom-to-image 基于dom生成图片的canvas库

react-img-editor 图片编辑器

braft-editor 富文本编辑器

powerNice markdown/富文本编辑器

GGEditor 可视化图编辑器

react-codemirror2 代码编辑器

jsoneditor json编辑器

h5-dooring H5页面编辑器
react-amap 高德地图插件

@uiw/react-baidu-map 百度地图