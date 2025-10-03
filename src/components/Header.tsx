// React import removed as it's not used
import { CONFIG } from '../constants';
import { Avatar, Card, Chip } from './ui';

export function Header() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f8fafc 0%,#ffffff 60%)', color: '#0f172a', padding: 16, fontFamily: 'ui-sans-serif,system-ui' }}>
      <div style={{ display: 'none' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar initials="HP" />
            <div>
              <div style={{ fontWeight: 700 }}>{CONFIG.ui.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{CONFIG.ui.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={CONFIG.ui.github} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>GitHub</a>
            <a href={CONFIG.ui.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>LinkedIn</a>
            <a href={`mailto:${CONFIG.ui.email}`} style={{ fontSize: 13 }}>Email</a>
            <a href={CONFIG.ui.resumeUrl} target="_blank" rel="noreferrer" style={{ fontSize: 13, textDecoration: 'underline' }}>Resume</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          <div>
            <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: 0 }}>
              Building <span style={{ background: 'linear-gradient(90deg,#818cf8,#34d399)', WebkitBackgroundClip: 'text', color: 'transparent' }}>cloud-native</span> platforms with <span style={{ background: 'linear-gradient(90deg,#34d399,#818cf8)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Kubernetes</span>, AWS, and automation.
            </h1>
            <p style={{ marginTop: 10, maxWidth: 700, opacity: 0.85 }}>I build reliable, scalable cloud platforms using Kubernetes, AWS, and Terraform. I love clean CI/CD and great DX.</p>
            <div style={{ marginTop: 12 }}>{['Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Jenkins', 'Prometheus', 'FastAPI', 'Java'].map((t) => <Chip key={t}>{t}</Chip>)}</div>
          </div>
          <div>
            <Card>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>About</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Hi, I'm {CONFIG.ui.name} — a {CONFIG.ui.role} based in {CONFIG.ui.location}. I love turning infra-as-code, CI/CD, and observability into delightful developer experiences.</div>
              <ul style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
                <li>✔ 2+ years professional experience</li>
                <li>✔ Open to Platform/DevOps/SRE roles</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
