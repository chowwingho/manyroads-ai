// Leading Intelligence — Report Parser — v1.0
// Pure functions for parsing assessment markdown output into structured data.
// No server calls, no side effects.

import jsYaml from "js-yaml";

// =============================================================================
// STATIC DATA CONSTANTS
// =============================================================================

export const QUESTIONS = [
  { id: "q1_standards", name: "Coding Standards", shortName: "Standards", section: "artifacts", area: "Standards" },
  { id: "q2_documentation_quality", name: "Documentation Quality", shortName: "Docs Quality", section: "artifacts", area: "Documentation" },
  { id: "q3_documentation_ai_access", name: "Documentation AI Access", shortName: "Docs AI Access", section: "artifacts", area: "Documentation" },
  { id: "q4_requirements", name: "Requirements Quality", shortName: "Requirements", section: "artifacts", area: "Requirements" },
  { id: "q5_testing", name: "Test Suite Quality", shortName: "Testing", section: "artifacts", area: "Testing" },
  { id: "q6_architecture", name: "Architecture & Modularity", shortName: "Architecture", section: "artifacts", area: "Architecture" },
  { id: "q7_reviews", name: "Code Review Quality", shortName: "Reviews", section: "process", area: "Reviews" },
  { id: "q8_tech_debt", name: "Technical Debt Management", shortName: "Tech Debt", section: "process", area: "Tech Debt" },
  { id: "q9_security_culture", name: "Security Culture", shortName: "Security Culture", section: "process", area: "Security" },
  { id: "q10_security_scanning", name: "Security Scanning", shortName: "Security Scanning", section: "process", area: "Security" },
  { id: "q11_ai_data_policies", name: "AI Data Policies", shortName: "AI Data Policies", section: "process", area: "Security" },
  { id: "q12_metrics", name: "Engineering Metrics", shortName: "Metrics", section: "process", area: "Metrics" },
  { id: "q13_cicd_pipeline", name: "CI/CD Pipeline", shortName: "CI/CD Pipeline", section: "tooling", area: "CI/CD" },
  { id: "q14_static_analysis", name: "Static Analysis", shortName: "Static Analysis", section: "tooling", area: "CI/CD" },
  { id: "q15_quality_gates", name: "Quality Gates", shortName: "Quality Gates", section: "tooling", area: "CI/CD" },
  { id: "q16_secrets_management", name: "Secrets Management", shortName: "Secrets Mgmt", section: "tooling", area: "CI/CD" },
  { id: "q17_developer_tooling", name: "Developer Tooling & AI", shortName: "Dev Tooling", section: "tooling", area: "Tooling" },
  { id: "q18_adaptability", name: "Adaptability", shortName: "Adaptability", section: "culture", area: "Culture" },
  { id: "q19_ownership", name: "Ownership & Accountability", shortName: "Ownership", section: "culture", area: "Culture" },
  { id: "q20_psychological_safety", name: "Psychological Safety", shortName: "Psych Safety", section: "culture", area: "Culture" },
  { id: "q21_decision_making", name: "Decision-Making Speed", shortName: "Decisions", section: "culture", area: "Decisions" },
  { id: "q22_leadership_readiness", name: "Leadership Readiness", shortName: "Leadership", section: "culture", area: "Leadership" },
];

export const SECTIONS = [
  { id: "artifacts", name: "Artifacts", color: "#3D7A41" },
  { id: "process", name: "Process", color: "#4F769A" },
  { id: "tooling", name: "Tooling", color: "#8A708A" },
  { id: "culture", name: "Culture", color: "#B8892A" },
];

export const CRITICAL_MINIMUMS = ["q5_testing", "q13_cicd_pipeline", "q1_standards", "q10_security_scanning", "q6_architecture"];

export const SCORE_COLORS = {
  0: "#C44040",
  1: "#B8892A",
  2: "#3D7A41",
  3: "#2A5A2E",
  ns: "#4F769A",
};

export const SCORE_LABELS = {
  0: "Not Ready",
  1: "Some Progress",
  2: "Ready",
  3: "Exemplary",
  ns: "Not Sure",
};

