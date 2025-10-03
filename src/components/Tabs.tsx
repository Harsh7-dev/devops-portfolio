import { useEffect, useMemo, useState } from 'react';
import type { Project, Blog, TabType, SortType, MatchType } from '../types';
import { CONFIG, INLINE_BLOGS, EXPERIENCE, CERTS, EDUCATION, SKILLS } from '../constants';
import { fetchGitHubRepos, fetchDevToArticles, filterAndSortProjects, filterAndSortBlogs, formatDate } from '../utils';
import { Card, Button, Chip } from './ui';
import { useCommandPalette } from './CommandPalette';

export function Tabs() {
  const [tab, setTab] = useState<TabType>("projects");
  const [query, setQuery] = useState('');
  const [topicsSelected, setTopicsSelected] = useState<string[]>([]);
  const [match, setMatch] = useState<MatchType>('any');
  const [sort, setSort] = useState<SortType>('updated');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // load data
  useEffect(() => {
    (async () => {
      const list: Project[] = [];
      if (CONFIG.projects.mode !== "json") { 
        const gh = await fetchGitHubRepos(CONFIG.githubUser, CONFIG.projects.maxRepos); 
        list.push(...gh); 
      }
      if (CONFIG.projects.mode !== "auto") {
        try {
          const jr = await fetch(CONFIG.projects.jsonUrl);
          if (jr.ok) { 
            const d = await jr.json(); 
            if (Array.isArray(d)) list.push(...d); 
          }
        } catch {}
      }
      setProjects(list);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (CONFIG.blogs.mode === 'json' && CONFIG.blogs.jsonUrl) {
          const r = await fetch(CONFIG.blogs.jsonUrl);
          if (r.ok) { 
            const d = await r.json(); 
            setBlogs(Array.isArray(d) ? d : []); 
            return; 
          }
        } else if (CONFIG.blogs.mode === 'devto' && CONFIG.blogs.devtoUsername) {
          const devtoBlogs = await fetchDevToArticles(CONFIG.blogs.devtoUsername);
          if (devtoBlogs.length > 0) {
            setBlogs(devtoBlogs);
            return;
          }
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
      setBlogs(INLINE_BLOGS);
    })();
  }, []);

  const allTopics = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => (p.topics || []).forEach((t: string) => s.add(t)));
    blogs.forEach((b) => (b.topics || []).forEach((t: string) => s.add(t)));
    return Array.from(s).sort();
  }, [projects, blogs]);

  // keyboard palette
  const { Palette } = useCommandPalette({ setTab });

  const filteredProjects = useMemo(
    () => filterAndSortProjects(projects, { topics: topicsSelected, query, sort, match }),
    [projects, topicsSelected, query, sort, match]
  );
  const filteredBlogs = useMemo(
    () => filterAndSortBlogs(blogs, { topics: topicsSelected, query }),
    [blogs, topicsSelected, query]
  );

  // toggle topic
  const toggleTopic = (t: string) => setTopicsSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const clearTopics = () => setTopicsSelected([]);

  return (
    <div>
      {/* Controls */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", width: "100%", minWidth: "300px" }}>
            <input 
              value={query} 
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)} 
              placeholder="Search projects & blogs (⌘/Ctrl+P)" 
              style={{ padding: "8px 12px", borderRadius: 12, border: "1px solid #e5e7eb", width: "100%", minWidth: "250px", maxWidth: "400px" }} 
            />

            <div>
              <Chip active={topicsSelected.length === 0} onClick={clearTopics}>all</Chip>
              {allTopics.map((t) => (
                <Chip key={t} active={topicsSelected.includes(t)} onClick={() => toggleTopic(t)}>{t}</Chip>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, opacity: 0.7 }}>Match</span>
              <Button onClick={() => setMatch('any')} style={{ background: match === 'any' ? '#111827' : '#fff', color: match === 'any' ? '#fff' : '#111', borderColor: '#e5e7eb' }}>ANY</Button>
              <Button onClick={() => setMatch('all')} style={{ background: match === 'all' ? '#111827' : '#fff', color: match === 'all' ? '#fff' : '#111', borderColor: '#e5e7eb' }}>ALL</Button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: "8px" }}>
            <span style={{ fontSize: 12, opacity: 0.7 }}>Sort by</span>
            <Button onClick={() => setSort('updated')} style={{ background: sort === 'updated' ? '#111827' : '#fff', color: sort === 'updated' ? '#fff' : '#111', borderColor: '#e5e7eb' }}>Updated</Button>
            <Button onClick={() => setSort('stars')} style={{ background: sort === 'stars' ? '#111827' : '#fff', color: sort === 'stars' ? '#fff' : '#111', borderColor: '#e5e7eb' }}>Stars</Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        {(['projects', 'blogs', 'experience', 'certs', 'education', 'skills'] as const).map((k) => (
          <Button key={k} onClick={() => setTab(k)} style={{ background: tab === k ? '#111827' : '#fff', color: tab === k ? '#fff' : '#111', borderColor: '#e5e7eb' }}>{k}</Button>
        ))}
      </div>

      {tab === 'projects' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 16, padding: '0 4px' }}>
          {filteredProjects.map((p) => (
            <Card key={p.title}>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Updated {formatDate(p.updatedAt)}</div>
              <div>{p.description}</div>
              <div>{(p.topics || []).slice(0, 6).map((t: string) => (<Chip key={t}>{t.toUpperCase()}</Chip>))}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.8 }}>
                <span>⭐ {p.stars || 0}</span>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer">Repo ↗</a>
            </Card>
          ))}
        </div>
      )}

      {tab === 'blogs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
          {filteredBlogs.map((b) => (
            <Card key={b.title}>
              <div style={{ fontWeight: 600 }}>{b.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Published {formatDate(b.publishedAt)}</div>
              <div>{b.summary}</div>
              <div>{(b.topics || []).slice(0, 6).map((t: string) => (<Chip key={t}>{t.toUpperCase()}</Chip>))}</div>
              <a href={b.url} target="_blank" rel="noreferrer">Read ↗</a>
            </Card>
          ))}
        </div>
      )}

      {tab === 'experience' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 16, padding: '0 4px' }}>
          {EXPERIENCE.map((e, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600 }}>{e.role} · {e.company}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{e.period}</div>
              </div>
              <ul>
                {e.bullets.map((b, j) => (<li key={j}>{b}</li>))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {tab === 'certs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 12 }}>
          {CERTS.map((c, i) => (
            <Card key={i}>
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Issued: {c.issued}</div>
              <a href={c.link}>Verify ↗</a>
            </Card>
          ))}
        </div>
      )}

      {tab === 'education' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 12 }}>
          {EDUCATION.map((e, i) => (
            <Card key={i}>
              <div style={{ fontWeight: 600 }}>{e.school}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{e.program} · {e.period}</div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'skills' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 12 }}>
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <Card key={i}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{category}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Command Palette overlay */}
      <Palette projects={projects} blogs={blogs} />
    </div>
  );
}
