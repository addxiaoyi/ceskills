---
id: page:advanced_template_in_action
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/advanced/template_in_action
aliases: 模板系统实战, advanced template in action, 📄 模板系统实战, 模板解决什么问题, 什么时候用模板, 配置工厂
---

# 📄 模板系统实战

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/advanced/template_in_action
- 连接数：2

## 摘要

本页总览 # 📄 模板系统实战 在方块教程中你已经见过 `default:loot_table/self`——那是一个内置模板，一行展开成一个完整的战利品表。现在来理解什么时候用模板、为什么用模板。 [📄 模板系统多模板叠加、overrides、条件块、列表合并、配置工厂](/zh-Hans/reference/template) ## 模板解决什么问题​ 复制粘贴同样的配置、只改几个值，是大型资源包中出错的罪魁祸首。模板解决了这个问题：定义一次结构，只填不同的部分。 最简示例： `# 定义模板templates: tutorial:common_sounds: break: minecraft:${sound_type}.break step: minecraft:${sound_type}.step place: minecraft:${sound_type}.place hit: minecraft:${sound_type}.hit fall: minecraft:${sound_type}.fall` `# 使用模板settings: template: tutorial

## YAML 片段

```yaml
config_factory#sofa:  blueprint:
items:      "custom:${color}_sofa":
      material: paper
    data:          item_name: "<${dye_color}>${display_name} 沙发"
    behavior:
      type: furniture_item
furniture:            variants:              ground:                elements:
      - item: custom:${color}_sofa                hitboxes:
      - position: 0,0,0
      type: shulker
      seats:
      - 0,0.35,0
    settings:              hit_times: 3
    loot:              pools:
      - rolls: 1                  entries:
      - type: furniture_item
recipes:      "custom:${color}_sofa":
      type: shaped        pattern:
      - "WWW"
      - "WDW"
      - "SSS"        ingredients:          W: "minecraft:${color}_wool"          D: "minecraft:${color}_dye"          S: minecraft:stick        result:          id: ${__NAMESPACE__}:${__ID__}  instances:
      - {color: white,      display_name: 白色,   dye_color: white}
      - {color: light_gray, display_name: 淡灰色, dye_color: gray}
      - {color: gray,       display_name: 灰色,   dye_color: dark_gray}
      - {color: black,      display_name: 黑色,   dye_color: dark_gray}
      - {color: brown,      display_name: 棕色,   dye_color: dark_gray}
      - {color: red,        display_name: 红色,   dye_color: red}
      - {color: orange,     display_name: 橙色,   dye_color: gold}
      - {color: yellow,     display_name: 黄色,   dye_color: yellow}
      - {color: lime,       display_name: 黄绿色, dye_color: green}
      - {color: green,      display_name: 绿色,   dye_color: dark_green}
      - {color: cyan,       display_name: 青色,   dye_color: dark_aqua}
      - {color: light_blue, display_name: 淡蓝色, dye_color: aqua}
      - {color: blue,       display_name: 蓝色,   dye_color: blue}
      - {color: purple,     display_name: 紫色,   dye_color: dark_purple}
      - {color: magenta,    display_name: 品红色, dye_color: light_purple}
      - {color: pink,       display_name: 粉红色, dye_color: light_purple}
```

## 相关页面

- depends_on → [📄 模板系统](page_reference_template.md)
