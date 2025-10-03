import type { AppConfig, Blog, Experience, Certification, Education } from '../types';

export const CONFIG: AppConfig = {
  githubUser: "Harsh7-dev", // ← set this to your actual GitHub username
  projects: { mode: "auto", jsonUrl: "/projects.json", maxRepos: 60 }, // ← Now fetching from GitHub
  blogs: { mode: "devto", devtoUsername: "harshhp" }, // ← Now using Dev.to integration
  ui: {
    name: "Harsh Patel",
    role: "DevOps / Platform Engineer",
    avatar: "/harsh-photo.png", // ← Your photo is now added!
    location: "SF Bay Area, CA",
    email: "harsh.patel.devops@gmail.com",
    github: "https://github.com/Harsh7-dev",
    linkedin: "https://www.linkedin.com/in/harshpatel-devops/",
    resumeUrl: "/harsh-resume.pdf", // ← Add your resume to public/ folder as harsh-resume.pdf
  },
};

export const INLINE_BLOGS: Blog[] = [
  {
    title: "Kubernetes Services: ClusterIP vs NodePort vs LoadBalancer",
    summary: "Deep dive into Kubernetes service types, when to use each, and common networking gotchas in production environments.",
    url: "https://medium.com/@harshpatel/k8s-services-complete-guide",
    topics: ["kubernetes", "networking", "containers"],
    publishedAt: "2025-01-15",
  },
  {
    title: "Terraform Best Practices for Multi-Environment Deployments",
    summary: "Learn how to structure Terraform modules, manage state files, and implement proper CI/CD workflows across dev, staging, and production.",
    url: "https://medium.com/@harshpatel/terraform-best-practices",
    topics: ["terraform", "iac", "cicd", "aws"],
    publishedAt: "2025-01-10",
  },
  {
    title: "Building Resilient CI/CD Pipelines with GitHub Actions",
    summary: "Comprehensive guide to creating robust, scalable CI/CD pipelines with proper error handling, security, and performance optimization.",
    url: "https://medium.com/@harshpatel/github-actions-cicd-guide",
    topics: ["cicd", "github-actions", "automation", "devops"],
    publishedAt: "2025-01-05",
  },
  {
    title: "AWS EKS Cluster Security: A Complete Implementation Guide",
    summary: "Step-by-step guide to securing your EKS clusters with IAM roles, network policies, pod security standards, and monitoring.",
    url: "https://medium.com/@harshpatel/eks-security-guide",
    topics: ["aws", "eks", "kubernetes", "security"],
    publishedAt: "2024-12-28",
  },
  {
    title: "Prometheus and Grafana: Building Production-Ready Monitoring",
    summary: "Set up comprehensive monitoring with Prometheus metrics collection, Grafana dashboards, and alerting for your infrastructure.",
    url: "https://medium.com/@harshpatel/prometheus-grafana-setup",
    topics: ["monitoring", "prometheus", "grafana", "observability"],
    publishedAt: "2024-12-20",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "NBP Technology LLP",
    role: "DevOps Engineer / Platform Developer",
    period: "Jun 2022 – Aug 2023",
    bullets: [
      "Led migration of monolithic Java applications to microservices architecture using Docker and Kubernetes",
      "Implemented comprehensive CI/CD pipelines with Jenkins and GitLab CI, reducing deployment time by 60%",
      "Designed and deployed monitoring solutions using Prometheus, Grafana, and ELK stack for 10+ services",
      "Automated infrastructure provisioning using Terraform, managing AWS resources for development and production environments",
      "Built scalable backend services with Redis caching, improving p95 latency by 30% and system reliability",
      "Collaborated with development teams to implement GitOps workflows and container best practices"
    ],
  },
  {
    company: "Crest Data Systems",
    role: "Software Engineer → DevOps Engineer",
    period: "2021 – 2022",
    bullets: [
      "Developed high-volume search systems using Elasticsearch with custom sharding strategies for 1M+ documents",
      "Implemented CI/CD pipelines using Jenkins, reducing manual deployment errors by 80%",
      "Containerized legacy applications using Docker and orchestrated with Docker Compose and Kubernetes",
      "Automated infrastructure provisioning using Ansible playbooks for development environments",
      "Built monitoring dashboards using Grafana and Prometheus for application performance tracking",
      "Implemented log aggregation and analysis using ELK stack for troubleshooting and performance optimization"
    ],
  },
];

export const CERTS: Certification[] = [
  { name: "CKAD – Certified Kubernetes Application Developer", issued: "Sep 2025 - Sep 2027", link: "https://drive.google.com/file/d/145tksDpdZzOOYG3-07PcX7xY7pdlOavW/view?usp=sharing" },
  { name: "Terraform Associate (002)", issued: "Oct 2025 - Oct 2027", link: "https://drive.google.com/file/d/YOUR_TERRAFORM_CERT_ID/view?usp=sharing" },
];

export const EDUCATION: Education[] = [
  { school: "California State University, East Bay", program: "MS, Computer Science", period: "2023 – 2025" },
  { school: "Gujarat Technological University", program: "B.E. Computer Engineering", period: "2018 – 2022" },
];

export const SKILLS = {
  "Cloud Platforms": ["AWS (EKS, Lambda, VPC, EC2, S3)", "Azure (AKS, VM Scale Sets, Blob Storage, VNet)"],
  "Containerization": ["Docker", "Kubernetes", "Helm"],
  "CI/CD": ["GitHub Actions", "Jenkins", "ArgoCD"],
  "Infrastructure as Code": ["Terraform", "CloudFormation", "AWS SDK", "OpenTofu"],
  "Observability": ["Prometheus", "Grafana", "Datadog", "Alertmanager"],
  "Security & Tools": ["Istio", "mTLS", "IAM", "Vault", "Trivy", "Git/GitLab", "Postman"],
  "Programming": ["Java", "Python", "Go", "Bash"],
  "Web Development": ["HTML/CSS", "React", "TypeScript", "JavaScript"],
  "Frameworks": ["Spring Boot", "FastAPI", "Django"],
  "Databases": ["MySQL", "Redis", "MongoDB", "Elasticsearch"]
};