export const BAND_COLORS = {
  "Not Ready": "#C44040",
  "Early Progress": "#B8892A",
  "Ready to Pilot": "#6B9E3A",
  "Ready for Adoption": "#3D7A41",
  "Exemplary": "#2A5A2E",
};

// =============================================================================
// EXEC (LAYER 1) CONSTANTS
// =============================================================================

export const EXEC_SECTIONS = [
  { id: "current_ai_state", name: "Current AI State",       color: "#4F769A" },
  { id: "motivation",       name: "Motivation & Context",   color: "#3D7A41" },
  { id: "org_profile",      name: "Organisational Profile", color: "#B8892A" },
  { id: "engineering",      name: "Engineering Foundations", color: "#3D7A41" },
  { id: "metrics",          name: "Metrics & Measurement",  color: "#4F769A" },
  { id: "talent",           name: "Talent & People",        color: "#8A708A" },
  { id: "security",         name: "Security & Compliance",  color: "#C44040" },
  { id: "investment",       name: "Investment & Commitment", color: "#B8892A" },
  { id: "alignment",        name: "Alignment & Ownership",  color: "#C47030" },
];

export const EXEC_QUESTIONS = [
  // Current AI State
  { id: "q8_ai_tool_visibility",       name: "AI Tool Visibility",         shortName: "AI Visibility",    section: "current_ai_state", area: "Current State" },
  { id: "q9_adoption_candidates",      name: "Adoption Candidates",        shortName: "Candidates",       section: "current_ai_state", area: "Current State" },
  { id: "q10_data_flow_understanding", name: "Data Flow Understanding",    shortName: "Data Flow",        section: "current_ai_state", area: "Current State" },
  { id: "q11_inbound_data_risk",       name: "Inbound Data Risk",          shortName: "Inbound Risk",     section: "current_ai_state", area: "Current State" },
  // Motivation & Context
  { id: "q1_clarity_of_purpose",       name: "Clarity of Purpose",         shortName: "Purpose",          section: "motivation",       area: "Motivation" },
  { id: "q2_stakeholder_mapping",      name: "Stakeholder Mapping",        shortName: "Stakeholders",     section: "motivation",       area: "Motivation" },
  { id: "q3_leadership_alignment",     name: "Leadership Alignment",       shortName: "Leader Align",     section: "motivation",       area: "Motivation" },
  // Organisational Profile
  { id: "q4_ai_strategic_fit",         name: "AI Strategic Fit",           shortName: "Strategic Fit",    section: "org_profile",      area: "Organisation" },
  { id: "q5_adoption_track_record",    name: "Adoption Track Record",      shortName: "Track Record",     section: "org_profile",      area: "Organisation" },
  { id: "q6_decision_pace",            name: "Decision Pace",              shortName: "Decision Pace",    section: "org_profile",      area: "Organisation" },
  { id: "q7_risk_appetite",            name: "Risk Appetite",              shortName: "Risk Appetite",    section: "org_profile",      area: "Organisation" },
  // Engineering & Technical Foundations
  { id: "q12_engineering_quality",     name: "Engineering Quality",        shortName: "Eng Quality",      section: "engineering",      area: "Engineering" },
  { id: "q13_time_allocation",         name: "Time Allocation",            shortName: "Time Alloc",       section: "engineering",      area: "Engineering" },
  { id: "q14_tech_debt_leadership",    name: "Tech Debt at Leadership",    shortName: "Tech Debt",        section: "engineering",      area: "Engineering" },
  { id: "q15_incident_recovery",       name: "Incident Recovery",          shortName: "Incidents",        section: "engineering",      area: "Engineering" },
  { id: "q16_developer_onboarding",    name: "Developer Onboarding",       shortName: "Onboarding",       section: "engineering",      area: "Engineering" },
  { id: "q17_documentation_knowledge", name: "Documentation & Knowledge",  shortName: "Docs & Knowledge", section: "engineering",      area: "Engineering" },
  { id: "q18_ai_experiments",          name: "AI Experiments & Pilots",    shortName: "AI Experiments",   section: "engineering",      area: "Engineering" },
  // Metrics & Measurement
  { id: "q19_performance_metrics",     name: "Performance Metrics",        shortName: "Perf Metrics",     section: "metrics",          area: "Metrics" },
  { id: "q20_ai_baselines",            name: "AI Impact Baselines",        shortName: "AI Baselines",     section: "metrics",          area: "Metrics" },
  // Talent & People
  { id: "q21_ai_skills",               name: "AI Skills Readiness",        shortName: "AI Skills",        section: "talent",           area: "Talent" },
  { id: "q22_skills_development",      name: "Skills Development",         shortName: "Skills Dev",       section: "talent",           area: "Talent" },
  { id: "q23_talent_ai_competitiveness", name: "Talent Competitiveness",   shortName: "Competitiveness",  section: "talent",           area: "Talent" },
  { id: "q24_team_appetite",           name: "Team Appetite",              shortName: "Team Appetite",    section: "talent",           area: "Talent" },
  // Security, Risk & Compliance
  { id: "q25_security_maturity",       name: "Security Maturity",          shortName: "Security",         section: "security",         area: "Security" },
  { id: "q26_ai_data_classification",  name: "AI Data Classification",     shortName: "AI Data Class",    section: "security",         area: "Security" },
  { id: "q27_regulatory_readiness",    name: "Regulatory Readiness",       shortName: "Regulatory",       section: "security",         area: "Security" },
  { id: "q28_vendor_risk",             name: "Vendor & Platform Risk",     shortName: "Vendor Risk",      section: "security",         area: "Security" },
  // Investment & Commitment
  { id: "q29_resource_allocation",     name: "Resource Allocation",        shortName: "Resources",        section: "investment",       area: "Investment" },
  { id: "q30_success_definition",      name: "Success Definition",         shortName: "Success Def",      section: "investment",       area: "Investment" },
  // Alignment & Ownership
  { id: "q31_leadership_alignment",    name: "Leadership Alignment",       shortName: "Leader Align",     section: "alignment",        area: "Alignment" },
  { id: "q32_decision_risk_ownership", name: "Decision & Risk Ownership",  shortName: "Risk Ownership",   section: "alignment",        area: "Alignment" },
];

