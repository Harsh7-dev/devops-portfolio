import React, { useEffect, useMemo, useState, useRef } from "react";
import { Cloud, Code, BarChart3, Terminal, Database, Shield, GitBranch, Settings } from "lucide-react";
import AboutSection from './components/AboutSection';

// Removed unused useScrollAnimation hook

// ✅ Dynamic DevOps Portfolio (enhanced)
// - GitHub + optional /projects.json + /blogs.json (fallback inline)
// - Multi-select topics with AND/OR mode
// - Global command palette (⌘/Ctrl+P) and Blog-quick search (⌘/Ctrl+B)
// - Photo, GitHub, Email, LinkedIn, Resume links from CONFIG.ui
// - Runtime tests for filters/sorts

const CONFIG = {
  githubUser: "Harsh7-dev", // ← set this to your actual GitHub username
  projects: { mode: "auto", jsonUrl: "/projects.json", maxRepos: 60 }, // ← Now fetching from GitHub
  blogs: { mode: "devto", devtoUsername: "harshhp" }, // ← Now using Dev.to integration
  ui: {
    name: "Harsh Patel",
    role: "DevOps / Platform Engineer",
    avatar: "/harsh-photo.png", // ← Your photo is now added!
    location: "SF Bay Area, CA",
    email: "harshbpatel221000@gmail.com",
    github: "https://github.com/Harsh7-dev",
    linkedin: "https://www.linkedin.com/in/harshhk/",
    resumeUrl: "https://drive.google.com/file/d/1LZ7Ze55QwV9m0drK3s_tWJY2VJcqEq0H/view?usp=sharing", // ← Resume hosted on Google Drive
  },
};

// Enhanced Floating Particles Component with Cool Effects
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    
    // Create enhanced particles with different types
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.7 + 0.1
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw enhanced particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        
        // Dynamic colors based on position
        const colors = [
          'rgba(102, 126, 234, 0.8)',  // Blue
          'rgba(59, 130, 246, 0.6)',   // Light Blue
          'rgba(16, 185, 129, 0.5)',   // Green
          'rgba(245, 158, 11, 0.4)'    // Amber
        ];
        
        const colorIndex = Math.floor((particle.x / canvas.width) * colors.length);
        gradient.addColorStop(0, colors[colorIndex] || colors[0]);
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowColor = colors[colorIndex] || colors[0];
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.3})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
          50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8), 0 0 30px rgba(102, 126, 234, 0.6); }
        }
      `}</style>
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.6
      }}
    />
    </>
  );
};

const INLINE_BLOGS = [
  {
    title: "Kubernetes Services: ClusterIP vs NodePort vs LoadBalancer",
    summary: "Understand service types, when to use each, and gotchas.",
    url: "https://your-blog.example.com/k8s-services",
    topics: ["kubernetes", "networking"],
    publishedAt: "2025-06-10",
  },
];

const EXPERIENCE = [
  {
    company: "NBP Technology LLP",
    role: "Software Engineer",
    period: "Aug 2022 – Jul 2023",
    bullets: [
      "Transformed cloud economics by architecting cost-optimized Kubernetes infrastructure, delivering $8K annual savings through intelligent spot instance strategies and resource quota tuning",
      "Built enterprise-grade security architecture using Istio service mesh, implementing zero-trust networking with mTLS and fine-grained authorization policies across production workloads",
      "Revolutionized container security posture by migrating 40+ microservices to distroless Docker builds, achieving 95% reduction in Common Vulnerabilities and Exposures (CVEs)",
      "Engineered intelligent resource management system using CloudWatch analytics, optimizing EC2 instance sizing and achieving 40% improvement in infrastructure efficiency"
    ],
  },
  {
    company: "Crest Data",
    role: "Software Engineer",
    period: "Jun 2021 – Aug 2022",
    bullets: [
      "Pioneered GitOps transformation across engineering teams, accelerating deployment velocity by 65% through ArgoCD automation and enabling seamless rollback capabilities for 40+ services",
      "Architected comprehensive AWS infrastructure using Infrastructure as Code principles, deploying 50+ cloud resources with Terraform across multi-environment VPCs and load balancer configurations",
      "Designed and implemented observability platform with Prometheus and Grafana, reducing mean time to recovery (MTTR) by 35% through intelligent alerting and incident automation",
      "Established service level objective (SLO) framework with Datadog, improving system reliability metrics by 25% through proactive monitoring and burn rate analysis"
    ],
  },
  {
    company: "Crest Data",
    role: "Software Engineer Intern",
    period: "Jan 2021 – Jun 2021",
    bullets: [
      "Developed serverless automation solutions using Python and AWS Lambda, eliminating 15+ hours of manual operations work through intelligent resource tagging and anomaly detection systems",
      "Created infrastructure drift prevention mechanisms using Terraform state validation pipelines, ensuring deployment consistency and reducing configuration errors",
      "Built robust CI/CD validation framework with comprehensive Python testing, enhancing deployment reliability and reducing production incidents"
    ],
  },
];



const SKILLS = {
  "Cloud Platforms": { icon: Cloud, skills: ["AWS (EKS, Lambda, VPC, EC2, S3)", "Azure (AKS, VM Scale Sets, Blob Storage, VNet)"] },
  "Containerization": { icon: Code, skills: ["Docker", "Kubernetes", "Helm"] },
  "CI/CD": { icon: GitBranch, skills: ["GitHub Actions", "Jenkins", "ArgoCD"] },
  "Infrastructure as Code": { icon: Settings, skills: ["Terraform", "CloudFormation", "AWS SDK", "OpenTofu"] },
  "Observability": { icon: BarChart3, skills: ["Prometheus", "Grafana", "Datadog", "Alertmanager"] },
  "Security & Tools": { icon: Shield, skills: ["Istio", "mTLS", "IAM", "Vault", "Trivy", "Git/GitLab", "Postman"] },
  "Programming": { icon: Terminal, skills: ["Java", "Python", "Go", "Bash"] },
  "Web Development": { icon: Code, skills: ["HTML/CSS", "React", "TypeScript", "JavaScript"] },
  "Frameworks": { icon: Code, skills: ["Spring Boot", "FastAPI", "Django"] },
  "Databases": { icon: Database, skills: ["MySQL", "Redis", "MongoDB", "Elasticsearch"] }
};

// ---------- Utils ----------
const formatDate = (d?: string | Date) => {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short" });
};


const Chip: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void; topic?: string; topicIndex?: number; allTopics?: string[] }> = ({ children, active, onClick, topic, topicIndex, allTopics }) => {
  const colors = topic ? getTopicColor(topic, topicIndex, allTopics) : { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
  
  return (
  <button
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      borderRadius: 6,
      background: active ? colors.bg : '#f8fafc',
      color: active ? colors.text : '#475569',
      padding: "6px 12px",
      fontSize: 12,
      fontWeight: 500,
      marginRight: 6,
      marginTop: 6,
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
      border: `1px solid ${active ? colors.border : '#e2e8f0'}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: active ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none',
      transform: active ? 'translateY(-1px)' : 'translateY(0)',
    }}
  >
    {children}
  </button>
);
};

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; onMouseEnter?: (e: any) => void; onMouseLeave?: (e: any) => void }> = ({ children, style, onMouseEnter, onMouseLeave }) => (
  <div 
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ 
      border: "1px solid rgba(226, 232, 240, 0.8)", 
      borderRadius: 12, 
      background: "#ffffff", 
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", 
      padding: 24, 
      transition: "all 0.2s ease",
      ...style 
    }}
  >
    {children}
  </div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    {...props}
    style={{
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      background: "#ffffff",
      color: "#374151",
      padding: "10px 16px",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      ...style,
    }}
  >
    {children}
  </button>
);

