# CashFlow 认证与存储系统设计文档

> 最后更新: 2025-05-20
> 状态: 设计阶段

## 1. 系统概述

### 1.1 系统架构

```mermaid
flowchart TB
    subgraph Client[客户端]
        direction TB
        UI[用户界面层]-->BL[业务逻辑层]
        BL-->DAL[数据访问层]
        DAL-->LocalDB[(本地SQLite)]
        DAL-->SyncM[同步管理器]
    end

    subgraph Server[服务端]
        direction TB
        API[API层]-->ServerBL[业务逻辑层]
        ServerBL-->ORM[ORM层]
        ORM-->DB[(PostgreSQL)]
    end

    Client<-->|JWT认证/数据同步|Server
```

### 1.2 设计目标

- 实现安全可靠的用户认证系统
- 设计高效的离线存储架构
- 支持多端数据同步
- 确保良好的离线使用体验
- 保持系统扩展性

### 1.2 技术栈选择

**移动端**:
- React Native 0.79.0
- SQLite (react-native-sqlite-storage)
- Zustand (状态管理)
- React Query (数据缓存)
- JWT (认证)

**Web端**:
- Next.js (App Router)
- PostgreSQL + Prisma
- JWT (认证)

## 2. 认证系统设计

### 2.1 用户模型

```typescript
interface User {
  id: string;          // UUID
  email: string;       // 用户邮箱
  password: string;    // 加密存储
  name: string;        // 用户名称
  created_at: Date;    // 创建时间
  updated_at: Date;    // 更新时间
  last_sync_at: Date;  // 最后同步时间
}
```

### 2.2 认证流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant C as 客户端
    participant S as 服务端
    participant DB as 数据库

    %% 注册流程
    rect rgb(200, 220, 250)
        Note over U,DB: 注册流程
        U->>C: 输入邮箱密码
        C->>S: 注册请求
        S->>DB: 验证邮箱唯一性
        S->>DB: 创建用户记录
        S->>C: 返回JWT令牌
        C->>C: 存储令牌
    end

    %% 登录流程
    rect rgb(220, 250, 200)
        Note over U,DB: 登录流程
        U->>C: 输入登录信息
        C->>S: 登录请求
        S->>DB: 验证凭据
        S->>C: 返回JWT和用户信息
        C->>C: 存储认证状态
    end

    %% 令牌刷新
    rect rgb(250, 220, 200)
        Note over U,DB: 令牌刷新
        C->>S: 请求刷新令牌
        S->>S: 验证旧令牌
        S->>C: 返回新令牌
        C->>C: 更新存储的令牌
    end
```

1. **注册流程**:
   - 用户提供邮箱和密码
   - 服务端验证邮箱唯一性
   - 密码加密存储
   - 创建用户记录
   - 返回JWT令牌

2. **登录流程**:
   - 用户提供邮箱和密码
   - 服务端验证凭据
   - 生成JWT令牌
   - 返回用户信息和令牌

3. **令牌管理**:
   - 令牌有效期: 30天
   - 支持令牌刷新
   - 客户端安全存储令牌

### 2.3 移动端认证实现

```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

## 3. 存储系统设计

### 3.1 数据模型

```typescript
// 基础模型接口
interface BaseModel {
  id: string;           // UUID
  user_id: string;      // 关联用户ID
  created_at: Date;     // 创建时间
  updated_at: Date;     // 更新时间
  is_deleted: boolean;  // 软删除标记
  version: number;      // 版本号(用于同步)
  sync_status: 'pending' | 'synced' | 'conflict';
}

// 账单记录
interface Transaction extends BaseModel {
  amount: number;       // 金额
  type: 'income' | 'expense';
  category_id: string;  // 分类ID
  description: string;  // 描述
  date: Date;          // 交易日期
  tags: string[];      // 标签
}

// 分类
interface Category extends BaseModel {
  name: string;        // 分类名称
  icon: string;        // 图标
  type: 'income' | 'expense';
  color: string;       // 颜色
}
```

### 3.2 SQLite 表结构

