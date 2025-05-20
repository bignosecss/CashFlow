# React Native 手机端开发规范 (供 AI 参考)

最后修改日期：2025-5-20

## 1. 技术栈与核心原则

- **核心技术栈**: React Native 0.79.0, React 19.0.0, TypeScript, SQLite (通过 react-native-sqlite-storage), Zustand, React Query.
- **架构模式**: 倾向于组件化、模块化，数据流采用单向流动。
- **性能优化**: 关注渲染性能 (如 Composite Layer 提升、减少 Overdraw), 内存占用，启动速度。**严禁在 JS 线程执行耗时操作**，考虑使用 Native Modules 或 Worklets。
- **类型安全**: 强制使用 TypeScript，编写清晰的接口和类型定义，特别是 Native Modules 接口和数据同步模型.


## 2. 代码规范

- **命名**: 遵循 PascalCase 用于组件名，camelCase 用于变量和函数名。文件命名采用 kebab-case 或 PascalCase (取决于内容)。
- **组件**: 优先使用函数组件和 Hooks。合理拆分大型组件为更小的、可复用的单元。Props 传递应明确，避免 Props Drilling (考虑使用 Context 或状态管理)。
- **样式**: 推荐使用 StyleSheet.create 或 styled-components (如果引入)。避免内联样式，除非是动态计算的简单样式。关注跨平台一致性。
- **状态管理**: 对于全局或跨组件共享的状态，使用 Zustand 或其他合适的库。避免滥用 Context API 导致不必要的重渲染。
- **数据持久化**: SQLite 操作封装在 `/src/database` 目录下。所有数据库交互应通过提供的异步函数进行，避免直接在 UI 组件中操作数据库。
- **API 调用**: (如果未来有) 封装在 `/src/services` 目录下，使用异步函数处理。处理好加载、错误和缓存状态。

## 3. SQLite 数据库交互

- 所有数据库操作必须通过 `/src/database` 中定义的函数进行。
- 确保 SQL 语句安全，避免 SQL 注入 (react-native-sqlite-storage 通常通过参数绑定处理)。
- 异步操作必须使用 `async/await` 或 Promise 进行管理。
- 错误处理: 捕获数据库操作的错误，并进行适当的日志记录或用户反馈。

## 4. UI/UX 规范

- 遵循平台 (iOS/Android) 的设计指南，或使用统一的跨平台设计系统。
- 关注无障碍性 (Accessibility)。
- 动画和手势应流畅，避免卡顿。
- 参考 .tech/docs/ui-design.md 中的 UI 设计主题颜色。

## 5. 性能考量 (AI 重点关注)

- **列表渲染**: 使用 `FlatList` 或 `SectionList`，并确保 `keyExtractor` 正确，优化 `renderItem` 性能，考虑 `getItemLayout`。
- **重渲染优化**: 使用 `React.memo`, `useMemo`, `useCallback` 减少不必要的组件重渲染和计算。
- **资源加载**: 优化图片和其他资源的加载和缓存。
- **后台任务**: 对于耗时操作 (如数据同步、大量数据处理)，**必须**考虑使用 React Native 的 Headless JS 或其他后台任务库，确保 UI 线程和 JS 线程流畅。
- **Native Modules**: 对于需要访问原生能力或计算密集型任务，优先考虑编写 Native Modules，并通过 JSI (JavaScript Interface) 或 Bridge 进行高效通信。**避免频繁的 Bridge 调用**。

## 6. 测试


- 单元测试: 使用 Jest。
- 集成测试: (可选) 使用 Detox。

## 7. Git 提交规范

- 遵循 Conventional Commits 规范 (feat, fix, chore, docs, style, refactor, perf, test)。
- 提交信息清晰、简洁。

## 8. 其他

- 避免使用已废弃的 API。
- 保持依赖库更新。
- 代码注释应解释“为什么”这样做，而不是“如何”做。

## 8. 模块化设计

- **核心原则**: 遵循高内聚、低耦合的原则进行模块划分。
- **模块职责**: 每个模块应负责一个明确的业务领域或技术功能，例如：
  - **UI 组件模块**: 包含可复用的 UI 组件，如按钮、输入框、列表项等 (`/src/components`)。
  - **屏幕/页面模块**: 负责特定屏幕的 UI 组合和业务逻辑协调 (`/src/screens`)。
  - **数据访问模块**: 封装 SQLite 数据库操作，提供统一的数据接口 (`/src/database`)。
  - **服务模块**: 封装外部 API 调用或其他服务交互逻辑 (`/src/services`)。
  - **状态管理模块**: 负责全局或跨组件共享的状态管理 (`/src/store`)。
  - **工具函数模块**: 包含通用的、无特定业务关联的工具函数 (`/src/utils`)。
- **模块边界**: 模块之间通过清晰定义的接口进行交互，避免直接访问其他模块的内部实现。
- **功能范围**: 每个模块应专注于解决其特定领域的功能问题，不应承担其他模块的职责。

## 9. AI 文档上下文管理

- **技术栈时效性检查**: 
  - 在处理涉及技术栈选择或API使用的任务时，优先使用 Context7 工具获取最新文档。
  - 特别关注 React Native、React、TypeScript 等核心框架的最新实践和API变更。
  - 对于第三方库（如 Zustand、React Query），在使用前验证其最新版本的兼容性。

- **架构相关决策**: 
  - 在进行架构级别的修改或建议时，必须先获取并参考最新的架构文档。
  - 确保建议的修改符合项目的最新架构设计理念。
  - 验证新功能或改动与现有数据流模式的兼容性。

- **依赖版本管理**: 
  - 定期检查并建议更新过时的依赖版本。
  - 在添加新依赖时，验证其与项目其他依赖的兼容性。
  - 关注安全补丁和重要的 breaking changes。

## 10. 其他

- 避免使用已废弃的 API。
- 保持依赖库更新。
- 代码注释应解释"为什么"这样做，而不是"如何"做。

这份规范旨在指导 AI 在 CashFlow 手机端项目中的开发工作，确保代码质量、性能和可维护性。同时通过严格的文档上下文管理，确保技术决策的时效性和准确性。