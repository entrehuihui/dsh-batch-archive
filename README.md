# 批量归档（DSH 插件）

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 用的侧栏面板插件：
把会话列表里的多个会话**一次性归档或恢复**，不用一个个右键点。

> 纯前端插件，宿主端 `index.js` 是空的 `apply()`，所有逻辑都在 `client.js` 里。
> 不碰会话数据本身，只调用 DSH 已有的 `archiveSession` / `unarchiveSession` 接口。

---

## 功能

- **批量归档** —— 勾选任意多个未归档会话，一次归档完
- **批量恢复** —— 切到「已归档」标签，同样多选后一键恢复
- **搜索过滤** —— 按标题或工作目录实时筛选，勾选只对当前可见项生效
- **全选 / 取消全选 / 反选** —— 三个快捷键按钮，长列表也不用逐个点
- **运行中保护** —— 选中项里有正在运行的会话时，会先弹确认框，确认后才「停止并归档」，绝不静默掐断你的活
- **失败可重试** —— 批量过程中某个会话失败不会中断整批，结束后高亮失败项并提供「重试失败项」
- **进度可见** —— 按钮实时显示 `归档中… 3/12`
- **相对时间** —— 每行显示「刚刚 / 5 分钟前 / 3 天前」

---

## 安装

本插件以本地目录方式挂进 DSH profile：

```sh
git clone https://github.com/entrehuihui/dsh-batch-archive.git
dsh plugin --profile web add "$PWD/dsh-batch-archive"
dsh web
```

或者直接在 profile 的 `package.json` 里加软链（相对克隆路径调整）：

```json
{
  "dependencies": {
    "@local/batch-archive": "link:D:/path/to/dsh-batch-archive"
  },
  "dsh": {
    "profile": {
      "bundles": ["@local/batch-archive"]
    }
  }
}
```

启用后侧栏会多一个「归档」图标，点开即是面板。

---

## 使用

1. 侧栏点「归档」图标打开面板
2. 「未归档会话」标签下勾选要处理的会话（可搜索缩小范围）
3. 点「归档所选」；如果选中项里有运行中的会话，确认「停止并归档」
4. 想反悔就切到「已归档」标签，勾选后点「恢复所选」

---

## 结构

```
batch-archive-bundle/
├── client.js          # 面板全部逻辑与样式（约 470 行）
├── index.js           # 宿主端入口，空实现
├── cordis.patch.yml   # 把插件 insert 进 profile
├── locale/
│   ├── zh.json        # 插件元信息（中文）
│   └── en.json        # 插件元信息（英文）
├── icon.svg           # 侧栏图标
└── package.json
```

界面文案（面板内所有字符串）不放在 `locale/*.json`，而是 `client.js` 里通过 `ctx.locale.register()` 注册，
中英双语内联在同一个 dictionary 里 —— 这样插件不依赖文件系统读取，加载更稳。

---

## 技术说明

- 插槽注册：`sidebar.panellist`（侧栏图标，order 40）+ `main`（面板正文）
- 依赖注入：`slots`、`locale`、`sessions`、`workspaces`、`uiWorkspace`
- 状态订阅：`useSnapshot` 封装 `getSnapshot()` + `subscribe()`，纯快照，不改数据源
- 样式：运行时注入 `<style data-bx-css>`，卸载时自动移除；全部使用 DSH 主题变量（`--dsw-alias-*`），自动跟随深浅色
- 批量执行：串行 `for` 循环 + `await`，避免并发打爆会话存储；单条失败收集进 `failedIds` 继续下一条

---

## License

MIT
