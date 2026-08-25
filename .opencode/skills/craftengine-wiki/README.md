# CraftEngine Wiki Skill

CraftEngine Wiki 技能 —— 让 AI 通过**六部工作流**（中枢→门下→六部→谕旨）自动完成：意图路由 → Wiki 检索 → YAML 生成 → 校验优化 → 合规性审查 → 归档落盘。

## 核心目录

```
.opencode/skills/craftengine-wiki/
├── pack/                    # Wiki 内容包（只读）
│   ├── pages/               # Wiki 页面 (Markdown)
│   ├── scripts/             # 原始 JS 脚本
│   ├── schema.json          # 行为类型白名单
│   ├── graph.slim.json      # 知识图谱
│   └── catalog.json         # 页面目录
├── src/                     # TypeScript 重写源码
│   ├── config.ts            # 配置加载
│   ├── route.ts             # 中枢-路由
│   ├── query.ts             # 中枢-检索
│   ├── generate.ts          # 中枢-生成
│   ├── lint.ts              # 门下-Lint
│   ├── optimize.ts          # 门下-优化
│   ├── liubu.ts             # 六部-审查 + 谕旨归档
│   ├── types.ts             # 类型定义
│   └── index.ts             # 统一导出
├── tests/                   # 单元测试
├── edicts/                  # 归档产物 (.yml + .md)
├── config.json              # 统一配置
├── schema.json              # Schema 白名单
├── graph.slim.json          # 知识图谱
├── package.json
├── tsconfig.json
└── SKILL.md
```

## 六部工作流

```
意图 → 中枢(路由/检索/生成) → 门下(Lint/优化) → 六部(6项合规审查) → 谕旨(归档落盘)
```

### 命令

```bash
# 生成草稿 YAML
pnpm skill:liubu draft "需求描述" [id]

# Lint + 优化建议
pnpm skill:liubu review file.yml

# 完整合规性审查
pnpm skill:liubu issue file.yml

# 全流程：通过则落盘 edicts/
pnpm skill:liubu run "需求描述" [id]

# 应用到目标目录
pnpm skill:liubu apply edicts/xxx.yml [输出路径]

# 查看已归档
pnpm skill:liubu status
```

### 产物

| 阶段 | 命令 | 产出 |
|------|------|------|
| 中枢 | `liubu draft` | 路由命中 Wiki URL + 草稿 YAML |
| 门下 | `liubu review` | Lint 结果 + 优化建议 |
| 六部 | `liubu issue` | 6 项检查逐项通过/不通过 |
| 归档 | `liubu run` | `ok:true` 才写入 `edicts/*.yml` + `.md` |
| 落地 | `liubu apply` | 校验后写入 `applied/` 或指定路径 |
| 状态 | `liubu status` | 列出最近 20 条 edicts |

**归档产物**：`edicts/*.yml` + `*.md` 必须成对存在，`.md` 记录审查过程供复盘。

## 核心约束

1. `behavior.type` 必须在 schema 白名单内
2. Block 必须有 `state/states`，Furniture 必须有 `variants`
3. 无 Wiki 命中时需标记需人工补全
4. ID 必须符合 `namespace:path` 格式
5. `ok: false` 时禁止落盘，仅输出错误清单供修正

## 开发

```bash
# 安装依赖
npm install

# 类型检查
npm run build

# 代码规范
npm run lint

# 运行测试
npm test

# 监听模式
npm run test:watch
```

## 项目结构

### TypeScript 源码 (`src/`)

| 文件 | 职责 |
|------|------|
| `config.ts` | 统一配置加载 (config.json) |
| `types.ts` | 完整类型定义 |
| `route.ts` | 中枢-意图路由 (关键词 → Wiki URL) |
| `query.ts` | 中枢-Wiki 检索 (graph.slim.json 语义搜索) |
| `generate.ts` | 中枢-YAML 生成 (26 种 kind 模板) |
| `lint.ts` | 门下-Lint 校验 (schema 白名单、必填字段、ID 格式、数值范围) |
| `optimize.ts` | 门下-优化建议 (sounds、tags、关联字段等) |
| `liubu.ts` | 六部审查 + 谕旨归档 + CLI 入口 |
| `index.ts` | 统一导出 |

