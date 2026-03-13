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

  if (!data || typeof data !== "object" || !data.scores) {
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
    { keywords: ["detailed findings", "detailed finding"], id: "findings" },
    { keywords: ["visibility gap"], id: "visibilityGaps" },
    { keywords: ["red flag"], id: "redFlags" },
    { keywords: ["critical minimum"], id: "criticalMinimums" },
    { keywords: ["prioritized recommendation", "recommendation"], id: "recommendations" },
    { keywords: ["suggested roadmap", "roadmap"], id: "roadmap" },
    { keywords: ["next step"], id: "nextSteps" },
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
export function computeDerivedScores(yamlData) {
  const scores = yamlData.scores || {};

  function sectionAvg(sectionId) {
    const qs = QUESTIONS.filter((q) => q.section === sectionId);
    const vals = qs
      .map((q) => scores[q.id])
      .filter((v) => v !== undefined && v !== null && v !== "NS" && v !== "ns" && !isNaN(Number(v)));
    return vals.length ? vals.reduce((a, b) => a + Number(b), 0) / vals.length : null;
  }

  const sectionAverages = {
    artifacts: sectionAvg("artifacts"),
    process: sectionAvg("process"),
    tooling: sectionAvg("tooling"),
    culture: sectionAvg("culture"),
  };

  const allVals = QUESTIONS.map((q) => scores[q.id]).filter(
    (v) => v !== undefined && v !== null && v !== "NS" && v !== "ns" && !isNaN(Number(v))
  );
  const overallScore = allVals.length ? allVals.reduce((a, b) => a + Number(b), 0) / allVals.length : null;
  const readinessBand = overallScore !== null ? getReadinessBand(overallScore) : null;

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
export function validateAssessmentData(yamlData) {
  const scores = yamlData.scores || {};
  const expectedIds = QUESTIONS.map((q) => q.id);
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
  const { data: yamlData, error, message } = extractYaml(markdown);

  if (error) {
    return { error, errorMessage: message };
  }

  const validation = validateAssessmentData(yamlData);
  const narrative = extractNarrativeSections(markdown);
  const derived = computeDerivedScores(yamlData);

  // Use derived values as source of truth, fall back to YAML if derived fails
  const overallScore = derived.overallScore ?? yamlData.overall_score ?? null;
  const readinessBand = derived.readinessBand ?? yamlData.readiness_band ?? null;
  const sectionAverages = {
    artifacts: derived.sectionAverages.artifacts ?? yamlData.section_averages?.artifacts ?? null,
    process: derived.sectionAverages.process ?? yamlData.section_averages?.process ?? null,
    tooling: derived.sectionAverages.tooling ?? yamlData.section_averages?.tooling ?? null,
    culture: derived.sectionAverages.culture ?? yamlData.section_averages?.culture ?? null,
  };

  return {
    yaml: yamlData,
    narrative,
    derived: { ...derived, overallScore, readinessBand, sectionAverages },
    validation,
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
