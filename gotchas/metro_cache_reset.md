# Metro Bundler 缓存重置说明

## 为什么需要重置缓存

在 React Native 开发中，当您修改以下配置后，可能需要重置 Metro bundler 缓存：

1. Babel 配置（babel.config.js）
2. TypeScript 路径映射（tsconfig.json）
3. 模块解析配置（如路径别名）
4. 添加/删除 node_modules 依赖

## 重置缓存命令

```bash
yarn start --reset-cache
# 或
npm start -- --reset-cache
```

## 典型使用场景

1. **路径别名配置变更后**
   - 修改 `@/` 等路径别名配置后
   - 添加新的 babel-plugin-module-resolver 配置后

2. **模块解析问题**
   - 出现 "Unable to resolve module" 错误时
   - 模块路径解析不符合预期时

3. **构建配置更新后**
   - 修改 metro.config.js 后
   - 更新 React Native 版本后

## 工作原理

1. 清除 Metro 的模块解析缓存
2. 强制重新构建整个依赖图
3. 应用最新的构建配置
4. 确保所有路径解析使用最新配置

## 最佳实践

1. 在修改构建配置后主动重置缓存
2. 遇到无法解释的模块解析错误时尝试重置
3. 可以结合 `--clear` 参数彻底清理：
   ```bash
   yarn start --reset-cache --clear
   ```

## 注意事项

1. 首次重置后构建会较慢（需要重新分析所有文件）
2. 在 CI/CD 环境中通常不需要手动重置
3. 如果问题仍然存在，可能需要检查配置是否正确
