# ceskills

CraftEngine 配置按**三省六部**办事。

用户问配置 / YAML / 方块物品家具配方时：

```bash
pnpm skill:liubu run "<需求>" default:oak_chair
```

准奏 YAML 写入 `pack/edicts/`。落盘：

```bash
pnpm skill:apply pack/edicts/<最新>.yml [你的配置.yml]
```

封驳则只回报事由，重拟后再呈。

- 中书拟旨：查 Wiki + 拟 YAML  
- 门下封驳：lint，有 error 不准交付  
- 六部会签：吏户礼兵刑工全画押才准奏  

禁止编造 `behavior.type`。`ok: false` 只给发还事由，不给成品 YAML。