export const EXEC_CRITICAL_MINIMUMS = [
  "q30_success_definition",
  "q32_decision_risk_ownership",
  "q26_ai_data_classification",
  "q11_inbound_data_risk",
  "q20_ai_baselines",
];

export const EXEC_SCORE_MAP = {
  "yes":      2,
  "partial":  1,
  "no":       0,
  "not sure": "ns",
  "ns":       "ns",
};

export const EXEC_SCORE_LABELS = {
  0: "No",
  1: "Partial",
  2: "Yes",
  ns: "Not Sure",
};

export function getExecReadinessBand(score) {
  if (score < 0.5)  return "Not Ready";
  if (score < 1.0)  return "Early Progress";
  if (score <= 1.5) return "Ready to Pilot";
  if (score <= 1.8) return "Ready for Adoption";
  return "Exemplary";
}

export function detectFormat(yamlData) {
  if (yamlData.assessment_layer) {
    const layer = yamlData.assessment_layer.toLowerCase();
    if (layer.includes("layer 1") || layer.includes("executive")) return "exec";
    if (layer.includes("layer 2") || layer.includes("engineering")) return "engineering";
  }
  if (yamlData.responses && !yamlData.scores) return "exec";
  if (yamlData.scores && !yamlData.responses) return "engineering";
  if (yamlData.responses) {
    const firstVal = Object.values(yamlData.responses)[0];
    if (typeof firstVal === "string" && ["yes", "partial", "no", "not sure"].includes(firstVal.toLowerCase())) {
      return "exec";
    }
  }
  return "engineering";
}

export function normalizeExecData(yamlData) {
  const responses = yamlData.responses || {};
  const scores = {};
  for (const [key, val] of Object.entries(responses)) {
    const normalized = String(val).toLowerCase().trim();
    const mapped = EXEC_SCORE_MAP[normalized];
    scores[key] = mapped !== undefined ? mapped : null;
  }
  return {
    ...yamlData,
    scores,
    _original_responses: responses,
    _format: "exec",
    _maxScore: 2,
  };
}

