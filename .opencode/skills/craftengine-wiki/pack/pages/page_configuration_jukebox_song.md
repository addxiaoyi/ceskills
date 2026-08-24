---
id: page:configuration_jukebox_song
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/jukebox_song
aliases: 唱片机曲目, configuration jukebox song, 💽 唱片机曲目
---

# 💽 唱片机曲目

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/jukebox_song
- 连接数：2

## 摘要

# 💽 唱片机曲目 警告由于 Minecraft 的注册表在注册后不可变，因此你需要重新进入服务器才能应用新的修改。 `jukebox_songs: default:credits_music: sound: minecraft:music.credits length: 100.0 # 音乐时长（秒） description: "Credits" comparator_output: 15 range: 32` 只需添加 `minecraft:jukebox_playable` 组件，即可使物品变为可播放的音乐唱片 `items: default:music_stick: material: stick data: jukebox_playable: default:credits_music` 如需了解如何自定义音效，请参考[此页面](/zh-Hans/configuration/sound)。

## YAML 片段

```yaml
items:  default:music_stick:
      material: stick
    data:      jukebox_playable: default:credits_music
```

## 相关页面

- depends_on → [🔊 音效](page_configuration_sound.md)
