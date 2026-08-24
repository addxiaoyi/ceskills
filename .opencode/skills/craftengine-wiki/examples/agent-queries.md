# Example: Agent Query Patterns

## Query Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| `agent` | LLM synthesizes answer from graph traversal | Natural language Q&A |
| `graph` | Pure graph traversal (BFS/DFS) | Precise dependency lookup |
| `hybrid` | Graph traversal + LLM synthesis (default) | Best of both |

## Common Patterns

### 1. Configuration How-To
```bash
/craftengine-wiki query "如何注册一个可坐的自定义方块？"
```
**Expected**:
```yaml
# YAML Example returned:
block:
  craftengine:custom_chair:
    material: "WOOD"
    hardness: 2.0
    behaviors:
      - type: SITTABLE
        config:
          height: 0.5
          offset: 0.0
          can_sit_while_riding: false
```
**Graph traversal**: `block:custom_chair` → `requires` → `config:block.behaviors.sittable` + `example_of` → code block

### 2. Dependency Analysis
```bash
/craftengine-wiki query "修改 block.behaviors.sittable.height 会影响哪些方块？"
```
**Graph traversal**: Reverse BFS from `config:block.behaviors.sittable.height` via `requires` edges
**Returns**: List of blocks using sittable behavior with current height values

### 3. Migration Guide
```bash
/craftengine-wiki query "从 2.x 升级 3.x，block 配置有哪些破坏性变更？"
```
**Graph traversal**: 
1. Find `compat:craftengine-3.0` node
2. Follow `deprecated_by` edges from 2.x configs
3. Follow `requires` to affected blocks
**Returns**: Table of deprecated configs → replacements + affected blocks

### 4. Feature Discovery
```bash
/craftengine-wiki query "有哪些方块行为类型可用？"
```
**Graph traversal**: Filter nodes `type=Config` where `section=block.behaviors` + `example_of` code blocks
**Returns**: Catalog of behavior types with config schemas

### 5. Recipe Lookup
```bash
/craftengine-wiki query "custom_chair 的合成配方是什么？"
```
**Graph traversal**: `block:custom_chair` → `recipe` edge → `recipe:custom_chair` → `ingredients` hyperedge
**Returns**: Shaped recipe pattern + ingredients

### 6. Compatibility Check
```bash
/craftengine-wiki query "Paper 1.20.5 支持哪些 CraftEngine 功能？"
```
**Graph traversal**: `compat:paper-1.20.5` → `compatible_with` edges → filter by `status=FULL`
**Returns**: Feature matrix with status

### 7. Event Handling
```bash
/craftengine-wiki query "如何监听玩家坐下事件？"
```
**Graph traversal**: `event:PlayerSitEvent` → `implements` → `api:PlayerSitEvent` + `example_of` code blocks
**Returns**: Event registration code + parameters + cancellation info

### 8. Addon Integration
```bash
/craftengine-wiki query "furniture addon 提供了哪些方块？"
```
**Graph traversal**: `addon:furniture` → `provides` edges → Block/Item nodes
**Returns**: List with configs and compatibility

## Advanced Queries

### Shortest Path (Migration)
```bash
/craftengine-wiki query "从旧版 SITTABLE 配置迁移到新版的最短路径"
```
Uses Dijkstra on `deprecated_by` + `requires` edges weighted by confidence.

### Subgraph Extraction
```bash
/craftengine-wiki query "导出所有与 sittable 相关的配置子图" --export graphml
```
Returns GraphML for Gephi visualization.

### Version Comparison
```bash
/craftengine-wiki query "对比 2.x 和 3.x 的 block behavior 配置差异"
```
Loads two graph versions, computes diff, returns migration guide.

## Query API (Programmatic)

```typescript
// From WebUI or custom script
const response = await fetch('http://localhost:3001/api/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId: 'craftengine-wiki',
    question: '如何创建自定义方块？',
    mode: 'hybrid'
  })
});

const { answer, evidence, related, yaml_example, confidence } = await response.json();
```

## Evidence Format

Each evidence entry:
```json
{
  "node": "block:custom_chair",
  "quote": "behaviors:\n  - type: SITTABLE\n    config:\n      height: 0.5",
  "url": "https://ce-pre.gtemc.cn/zh-Hans/reference/block_behaviors#L45-L52",
  "lineRange": [45, 52],
  "type": "code_block"
}
```

## Confidence Thresholds

| Confidence | Meaning | Action |
|------------|---------|--------|
| ≥ 0.9 | High certainty, explicit in docs | Use directly |
| 0.7-0.9 | Good, minor inference | Verify with source |
| 0.5-0.7 | Moderate, significant inference | Cross-check |
| < 0.5 | Low, ambiguous | Manual review needed |

## Batch Queries (for Agent Pipelines)

```bash
# Multiple questions in one call
/craftengine-wiki query-batch \
  "如何注册方块？" \
  "方块行为有哪些？" \
  "配方系统怎么用？"
```

Returns structured JSON array for downstream processing.

## WebUI Query Interface

1. Open project → Click "问答" tab
2. Type question → Enter
3. See: Answer + Evidence cards + YAML Example + Related Graph
4. Click evidence → Opens source wiki page
5. Click related node → Centers graph on that node
6. "导出回答" → Markdown with citations

## Custom Prompt Templates

Add to `references/extract.md` → `agent_prompts` section:
```yaml
# For specific use cases
migration_prompt: |
  You are a CraftEngine migration expert. Given the diff between v2 and v3 configs,
  generate a step-by-step migration guide with code examples.

recipe_prompt: |
  You are a recipe designer. Given a target item, suggest optimal recipe patterns
  considering game balance and ingredient availability.
```

Then query:
```bash
/craftengine-wiki query "迁移指南" --prompt migration_prompt
```