### 配置 (`config.json`)

```json
{
  "wiki": { "baseUrl": "...", "indexUrl": "..." },
  "paths": { "pack": ".", "edicts": "edicts", "applied": "applied", "schema": "schema.json", "graph": "graph.slim.json" },
  "validation": { "idPattern": "^[a-z0-9_.-]+:[a-z0-9_./-]+$" },
  "lint": { "requiredFields": { "blocks": ["state"], "furniture": ["variants"] } },
  "aliases": { "椅子": "seat", "门": "door", ... }
}
```

## YAML 示例

### 座椅方块 (seat)
```yaml
blocks:
  test:oak_chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
items:
  test:oak_chair:
    material: paper
    behavior:
      type: block_item
      block: test:oak_chair
```

### 家具
```yaml
furniture:
  test:bench:
    variants:
      ground:
        elements:
          - item: test:bench
        hitboxes:
          - position: 0,0,0
            type: shulker
        seats:
          - 0,0.35,0
items:
  test:bench:
    behavior:
      type: furniture_item
      furniture: test:bench
```

## 支持的 Kind (26 种)

| 类别 | Kind | 说明 |
|------|------|------|
| 基础 | `block` | 基础方块 |
| 物品 | `item` | 物品 |
| 方块行为 | `seat` | 座椅方块 |
| | `door` | 门 |
| | `crop` | 作物 |
| | `falling` | 掉落方块 |
| | `fence` | 围栏 |
| | `fence_gate` | 围栏门 |
| | `wall` | 墙 |
| | `lamp` | 灯 |
| | `trapdoor` | 活板门 |
| | `stairs` | 楼梯 |
| | `slab` | 台阶 |
| | `button` | 按钮 |
| | `pressure_plate` | 压力板 |
| | `wall_block` | 墙基类 |
| | `grass` | 草方块 |
| | `sapling` | 树苗 |
| | `leaves` | 叶子 |
| | `simple_storage` | 简单存储 |
| | `display_item` | 显示物品方块 |
| | `double_high` | 双高方块 |
| | `drawer` | 抽屉 |
| 家具 | `furniture` | 家具 |
| 配方 | `recipe` | 配方 |

## 归档结构

```
edicts/
├── 2026-08-25T12-34-56-789Z_test_oak_chair.yml   # 归档 YAML
└── 2026-08-25T12-34-56-789Z_test_oak_chair.md    # 审查报告
```

Markdown 报告示例：
```markdown
# 谕旨 | 六部审查

- 草稿: seat `test:oak_chair`
- 门下: 封驳 (error=0)
- 六部: 6/6 项通过
- 典籍: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block

## 谕旨正文 YAML
```yaml
blocks:
  test:oak_chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
items:
  test:oak_chair:
    material: paper
    behavior:
      type: block_item
      block: test:oak_chair
```
```

## 扩展指南

### 添加新 Kind

1. 在 `src/generate.ts` 的 `T` 对象添加模板函数
2. 在 `WIKI_MAP` 添加 Wiki 路径映射
3. 在 `VALID_KINDS` 自动收集
4. 在 `config.json` 的 `lint.requiredFields` 添加必填字段
5. 在 `schema.json` 的 `blockBehaviors`/`itemBehaviors`/`furnitureBehaviors` 添加类型

### 添加别名

在 `config.json` 的 `aliases` 添加中文关键词映射：
```json
"新关键词": "kind_name"
```

### 扩展 Lint 规则

在 `src/lint.ts` 的 `lint()` 函数中添加校验逻辑，使用 `add(issues, kinds, level, msg, hint)` 添加问题。

## 依赖

- Node.js >= 18
- TypeScript 5.3+
- Vitest (测试)
- ESLint + Prettier (代码规范)

## 许可证

MIT