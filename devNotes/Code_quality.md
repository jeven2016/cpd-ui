**代码质量控制**
+ eslint + prettier  
  Prettier工具主要用来统一代码格式的，eslint也会对代码进行一定程度的格式校验，但主要是用来对代码规范的扫描，而prettier则是专门用来对代码进行格式化，两个工具各司其职。
+ husky + link stage  
  husky注册git的钩子函数保证在git 执行commit时调用代码扫描。    
  int-staged保证只对当前add的文件进行检测。 

```text
2.1 执行流程
达到上述效果，执行的流程如下：

1. 待提交的代码git add 添加到暂存区；
2. 执行 git commit；
3. husky注册在git pre-commit的钩子函数被调用，执行lint-staged；
4. lint-staged 取得所有被提交的文件依次执行写好的任务（ESLint 和 Prettier）；
5. 如果有错误（没通过ESlint检查）则停止任务，同时打印错误信息，等待修复后再执行commit；
6. 成功commit，可push到远程
```

**配置husky + link-staged**

```text
//安装依赖
yarn add husky lint-staged

//修改package.json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ],
    "src/**/*.{html,css,scss,md,json}": [
      "prettier --write",
      "git add"
    ]
  }
```

