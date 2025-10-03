import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, FileDown, DollarSign, GitBranch, Lock, Activity, Server, GraduationCap, Award, Trophy, Shield, Download } from "lucide-react";
import { CERTS, EDUCATION } from '../constants';

// CONFIG for contact links
const CONFIG = {
  ui: {
    name: "Harsh Patel",
    email: "harshbpatel221000@gmail.com",
    github: "https://github.com/Harsh7-dev",
    linkedin: "https://www.linkedin.com/in/harshhk/",
    resumeUrl: "https://drive.google.com/file/d/1LZ7Ze55QwV9m0drK3s_tWJY2VJcqEq0H/view?usp=sharing",
  },
};

// Achievements + Skills
const achievements = [
  { icon: DollarSign, text: "Reduced AWS costs by $8K with spot instances & quotas on 30-node EKS" },
  { icon: GitBranch, text: "Increased deployment frequency by 65% via GitOps with ArgoCD for 40+ microservices" },
  { icon: Shield, text: "Eliminated 95% of container vulnerabilities using Docker distroless builds" },
  { icon: Lock, text: "Strengthened cluster security with Istio: mTLS, AuthorizationPolicies & VirtualServices" },
  { icon: Server, text: "Designed production-grade AWS infrastructure with Terraform: provisioned 50+ resources across environments with isolated VPCs, ALBs, and auto-scaling groups for improved scalability" },
  { icon: Activity, text: "Reduced MTTR by 35% with Grafana/Prometheus custom alert rules and Alertmanager integrations for cluster monitoring" },
];

// Removed unused skills array