// =============================================================================
// PARSER FUNCTIONS
// =============================================================================

/**
 * Extract and parse the YAML block from assessment markdown.
 * Returns { data, error } where data is the parsed object or null on failure.
 */
export function extractYaml(markdown) {
  // Find all ```yaml ... ``` fenced blocks
  const yamlBlockRe = /```ya?ml\s*([\s\S]*?)```/gi;
  let match;
  let lastMatch = null;
  while ((match = yamlBlockRe.exec(markdown)) !== null) {
    lastMatch = match[1];
  }

  if (!lastMatch) {
    return {
      data: null,
      error: "no_yaml_block",
      message: "We couldn't find assessment data in your report. Make sure you're pasting the full markdown report — it should end with a YAML data block.",
    };
  }

  // Extract content between --- delimiters if present, otherwise use full block
  let yamlContent = lastMatch.trim();
  const delimiterRe = /^---\s*([\s\S]*?)\s*---\s*$/;
  const delimMatch = yamlContent.match(delimiterRe);
  if (delimMatch) {
    yamlContent = delimMatch[1];
  }

  let data;
  try {
    data = jsYaml.load(yamlContent);
  } catch {
    return {
      data: null,
      error: "yaml_parse_failure",
      message: "The assessment data couldn't be parsed. This sometimes happens if the report was modified after generation. Try pasting the original, unedited report.",
    };
  }

  if (!data || typeof data !== "object" || (!data.scores && !data.responses)) {
    return {
      data: null,
      error: "yaml_parse_failure",
      message: "The assessment data couldn't be parsed. This sometimes happens if the report was modified after generation. Try pasting the original, unedited report.",
    };
  }

  return { data, error: null };
}

/**
 * Extract narrative sections from markdown by header keyword matching.
 * Returns an object keyed by section ID.
 */
