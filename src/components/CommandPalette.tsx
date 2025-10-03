import { useEffect, useState } from 'react';
import type { Project, Blog, ScopeType } from '../types';

// Removed unused interface

export function useCommandPalette({
  setTab,
}: {
  setTab: (t: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState("");
  const [scope, setScope] = useState<ScopeType>("all");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === 'p') {
        e.preventDefault();
        setScope('all');
        setOpen(true);
        setLocal("");
      }
      if ((e.metaKey || e.ctrlKey) && key === 'b') {
        e.preventDefault();
        setScope('blogs');
        setOpen(true);
        setLocal("");
        setTab('blogs');
      }
      if (key === 'escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey as any);
    return () => window.removeEventListener('keydown', onKey as any);
  }, [setTab]);

  const Palette = ({ projects, blogs }: { projects: Project[]; blogs: Blog[] }) => {
    const proj = projects.filter((p) => (!local ? true : (p.title || '').toLowerCase().includes(local.toLowerCase())));
    const blg = blogs.filter((b) => (!local ? true : (b.title || '').toLowerCase().includes(local.toLowerCase())));
    const showProjects = scope !== 'blogs';
    const showBlogs = scope !== 'projects';
    if (!open) return null;
    return (
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'grid', placeItems: 'start center', paddingTop: 80 }}
        onClick={() => setOpen(false)}
      >
        <div
          style={{ width: 'min(720px,90vw)', background: '#fff', color: '#0f172a', borderRadius: 16, boxShadow: '0 12px 40px rgba(0,0,0,0.25)', overflow: 'hidden' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: 12, borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              autoFocus
              value={local}
              onChange={(e) => setLocal((e.target as HTMLInputElement).value)}
              placeholder={`Search ${scope === 'all' ? 'everything' : scope}… (Esc to close)`}
              style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb' }}
            />
            <select value={scope} onChange={(e) => setScope(e.target.value as any)} style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid #e5e7eb' }}>
              <option value="all">All</option>
              <option value="projects">Projects</option>
              <option value="blogs">Blogs</option>
            </select>
          </div>
          <div style={{ maxHeight: 380, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            {showProjects && (
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Projects</div>
                {proj.slice(0, 8).map((p: Project) => (
                  <div key={p.url} style={{ padding: '8px 6px', borderRadius: 10, cursor: 'pointer' }} onClick={() => { window.open(p.url, '_blank'); setOpen(false); }}>
                    <strong>{p.title}</strong> · <span style={{ opacity: 0.8 }}>{(p.topics || []).slice(0, 4).join(', ')}</span>
                  </div>
                ))}
                {proj.length === 0 && <div style={{ opacity: 0.6 }}>No results</div>}
              </div>
            )}
            {showBlogs && (
              <div style={{ padding: 12, borderTop: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Blogs</div>
                {blg.slice(0, 8).map((b: Blog) => (
                  <div key={b.url} style={{ padding: '8px 6px', borderRadius: 10, cursor: 'pointer' }} onClick={() => { window.open(b.url, '_blank'); setOpen(false); }}>
                    <strong>{b.title}</strong> · <span style={{ opacity: 0.8 }}>{(b.topics || []).slice(0, 4).join(', ')}</span>
                  </div>
                ))}
                {blg.length === 0 && <div style={{ opacity: 0.6 }}>No results</div>}
              </div>
            )}
          </div>
          <div style={{ padding: 10, borderTop: '1px solid #e5e7eb', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>Tips: ⌘/Ctrl+P to open • ⌘/Ctrl+B for Blogs • Enter on an item opens in new tab</span>
            <button onClick={() => setOpen(false)} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  return { Palette };
}