// ---------- GitHub fetcher (best-effort; safe fallback) ----------
async function fetchGitHubRepos(user: string, max = 60, setApiError?: (error: string) => void): Promise<any[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${Math.min(max, 100)}&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DevOps-Portfolio'
        }
      }
    );
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      if (res.status === 403) {
        console.error('Rate limit exceeded. Please try again later.');
        if (setApiError) {
          setApiError('GitHub API Rate Limit Exceeded - Showing demo projects');
        }
        // Return fallback data when rate limited
        return [
          {
            title: 'food-waste-management',
            description: 'AWS Lambda',
            url: 'https://github.com/Harsh7-dev/food-waste-management',
            demo: '',
            topics: ['aws/compute/lambda'],
            stars: 0,
            updatedAt: new Date().toISOString(),
            tech: []
          },
          {
            title: 'terraform_autoscaling',
            description: 'Terraform',
            url: 'https://github.com/Harsh7-dev/terraform_autoscaling',
            demo: '',
            topics: ['terraform'],
            stars: 0,
            updatedAt: new Date().toISOString(),
            tech: []
          },
          {
            title: 'Terraform-S3-Cross-Account-Replication',
            description: 'Terraform',
            url: 'https://github.com/Harsh7-dev/Terraform-S3-Cross-Account-Replication',
            demo: '',
            topics: ['terraform'],
            stars: 0,
            updatedAt: new Date().toISOString(),
            tech: []
          }
        ];
      }
      return [];
    }
    const data = await res.json();
    const repos = Array.isArray(data) ? data : [];
    const enriched = await Promise.all(
      repos.slice(0, max).map(async (r: any) => {
        // Only include repos with descriptions
        if (!r.description || r.description.trim() === "") {
          return null;
        }
        
        // Filter out profile repos and forked repos
        if (r.fork || r.name.toLowerCase().includes('profile') || r.name.toLowerCase().includes('harsh7-dev')) {
          return null;
        }
        
        // Auto-generate topics from repo description
        const autoTopics = generateTopicsFromRepo(r.name, r.description);
          
          
          return {
            title: r.name,
            description: r.description,
            url: r.html_url,
            demo: r.homepage || "",
          topics: autoTopics,
            stars: r.stargazers_count || 0,
            updatedAt: r.pushed_at,
            tech: [],
          };
      })
    );
    // Filter out null values (repos without descriptions)
    return enriched.filter(repo => repo !== null);
  } catch (e) {
    console.error('GitHub API failed, using fallback data:', e);
    
    // Set error message for UI
    if (setApiError) {
      setApiError('GitHub API Rate Limit Exceeded - Showing demo projects');
    }
    
    // Fallback data when GitHub API fails
    return [
      {
        title: 'food-waste-management',
        description: 'AWS Lambda',
        url: 'https://github.com/Harsh7-dev/food-waste-management',
        demo: '',
        topics: ['aws/compute/lambda'],
        stars: 0,
        updatedAt: new Date().toISOString(),
        tech: []
      },
      {
        title: 'terraform_autoscaling',
        description: 'Terraform',
        url: 'https://github.com/Harsh7-dev/terraform_autoscaling',
        demo: '',
        topics: ['terraform'],
        stars: 0,
        updatedAt: new Date().toISOString(),
        tech: []
      },
      {
        title: 'Terraform-S3-Cross-Account-Replication',
        description: 'Terraform',
        url: 'https://github.com/Harsh7-dev/Terraform-S3-Cross-Account-Replication',
        demo: '',
        topics: ['terraform'],
        stars: 0,
        updatedAt: new Date().toISOString(),
        tech: []
      }
    ];
  }
}

// Generate topics from repository description or title - ONE PRIMARY FOLDER PER PROJECT
function generateTopicsFromRepo(name: string, description: string): string[] {
  // Use description if available, otherwise use name/title
  const text = (description || name || "").toLowerCase();
  if (!text) return [];

  // Check with word-boundaries (handles multi-word tokens too)
  const matchers: Array<{ re: RegExp; folder: string }> = [
    // --- AWS: Compute ---
    { re: /\blambda\b/, folder: 'aws/compute/lambda' },
    { re: /\bfargate\b/, folder: 'aws/compute/fargate' },
    { re: /\bek[s]?\b/, folder: 'aws/compute/eks' },
    { re: /\becs\b/, folder: 'aws/compute/ecs' },
    { re: /\belastic\s*beanstalk\b/, folder: 'aws/compute/elastic-beanstalk' },
    { re: /\bec2\b/, folder: 'aws/compute/ec2' },
    { re: /\bauto\s*scaling|autoscaling\b/, folder: 'aws/compute/autoscaling' },

    // --- AWS: Networking & Edge ---
    { re: /\balb\b/, folder: 'aws/networking/elb/alb' },
    { re: /\bnlb\b/, folder: 'aws/networking/elb/nlb' },
    { re: /\bclb\b/, folder: 'aws/networking/elb/clb' },
    { re: /\b(load\s*balancer|load\s*balancing)\b/, folder: 'aws/networking/elb' },
    { re: /vpc/i, folder: 'aws/networking/vpc' },
    { re: /\broute\s*53|route53\b/, folder: 'aws/networking/route53' },
    { re: /\bcloudfront\b/, folder: 'aws/networking/cloudfront' },
    { re: /\bsecurity\s*groups?\b/, folder: 'aws/networking/security-groups' },
    { re: /\bnacl(s)?\b/, folder: 'aws/networking/nacl' },
    { re: /\bwaf\b/, folder: 'aws/networking/waf' },
    { re: /\bshield\b/, folder: 'aws/networking/shield' },

    // --- AWS: Storage ---
    { re: /\bs3\b/i, folder: 'aws/storage/s3' },
    { re: /\bebs\b/, folder: 'aws/storage/ebs' },
    { re: /\befs\b/, folder: 'aws/storage/efs' },
    { re: /\bfsx\b/, folder: 'aws/storage/fsx' },
    { re: /\bglacier\b/, folder: 'aws/storage/glacier' },

    // --- AWS: Databases & Analytics ---
    { re: /\baurora\b/, folder: 'aws/database/aurora' },
    { re: /\brds\b/, folder: 'aws/database/rds' },
    { re: /\bdynamo(db)?\b/, folder: 'aws/database/dynamodb' },
    { re: /\belasti(c|)cache\b/, folder: 'aws/database/elasticache' },
    { re: /\bredshift\b/, folder: 'aws/database/redshift' },

    // --- AWS: Integration & Messaging ---
    { re: /\bevent\s*bridge|eventbridge\b/, folder: 'aws/integration/eventbridge' },
    { re: /\bsqs\b/, folder: 'aws/integration/sqs' },
    { re: /\bsns\b/, folder: 'aws/integration/sns' },
    { re: /\bkinesis\b/, folder: 'aws/integration/kinesis' },

    // --- AWS: Security & Identity ---
    { re: /\biam\b/, folder: 'aws/security-identity/iam' },

    // --- AWS: Observability & Audit ---
    { re: /\bcloudwatch\b/, folder: 'aws/observability/cloudwatch' },
    { re: /\bx-?ray\b/, folder: 'aws/observability/x-ray' },
    { re: /\bcloudtrail\b/, folder: 'aws/observability/cloudtrail' },

    // --- AWS: Management & Governance ---
    { re: /\bconfig\b/, folder: 'aws/management/config' },

    // --- Cloud Platforms (single-level) ---
    { re: /\bgoogle\s*cloud|gcp\b/, folder: 'gcp' },
    { re: /\bazure|microsoft\s*azure\b/, folder: 'azure' },

    // --- IaC (single-level) ---
    { re: /\bterraform\b/, folder: 'terraform' },
    { re: /\bansible\b/, folder: 'ansible' },
    { re: /\bpulumi\b/, folder: 'pulumi' },
    { re: /\bcloudformation\b/, folder: 'cloudformation' },

    // --- Containers & Orchestration (single-level) ---
    { re: /\bkubernetes|k8s\b/, folder: 'kubernetes' },
    { re: /\bdocker\b/, folder: 'docker' },
    { re: /\bhelm\b/, folder: 'helm' },
    { re: /\bistio\b/, folder: 'istio' },

    // --- CI/CD & Automation (single-level) ---
    { re: /\bgithub\s*actions?\b/, folder: 'github-actions' },
    { re: /\bgitlab\s*ci\b/, folder: 'gitlab-ci' },
    { re: /\bargo\s*cd|argocd\b/, folder: 'argocd' },
    { re: /\bjenkins\b/, folder: 'jenkins' },
    { re: /\bci\/?cd|continuous\s*integration|continuous\s*deployment\b/, folder: 'cicd' },

    // --- Observability (vendor tools) ---
    { re: /\bprometheus\b/, folder: 'prometheus' },
    { re: /\bgrafana\b/, folder: 'grafana' },
    { re: /\bdatadog\b/, folder: 'datadog' },
    { re: /\belk\s*stack\b/, folder: 'elk' },
    { re: /\bjaeger\b/, folder: 'jaeger' },

    // --- Security (tools) ---
    { re: /\bvault\b/, folder: 'vault' },
    { re: /\btrivy\b/, folder: 'trivy' },
    { re: /\brbac\b/, folder: 'rbac' },

    // --- Databases (non-AWS) ---
    { re: /\bpostgres(ql)?\b/, folder: 'postgresql' },
    { re: /\bmysql\b/, folder: 'mysql' },
    { re: /\bmongo(db)?\b/, folder: 'mongodb' },
    { re: /\bredis\b/, folder: 'redis' },

    // --- Languages & Frameworks (lower priority) ---
    { re: /\bnode\.?js\b/, folder: 'nodejs' },
    { re: /\bpython\b/, folder: 'python' },
    { re: /\bgolang|go\b/, folder: 'go' },
    { re: /\bjavascript\b/, folder: 'javascript' },
    { re: /\bjava\b/, folder: 'java' },
    { re: /\breact\b/, folder: 'react' },

    // --- DevOps Tools (misc) ---
    { re: /\bnginx\b/, folder: 'nginx' },
    { re: /\bapache\b/, folder: 'apache' },
    { re: /\bhaproxy\b/, folder: 'haproxy' },
    { re: /\bconsul\b/, folder: 'consul' },

    // --- Generic ops buckets ---
    { re: /\bcaching\b/, folder: 'caching' },
    { re: /\bdeployment\b/, folder: 'deployment' },
    { re: /\bconfiguration\b/, folder: 'configuration' },
    { re: /\bprovisioning\b/, folder: 'provisioning' },
    { re: /\borchestration\b/, folder: 'orchestration' },
  ];

  // First match wins (priority = array order)
  for (const { re, folder } of matchers) {
    if (re.test(text)) {
      return [folder];
    }
  }


  return [];
}