export function extractNarrativeSections(markdown) {
  // Remove the yaml block(s) first
  const withoutYaml = markdown.replace(/```ya?ml[\s\S]*?```/gi, "");

  // Split by ## headings
  const parts = withoutYaml.split(/^##\s+/m);

  const KEYWORD_MAP = [
    { keywords: ["executive summary"], id: "executiveSummary" },
    { keywords: ["detailed findings", "detailed finding", "assessment by section"], id: "findings" },
    { keywords: ["visibility gap"], id: "visibilityGaps" },
    { keywords: ["red flag"], id: "redFlags" },
    { keywords: ["critical minimum"], id: "criticalMinimums" },
    { keywords: ["prioritised recommendation", "prioritized recommendation", "recommendation"], id: "recommendations" },
    { keywords: ["suggested roadmap", "roadmap"], id: "roadmap" },
    { keywords: ["recommended next step", "next step"], id: "nextSteps" },
    { keywords: ["organisational context", "organizational context"], id: "orgContext" },
    { keywords: ["motivation", "driving force"], id: "motivation" },
    { keywords: ["key themes", "patterns"], id: "keyThemes" },
    { keywords: ["perception check"], id: "perceptionCheck" },
  ];

  const sections = {};

  for (const part of parts) {
    if (!part.trim()) continue;
    const lines = part.split("\n");
    const heading = lines[0].trim().toLowerCase();
    const body = lines.slice(1).join("\n").trim();

    for (const { keywords, id } of KEYWORD_MAP) {
      if (keywords.some((kw) => heading.includes(kw))) {
        sections[id] = { heading: lines[0].trim(), body };
        break;
      }
    }
  }

  return sections;
}

/**
 * Recompute section averages, overall score, and readiness band from raw scores.
 * The YAML includes these but we recompute as a safety net.
 */
export function computeDerivedScores(yamlData, questions = QUESTIONS, sections = SECTIONS, bandFn = getReadinessBand) {
  const scores = yamlData.scores || {};

  function sectionAvg(sectionId) {
    const qs = questions.filter((q) => q.section === sectionId);
    const vals = qs
      .map((q) => scores[q.id])
      .filter((v) => v !== undefined && v !== null && v !== "NS" && v !== "ns" && !isNaN(Number(v)));
    return vals.length ? vals.reduce((a, b) => a + Number(b), 0) / vals.length : null;
  }

  const sectionAverages = {};
  for (const s of sections) {
    sectionAverages[s.id] = sectionAvg(s.id);
  }

  const allVals = questions.map((q) => scores[q.id]).filter(
    (v) => v !== undefined && v !== null && v !== "NS" && v !== "ns" && !isNaN(Number(v))
  );
  const overallScore = allVals.length ? allVals.reduce((a, b) => a + Number(b), 0) / allVals.length : null;
  const readinessBand = overallScore !== null ? bandFn(overallScore) : null;

  return { sectionAverages, overallScore, readinessBand };
}

export function getReadinessBand(score) {
  if (score < 1.0) return "Not Ready";
  if (score < 1.5) return "Early Progress";
  if (score <= 2.0) return "Ready to Pilot";
  if (score <= 2.5) return "Ready for Adoption";
  return "Exemplary";
}

/**
 * Validate that the assessment data has enough scores to be useful.
 * Returns { valid, warnings, scoreCount }.
 */
export function validateAssessmentData(yamlData, questions = QUESTIONS) {
  const scores = yamlData.scores || {};
  const expectedIds = questions.map((q) => q.id);
  const foundIds = expectedIds.filter((id) => scores[id] !== undefined && scores[id] !== null);
  const scoreCount = foundIds.length;

  const warnings = [];

  if (scoreCount < 15) {
    warnings.push(`incomplete_scores`);
  }

  return {
    valid: scoreCount >= 15,
    warnings,
    scoreCount,
    totalExpected: expectedIds.length,
  };
}

/**
 * Main entry point: parse raw markdown into structured report data.
 * Returns { yaml, narrative, derived, validation, error, errorMessage }
 */
export function parseReport(markdown) {
  const { data: rawYamlData, error, message } = extractYaml(markdown);

  if (error) {
    return { error, errorMessage: message };
  }

  // Detect format and normalize
  const format = detectFormat(rawYamlData);
  const yamlData = format === "exec"
    ? normalizeExecData(rawYamlData)
    : { ...rawYamlData, _format: "engineering", _maxScore: 3 };

  // Select format-appropriate constants
  const questions = format === "exec" ? EXEC_QUESTIONS : QUESTIONS;
  const sections  = format === "exec" ? EXEC_SECTIONS  : SECTIONS;
  const criticalMinimums = format === "exec" ? EXEC_CRITICAL_MINIMUMS : CRITICAL_MINIMUMS;
  const scoreLabels = format === "exec" ? EXEC_SCORE_LABELS : SCORE_LABELS;
  const bandFn = format === "exec" ? getExecReadinessBand : getReadinessBand;
  const maxScore = format === "exec" ? 2 : 3;

  const validation = validateAssessmentData(yamlData, questions);
  const narrative = extractNarrativeSections(markdown);
  const derived = computeDerivedScores(yamlData, questions, sections, bandFn);

  // Use derived values as source of truth, fall back to YAML if derived fails
  const overallScore = derived.overallScore ?? yamlData.overall_score ?? null;
  const readinessBand = derived.readinessBand ?? yamlData.readiness_band ?? null;
  const sectionAverages = {};
  for (const s of sections) {
    sectionAverages[s.id] = derived.sectionAverages[s.id] ?? null;
  }

  return {
    yaml: yamlData,
    narrative,
    derived: { ...derived, overallScore, readinessBand, sectionAverages },
    validation,
    format,
    questions,
    sections,
    criticalMinimums,
    scoreLabels,
    maxScore,
    error: null,
  };
}

/**
 * Normalize a score value from YAML (may be string "NS", number, etc.)
 */
export function normalizeScore(val) {
  if (val === undefined || val === null) return null;
  const s = String(val).toUpperCase();
  if (s === "NS" || s === "NOT SURE") return "ns";
  const n = Number(val);
  if (!isNaN(n) && n >= 0 && n <= 3) return n;
  return null;
}
