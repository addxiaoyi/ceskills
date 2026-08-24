---
id: page:reference_template
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/template
aliases: 模板系统, reference template, 📄 模板系统, 简介, 它是如何工作的？, 多模板
---

# 📄 模板系统

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/template
- 连接数：3

## 摘要

本页总览 # 📄 模板系统 ## 简介​ 该插件拥有极高的可自定义性，但完全无预设的配置难以实现。即便最简单的选项也需在 YAML 中单独声明。当此类参数过多时，配置文件会变得冗长。为此，插件引入了模板系统，您可先定义基础模板，再通过参数和覆写等机制来简化配置流程，大幅减少重复性操作耗时。 ## 它是如何工作的？​ 配置模板时，需以 `templates` 作为 YAML 文件的根键。`templates` 下的首个元素即为模板名称（如下例中 `namespace:my_first_template`），该名称下方的所有内容构成实际模板配置。 `templates: namespace:my_first_template: option_1: true option_2: false option_3: - hello option_4: 20.25 option_5: hello: world` 观看这段简单动画了解插件如何应用模板： 信息`namespace:template_id` 作为模板的唯一标识符，在后续调用时必须使用该完整名称。 提示`namespace:templat

## YAML 片段

```yaml
items:  craftengine:custom_item:     template:
      - namespace:my_first_template
      - namespace:my_second_template
```

```yaml
items:  craftengine:custom_bread:    template: craftengine:apple_template    arguments:      nutrition: 1      saturation: 2.5    merges:
    data:        food:          can_always_eat: true
```

```yaml
items:  craftengine:custom_bread:    template: craftengine:apple_template    arguments:      nutrition: 1      saturation: 2.5    overrides:
      material: bread
```

```yaml
templates:  craftengine:apple_template:
      material: apple
    data:      food:        nutrition: "${nutrition}"        saturation: "${saturation}"items:  craftengine:custom_apple:    template: craftengine:apple_template    arguments:      nutrition: 1      saturation: 2.5
```

## 相关页面

- requires → [📒 参考](page_reference.md)
