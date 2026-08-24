# Ontology Reference — CraftEngine Domain Model

## Entity Types

Each entity has a canonical ID: `type:slug` (e.g., `block:custom_chair`, `config:block.behavior`)

### 1. Block (`block:`)
**Source**: Pages under `/zh-Hans/reference/block*`, `/zh-Hans/advanced/block*`, code blocks with `block:`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `block:<slug>` |
| `label` | string | ✅ | Display name (e.g., "可坐的椅子") |
| `block_id` | string | ✅ | Namespaced ID (e.g., `craftengine:custom_chair`) |
| `material` | string | | Vanilla material (e.g., `WOOD`, `STONE`) |
| `hardness` | number | | Break hardness |
| `resistance` | number | | Blast resistance |
| `behaviors` | Behavior[] | | Custom behaviors (see below) |
| `models` | ModelRef[] | | Block models / item models |
| `properties` | BlockProperties | | Waterlogged, facing, etc. |
| `events` | EventRef[] | | Block events (onPlace, onBreak, onInteract) |
| `recipe` | RecipeRef | | Crafting recipe to obtain |
| `compat` | CompatRef[] | | Version/mod compatibility |
| `source_location` | string | ✅ | Wiki URL + line range |

**Behavior Object**:
```yaml
type: "SITTABLE" | "CONTAINER" | "REDSTONE" | "CUSTOM"
config: {}  # Behavior-specific config
```