// Enhanced Live Terminal Component with Cool Effects
const LiveTerminal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [glowEffect, setGlowEffect] = useState(false);

  const terminalLines = [
    "$ kubectl apply reliability && terraform apply speed",
    "",
    "$ make deploy # fast, repeatable, uneventful",
    "",
    "> git push && CI: green && prod: steady",
    "",
    "# infra-as-code, outcomes-as-default",
    "",
    "$ ship --safe --fast --daily"
  ];

  useEffect(() => {
    if (isTyping && currentLine < terminalLines.length) {
      const currentLineText = terminalLines[currentLine];
      
      if (currentChar < currentLineText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => {
            const lines = prev.split('\n');
            const newLineText = currentLineText.substring(0, currentChar + 1);
            lines[currentLine] = newLineText;
            return lines.join('\n');
          });
          setCurrentChar(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        // Move to next line after a short delay
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
          setDisplayedText(prev => prev + "\n");
        }, 200);
      }
    } else if (isTyping && currentLine >= terminalLines.length) {
      // Finished typing, wait 2 seconds then restart
      setTimeout(() => {
        setCurrentLine(0);
        setCurrentChar(0);
        setDisplayedText("");
        setIsTyping(true);
      }, 2000);
    }
  }, [displayedText, currentLine, currentChar, terminalLines, isTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(cursorTimer);
  }, []);

  const getLineColor = (lineIndex: number) => {
    const line = terminalLines[lineIndex];
    if (line.startsWith("$")) return "#10b981"; // Bright green for commands
    if (line.startsWith(">")) return "#60a5fa"; // Light blue for git commands
    if (line.startsWith("#")) return "#94a3b8"; // Light gray for comments
    return "#64748b"; // Medium gray for empty lines
  };

  const getLineStyle = (lineIndex: number) => {
    const line = terminalLines[lineIndex];
    if (line.startsWith("$")) return { fontWeight: 600, textShadow: "0 0 8px rgba(16, 185, 129, 0.3)" };
    if (line.startsWith(">")) return { fontWeight: 600, textShadow: "0 0 8px rgba(59, 130, 246, 0.3)" };
    if (line.startsWith("#")) return { fontStyle: "italic", opacity: 0.8 };
    return {};
  };

  return (
    <div style={{ 
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "#e2e8f0",
      padding: "20px 24px",
      borderRadius: "12px",
      marginBottom: 24,
      fontSize: 14,
      lineHeight: 1.6,
      border: "1px solid rgba(102, 126, 234, 0.2)",
      boxShadow: glowEffect 
        ? "0 0 30px rgba(102, 126, 234, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)" 
        : "0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
      minHeight: "160px",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    onMouseEnter={() => setGlowEffect(true)}
    onMouseLeave={() => setGlowEffect(false)}>
      <div style={{ textAlign: "left" }}>
        {terminalLines.slice(0, currentLine + 1).map((line, index) => (
          <div key={index} style={{ 
            color: getLineColor(index),
            marginBottom: 6,
            textAlign: "left",
            ...getLineStyle(index)
          }}>
            {index === currentLine ? (
              <>
                {line.substring(0, currentChar)}
                {showCursor && <span style={{ 
                  color: "#10b981",
                  background: "#10b981",
                  animation: "blink 1s infinite",
                  textShadow: "0 0 12px rgba(16, 185, 129, 0.8)",
                  borderRadius: "2px",
                  fontWeight: "bold"
                }}>█</span>}
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

// Removed unused TerminalBlock component


export default function AboutSection() {
  return (
    <div id="about" style={{ position: "relative", width: "100%" }}>
      {/* Hero Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          {/* Left: Profile Card */}
          <div style={{ 
            borderRadius: 12, 
            background: "#ffffff", 
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", 
            padding: 24,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            cursor: "default"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
          }}>
            {/* Subtle background pattern */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0)
              `,
              backgroundSize: "20px 20px",
              pointerEvents: "none",
              zIndex: 0
            }} />
            
            {/* Content with higher z-index */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Profile Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <div style={{ textAlign: "center" }}>
              <img
                alt="Harsh Patel"
                src="/harsh-photo.png"
                    style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", marginBottom: 8 }}
                  />
                  <div style={{ fontSize: 14, color: "#6b7280", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span>📍</span>
                      <span>San Francisco Bay Area, CA</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>
                      +1-341-800-3353
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", height: "120px", paddingLeft: 2, paddingRight: 2 }}>
                  <h2 style={{ 
                    fontSize: 20, 
                    fontWeight: 700, 
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: "0 0 6px 0", 
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px"
                  }}>Harsh Patel</h2>
                  <div style={{ 
                    fontSize: 16, 
                    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 600, 
                    lineHeight: 1.3 
                  }}>Software Engineer | Cloud Native Solutions</div>
                </div>
              </div>
              {/* Quote */}
              <LiveTerminal />
              
              {/* Education Section */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <GraduationCap size={16} color="#3b82f6" />
                  Education
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.4 }}>
                  {EDUCATION.map((edu, index) => (
                    <div key={index} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                        <strong style={{ color: "#111827", fontSize: 14 }}>{edu.program}</strong>
                        <span style={{ color: "#059669", fontWeight: 500, fontSize: 12 }}>{edu.period}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <span style={{ color: "#6b7280" }}>{edu.school}</span>
                      </div>
                      {edu.coursework && (
                        <div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginRight: 4 }}>Relevant Coursework:</span>
                            {edu.coursework.map((course, j) => (
                              <span key={j} style={{
                                padding: '2px 6px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                borderRadius: 8,
                                fontSize: 10,
                                fontWeight: 500
                              }}>
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <Award size={16} color="#f59e0b" />
                  Certifications
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.4 }}>
                  {CERTS.map((cert, index) => (
                    <div key={index} style={{ marginBottom: 12 }}>
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                          textDecoration: "none", 
                          color: "inherit",
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center", 
                          marginBottom: 2,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          border: "1px solid transparent"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#3b82f6";
                          e.currentTarget.style.backgroundColor = "#f8fafc";
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "inherit";
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                          <strong style={{ color: "#111827", fontSize: 14 }}>{cert.name}</strong>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: "#059669", fontWeight: 500, fontSize: 12 }}>{cert.issued}</span>
                          <Download size={14} color="#059669" style={{ opacity: 0.8 }} />
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>


            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "flex-start" }}>
              <a href={CONFIG.ui.github} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "10px 18px", borderRadius: 8, border: "1px solid #e2e8f0", textDecoration: "none", color: "#374151", background: "#ffffff", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", transition: "all 0.2s ease", fontSize: 14, fontWeight: 500 }}>
                <Github size={16} style={{ marginRight: 8, color: "#059669" }} /> GitHub
              </a>
              <a href={CONFIG.ui.linkedin} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "10px 18px", borderRadius: 8, border: "1px solid #e2e8f0", textDecoration: "none", color: "#374151", background: "#ffffff", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", transition: "all 0.2s ease", fontSize: 14, fontWeight: 500 }}>
                <Linkedin size={16} style={{ marginRight: 8, color: "#059669" }} /> LinkedIn
              </a>
              <a href={`mailto:${CONFIG.ui.email}`} style={{ display: "inline-flex", alignItems: "center", padding: "10px 18px", borderRadius: 8, border: "1px solid #e2e8f0", textDecoration: "none", color: "#374151", background: "#ffffff", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", transition: "all 0.2s ease", fontSize: 14, fontWeight: 500 }}>
                <Mail size={16} style={{ marginRight: 8, color: "#059669" }} /> Email
              </a>
              <a href={CONFIG.ui.resumeUrl} target="_blank" rel="noreferrer" style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                padding: "10px 18px", 
                borderRadius: 8, 
                textDecoration: "none", 
                color: "#ffffff", 
                background: "#3b82f6",
                border: "1px solid #3b82f6",
                fontWeight: 500,
                fontSize: 14,
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease"
              }}>
                <FileDown size={16} style={{ marginRight: 8, color: "#ffffff" }} /> View Resume
              </a>
            </div>
            </div>
          </div>

          {/* Right: Headline and Achievements */}
          <div>
            <h1 style={{ 
              fontSize: "clamp(32px, 5vw, 48px)", 
              fontWeight: 700, 
              lineHeight: 1.1, 
              color: "#111827", 
              marginBottom: 24,
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              animation: "float 6s ease-in-out infinite"
            }}>
              I design and build {" "}
              <span style={{ 
                background: "linear-gradient(to right, #3b82f6, #1d4ed8)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent", 
                backgroundClip: "text"
              }}>
                cloud‑native
              </span>{" "}
              platforms with Kubernetes, AWS, and automation at the core.
            </h1>

            {/* Key Achievements Section */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111827", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Trophy size={20} color="#f59e0b" />
                Key Achievements
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "flex-start" }}>
                {achievements.map(({ icon: Icon, text }, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 8, 
                      borderRadius: 12, 
                      padding: "12px 20px", 
                      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", 
                      border: "1px solid #e2e8f0", 
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "default",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)";
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 12px 28px rgba(59, 130, 246, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.borderColor = "#3b82f6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <Icon 
                      size={i === 4 ? 40 : i === 5 ? 30 : 20} 
                      color="#059669"
                      style={{
                        filter: "drop-shadow(0 2px 4px rgba(5, 150, 105, 0.3))",
                        animation: "pulse 3s ease-in-out infinite"
                      }}
                    />
                    <span style={{ 
                      fontSize: 14, 
                      color: "#374151", 
                      fontWeight: 500,
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                    }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}