# Workflow WebUI — 六部工作流通用可视化

将「CraftEngine 六部工作流」（中枢→门下→六部→谕旨）抽象为**站点无关**的通用工作流 Web UI。通过编辑一份**站点配置文件**，即可复用于任何文档类网站（Wiki / 开发文档 / API 手册等）。

## 快速开始

### 方式一：直接打开（推荐，无需构建）

双击 `index.html` 即可在浏览器中运行。所有逻辑内联，无网络依赖，可离线使用。

### 方式二：本地静态服务器

```bash
# 任意静态服务器均可
npx serve apps/workflow-webui
# 或
python -m http.server -d apps/workflow-webui
```

### 方式三：GitHub Pages / 任意静态托管

把 `apps/workflow-webui/` 内容发布到任意静态托管（GitHub Pages、Netlify、Vercel 等）即可。

## 使用流程

1. **配置站点** — 在左侧「站点配置」面板填写：
   - `baseUrl`：目标站点文档根地址
   - `routes`：关键词 → 文档路径的路由表
   - `aliases`：别名映射（用于检索）
   - `validation`：ID 格式、必填字段等校验规则
   - `schema`：合法类型白名单
2. **输入意图** — 在顶部输入「要做个 X」之类的需求
3. **运行工作流** — 点击「运行六部」，按步骤可视化执行：
   - **中枢**：路由 → 检索 → 生成草稿
   - **门下**：Lint + 优化建议
   - **六部**：6 项合规检查
   - **谕旨**：生成 Markdown 报告 + 归档
4. **导出** — 站点配置可导出/导入 JSON，方便跨项目复用

## 站点配置文件模型

```json
{
  "name": "站点名称",
  "wiki": { "baseUrl": "https://...", "indexUrl": "https://..." },
  "validation": { "idPattern": "...", "namespacePattern": "...", "pathPattern": "..." },
  "lint": { "requiredFields": { "blocks": ["state"], "furniture": ["variants"] } },
  "aliases": { "椅子": "seat" },
  "routes": [
    { "kind": "seat", "keywords": ["椅子"], "suggest": "椅子", "path": "configuration/block/behaviors/seat_block" }
  ],
  "blockBehaviors": ["seat_block", "..."],
  "itemBehaviors": [],
  "furnitureBehaviors": [],
  "recipeTypes": [],
  "typos": {}
}
```

## 内置站点

- **CraftEngine**：默认内置，可一键加载
- 可自由新建/导入其他站点配置

## 目录

```
apps/workflow-webui/
├── index.html        # 主应用（内联 CSS/JS，可独立运行）
├── README.md
└── sites/            # 示例站点配置（.json）
    └── craftengine.json
```
