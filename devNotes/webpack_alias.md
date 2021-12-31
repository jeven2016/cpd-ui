
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