### 2. Item (`item:`)
**Source**: `/zh-Hans/reference/item*`, `/zh-Hans/advanced/item*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `item:<slug>` |
| `label` | string | ✅ | Display name |
| `item_id` | string | ✅ | Namespaced (e.g., `craftengine:magic_wand`) |
| `type` | string | | `TOOL`, `FOOD`, `SPAWN_EGG`, `CUSTOM` |
| `max_stack_size` | number | | Default 64 |
| `durability` | number | | For tools |
| `components` | ItemComponent[] | | Data components (1.20.5+) |
| `behaviors` | Behavior[] | | Custom item behaviors |
| `recipe` | RecipeRef | | Crafting recipe |
| `source_location` | string | ✅ | |

### 3. Recipe (`recipe:`)
**Source**: `/zh-Hans/reference/recipe*`, code blocks with `recipe:` or `shaped:` / `shapeless:`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `recipe:<slug>` |
| `label` | string | ✅ | |
| `type` | string | ✅ | `SHAPED`, `SHAPELESS`, `SMelting`, `STONECUTTING`, `CUSTOM` |
| `pattern` | string[] | | For shaped (3x3 grid) |
| `key` | Record<string, Ingredient> | | Key mapping |
| `ingredients` | Ingredient[] | | For shapeless |
| `result` | ItemStack | ✅ | Output item |
| `conditions` | Condition[] | | Advancement/biome conditions |
| `source_location` | string | ✅ | |

### 4. Config (`config:`)
**Source**: `/zh-Hans/configuration/*`, any page with YAML config examples

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `config:<section>.<key>` |
| `label` | string | ✅ | Human-readable |
| `section` | string | ✅ | `block`, `item`, `recipe`, `global`, `addon` |
| `key` | string | ✅ | YAML path (e.g., `behaviors.sittable.enabled`) |
| `type` | string | ✅ | `boolean`, `string`, `number`, `array`, `object` |
| `default` | any | | Default value |
| `description` | string | | From docs |
| `validation` | ValidationRule[] | | Regex, enum, range |
| `dependencies` | string[] | | Other config keys required |
| `deprecated_since` | string | | Version |
| `source_location` | string | ✅ | |

### 5. Event (`event:`)
**Source**: `/zh-Hans/reference/event*`, `/zh-Hans/advanced/event*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `event:<name>` |
| `label` | string | ✅ | |
| `event_type` | string | ✅ | `BLOCK`, `ITEM`, `ENTITY`, `WORLD`, `PLAYER` |
| `phase` | string | | `PRE`, `POST`, `CANCELABLE` |
| `parameters` | EventParam[] | | Context available in handler |
| `examples` | CodeExample[] | | From wiki |
| `source_location` | string | ✅ | |

### 6. API (`api:`)
**Source**: `/zh-Hans/api/*`, `/zh-Hans/reference/api*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `api:<fqcn>#<method>` |
| `label` | string | ✅ | |
| `class` | string | ✅ | Fully qualified class name |
| `method` | string | | Method name (if method-level) |
| `return_type` | string | | |
| `parameters` | ApiParam[] | | |
| `annotations` | string[] | | `@EventHandler`, `@SubscribeEvent` |
| `since_version` | string | | API version introduced |
| `deprecated_since` | string | | |
| `source_location` | string | ✅ | |

### 7. Compatibility (`compat:`)
**Source**: `/zh-Hans/compatibility/*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `compat:<target>` |
| `label` | string | ✅ | |
| `target_type` | string | ✅ | `MINECRAFT_VERSION`, `MOD`, `PLUGIN`, `LOADER` |
| `target_version` | string | ✅ | e.g., `1.20.1`, `Paper-1.20.4` |
| `status` | string | ✅ | `FULL`, `PARTIAL`, `BROKEN`, `UNTESTED` |
| `notes` | string | | Known issues |
| `source_location` | string | ✅ | |

### 8. Addon (`addon:`)
**Source**: `/zh-Hans/addon/*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | `addon:<slug>` |
| `label` | string | ✅ | |
| `description` | string | | |
| `provides` | string[] | | Entity IDs provided |
| `requires` | string[] | | Dependencies |
| `download_url` | string | | |
| `source_location` | string | ✅ | |

## Relations (Edges)

| Relation | Source → Target | Type | Confidence | Evidence |
|----------|-----------------|------|------------|----------|
| `extends` | Block → Block / Item → Item | EXTRACTED | 0.9 | YAML `extends:` field |
| `requires` | Config → Block/Item/Recipe | EXTRACTED | 0.85 | `requires:` or implicit from code |
| `compatible_with` | Block/Item → Compat | EXTRACTED | 0.8 | Compatibility matrix |
| `deprecated_by` | Config → Config | EXTRACTED | 0.9 | `deprecated_since` + migration guide |
| `example_of` | CodeBlock → Entity | EXTRACTED | 0.95 | Code block demonstrates |
| `implements` | API → Event | INFERRED | 0.7 | Annotation + naming |
| `provides` | Addon → Entity | EXTRACTED | 0.9 | Addon page lists |
| `depends_on` | Recipe → Item/Block | EXTRACTED | 0.95 | Ingredient/result refs |

## YAML Schema Validation

### Block Config Schema
```yaml
block:
  <block_id>:
    material: STRING(enum: vanilla_materials)
    hardness: NUMBER(min: 0, max: 50)
    resistance: NUMBER(min: 0, max: 3600000)
    behaviors:
      - type: STRING(enum: [SITTABLE, CONTAINER, REDSTONE, CUSTOM, ...])
        config: OBJECT
    models:
      block: STRING(path)
      item: STRING(path)
    properties: OBJECT
```

### Item Config Schema
```yaml
item:
  <item_id>:
    type: STRING(enum: [TOOL, FOOD, SPAWN_EGG, CUSTOM])
    max_stack_size: INTEGER(1-64)
    durability: INTEGER
    components: OBJECT  # Data components
    behaviors: [Behavior]
```

### Recipe Config Schema
```yaml
recipe:
  <recipe_id>:
    type: STRING(enum: [SHAPED, SHAPELESS, SMELTING, STONECUTTING, CUSTOM])
    pattern: [STRING, STRING, STRING]  # 3 rows
    key:
      'A': { item: STRING, count: INTEGER?, tag: STRING? }
    ingredients: [Ingredient]
    result: { item: STRING, count: INTEGER }
```

## Extraction Prompts (for LLM)

### System Prompt
```
You are a CraftEngine configuration expert. Extract structured entities from Minecraft server plugin documentation.

Output ONLY valid JSON matching the schema. Every entity must have:
- id (type:slug)
- label (human name)
- source_location (url#line-range)
- confidence (0.0-1.0)
- evidence (quote from source)

Use EXTRACTED for explicit statements, INFERRED for reasonable deductions, AMBIGUOUS for uncertain.
```

### User Prompt Template
```
Page: {title}
URL: {url}
Section: {sidebar_path}
Content:
{markdown}

Extract ALL entities of types: Block, Item, Recipe, Config, Event, API, Compat, Addon.
Focus on YAML code blocks and configuration examples.
```

## Confidence Scoring

| Source | Base Confidence |
|--------|-----------------|
| Explicit YAML config block | 0.95 |
| Code block with comment | 0.85 |
| Prose description | 0.70 |
| Table row | 0.80 |
| Cross-reference link | 0.60 |
| Inferred from pattern | 0.50 |

## Deduplication Rules

1. **Same ID** → Merge properties (union), max confidence, concat evidence
2. **Same label, different ID** → Keep both, add `alias_of` edge
3. **zh-Hans + en same entity** → Merge, add `translations` field

## Versioning

- Each entity carries `introduced_in` / `deprecated_in` from version badges in docs
- Relations carry `valid_from` / `valid_to` for temporal queries
- `--update` adds `changed_in` timestamp to modified entities