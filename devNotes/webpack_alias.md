
## webpack中使用alias
- 在craco.config.js中添加配置：
```text
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin()
    ],

    configure: {}
  },

```

- 在tsconfig.jso中添加
```text
 "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
```

 - 在eslint中配置   
 在webpack项目之中， 我们会借助alias别名提升代码效率和打包效率。
但是在使用了自定义的路径指向后，eslint就会对应产生找不到模块的报错。  
```text
Unable to resolve path to module '@/component' import/no-unresolved
```
这个时候，就要使用npm包eslint-import-resolver-alias来解决了  
```text
yarn add eslint-import-resolver-alias --dev
```

在.eslintrc.js文件中添加  
 ```text
 // eslint配置
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@", "./src"]
        ]
      }
    }
  },
 ```
**注意：在tsconfig.jso中的生效且能被idea识别的path是合并后的path, 这里就是"./src/*"**
```text
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
},
```

## ES6语法编写的react组件发布后无法使用
为何在本地引入未出现打包报错，而发布后从 NPM 社区引入就出现这种错误？  
原来，在webpack配置中，babel加载器中有个exclude配置属性设置成了node_modules，这将导致打包时默认对node_modules文件夹中的包不进行babel转码，
而仅仅对app.js进行转码，这样就导致打包出现错误。  

如何解决这个？
从打包效率上说，默认对node_modules文件夹中不进行babel转码，有助于提升打包效率。因此我选择将该组件先转化为ES5语法，然后发布到 NPM 社区，
babel-loader 允许使用 ES6 语法进行开发，但目前 NPM 社区上的大部分开源包都是 ES5 语法定义的，
因此在发布自己的组件时要转换为ES5语法格式