// Generate topics from blog title - ONE PRIMARY FOLDER PER BLOG
// Removed unused generateTopicsFromBlogTitle function
// ---------- Dev.to fetcher ----------
async function fetchDevToArticles(username: string): Promise<any[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${username}`);
    if (!res.ok) return [];
    const data = await res.json();
    const articles = Array.isArray(data) ? data : [];
    
    return articles.map((article: any) => {
      // Use only first two tags from tag_list
      let autoTopics: string[] = [];
      
      if (article.tag_list && article.tag_list.length >= 2) {
        // First tag should be 'aws', second tag is the service name
        const firstTag = article.tag_list[0].toLowerCase();
        const secondTag = article.tag_list[1].toLowerCase();
        
        if (firstTag === 'aws') {
          // Map service names to proper folder paths
          const serviceMap: Record<string, string> = {
            's3': 'aws/storage/s3',
            'vpc': 'aws/networking/vpc',
            'lambda': 'aws/compute/lambda',
            'ec2': 'aws/compute/ec2',
            'ecs': 'aws/compute/ecs',
            'eks': 'aws/compute/eks',
            'rds': 'aws/database/rds',
            'dynamodb': 'aws/database/dynamodb',
            'cloudwatch': 'aws/observability/cloudwatch',
            'iam': 'aws/security-identity/iam',
            'route53': 'aws/networking/route53',
            'cloudfront': 'aws/networking/cloudfront',
            'alb': 'aws/networking/elb/alb',
            'nlb': 'aws/networking/elb/nlb',
            'sqs': 'aws/integration/sqs',
            'sns': 'aws/integration/sns',
            'eventbridge': 'aws/integration/eventbridge',
            'kinesis': 'aws/integration/kinesis',
            'aurora': 'aws/database/aurora',
            'elasticache': 'aws/database/elasticache',
            'redshift': 'aws/database/redshift',
            'ebs': 'aws/storage/ebs',
            'efs': 'aws/storage/efs',
            'glacier': 'aws/storage/glacier',
            'x-ray': 'aws/observability/x-ray',
            'cloudtrail': 'aws/observability/cloudtrail',
            'config': 'aws/management/config',
            'transit-gateway': 'aws/networking/transit-gateway',
            'waf': 'aws/networking/waf',
            'shield': 'aws/networking/shield',
            'fargate': 'aws/compute/fargate',
            'elastic-beanstalk': 'aws/compute/elastic-beanstalk',
            'autoscaling': 'aws/compute/autoscaling',
            'fsx': 'aws/storage/fsx',
            'nacl': 'aws/networking/nacl',
            'security-groups': 'aws/networking/security-groups'
          };
          
          const servicePath = serviceMap[secondTag] || `aws/${secondTag}`;
          autoTopics = [servicePath]; // Only the specific service path, not the parent 'aws'
        }
      }
      
      return {
        title: article.title || "",
        summary: article.description || "",
        url: article.url || "",
        topics: autoTopics,
        publishedAt: article.published_at || article.created_at || "",
      };
    });
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    return [];
  }
}

// ---------- Pure helpers (testable) ----------
function filterAndSortProjects(
  projects: any[],
  opts: { topics?: string[]; query?: string; sort?: "stars" | "updated"; match?: "any" | "all" } = {}
) {
  const { topics = [], query = "", sort = "updated", match = "any" } = opts;
  const seen = new Set<string>();
  let arr = projects.filter((p) => {
    const k = (p.title || "").toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (topics.length) {
    arr = arr.filter((p) => {
      const ts = (p.topics || []) as string[];
      return match === "all" 
        ? topics.every((keyword) => ts.some((topic) => topic.split('/').pop() === keyword))
        : topics.some((keyword) => ts.some((topic) => topic.split('/').pop() === keyword));
    });
  }
  if (query) {
    const q = query.toLowerCase();
    arr = arr.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.tech || []).join(" ").toLowerCase().includes(q)
    );
  }
  arr.sort((a, b) =>
    sort === "stars"
      ? (b.stars || 0) - (a.stars || 0) ||
        new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
      : new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
  );
  return arr;
}

function filterAndSortBlogs(blogs: any[], opts: { topics?: string[]; query?: string } = {}) {
  const { topics = [], query = "" } = opts;
  let arr = blogs.slice();
  if (topics.length) {
    arr = arr.filter((b) => {
      const ts = (b.topics || []) as string[];
      return topics.some((keyword) => ts.some((topic) => topic.split('/').pop() === keyword));
    });
  }
  if (query) {
    const q = query.toLowerCase();
    arr = arr.filter((b) => (b.title || "").toLowerCase().includes(q) || (b.summary || "").toLowerCase().includes(q));
  }
  arr.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  return arr;
}

// ---------- Command Palette ----------
function useCommandPalette({
  setTab,
}: {
  setTab: (t: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState("");
  const [scope, setScope] = useState<'all' | 'blogs' | 'projects'>("all");

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

  const Palette = ({ projects, blogs }: { projects: any[]; blogs: any[] }) => {
    const proj = projects.filter((p) => (!local ? true : (p.title || '').toLowerCase().includes(local.toLowerCase())));
    const blg = blogs.filter((b) => (!local ? true : (b.title || '').toLowerCase().includes(local.toLowerCase())));
    const showProjects = scope !== 'blogs';
    const showBlogs = scope !== 'projects';
    if (!open) return null;
    return (
      <div
        style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.6)', 
          zIndex: 9999, 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'center',
          paddingTop: '10vh',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setOpen(false)}
      >
        <div
          style={{ 
            width: 'min(800px, 95vw)', 
            background: '#ffffff', 
            color: '#1e293b', 
            borderRadius: 12, 
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)', 
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ 
            padding: 20, 
            borderBottom: '1px solid #e2e8f0', 
            display: 'flex', 
            gap: 12, 
            alignItems: 'center',
            background: '#f8fafc'
          }}>
            {/* Magnifying glass icon */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 20,
              height: 20,
              color: '#6b7280'
            }}>
              🔍
            </div>
            
            <input
              autoFocus
              value={local}
              onChange={(e) => setLocal((e.target as HTMLInputElement).value)}
              placeholder={`Search ${scope === 'all' ? 'everything' : scope}…`}
              style={{ 
                flex: 1, 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #d1d5db', 
                background: '#ffffff',
                fontSize: 16,
                outline: 'none'
              }}
            />
            
            {/* Clear button */}
            {local && (
              <button
                onClick={() => setLocal('')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: 'none',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: 16
                }}
              >
                ✕
              </button>
            )}
            
            {/* Keyboard hint */}
            <div style={{ 
              fontSize: 12, 
              color: '#6b7280', 
              padding: '4px 8px',
              background: '#f3f4f6',
              borderRadius: 6,
              border: '1px solid #e2e8f0'
            }}>
              {navigator.platform.includes('Mac') ? '⌘+P' : 'Ctrl+P'}
            </div>
            
            <select 
              value={scope} 
              onChange={(e) => setScope(e.target.value as any)} 
              style={{ 
                padding: '10px 12px', 
                borderRadius: 8, 
                border: '1px solid #d1d5db', 
                background: '#ffffff',
                outline: 'none'
              }}
            >
              <option value="all">All</option>
              <option value="projects">Projects</option>
              <option value="blogs">Blogs</option>
            </select>
          </div>
          <div style={{ maxHeight: 380, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            {showProjects && (
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Projects</div>
                {proj.slice(0, 8).map((p: any) => (
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
                {blg.slice(0, 8).map((b: any) => (
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

// ---------- Color mapping for topics ----------
const colorPalette = [
  // Cloud Platforms
  { bg: 'rgba(255,153,0,0.1)', text: '#ff9900', border: 'rgba(255,153,0,0.3)', name: 'orange' },
  { bg: 'rgba(0,120,212,0.1)', text: '#0078d4', border: 'rgba(0,120,212,0.3)', name: 'blue' },
  { bg: 'rgba(66,133,244,0.1)', text: '#4285f4', border: 'rgba(66,133,244,0.3)', name: 'light-blue' },
  
  // Container & Orchestration
  { bg: 'rgba(0,123,255,0.1)', text: '#007bff', border: 'rgba(0,123,255,0.3)', name: 'primary-blue' },
  { bg: 'rgba(0,145,234,0.1)', text: '#0091ea', border: 'rgba(0,145,234,0.3)', name: 'cyan' },
  { bg: 'rgba(0,210,211,0.1)', text: '#00d2d3', border: 'rgba(0,210,211,0.3)', name: 'teal' },
  
  // Infrastructure as Code
  { bg: 'rgba(92,107,192,0.1)', text: '#5c6bc0', border: 'rgba(92,107,192,0.3)', name: 'indigo' },
  { bg: 'rgba(231,76,60,0.1)', text: '#e74c3c', border: 'rgba(231,76,60,0.3)', name: 'red' },
  { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)', name: 'blue' },
  
  // CI/CD
  { bg: 'rgba(0,0,0,0.1)', text: '#000000', border: 'rgba(0,0,0,0.3)', name: 'black' },
  { bg: 'rgba(208,2,27,0.1)', text: '#d0021b', border: 'rgba(208,2,27,0.3)', name: 'dark-red' },
  { bg: 'rgba(252,109,38,0.1)', text: '#fc6d26', border: 'rgba(252,109,38,0.3)', name: 'orange-red' },
  { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)', name: 'bright-red' },
  
  // Monitoring & Observability
  { bg: 'rgba(230,67,47,0.1)', text: '#e6432f', border: 'rgba(230,67,47,0.3)', name: 'coral' },
  { bg: 'rgba(244,96,54,0.1)', text: '#f46036', border: 'rgba(244,96,54,0.3)', name: 'burnt-orange' },
  { bg: 'rgba(98,54,255,0.1)', text: '#6236ff', border: 'rgba(98,54,255,0.3)', name: 'purple' },
  
  // Security
  { bg: 'rgba(16,185,129,0.1)', text: '#10b981', border: 'rgba(16,185,129,0.3)', name: 'emerald' },
  { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.3)', name: 'green' },
  
  // Languages
  { bg: 'rgba(54,119,186,0.1)', text: '#3677ba', border: 'rgba(54,119,186,0.3)', name: 'steel-blue' },
  { bg: 'rgba(0,173,216,0.1)', text: '#00add8', border: 'rgba(0,173,216,0.3)', name: 'sky-blue' },
  { bg: 'rgba(247,223,30,0.1)', text: '#f7df1e', border: 'rgba(247,223,30,0.3)', name: 'yellow' },
  { bg: 'rgba(251,138,40,0.1)', text: '#fb8a28', border: 'rgba(251,138,40,0.3)', name: 'amber' },
  
  // Fallback
  { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)', name: 'blue' },
];

// Function to assign colors ensuring no adjacent containers have the same color
const assignColorsToTopics = (topics: string[]): Record<string, { bg: string; text: string; border: string }> => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {};
  const usedColors = new Set<string>();
  
  topics.forEach((topic, index) => {
    // Find a color that's different from the previous topic's color
    let selectedColor = colorPalette[index % colorPalette.length];
    
    if (index > 0) {
      const previousTopic = topics[index - 1];
      const previousColor = colorMap[previousTopic];
      
      // If the default color would be the same as the previous one, find a different one
      if (previousColor && selectedColor.name === (previousColor as any).name) {
        // Find the first available color that's different
        selectedColor = colorPalette.find(color => 
          color.name !== (previousColor as any).name && !usedColors.has(color.name)
        ) || colorPalette[index % colorPalette.length];
      }
    }
    
    colorMap[topic] = {
      bg: selectedColor.bg,
      text: selectedColor.text,
      border: selectedColor.border
    };
    
    usedColors.add(selectedColor.name);
  });
  
  return colorMap;
};

const getTopicColor = (topic: string, topicIndex?: number, allTopics?: string[]): { bg: string; text: string; border: string } => {
  // If we have all topics and an index, use the smart color assignment
  if (allTopics && typeof topicIndex === 'number') {
    const colorMap = assignColorsToTopics(allTopics);
    return colorMap[topic] || colorPalette[0];
  }
  
  // Fallback to simple mapping
  const normalizedTopic = topic.toLowerCase().replace(/\s+/g, '-');
  const simpleMap: Record<string, { bg: string; text: string; border: string }> = {
    'aws': colorPalette[0],
    'azure': colorPalette[1],
    'gcp': colorPalette[2],
    'kubernetes': colorPalette[3],
    'docker': colorPalette[4],
    'helm': colorPalette[5],
    'terraform': colorPalette[6],
    'ansible': colorPalette[7],
    'pulumi': colorPalette[8],
    'github-actions': colorPalette[9],
    'jenkins': colorPalette[10],
    'gitlab': colorPalette[11],
    'argocd': colorPalette[12],
    'prometheus': colorPalette[13],
    'grafana': colorPalette[14],
    'datadog': colorPalette[15],
    'vault': colorPalette[16],
    'istio': colorPalette[17],
    'trivy': colorPalette[18],
    'python': colorPalette[19],
    'go': colorPalette[20],
    'javascript': colorPalette[21],
    'java': colorPalette[22],
  };
  
  return simpleMap[normalizedTopic] || colorPalette[colorPalette.length - 1];
};

// ---------- Tabs (UI) ----------
function Tabs({ tab, setTab }: { tab: 'projects' | 'blogs' | 'experience' | 'skills', setTab: (tab: 'projects' | 'blogs' | 'experience' | 'skills') => void }) {
  const [query, setQuery] = useState('');
  const [topicsSelected, setTopicsSelected] = useState<string[]>([]); // multi-select
  const [match, setMatch] = useState<'any' | 'all'>('any');
  const [sort, setSort] = useState<'stars' | 'updated'>('updated');
  // Removed unused collapsedGroups and hoveredProject state
  const [collapsedDirectories, setCollapsedDirectories] = useState<Record<string, boolean>>({
    // AWS Compute Services
    'aws': true,
    'aws/compute': true,
    'aws/compute/lambda': true,
    'aws/compute/fargate': true,
    'aws/compute/eks': true,
    'aws/compute/ecs': true,
    'aws/compute/elastic-beanstalk': true,
    'aws/compute/ec2': true,
    'aws/compute/autoscaling': true,
    
    // AWS Networking & Edge
    'aws/networking': true,
    'aws/networking/elb': true,
    'aws/networking/elb/alb': true,
    'aws/networking/elb/nlb': true,
    'aws/networking/elb/clb': true,
    'aws/networking/vpc': true,
    'aws/networking/route53': true,
    'aws/networking/cloudfront': true,
    'aws/networking/security-groups': true,
    'aws/networking/nacl': true,
    'aws/networking/waf': true,
    'aws/networking/shield': true,
    
    // AWS Storage Services
    'aws/storage': true,
    'aws/storage/s3': true,
    'aws/storage/ebs': true,
    'aws/storage/efs': true,
    'aws/storage/fsx': true,
    'aws/storage/glacier': true,
    
    // AWS Database Services
    'aws/database': true,
    'aws/database/aurora': true,
    'aws/database/rds': true,
    'aws/database/dynamodb': true,
    'aws/database/elasticache': true,
    'aws/database/redshift': true,
    
    // AWS Integration & Messaging
    'aws/integration': true,
    'aws/integration/eventbridge': true,
    'aws/integration/sqs': true,
    'aws/integration/sns': true,
    'aws/integration/kinesis': true,
    
    // AWS Security & Identity
    'aws/security-identity': true,
    'aws/security-identity/iam': true,
    
    // AWS Observability & Audit
    'aws/observability': true,
    'aws/observability/cloudwatch': true,
    'aws/observability/x-ray': true,
    'aws/observability/cloudtrail': true,
    
    // AWS Management & Governance
    'aws/management': true,
    'aws/management/config': true,
    
    // Other Technologies - Single folders
    'gcp': true,
    'azure': true,
    'kubernetes': true,
    'terraform': true,
    'ansible': true,
    'pulumi': true,
    'cloudformation': true,
    'docker': true,
    'helm': true,
    'istio': true,
    'github-actions': true,
    'gitlab-ci': true,
    'argocd': true,
    'jenkins': true,
    'cicd': true,
    'prometheus': true,
    'grafana': true,
    'datadog': true,
    'elk': true,
    'jaeger': true,
    'vault': true,
    'trivy': true,
    'rbac': true,
    'postgresql': true,
    'mysql': true,
    'mongodb': true,
    'redis': true,
    'nodejs': true,
    'react': true,
    'python': true,
    'go': true,
    'javascript': true,
    'java': true,
    'nginx': true,
    'apache': true,
    'haproxy': true,
    'consul': true,
    'caching': true,
    'deployment': true,
    'configuration': true,
    'provisioning': true,
    'orchestration': true,
    'other': true
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string>('');

  // Generate dynamic folder structure based on project topics
  const generateFolderStructure = (projects: any[]) => {
    const folders = new Set<string>();
    
    // Add all possible AWS folders to ensure they appear
    const awsFolders = [
      'aws',
      'aws/compute',
      'aws/compute/lambda',
      'aws/compute/ec2',
      'aws/compute/ecs',
      'aws/compute/eks',
      'aws/compute/fargate',
      'aws/storage',
      'aws/storage/s3',
      'aws/storage/ebs',
      'aws/storage/efs',
      'aws/database',
      'aws/database/rds',
      'aws/database/dynamodb',
      'aws/networking',
      'aws/networking/vpc',
      'aws/networking/route53',
      'aws/networking/cloudfront',
      'aws/observability',
      'aws/observability/cloudwatch',
      'aws/security-identity',
      'aws/security-identity/iam',
      'aws/integration',
      'aws/integration/sqs',
      'aws/integration/sns',
    ];
    
    // Always add AWS folders
    awsFolders.forEach(folder => folders.add(folder));
    
    // Add folders from actual projects
    projects.forEach(project => {
      (project.topics || []).forEach((topic: string) => {
        if (topic.includes('/')) {
          // Nested topic like aws/compute/lambda
          folders.add(topic);
          
          // Add all parent folders in the hierarchy
          const parts = topic.split('/');
          for (let i = 1; i < parts.length; i++) {
            const parentPath = parts.slice(0, i).join('/');
            folders.add(parentPath);
          }
        } else {
          // Simple topic like kubernetes, terraform
          folders.add(topic);
        }
      });
    });
    
    return Array.from(folders).sort();
  };

  const dynamicFolders = useMemo(() => {
    // Generate folders from both projects and blogs
    const projectFolders = generateFolderStructure(projects);
    const blogFolders = generateFolderStructure(blogs);
    
    // Combine and deduplicate
    const allFolders = new Set([...projectFolders, ...blogFolders]);
    const folders = Array.from(allFolders).sort();
    
    return folders;
  }, [projects, blogs]);

  // Initialize collapsedDirectories state with all generated folders
  useEffect(() => {
    const initialCollapsed: Record<string, boolean> = {};
    dynamicFolders.forEach(folder => {
      initialCollapsed[folder] = true; // Start with all folders collapsed
    });
    setCollapsedDirectories(prev => ({ ...prev, ...initialCollapsed }));
  }, [dynamicFolders]);

  // load data
  useEffect(() => {
    (async () => {
      const list: any[] = [];
      
      if (CONFIG.projects.mode !== "json") { 
        const gh = await fetchGitHubRepos(CONFIG.githubUser, CONFIG.projects.maxRepos, setApiError); 
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
        if (CONFIG.blogs.mode === 'json' && (CONFIG.blogs as any).jsonUrl) {
          const r = await fetch((CONFIG.blogs as any).jsonUrl);
          if (r.ok) { const d = await r.json(); setBlogs(Array.isArray(d) ? d : []); return; }
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
    projects.forEach((p) => (p.topics || []).forEach((t: string) => {
      // Extract the last part of the path for filtering (e.g., "aws/compute/lambda" -> "lambda")
      const keyword = t.split('/').pop() || t;
      s.add(keyword);
    }));
    blogs.forEach((b) => (b.topics || []).forEach((t: string) => {
      // Extract the last part of the path for filtering (e.g., "aws/compute/lambda" -> "lambda")
      const keyword = t.split('/').pop() || t;
      s.add(keyword);
    }));
    return Array.from(s).sort();
  }, [projects, blogs]);

  // Removed unused topicGroups functionality

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
  
  // Removed unused toggleGroup function
  
  // toggle directory collapse
  const toggleDirectory = (dirName: string) => {
    setCollapsedDirectories(prev => ({
      ...prev,
      [dirName]: !prev[dirName]
    }));
  };

  return (
    <div>
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Controls */}
      <Card style={{ 
        marginBottom: 32,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", width: "100%", minWidth: "300px" }}>
            <input 
              value={query} 
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)} 
              placeholder="Search projects & blogs (⌘/Ctrl+P)" 
              style={{ 
                padding: "12px 16px", 
                borderRadius: 8, 
                border: "1px solid #d1d5db", 
                background: "#ffffff",
                width: "100%", 
                minWidth: "300px", 
                maxWidth: "400px", 
                fontSize: 14,
                outline: "none",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
              }} 
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Chip active={topicsSelected.length === 0} onClick={clearTopics}>all</Chip>
              {allTopics.map((t, index) => (
                <Chip key={t} active={topicsSelected.includes(t)} onClick={() => toggleTopic(t)} topic={t} topicIndex={index} allTopics={allTopics}>{t}</Chip>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Match</span>
              <div 
                onClick={() => setMatch(match === 'any' ? 'all' : 'any')}
                style={{
                  width: 80,
                  height: 32,
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                {/* Sliding background */}
                <div style={{
                  position: 'absolute',
                  top: 2,
                  left: match === 'any' ? 2 : 42,
                  width: 36,
                  height: 28,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.2) 100%)',
                  borderRadius: 14,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.2)'
                }} />
                
                {/* Labels */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  padding: '0 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  color: match === 'any' ? '#3b82f6' : '#9ca3af'
                }}>
                  <span style={{ 
                    color: match === 'any' ? '#3b82f6' : '#9ca3af',
                    transition: 'color 0.3s ease'
                  }}>
                    ANY
                  </span>
                  <span style={{ 
                    color: match === 'all' ? '#3b82f6' : '#9ca3af',
                    transition: 'color 0.3s ease'
                  }}>
                    ALL
                  </span>
                </div>
            </div>
          </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Sort by</span>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value as 'stars' | 'updated')}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #d1d5db',
                background: '#ffffff',
                outline: 'none',
                fontSize: 14,
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              <option value="updated">🕒 Last Updated</option>
              <option value="stars">⭐ Stars</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Active Filters Bar */}
      {(topicsSelected.length > 0 || query) && (
        <Card style={{ 
          marginBottom: 16,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(29,78,216,0.1) 100%)',
          border: '1px solid rgba(59,130,246,0.3)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Active Filters:</span>
            
            {query && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 8px',
                borderRadius: 6,
                background: 'rgba(59,130,246,0.2)',
                border: '1px solid rgba(59,130,246,0.4)',
                fontSize: 12,
                color: '#374151'
              }}>
                <span>🔍 "{query}"</span>
                <button
                  onClick={() => setQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: 12,
                    padding: 0,
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            
            {topicsSelected.map((topic) => (
              <div key={topic} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 8px',
                borderRadius: 6,
                background: 'rgba(59,130,246,0.2)',
                border: '1px solid rgba(59,130,246,0.4)',
                fontSize: 12,
                color: '#374151'
              }}>
                <span>{topic}</span>
                <button
                  onClick={() => toggleTopic(topic)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: 12,
                    padding: 0,
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            
            <button
              onClick={clearTopics}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid rgba(107,114,128,0.3)',
                background: 'rgba(107,114,128,0.1)',
                color: '#6b7280',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Clear All
            </button>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        {(['projects', 'blogs', 'experience', 'skills'] as const).map((k) => {
          const getCount = () => {
            switch (k) {
              case 'projects': return filteredProjects.length;
              case 'blogs': return filteredBlogs.length;
              case 'experience': return 3; // Static count for experience items
              case 'skills': return 6; // Static count for skills
              default: return 0;
            }
          };
          
          return (
            <Button 
              key={k} 
              onClick={() => {
                setTab(k);
                // Scroll to the appropriate section based on tab
                const sectionId = k === 'projects' ? 'projects' : 
                                 k === 'blogs' ? 'blogs' : 
                                 k === 'experience' ? 'experience' : 
                                 k === 'skills' ? 'skills' : 'projects';
                const section = document.getElementById(sectionId);
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              onMouseEnter={(e) => {
                if (tab !== k) {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (tab !== k) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                }
              }}
              style={{ 
                background: tab === k 
                  ? '#3b82f6' 
                  : '#ffffff', 
                color: tab === k ? '#ffffff' : '#6b7280', 
                border: tab === k 
                  ? '1px solid #3b82f6' 
                  : '1px solid #e5e7eb',
                boxShadow: tab === k 
                  ? '0 4px 6px -1px rgba(59, 130, 246, 0.3)' 
                  : '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease',
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 8,
                position: 'relative',
                overflow: 'hidden',
                transform: tab === k ? 'translateY(-1px)' : 'translateY(0)',
                textTransform: 'capitalize',
                cursor: 'pointer',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {tab === k && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                  pointerEvents: 'none'
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {k} ({getCount()})
              </span>
            </Button>
          );
        })}
      </div>

      {tab === 'projects' && (
        <div>
          {filteredProjects.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 20,
              border: '1px solid rgba(236,72,153,0.2)',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚫</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                {apiError || 'Nothing here…'}
              </div>
              {apiError && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Debug: {apiError}</div>}
              <div style={{ fontSize: 14, color: '#6b7280' }}>
                {apiError ? 'Demo projects are shown below' : 'Maybe try another filter? Or check out my other tabs!'}
              </div>
            </div>
          ) : (
            <Card style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,30,30,0.9) 100%)',
              color: '#e5e7eb',
              border: '1px solid rgba(236,72,153,0.3)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }}>
              {/* Directory Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                marginBottom: 16, 
                paddingBottom: 12, 
                borderBottom: '1px solid rgba(236,72,153,0.3)' 
              }}>
                <span style={{ color: '#ec4899' }}>📁</span>
                <span style={{ color: '#10b981' }}>~/projects</span>
                <span style={{ color: '#6b7280' }}>•</span>
                <span style={{ color: '#6b7280', fontSize: 12 }}>{filteredProjects.length} projects</span>
              </div>
              
              {/* Directory Structure */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Dynamic Folder Structure with Proper Nesting */}
                {(() => {
                  // Group folders by their hierarchy level
                  const folderHierarchy: Record<string, string[]> = {};
                  const rootFolders: string[] = [];
                  
                  dynamicFolders.forEach(folder => {
                    if (folder.includes('/')) {
                      const parts = folder.split('/');
                      const parent = parts.slice(0, -1).join('/');
                      if (!folderHierarchy[parent]) {
                        folderHierarchy[parent] = [];
                      }
                      folderHierarchy[parent].push(folder);
                    } else {
                      rootFolders.push(folder);
                    }
                  });
                  
                  const renderFolder = (folder: string, level: number = 0) => {
                    const isNested = folder.includes('/');
                    const parentFolder = isNested ? folder.split('/')[0] : folder;
                    const folderColor = getTopicColor(parentFolder);
                    
                    // Get projects for this specific folder from filtered projects
                    let folderProjects = filteredProjects.filter(p => 
                      (p.topics || []).some((t: string) => t === folder)
                    );
                    
                    // For parent folders, also count projects from child folders
                    if (folderProjects.length === 0) {
                      folderProjects = filteredProjects.filter(p => 
                        (p.topics || []).some((t: string) => t.startsWith(folder + '/'))
                      );
                    }
                    
                    
                    // Show folder if it has projects OR if it's a parent folder with children that have projects
                    const hasChildren = folderHierarchy[folder] && folderHierarchy[folder].length > 0;
                    
                    // Check if any child folders have projects
                    const hasChildrenWithProjects = hasChildren && folderHierarchy[folder].some(childFolder => {
                      const childProjects = filteredProjects.filter(p => 
                        (p.topics || []).some((t: string) => t === childFolder || t.startsWith(childFolder + '/'))
                      );
                      return childProjects.length > 0;
                    });
                    
                    if (folderProjects.length === 0 && !hasChildrenWithProjects) return null;
                    
                    const folderName = folder.split('/').pop() || folder;
                    const marginLeft = level * 20;
                    
                    return (
                      <div key={folder} style={{ marginLeft }}>
                        <div 
                          onClick={() => toggleDirectory(folder)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        padding: '6px 12px',
                            background: `${folderColor.bg}20`,
                            border: `1px solid ${folderColor.border}`,
                        borderRadius: 6,
                        marginBottom: 4,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${folderColor.bg}40`;
                      }}
                      onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${folderColor.bg}20`;
                      }}
                    >
                      <span style={{ 
                            color: folderColor.text,
                            transform: collapsedDirectories[folder] ? 'rotate(-90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        fontSize: 12
                      }}>
                        ▶
                      </span>
                          <span style={{ color: folderColor.text }}>📁</span>
                          <span style={{ color: folderColor.text, fontWeight: 500 }}>
                            {folderName}/{!collapsedDirectories[folder] ? ' *' : ''}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: 11 }}>
                            {folderProjects.length} projects
                      </span>
                    </div>
                        {!collapsedDirectories[folder] && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Render child folders first */}
                            {folderHierarchy[folder]?.map(childFolder => 
                              renderFolder(childFolder, level + 1)
                            )}
                            
                            {/* Then render projects - only show projects that match this exact folder */}
                            {folderProjects.filter(p => 
                              (p.topics || []).some((t: string) => t === folder)
                            ).map((p) => (
                              <div 
                                key={p.title}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                                  padding: '8px 12px',
                                  borderRadius: 8,
                                  background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${folderColor.bg}10 100%)`,
                                  border: `1px solid ${folderColor.border}`,
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  marginLeft: 20
                      }}
                      onMouseEnter={(e) => {
                                  e.currentTarget.style.background = `linear-gradient(135deg, ${folderColor.bg}20 0%, ${folderColor.bg}30 100%)`;
                                  e.currentTarget.style.borderColor = folderColor.border;
                                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                  e.currentTarget.style.boxShadow = `0 8px 25px ${folderColor.bg}30, 0 4px 12px rgba(0,0,0,0.15)`;
                      }}
                      onMouseLeave={(e) => {
                                  e.currentTarget.style.background = `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${folderColor.bg}10 100%)`;
                                  e.currentTarget.style.borderColor = folderColor.border;
                                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onClick={() => window.open(p.url, '_blank')}
                    >
                      <span style={{ 
                                  color: folderColor.text, 
                                  fontSize: 14
                                }}>📄</span>
                                <span style={{ 
                                  color: '#e5e7eb', 
                                  fontSize: 12,
                                  fontWeight: 500,
                                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                                }}>{p.title}</span>
                                <span style={{ 
                                  color: '#6b7280', 
                                  fontSize: 10,
                                  background: 'rgba(255,255,255,0.1)',
                                  padding: '2px 6px',
                                  borderRadius: 4
                                }}>{formatDate(p.updatedAt)}</span>
                                <span style={{ 
                                  color: '#fbbf24', 
                                  fontSize: 10,
                                  background: 'rgba(251,191,36,0.1)',
                                  padding: '2px 6px',
                              borderRadius: 4,
                        display: 'flex', 
                        alignItems: 'center', 
                                  gap: 2
                                }}>
                                  ✨ {p.stars || 0}
                      </span>
                                <span style={{ 
                                  color: '#10b981', 
                                  fontSize: 12,
                                  transition: 'transform 0.2s ease'
                                }}>🚀</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                    );
                  };
                  
                  return rootFolders.map(folder => renderFolder(folder));
                })()}

                {/* Removed hardcoded folders - now using dynamic system */}
              </div>
              
              {/* Projects Footer */}
              <div style={{ 
                marginTop: 16, 
                paddingTop: 12, 
                borderTop: '1px solid rgba(236,72,153,0.3)',
                fontSize: 11,
                color: '#6b7280',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Total: {filteredProjects.length} projects</span>
                <span>Click any project to view ↗</span>
              </div>
            </Card>
          )}
        </div>
      )}

      {tab === 'blogs' && (
        <div id="blogs">
          {filteredBlogs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 20,
              border: '1px solid rgba(236,72,153,0.2)',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📝</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                No blog posts found
              </div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>
                Try adjusting your filters or check back later for new content!
              </div>
            </div>
          ) : (
            <Card style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,30,30,0.9) 100%)',
              color: '#e5e7eb',
              border: '1px solid rgba(236,72,153,0.3)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }}>
              {/* Directory Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                marginBottom: 16, 
                paddingBottom: 12, 
                borderBottom: '1px solid rgba(236,72,153,0.3)' 
              }}>
                <span style={{ color: '#ec4899' }}>📁</span>
                <span style={{ color: '#10b981' }}>~/blog</span>
                <span style={{ color: '#6b7280' }}>•</span>
                <span style={{ color: '#6b7280', fontSize: 12 }}>{filteredBlogs.length} articles</span>
              </div>
              
              {/* Directory Structure */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Dynamic Folder Structure (same as projects) */}
                {(() => {
                  const folderHierarchy: Record<string, string[]> = {};
                  const rootFolders: string[] = [];
                  
                  // Get all unique folders from blogs
                  const blogFolders = new Set<string>();
                  filteredBlogs.forEach(blog => {
                    (blog.topics || []).forEach((topic: string) => {
                      if (topic.includes('/')) {
                        // Nested topic like aws/compute/lambda
                        blogFolders.add(topic);
                        
                        // Add all parent folders in the hierarchy
                        const parts = topic.split('/');
                        for (let i = 1; i < parts.length; i++) {
                          const parentPath = parts.slice(0, i).join('/');
                          blogFolders.add(parentPath);
                        }
                      } else {
                        // Simple topic like kubernetes, terraform
                        blogFolders.add(topic);
                      }
                    });
                  });
                  
                  // Organize folders by hierarchy
                  Array.from(blogFolders).forEach(folder => {
                    if (folder.includes('/')) {
                      const parts = folder.split('/');
                      const parent = parts.slice(0, -1).join('/');
                      if (!folderHierarchy[parent]) {
                        folderHierarchy[parent] = [];
                      }
                      folderHierarchy[parent].push(folder);
                    } else {
                      rootFolders.push(folder);
                    }
                  });
                  
                  const renderBlogFolder = (folder: string, level: number = 0) => {
                    const isNested = folder.includes('/');
                    const parentFolder = isNested ? folder.split('/')[0] : folder;
                    const folderColor = getTopicColor(parentFolder);
                    
                    // Get blogs for this specific folder
                    let folderBlogs = filteredBlogs.filter(b => 
                      (b.topics || []).some((t: string) => t === folder)
                    );
                    
                    // For parent folders, also count blogs from child folders
                    if (folderBlogs.length === 0) {
                      folderBlogs = filteredBlogs.filter(b => 
                        (b.topics || []).some((t: string) => t.startsWith(folder + '/'))
                      );
                    }
                    
                    
                    
                    
                    // Show folder if it has blogs OR if it's a parent folder with children
                    const hasChildren = folderHierarchy[folder] && folderHierarchy[folder].length > 0;
                    if (folderBlogs.length === 0 && !hasChildren) return null;
                    
                    const folderName = folder.split('/').pop() || folder;
                    const marginLeft = level * 20;
                    
                    return (
                      <div key={folder} style={{ marginLeft }}>
                        <div 
                          onClick={() => toggleDirectory(folder)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        padding: '6px 12px',
                            borderRadius: 8,
                        cursor: 'pointer',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.2s ease',
                            marginBottom: 4
                      }}
                      onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                      onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <span style={{ 
                            color: folderColor.text,
                            transform: collapsedDirectories[folder] ? 'rotate(-90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        fontSize: 12
                      }}>
                        ▶
                      </span>
                          <span style={{ color: folderColor.text }}>📁</span>
                          <span style={{ color: folderColor.text, fontWeight: 500 }}>
                            {folderName}/{!collapsedDirectories[folder] ? ' *' : ''}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: 11 }}>
                            {folderBlogs.length} articles
                          </span>
                        </div>
                        {!collapsedDirectories[folder] && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Render child folders first */}
                            {folderHierarchy[folder]?.map(childFolder => 
                              renderBlogFolder(childFolder, level + 1)
                            )}
                            
                            {/* Then render blogs - only show blogs that match this exact folder */}
                            {folderBlogs.filter(b => 
                              (b.topics || []).some((t: string) => t === folder)
                            ).map((b) => (
                              <div 
                                key={b.title}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 8,
                                  padding: '4px 12px',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  background: 'rgba(255,255,255,0.03)',
                                  border: '1px solid rgba(255,255,255,0.05)',
                                  transition: 'all 0.2s ease',
                                  marginLeft: 20
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                }}
                                onClick={() => window.open(b.url, '_blank')}
                              >
                                <span style={{ color: folderColor.text, fontSize: 14 }}>📄</span>
                                <span style={{ color: '#e5e7eb', fontSize: 12, fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{b.title}</span>
                                <span style={{ color: '#6b7280', fontSize: 10, background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, marginLeft: 'auto' }}>
                                  {b.summary?.substring(0, 50)}...
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  };
                  
                  return rootFolders.map(folder => renderBlogFolder(folder));
                })()}
                
              </div>
              
              {/* Blog Summary */}
              <div style={{ 
                marginTop: 20, 
                padding: '12px 16px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: 8, 
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <span>Total: {filteredBlogs.length} articles</span>
                <span>Click any article to read ↗</span>
              </div>
            </Card>
          )}
        </div>
      )}

      {tab === 'experience' && (
        <div id="experience" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px,1fr))', gap: 24, padding: '0' }}>
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

      {tab === 'skills' && (
        <div id="skills" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 12 }}>
          {Object.entries(SKILLS).map(([category, data], i) => {
            const IconComponent = data.icon;
            return (
              <Card key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, marginBottom: 12 }}>
                  <IconComponent size={20} color="#3b82f6" />
                  <span>{category}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {data.skills.map((skill, j) => (
                    <span key={j} style={{
                      padding: '4px 8px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 500
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Command Palette overlay */}
      <Palette projects={projects} blogs={blogs} />
    </div>
  );
}

export default function DevOpsPortfolioDynamic() {
  // Tab state for navigation
  const [tab, setTab] = useState<'projects' | 'blogs' | 'experience' | 'skills'>("projects");
  
  // Add CSS animations and smooth scrolling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(1deg); }
        50% { transform: translateY(-10px) rotate(0deg); }
        75% { transform: translateY(-5px) rotate(-1deg); }
      }
      .resume-preview {
        opacity: 0;
        visibility: hidden;
        transform: translateX(-50%) translateY(10px);
        transition: all 0.3s ease;
      }
      .resume-preview:hover {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0px);
      }
      .resume-button:hover + .resume-preview {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0px);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Enhanced Professional Navigation Header */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        zIndex: 9999,
        padding: '20px 0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '0 32px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* Logo/Brand */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer'
          }}>
            <div style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: '#111827',
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              harsh.cloudnative
            </div>
          </div>
          
          {/* Navigation Links */}
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(20px, 4vw, 40px)', 
            alignItems: 'center', 
            flexWrap: 'wrap' 
          }}>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none', 
                fontSize: 15, 
                fontWeight: 500, 
                transition: 'all 0.3s ease',
                padding: '8px 16px',
                borderRadius: 8,
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                setTab('projects');
                // Scroll to the tabs section
                const tabsSection = document.getElementById('projects');
                if (tabsSection) {
                  tabsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none', 
                fontSize: 15, 
                fontWeight: 500, 
                transition: 'all 0.3s ease', 
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: 8,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              onClick={(e) => {
                e.preventDefault();
                setTab('experience');
                // Scroll to the tabs section
                const tabsSection = document.getElementById('projects');
                if (tabsSection) {
                  tabsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none', 
                fontSize: 15, 
                fontWeight: 500, 
                transition: 'all 0.3s ease', 
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: 8,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Experience
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        color: '#1a1a1a', 
        fontFamily: 'ui-sans-serif,system-ui',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 0 24px' }}>
          <AboutSection />

          <div 
            id="projects" 
            style={{ 
              marginTop: 80,
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.6s ease'
            }}
          >
            <Tabs tab={tab} setTab={setTab} />
          </div>

          {/* Scroll to Top Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: 60, 
            marginBottom: 20 
          }}>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#ffffff',
                color: '#6b7280',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.color = '#111827';
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6"/>
              </svg>
              Back to Top
            </button>
          </div>

          <footer style={{ 
            marginTop: 80, 
            padding: '32px 0', 
            fontSize: 14, 
            color: '#374151', 
            textAlign: 'center', 
            borderTop: '1px solid #d1d5db'
          }}>
            <div style={{ 
              maxWidth: 600, 
              margin: '0 auto', 
              padding: '0 24px',
              fontWeight: 500,
              letterSpacing: '0.025em'
            }}>
              © {new Date().getFullYear()} {CONFIG.ui.name}. Built with modern web technologies for reliability and performance.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// ---------- Runtime tests ----------
(function runTests() {
  try {
    const SAMPLE = [
      { title: 'terraform-aws-vpc', topics: ['terraform', 'aws'], stars: 23, updatedAt: '2025-08-01' },
      { title: 'k8s-observability', topics: ['kubernetes', 'grafana'], stars: 41, updatedAt: '2025-07-12' },
      { title: 'ci-cd-gha', topics: ['cicd', 'githubactions'], stars: 12, updatedAt: '2025-06-22' },
      { title: 'terraform-aws-vpc', topics: ['terraform'], stars: 1, updatedAt: '2025-01-01' },
    ];
    // any-match multi-select
    let r = filterAndSortProjects(SAMPLE as any[], { topics: ['terraform', 'aws'], match: 'any' });
    console.assert(r.length === 2, 'ANY match failed');
    // all-match multi-select
    r = filterAndSortProjects(SAMPLE as any[], { topics: ['terraform', 'aws'], match: 'all' });
    console.assert(r.length === 1 && r[0].title === 'terraform-aws-vpc', 'ALL match failed');
    // stars sort
    const s = filterAndSortProjects(SAMPLE as any[], { sort: 'stars' });
    console.assert(s[0].stars === 41, 'Stars sort failed');
    // blogs sorted desc
    const sortedBlogs = filterAndSortBlogs([
      { title: 'B1', publishedAt: '2025-07-21' },
      { title: 'B0', publishedAt: '2024-01-01' },
    ] as any[]);
    console.assert(sortedBlogs[0].title === 'B1', 'Blog sort failed');

    // ✅ Additional tests (do not modify previous ones)
    // search query should find ci-cd-gha
    const searchQ = filterAndSortProjects(SAMPLE as any[], { query: 'gha' });
    console.assert(searchQ.length === 1 && searchQ[0].title === 'ci-cd-gha', 'Search query failed');
    // stars tie-breaker by most recent update
    const TIE = [
      { title: 'a', stars: 10, updatedAt: '2025-01-01' },
      { title: 'b', stars: 10, updatedAt: '2025-06-01' },
    ];
    const byStarsTie = filterAndSortProjects(TIE as any[], { sort: 'stars' });
    console.assert(byStarsTie[0].title === 'b', 'Stars tie-breaker failed');
    // blog topic filter
    const BLOGS2 = [
      { title: 'K8s Intro', summary: '', topics: ['kubernetes'], publishedAt: '2025-06-01' },
      { title: 'Terraform Tips', summary: '', topics: ['terraform'], publishedAt: '2025-05-01' },
    ];
    const onlyK = filterAndSortBlogs(BLOGS2 as any[], { topics: ['kubernetes'] });
    console.assert(onlyK.length === 1 && onlyK[0].title === 'K8s Intro', 'Blog topic filter failed');

    console.log('✅ Enhanced dynamic portfolio tests passed (all)');
  } catch (e) {
    console.error('❌ Tests error', e);
  }
})();