```sql
-- 用户表
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_sync_at TEXT
);

-- 交易记录表
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL,
  category_id TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  sync_status TEXT DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 分类表
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  type TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1,
  sync_status TEXT DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 3.3 存储策略

```mermaid
flowchart LR
    subgraph Client[离线优先策略]
        direction TB
        Write[写入操作] --> LocalDB[(本地SQLite)]
        LocalDB --> Status[标记同步状态]
        Status --> AsyncSync[后台同步]
    end

    subgraph Version[版本控制]
        direction TB
        Update[更新数据] --> CheckVer{版本检查}
        CheckVer -->|冲突| LWW[Last Write Wins]
        CheckVer -->|无冲突| Save[保存]
        LWW --> Backup[保留冲突版本]
    end

    subgraph Delete[软删除策略]
        direction TB
        Del[删除请求] --> Mark[标记删除]
        Mark --> Sync[同步状态]
        Sync --> Clean[定期清理]
    end
```

1. **离线优先**:
   - 所有操作优先写入本地SQLite
   - 标记同步状态为pending
   - 后台异步同步到服务器

2. **数据版本控制**:
   - 每条记录维护版本号
   - 使用Last Write Wins策略处理冲突
   - 保留冲突记录供用户手动解决

3. **软删除**:
   - 不直接删除数据
   - 使用is_deleted标记
   - 同步后在适当时机清理

## 4. 数据同步机制

### 4.1 同步策略

```mermaid
flowchart TB
    Start((开始同步))
    CheckNet{网络可用?}
    GetLocal[获取本地变更]
    Upload[上传变更]
    Download[下载远程变更]
    Conflict{有冲突?}
    Resolve[解决冲突]
    Merge[合并变更]
    Update[更新本地数据]
    End((完成))

    Start --> CheckNet
    CheckNet -->|否| End
    CheckNet -->|是| GetLocal
    GetLocal --> Upload
    Upload --> Download
    Download --> Conflict
    Conflict -->|是| Resolve
    Resolve --> Merge
    Conflict -->|否| Merge
    Merge --> Update
    Update --> End
```

1. **增量同步**:
   - 基于时间戳和版本号
   - 仅同步变更数据
   - 支持双向同步

2. **同步流程**:
   ```typescript
   interface SyncProcess {
     // 上传本地变更
     uploadChanges: () => Promise<void>;
     // 下载远程变更
     downloadChanges: () => Promise<void>;
     // 解决冲突
     resolveConflicts: () => Promise<void>;
   }
   ```

3. **同步触发机制**:
   - 用户手动触发
   - 网络恢复自动触发
   - 定期后台同步
   - 重要操作后触发

### 4.2 冲突处理

1. **冲突检测**:
   - 比较版本号和时间戳
   - 标记冲突状态

2. **解决策略**:
   - 自动采用Last Write Wins
   - 保存冲突版本
   - 提供用户手动解决界面

## 5. 安全考虑

### 5.1 数据安全

- SQLite数据库加密
- 敏感信息加密存储
- 定期数据备份

### 5.2 传输安全

- 使用HTTPS传输
- JWT令牌验证
- 请求签名

## 6. 性能优化

### 6.1 本地存储优化

- 索引优化
- 批量操作
- 定期清理

### 6.2 同步优化

- 压缩传输数据
- 批量同步
- 断点续传

## 7. 扩展性考虑

### 7.1 数据模型扩展

- 预留扩展字段
- 版本化的数据结构
- 支持自定义字段

### 7.2 功能扩展

- 多设备同步
- 数据导入导出
- 多用户协作

## 8. 开发计划

### 8.1 第一阶段 (基础认证)

1. 实现用户模型和表结构
2. 完成注册登录功能
3. 集成JWT认证

### 8.2 第二阶段 (本地存储)

1. 实现SQLite表结构
2. 完成数据访问层
3. 实现离线存储功能

### 8.3 第三阶段 (同步机制)

1. 实现基础同步功能
2. 完成冲突处理
3. 优化同步性能

### 8.4 第四阶段 (优化完善)

1. 实现数据加密
2. 完善错误处理
3. 优化用户体验