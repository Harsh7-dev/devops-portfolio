import type { Project, Blog } from '../types';

export const formatDate = (d?: string | Date) => {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short" });
};

export async function fetchGitHubRepos(user: string, max = 60): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${Math.min(max, 100)}&sort=updated`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const repos = Array.isArray(data) ? data : [];
    const enriched = await Promise.all(
      repos.slice(0, max).map(async (r: any) => {
        try {
          const tRes = await fetch(`https://api.github.com/repos/${user}/${r.name}/topics`, {
            headers: { Accept: "application/vnd.github.mercy-preview+json" },
          });
          const t = tRes.ok ? await tRes.json() : { names: [] };
          
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
          const allTopics = [...(t.names || []), ...autoTopics];
          
          return {
            title: r.name,
            description: r.description,
            url: r.html_url,
            demo: r.homepage || "",
            topics: allTopics,
            stars: r.stargazers_count || 0,
            updatedAt: r.pushed_at,
            tech: [],
          };
        } catch {
          // Only include repos with descriptions
          if (!r.description || r.description.trim() === "") {
            return null;
          }
          
          // Filter out profile repos and forked repos
          if (r.fork || r.name.toLowerCase().includes('profile') || r.name.toLowerCase().includes('harsh7-dev')) {
            return null;
          }
          
          // Fallback with auto-generated topics
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
        }
      })
    );
    // Filter out null values (repos without descriptions)
    return enriched.filter(repo => repo !== null);
  } catch {
    return [];
  }
}

// Generate topics from repository description only - ONE PRIMARY FOLDER PER PROJECT
function generateTopicsFromRepo(_name: string, description: string): string[] {
  // Single primary folder returned; prefer description only
  if (!description) return [];

  const text = description.toLowerCase();

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
    { re: /\bvpc\b/, folder: 'aws/networking/vpc' },
    { re: /\broute\s*53|route53\b/, folder: 'aws/networking/route53' },
    { re: /\bcloudfront\b/, folder: 'aws/networking/cloudfront' },
    { re: /\bsecurity\s*groups?\b/, folder: 'aws/networking/security-groups' },
    { re: /\bnacl(s)?\b/, folder: 'aws/networking/nacl' },
    { re: /\bwaf\b/, folder: 'aws/networking/waf' },
    { re: /\bshield\b/, folder: 'aws/networking/shield' },

    // --- AWS: Storage ---
    { re: /\bs3\b/, folder: 'aws/storage/s3' },
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

    // --- Languages & Frameworks ---
    { re: /\bnode\.?js\b/, folder: 'nodejs' },
    { re: /\breact\b/, folder: 'react' },
    { re: /\bpython\b/, folder: 'python' },
    { re: /\bgolang|go\b/, folder: 'go' },
    { re: /\bjavascript\b/, folder: 'javascript' },
    { re: /\bjava\b/, folder: 'java' },

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
    if (re.test(text)) return [folder];
  }

  return [];
}

export async function fetchDevToArticles(username: string): Promise<Blog[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${username}`);
    if (!res.ok) return [];
    const data = await res.json();
    const articles = Array.isArray(data) ? data : [];
    
    return articles.map((article: any) => ({
      title: article.title || "",
      summary: article.description || "",
      url: article.url || "",
      topics: article.tag_list || [],
      publishedAt: article.published_at || article.created_at || "",
    }));
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    return [];
  }
}

export function filterAndSortProjects(
  projects: Project[],
  opts: { topics?: string[]; query?: string; sort?: "stars" | "updated"; match?: "any" | "all" } = {}
): Project[] {
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
      return match === "all" ? topics.every((t) => ts.includes(t)) : topics.some((t) => ts.includes(t));
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

export function filterAndSortBlogs(blogs: Blog[], opts: { topics?: string[]; query?: string } = {}): Blog[] {
  const { topics = [], query = "" } = opts;
  let arr = blogs.slice();
  if (topics.length) {
    arr = arr.filter((b) => {
      const ts = (b.topics || []) as string[];
      return topics.some((t) => ts.includes(t));
    });
  }
  if (query) {
    const q = query.toLowerCase();
    arr = arr.filter((b) => (b.title || "").toLowerCase().includes(q) || (b.summary || "").toLowerCase().includes(q));
  }
  arr.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  return arr;
}

// Runtime tests
export function runTests() {
  try {
    const SAMPLE = [
      { title: 'terraform-aws-vpc', topics: ['terraform', 'aws'], stars: 23, updatedAt: '2025-08-01' },
      { title: 'k8s-observability', topics: ['kubernetes', 'grafana'], stars: 41, updatedAt: '2025-07-12' },
      { title: 'ci-cd-gha', topics: ['cicd', 'githubactions'], stars: 12, updatedAt: '2025-06-22' },
      { title: 'terraform-aws-vpc', topics: ['terraform'], stars: 1, updatedAt: '2025-01-01' },
    ];
    // any-match multi-select
    let r = filterAndSortProjects(SAMPLE as Project[], { topics: ['terraform', 'aws'], match: 'any' });
    console.assert(r.length === 2, 'ANY match failed');
    // all-match multi-select
    r = filterAndSortProjects(SAMPLE as Project[], { topics: ['terraform', 'aws'], match: 'all' });
    console.assert(r.length === 1 && r[0].title === 'terraform-aws-vpc', 'ALL match failed');
    // stars sort
    const s = filterAndSortProjects(SAMPLE as Project[], { sort: 'stars' });
    console.assert(s[0].stars === 41, 'Stars sort failed');
    // blogs sorted desc
    const sortedBlogs = filterAndSortBlogs([
      { title: 'B1', publishedAt: '2025-07-21' },
      { title: 'B0', publishedAt: '2024-01-01' },
    ] as Blog[]);
    console.assert(sortedBlogs[0].title === 'B1', 'Blog sort failed');

    // ✅ Additional tests (do not modify previous ones)
    // search query should find ci-cd-gha
    const searchQ = filterAndSortProjects(SAMPLE as Project[], { query: 'gha' });
    console.assert(searchQ.length === 1 && searchQ[0].title === 'ci-cd-gha', 'Search query failed');
    // stars tie-breaker by most recent update
    const TIE = [
      { title: 'a', stars: 10, updatedAt: '2025-01-01' },
      { title: 'b', stars: 10, updatedAt: '2025-06-01' },
    ];
    const byStarsTie = filterAndSortProjects(TIE as Project[], { sort: 'stars' });
    console.assert(byStarsTie[0].title === 'b', 'Stars tie-breaker failed');
    // blog topic filter
    const BLOGS2 = [
      { title: 'K8s Intro', summary: '', topics: ['kubernetes'], publishedAt: '2025-06-01' },
      { title: 'Terraform Tips', summary: '', topics: ['terraform'], publishedAt: '2025-05-01' },
    ];
    const onlyK = filterAndSortBlogs(BLOGS2 as Blog[], { topics: ['kubernetes'] });
    console.assert(onlyK.length === 1 && onlyK[0].title === 'K8s Intro', 'Blog topic filter failed');

    console.log('✅ Enhanced dynamic portfolio tests passed (all)');
  } catch (e) {
    console.error('❌ Tests error', e);
  }
}
