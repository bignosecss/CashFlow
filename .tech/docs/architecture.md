# CashFlow 系统架构

## 整体架构图

```mermaid
flowchart TD
    subgraph Web["管理后台 Web"]
        W[Next.js] -->|HTTP 请求| API
    end

    subgraph API["Sync API"]
        A[Next.js API Routes] -->|读写| P[Prisma]
        P -->|ORM 映射| DB[(PostgreSQL)]
    end

    subgraph Mobile["React Native App"]
        M[App UI] -->|数据同步/登录| API
        M -->|本地存储| SQLite[(SQLite)]
    end

    style Web fill:#e3f2fd,stroke:#1976d2
    style API fill:#fff8e1,stroke:#ffa000
    style Mobile fill:#e8f5e9,stroke:#4caf50
    style DB fill:#fce4ec,stroke:#e91e63
    style SQLite fill:#ede7f6,stroke:#673ab7
    style P fill:#ffecb3,stroke:#ff8f00
```

## 架构说明

### 1. 管理后台 Web
- 技术栈: Next.js
- 功能: 提供管理界面
- 通信: 通过HTTP请求与Sync API交互

### 2. Sync API
- 技术栈: Next.js API Routes + Prisma
- 数据库: PostgreSQL
- 功能: 
  - 处理业务逻辑
  - 数据持久化
  - 提供RESTful API

### 3. React Native App
- 技术栈: React Native
- 本地存储: SQLite
- 功能:
  - 移动端用户界面
  - 本地数据存储
  - 与Sync API同步数据
