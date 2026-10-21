window.__ModuleLoader__.load({
  id: '@local/batch-archive',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useState, useMemo, useCallback, useEffect, useRef } = React;

    const NS = 'batch-archive';
    const PANEL_ID = 'batch-archive';
    const CSS_ID = '@local/batch-archive/panel.css';

    const CSS = `
.bx-panel{display:flex;flex-direction:column;height:100%;min-height:0;color:var(--dsw-alias-label-primary)}
.bx-head{display:flex;flex-direction:column;gap:10px;padding:16px 20px 12px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.bx-titleRow{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.bx-title{margin:0;font-size:15px;font-weight:600}
.bx-sub{margin:0;font-size:12px;color:var(--dsw-alias-label-secondary)}
.bx-tabs{display:inline-flex;padding:2px;gap:2px;border-radius:8px;background:var(--dsw-alias-bg-layer-2)}
.bx-tab{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;padding:5px 12px;border-radius:6px;cursor:pointer}
.bx-tab[aria-selected="true"]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-weight:600}
.bx-search{width:100%;box-sizing:border-box;font-size:12px;padding:7px 10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.bx-search:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.bx-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 20px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.bx-count{font-size:12px;color:var(--dsw-alias-label-secondary);margin-right:auto}
.bx-btn{appearance:none;display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:6px 11px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer}
.bx-btn:hover:not(:disabled){border-color:var(--dsw-alias-border-l2)}
.bx-btn:disabled{opacity:.5;cursor:not-allowed}
.bx-btn[data-variant="primary"]{background:var(--dsw-alias-brand-primary);border-color:transparent;color:#fff}
.bx-btn[data-variant="danger"]{color:var(--dsw-alias-state-error-primary)}
.bx-list{flex:1;min-height:0;overflow:auto;padding:6px 12px 20px}
.bx-empty{display:flex;flex-direction:column;gap:4px;align-items:center;justify-content:center;height:100%;color:var(--dsw-alias-label-secondary);font-size:13px;text-align:center;padding:24px}
.bx-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px}
.bx-row:hover{background:var(--dsw-alias-bg-layer-1)}
.bx-row[data-current="true"]{background:var(--dsw-alias-bg-layer-2)}
.bx-row[data-failed="true"] .bx-rowTitle{color:var(--dsw-alias-state-error-primary)}
.bx-check{flex:none;width:15px;height:15px;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.bx-rowBody{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.bx-rowTitle{font-size:13px;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bx-rowMeta{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--dsw-alias-label-secondary)}
.bx-tag{display:inline-flex;align-items:center;gap:4px;padding:1px 6px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);font-size:10px}
.bx-tag[data-kind="running"]{color:var(--dsw-alias-state-success-primary)}
.bx-tag[data-kind="failed"]{color:var(--dsw-alias-state-error-primary)}
.bx-dot{width:5px;height:5px;border-radius:50%;background:currentColor}
.bx-status{flex:none;font-size:11px;color:var(--dsw-alias-label-secondary)}
.bx-foot{padding:10px 20px;border-top:1px solid var(--dsw-alias-border-l1);font-size:12px;color:var(--dsw-alias-label-secondary);min-height:18px}
.bx-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4);z-index:1000}
.bx-dialog{width:min(420px,calc(100vw - 48px));background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;padding:18px 20px;display:flex;flex-direction:column;gap:12px}
.bx-dialogTitle{margin:0;font-size:14px;font-weight:600}
.bx-dialogBody{margin:0;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.bx-dialogActions{display:flex;justify-content:flex-end;gap:8px}
.bx-activity{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:3px;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary);max-height:180px;overflow:auto}
.bx-activityId{color:var(--dsw-alias-label-primary)}
.bx-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
`;

    function mountStyles() {
      if (typeof document === 'undefined') return () => {};
      const existing = document.querySelector(`style[data-bx-css="${CSS_ID}"]`);
      if (existing) return () => {};
      const tag = document.createElement('style');
      tag.dataset.bxCss = CSS_ID;
      tag.textContent = CSS;
      document.head.appendChild(tag);
      return () => { tag.remove(); };
    }

    function relativeTime(ts, now) {
      const diff = Math.max(0, now - ts);
      const minute = 60_000;
      if (diff < minute) return '刚刚';
      if (diff < 60 * minute) return `${Math.floor(diff / minute)} 分钟前`;
      if (diff < 24 * 60 * minute) return `${Math.floor(diff / (60 * minute))} 小时前`;
      if (diff < 30 * 24 * 60 * minute) return `${Math.floor(diff / (24 * 60 * minute))} 天前`;
      const d = new Date(ts);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    // Host refusal carries the concrete work in progress; `undefined` means
    // "some other failure". Class identity goes by name: plugin bundles do not
    // share error-class identity with the Host.
    function activeRefusalActivity(reason) {
      if (!reason || typeof reason !== 'object') return void 0;
      if (reason.name !== 'WorkspaceArchiveError') return void 0;
      const rpc = reason.rpcError;
      if (!rpc || rpc.code !== 'workspace/session-active') return void 0;
      return (rpc.details && rpc.details.activity) || [];
    }

    // One activity family -> one line. Mirrors the Host UI wording so the same
    // refusal reads the same way in both panels.
    function activityLine(entry, t) {
      const items = entry.items || [];
      const n = items.length;
      const names = items.map((item) => item.label || item.id).join(t('activity.sep'));
      const plural = n === 1 ? 'one' : 'other';
      switch (entry.kind) {
        case 'turn': return t('activity.turn');
        case 'subagent': return t(`activity.subagents.${plural}`, { n, names });
        case 'job': return t(`activity.jobs.${plural}`, { n, names });
        case 'schedule': return t(`activity.schedules.${plural}`, { n, names });
        default: return t(`activity.other.${plural}`, { kind: entry.kind, n });
      }
    }

    function PanelIcon({ size }) {
      return h('svg', {
        width: size || 18, height: size || 18, viewBox: '0 0 24 24',
        fill: 'none', stroke: 'currentColor', strokeWidth: 1.6,
        strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
      }, [
        h('rect', { key: 'a', x: 3, y: 4, width: 18, height: 4, rx: 1 }),
        h('path', { key: 'b', d: 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8' }),
        h('path', { key: 'c', d: 'M10 12h4' }),
      ]);
    }

    function SessionRow({ row, checked, failed, current, onToggle, onOpen, t, now }) {
      const title = row.displayTitle || t('row.blank');
      return h('div', {
        className: 'bx-row',
        'data-current': current ? 'true' : 'false',
        'data-failed': failed ? 'true' : 'false',
      }, [
        h('input', {
          key: 'check', type: 'checkbox', className: 'bx-check',
          checked, onChange: () => onToggle(row.id),
          'aria-label': t('row.select', { name: title }),
        }),
        h('button', {
          key: 'body', type: 'button', className: 'bx-rowBody',
          onClick: () => onOpen(row.id),
          title: t('action.open'),
        }, [
          h('span', { key: 'title', className: 'bx-rowTitle' }, title),
          h('span', { key: 'meta', className: 'bx-rowMeta' }, [
            row.running
              ? h('span', { key: 'run', className: 'bx-tag', 'data-kind': 'running' },
                  h('span', { key: 'd', className: 'bx-dot' }), t('row.running'))
              : null,
            row.blank ? h('span', { key: 'blank', className: 'bx-tag' }, t('row.blank')) : null,
            failed ? h('span', { key: 'fail', className: 'bx-tag', 'data-kind': 'failed' }, t('error.generic')) : null,
            h('span', { key: 'time' }, t('row.updated', { time: relativeTime(row.updatedAt, now) })),
          ]),
        ]),
      ]);
    }

    function BatchArchivePanel(props) {
      const { t, useSessions, useArchived, useCurrentSession, onArchive, onUnarchive, onOpen } = props;
      const list = useSessions((s) => s);
      const archived = useArchived((s) => s);
      const currentId = useCurrentSession((s) => s);
      const [tab, setTab] = useState('active');
      const [query, setQuery] = useState('');
      const [checked, setChecked] = useState(() => new Set());
      const [failed, setFailed] = useState(() => new Set());
      const [busy, setBusy] = useState(null);
      const [pendingActive, setPendingActive] = useState(null);
      const [notice, setNotice] = useState('');
      const nowRef = useRef(Date.now());
      const [now, setNow] = useState(nowRef.current);

      useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 60_000);
        return () => window.clearInterval(timer);
      }, []);

      const archivedSet = useMemo(() => new Set(archived || []), [archived]);

      const rows = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return list.ids
          .map((id) => list.byId[id])
          .filter((row) => row !== void 0)
          .filter((row) => (tab === 'archived' ? archivedSet.has(row.id) : !archivedSet.has(row.id)))
          .filter((row) => needle === ''
            || (row.displayTitle || '').toLowerCase().includes(needle)
            || (row.cwd || '').toLowerCase().includes(needle))
          .sort((a, b) => b.updatedAt - a.updatedAt);
      }, [list, tab, query, archivedSet]);

      const visibleIds = useMemo(() => rows.map((r) => r.id), [rows]);
      const checkedVisible = useMemo(
        () => visibleIds.filter((id) => checked.has(id)),
        [visibleIds, checked],
      );

      // Selections are kept across filtering and tab switches on purpose: the
      // user ticked them, so only the user may untick them. The action itself
      // always runs over the visible subset (checkedVisible), so a hidden tick
      // can never be archived by surprise.
      const hiddenChecked = useMemo(
        () => [...checked].filter((id) => !visibleIds.includes(id)).length,
        [checked, visibleIds],
      );

      const toggle = useCallback((id) => {
        setChecked((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id); else next.add(id);
          return next;
        });
        setFailed((prev) => { if (!prev.has(id)) return prev; const n = new Set(prev); n.delete(id); return n; });
      }, []);

      const selectAll = useCallback(() => {
        // Add the visible range to whatever is already ticked: narrowing the
        // search must never silently drop an earlier selection.
        setChecked((prev) => {
          const next = new Set(prev);
          visibleIds.forEach((id) => next.add(id));
          return next;
        });
      }, [visibleIds]);
      const selectNone = useCallback(() => setChecked(new Set()), []);
      const invert = useCallback(() => {
        // Invert only the visible range; leave hidden ticks untouched.
        setChecked((prev) => {
          const next = new Set(prev);
          visibleIds.forEach((id) => { if (next.has(id)) next.delete(id); else next.add(id); });
          return next;
        });
      }, [visibleIds]);

      const runBatch = useCallback(async (ids, stopActivity) => {
        if (ids.length === 0 || busy !== null) return;
        const archiving = tab !== 'archived';
        setBusy({ done: 0, total: ids.length, archiving });
        const failedIds = [];
        for (let i = 0; i < ids.length; i += 1) {
          const id = ids[i];
          try {
            if (archiving) await onArchive(id, stopActivity ? { stopActivity: true } : undefined);
            else await onUnarchive(id);
            setBusy({ done: i + 1, total: ids.length, archiving });
          } catch (reason) {
            const activity = archiving ? activeRefusalActivity(reason) : void 0;
            if (activity !== void 0) {
              const titles = {};
              ids.forEach((sid) => {
                const row = list.byId[sid];
                titles[sid] = row ? (row.displayTitle || t('row.blank')) : sid;
              });
              setPendingActive({ ids: ids.slice(i), activity, titles });
              setBusy(null);
              return;
            }
            failedIds.push(id);
            setBusy({ done: i + 1, total: ids.length, archiving });
          }
        }
        setBusy(null);
        // Only clear the rows this run actually touched; ticks the user made in
        // another tab or under another filter must survive.
        setChecked((prev) => {
          const next = new Set(prev);
          ids.forEach((sid) => next.delete(sid));
          return next;
        });
        setFailed(new Set(failedIds));
        const okCount = ids.length - failedIds.length;
        if (failedIds.length === 0) {
          setNotice(archiving
            ? t('action.archiveDone', { count: okCount })
            : t('action.unarchiveDone', { count: okCount }));
        } else {
          setNotice(archiving
            ? t('action.archiveFailed', { count: failedIds.length })
            : t('action.unarchiveFailed', { count: failedIds.length }));
        }
      }, [busy, tab, onArchive, onUnarchive, t, list]);

      const onPrimary = useCallback(() => {
        void runBatch(checkedVisible, false);
      }, [runBatch, checkedVisible]);

      const confirmStopAndArchive = useCallback(() => {
        const ids = pendingActive ? pendingActive.ids : [];
        setPendingActive(null);
        void runBatch(ids, true);
      }, [pendingActive, runBatch]);

      const retryFailed = useCallback(() => {
        const ids = [...failed];
        if (ids.length === 0) return;
        // Never pass stopActivity here: a retry must go through the same
        // confirmation gate as a first attempt, so nothing is stopped silently.
        void runBatch(ids, false);
      }, [failed, runBatch]);

      const switchTab = useCallback((next) => {
        setTab(next);
        setChecked(new Set());
        setFailed(new Set());
        setNotice('');
      }, []);

      const allChecked = visibleIds.length > 0 && checkedVisible.length === visibleIds.length;

      return h('div', { className: 'bx-panel' }, [
        h('div', { key: 'head', className: 'bx-head' }, [
          h('div', { key: 'titleRow', className: 'bx-titleRow' }, [
            h('h2', { key: 't', className: 'bx-title' }, t('panel')),
            h('span', { key: 'n', className: 'bx-sub' }, `${rows.length}`),
          ]),
          h('div', { key: 'tabs', className: 'bx-tabs', role: 'tablist' }, [
            h('button', {
              key: 'a', type: 'button', role: 'tab', className: 'bx-tab',
              'aria-selected': tab === 'active', onClick: () => switchTab('active'),
            }, t('header.active')),
            h('button', {
              key: 'b', type: 'button', role: 'tab', className: 'bx-tab',
              'aria-selected': tab === 'archived', onClick: () => switchTab('archived'),
            }, t('header.archived')),
          ]),
          h('input', {
            key: 'search', className: 'bx-search', type: 'search',
            value: query, placeholder: t('filter.search'),
            onChange: (e) => setQuery(e.target.value),
          }),
        ]),
        h('div', { key: 'bar', className: 'bx-bar' }, [
          h('span', { key: 'count', className: 'bx-count' },
            checkedVisible.length > 0
              ? t('count.selected', { count: checkedVisible.length })
              : t('count.none')),
          hiddenChecked > 0
            ? h('span', { key: 'hidden', className: 'bx-count', title: t('count.hiddenHint') },
                t('count.hidden', { count: hiddenChecked }))
            : null,
          h('button', {
            key: 'all', type: 'button', className: 'bx-btn', onClick: selectAll,
            disabled: rows.length === 0 || allChecked,
          }, t('action.selectAll')),
          h('button', {
            key: 'none', type: 'button', className: 'bx-btn', onClick: selectNone,
            disabled: checkedVisible.length === 0,
          }, t('action.selectNone')),
          h('button', {
            key: 'inv', type: 'button', className: 'bx-btn', onClick: invert,
            disabled: rows.length === 0,
          }, t('action.invert')),
          failed.size > 0
            ? h('button', { key: 'retry', type: 'button', className: 'bx-btn', onClick: retryFailed }, t('action.retry'))
            : null,
          tab === 'archived'
            ? h('button', {
                key: 'primary', type: 'button', className: 'bx-btn', 'data-variant': 'primary',
                onClick: onPrimary, disabled: checkedVisible.length === 0 || busy !== null,
              }, busy ? t('action.unarchiveBusy', { done: busy.done, total: busy.total }) : t('action.unarchive'))
            : h('button', {
                key: 'primary', type: 'button', className: 'bx-btn', 'data-variant': 'primary',
                onClick: onPrimary, disabled: checkedVisible.length === 0 || busy !== null,
              }, busy ? t('action.archiveBusy', { done: busy.done, total: busy.total }) : t('action.archive')),
        ]),
        h('div', { key: 'list', className: 'bx-list', role: 'list' },
          rows.length === 0
            ? h('div', { key: 'empty', className: 'bx-empty' }, [
                h('strong', { key: 'a' }, t('header.empty')),
                h('span', { key: 'b' }, t('header.emptyHint')),
              ])
            : rows.map((row) => h(SessionRow, {
                key: row.id, row, now, t,
                checked: checked.has(row.id),
                failed: failed.has(row.id),
                current: row.id === currentId,
                onToggle: toggle,
                onOpen,
              }))),
        h('div', { key: 'foot', className: 'bx-foot', role: 'status', 'aria-live': 'polite' }, notice),
        pendingActive !== null
          ? h('div', {
              key: 'confirm', className: 'bx-overlay',
              onClick: (e) => { if (e.target === e.currentTarget) setPendingActive(null); },
            }, h('div', { className: 'bx-dialog', role: 'dialog', 'aria-modal': true }, [
              h('h3', { key: 't', className: 'bx-dialogTitle' }, t('confirm.activeTitle')),
              h('p', { key: 'b', className: 'bx-dialogBody' }, t('confirm.activeBody')),
              pendingActive.activity.length > 0
                ? h('ul', { key: 'act', className: 'bx-activity' },
                    pendingActive.activity.map((entry, i) =>
                      h('li', { key: `${entry.kind}-${i}` }, activityLine(entry, t))))
                : null,
              h('p', { key: 'l', className: 'bx-dialogBody' }, t('confirm.activeList')),
              h('ul', { key: 'ids', className: 'bx-activity' },
                pendingActive.ids.map((id) => h('li', { key: id, className: 'bx-activityId' },
                  pendingActive.titles[id] || id))),
              h('div', { key: 'a', className: 'bx-dialogActions' }, [
                h('button', {
                  key: 'c', type: 'button', className: 'bx-btn',
                  onClick: () => setPendingActive(null),
                }, t('confirm.cancel')),
                h('button', {
                  key: 'k', type: 'button', className: 'bx-btn', 'data-variant': 'primary',
                  onClick: confirmStopAndArchive,
                }, t('confirm.confirm')),
              ]),
            ]))
          : null,
      ]);
    }

    return {
      inject: ['slots', 'locale', 'sessions', 'workspaces', 'uiWorkspace'],
      apply(ctx) {
        const disposeStyles = mountStyles();
        ctx.effect(() => ctx.locale.register(NS, {
          zh: {
            panel: '批量归档',
            'panel.short': '归档',
            'header.active': '未归档会话',
            'header.archived': '已归档会话',
            'header.empty': '没有会话',
            'header.emptyHint': '当前工作区还没有会话记录。',
            'count.selected': '已选 {count} 个',
            'count.none': '点击左侧复选框选择会话',
            'count.hidden': '另有 {count} 个已选未显示',
            'count.hiddenHint': '这些勾选被当前的搜索或标签页遮住了，归档只作用于当前可见项',
            'filter.search': '搜索标题或目录',
            'action.selectAll': '全选',
            'action.selectNone': '取消全选',
            'action.invert': '反选',
            'action.archive': '归档所选',
            'action.unarchive': '恢复所选',
            'action.archiveBusy': '归档中… {done}/{total}',
            'action.unarchiveBusy': '恢复中… {done}/{total}',
            'action.archiveDone': '已归档 {count} 个会话',
            'action.unarchiveDone': '已恢复 {count} 个会话',
            'action.archiveFailed': '有 {count} 个会话没能归档',
            'action.unarchiveFailed': '有 {count} 个会话没能恢复',
            'action.stopAndArchive': '停止并归档',
            'action.retry': '重试失败项',
            'action.open': '打开',
            'confirm.activeTitle': '有会话正在运行',
            'confirm.activeBody': '以下会话还有未完成的工作，归档前会先停止它们。',
            'confirm.activeList': '将被停止的会话：',
            'confirm.cancel': '取消',
            'confirm.confirm': '停止并归档',
            'activity.turn': '进行中的回合',
            'activity.subagents.one': '{n} 个运行中的子智能体：{names}',
            'activity.subagents.other': '{n} 个运行中的子智能体：{names}',
            'activity.jobs.one': '{n} 个后台任务：{names}',
            'activity.jobs.other': '{n} 个后台任务：{names}',
            'activity.schedules.one': '{n} 条定时提醒：{names}',
            'activity.schedules.other': '{n} 条定时提醒：{names}',
            'activity.other.one': '{n} 项其他工作（{kind}）',
            'activity.other.other': '{n} 项其他工作（{kind}）',
            'activity.sep': '、',
            'error.generic': '操作失败，请重试。',
            'row.running': '运行中',
            'row.blank': '新会话',
            'row.select': '选择会话：{name}',
            'row.updated': '更新于 {time}',
          },
          en: {
            panel: 'Batch Archive',
            'panel.short': 'Archive',
            'header.active': 'Active sessions',
            'header.archived': 'Archived sessions',
            'header.empty': 'No sessions',
            'header.emptyHint': 'This workspace has no session records yet.',
            'count.selected': '{count} selected',
            'count.none': 'Tick the checkbox to select sessions',
            'count.hidden': '+{count} selected but hidden',
            'count.hiddenHint': 'These ticked sessions are hidden by the current search or tab; archiving only affects visible rows',
            'filter.search': 'Search title or directory',
            'action.selectAll': 'Select all',
            'action.selectNone': 'Clear',
            'action.invert': 'Invert',
            'action.archive': 'Archive selected',
            'action.unarchive': 'Restore selected',
            'action.archiveBusy': 'Archiving… {done}/{total}',
            'action.unarchiveBusy': 'Restoring… {done}/{total}',
            'action.archiveDone': 'Archived {count} sessions',
            'action.unarchiveDone': 'Restored {count} sessions',
            'action.archiveFailed': '{count} sessions could not be archived',
            'action.unarchiveFailed': '{count} sessions could not be restored',
            'action.stopAndArchive': 'Stop and archive',
            'action.retry': 'Retry failed',
            'action.open': 'Open',
            'confirm.activeTitle': 'Sessions still running',
            'confirm.activeBody': 'These sessions still have work in progress, which will be stopped before archiving.',
            'confirm.activeList': 'Sessions to be stopped:',
            'confirm.cancel': 'Cancel',
            'confirm.confirm': 'Stop and archive',
            'activity.turn': 'The turn in progress',
            'activity.subagents.one': '{n} running subagent: {names}',
            'activity.subagents.other': '{n} running subagents: {names}',
            'activity.jobs.one': '{n} background job: {names}',
            'activity.jobs.other': '{n} background jobs: {names}',
            'activity.schedules.one': '{n} scheduled reminder: {names}',
            'activity.schedules.other': '{n} scheduled reminders: {names}',
            'activity.other.one': '{n} other item of work ({kind})',
            'activity.other.other': '{n} other items of work ({kind})',
            'activity.sep': ', ',
            'error.generic': 'Failed, please retry.',
            'row.running': 'Running',
            'row.blank': 'New session',
            'row.select': 'Select session: {name}',
            'row.updated': 'Updated {time}',
          },
        }), 'batch-archive: dictionaries');

        const t = ctx.locale.bind(NS);

        const sessionList = ctx.sessions.list;
        const archivedSet = {
          getSnapshot: () => ctx.workspaces.list.getSnapshot().archivedSessionIds,
          subscribe: (listener) => ctx.workspaces.list.subscribe(listener),
        };
        const currentSession = {
          getSnapshot: () => {
            const list = sessionList.getSnapshot();
            for (const id of list.ids) {
              const row = list.byId[id];
              if (row && (row.retainedBy.mainView ?? 0) > 0) return id;
            }
            return undefined;
          },
          subscribe: (listener) => sessionList.subscribe(listener),
        };

        const onArchive = async (id, options) => { await ctx.uiWorkspace.archiveSession(id, options); };
        const onUnarchive = async (id) => { await ctx.uiWorkspace.unarchiveSession(id); };
        const onOpen = (id) => { ctx.uiWorkspace.openSession(id); };

        const injectProps = () => ({
          t,
          hooks: { sessions: sessionList, archived: archivedSet, current: currentSession },
          useSessions: (selector) => useSnapshot(sessionList, selector),
          useArchived: (selector) => useSnapshot(archivedSet, selector),
          useCurrentSession: (selector) => useSnapshot(currentSession, selector),
          onArchive, onUnarchive, onOpen,
        });

        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 40,
          label: () => t('panel.short'),
        }, PanelIcon));

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          locale: NS,
          inject: injectProps,
        }, BatchArchivePanel));

        ctx.effect(() => () => { disposeStyles(); }, 'batch-archive: styles');
      },
    };

    function useSnapshot(source, selector) {
      const select = selector || ((s) => s);
      const [value, setValue] = useState(() => select(source.getSnapshot()));
      const selectRef = useRef(select);
      selectRef.current = select;
      useEffect(() => {
        const sync = () => setValue(selectRef.current(source.getSnapshot()));
        sync();
        return source.subscribe(sync);
      }, [source]);
      return value;
    }
  },
});
