---
id: page:configuration_furniture_behaviors_glowing_furniture
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors/glowing_furniture
aliases: 发光家具, configuration furniture behaviors glowing furniture, 💡 发光家具, 统一光照（所有变体）, 变体光照
---

# 💡 发光家具

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors/glowing_furniture
- 连接数：4

## 摘要

本页总览 # 💡 发光家具 危险除非你知道你在做什么，否则不推荐使用该功能，因为这很有可能会导致世界上残留光源方块， 并且有可能会出现阻断水流或被水流冲掉导致无法发光，发出的光有可能并非真实的服务端光照导致无法防止刷怪等奇异现象。 如果你需要发光的家具请优先考虑[🫑 方块实体渲染器](/zh-Hans/configuration/block/states/entity_renderer)而不是该功能， 另外如果确认不需要此功能请将插件的 `config.yml` 中的 `furniture.light-system.enable` 禁用以节约服务器资源。 发光家具允许家具在指定位置放置光源方块，从而发出方块光照。 危险此行为需要在 `config.yml` 中启用 `furniture.light-system.enable: true`。config.yml`furniture: light-system: enable: true` ## 统一光照（所有变体）​ 当所有变体都需要在相同位置发光时，使用 `lights` 选项： `furniture: default:cande

## YAML 片段

```yaml
furniture:  default:candelabrum:
    behavior:
      type: glowing_furniture      lights:
      - position: 0,0,0          level: 15       # 光照等级: 1~15（默认为 15）      # 也支持简写:      # lights:      #
      - "0,0,0 15"    # "x,y,z 光照等级"      #
      - "0,0,0"       # 光照等级默认为 15
```

```yaml
furniture:  default:candelabrum:
    behavior:
      type: glowing_furniture      variants:        ground_lit:
      - "0,0,0 15"    # "ground_lit" 变体的光源        wall_lit:
      - "0,0,0.3 15"  # "wall_lit" 变体的光源        ceiling_lit:
      - "0,-1,0 15"   # "ceiling_lit" 变体的光源
```

## 相关页面

- depends_on → [🫑 方块实体渲染器](page_configuration_block_states_entity_renderer.md)
- depends_on → [🪇 事件](page_reference_events.md)
