// Quiz data for The 13th Stage burnout assessment

export interface ContextQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  multiSelect?: boolean;
}

export interface QuizQuestion {
  id: string;
  statement: string;
  stage: number; // 1-12, invisible to user
}

export interface ScoreBand {
  id: string;
  label: string;
  range: [number, number];
  headline: string;
  description: string;
  clusterNote: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  ctaTertiary?: string;
  showCrisisResources: boolean;
}

// ─── Context Questions (pre-quiz) ───────────────────────────────────

export const contextQuestions: ContextQuestion[] = [
  {
    id: "role",
    question: "What best describes your current role?",
    options: [
      { label: "Individual contributor", value: "ic" },
      { label: "Manager or team lead", value: "manager" },
      { label: "Director or senior leader", value: "director" },
      { label: "Executive (VP, C-suite)", value: "executive" },
      { label: "Between roles right now", value: "between" },
      { label: "None of these fit", value: "other" },
    ],
  },
  {
    id: "duration",
    question: "How long have you been feeling this way?",
    options: [
      { label: "A few weeks", value: "weeks" },
      { label: "A few months", value: "months" },
      { label: "Six months to a year", value: "half_year" },
      { label: "Over a year", value: "over_year" },
      { label: "I\u2019m not sure \u2014 it crept up on me", value: "unsure" },
    ],
  },
  {
    id: "history",
    question: "Have you experienced burnout before?",
    options: [
      { label: "Yes, I\u2019ve been through this before", value: "yes" },
      { label: "I think so, but I didn\u2019t call it that", value: "maybe" },
      { label: "No, this is new", value: "no" },
      { label: "I\u2019m not sure", value: "unsure" },
    ],
  },
  {
    id: "trigger",
    question: "Is there something that brought this on?",
    multiSelect: true,
    options: [
      { label: "Workload or pace that won\u2019t let up", value: "workload" },
      { label: "Leadership or culture problems", value: "culture" },
      { label: "A layoff, reorg, or job change", value: "change" },
      { label: "Personal life stress", value: "personal" },
      { label: "I can\u2019t pinpoint a single thing", value: "diffuse" },
      { label: "It\u2019s been building for a long time", value: "chronic" },
    ],
  },
];

// ─── Main Assessment Questions ──────────────────────────────────────
// Ordered for natural flow (not grouped by stage in the UI)
// Stage mapping is invisible to the user

export const quizQuestions: QuizQuestion[] = [
  // Early stages first — most people will nod along
  {
    id: "q1",
    statement:
      "I feel like I need to outperform to justify my role or position.",
    stage: 1,
  },
  {
    id: "q3",
    statement:
      "I take on tasks others could handle because it\u2019s faster to just do it myself.",
    stage: 2,
  },
  {
    id: "q2",
    statement:
      'I have trouble saying "that\u2019s good enough" \u2014 there\u2019s always more I could do.',
    stage: 1,
  },
  {
    id: "q5",
    statement:
      "I skip meals, cut sleep short, or drop exercise to make time for work.",
    stage: 3,
  },
  {
    id: "q4",
    statement:
      "I regularly work outside of normal hours because there\u2019s no other way to keep up.",
    stage: 2,
  },
  {
    id: "q6",
    statement:
      "I keep telling myself I\u2019ll take better care of myself after this current stretch.",
    stage: 3,
  },

  // Middle stages — the discomfort deepens
  {
    id: "q7",
    statement:
      "I feel a low-level tension or unease that I can\u2019t quite name or explain.",
    stage: 4,
  },
  {
    id: "q9",
    statement:
      "Hobbies, friendships, and personal interests have quietly dropped out of my life.",
    stage: 5,
  },
  {
    id: "q8",
    statement:
      "I\u2019ve been more irritable or reactive than usual, and I\u2019m not sure why.",
    stage: 4,
  },
  {
    id: "q11",
    statement:
      "When someone suggests I might be overworking or stressed, I get defensive.",
    stage: 6,
  },
  {
    id: "q10",
    statement:
      "If someone asked me what I do for fun, I\u2019d have to think uncomfortably long.",
    stage: 5,
  },
  {
    id: "q12",
    statement:
      "I find myself thinking that my colleagues or team aren\u2019t as capable as they should be.",
    stage: 6,
  },

  // Later stages — the gut-punch territory
  {
    id: "q13",
    statement:
      "I avoid social situations, optional meetings, or gatherings I used to enjoy.",
    stage: 7,
  },
  {
    id: "q15",
    statement:
      "Someone close to me has commented that I seem different or not like myself.",
    stage: 8,
  },
  {
    id: "q14",
    statement:
      "I\u2019ve been numbing with food, alcohol, scrolling, shopping, or other habits more than usual.",
    stage: 7,
  },
  {
    id: "q16",
    statement:
      "I notice I\u2019m more short-tempered, more withdrawn, or more flat than I used to be.",
    stage: 8,
  },

  // Deep stages — where recognition hits hard
  {
    id: "q17",
    statement:
      "I go through the motions at work without really being present in what I\u2019m doing.",
    stage: 9,
  },
  {
    id: "q19",
    statement:
      "I feel a hollowness or emptiness that I try to fill with activity, food, or distraction.",
    stage: 10,
  },
  {
    id: "q18",
    statement:
      "I feel like I\u2019m watching my own life from the outside rather than living it.",
    stage: 9,
  },
  {
    id: "q20",
    statement:
      "Things that used to bring me joy or satisfaction now bring me nothing.",
    stage: 10,
  },

  // Final stages — the ones that should prompt immediate action
  {
    id: "q21",
    statement: "I struggle to imagine things getting meaningfully better.",
    stage: 11,
  },
  {
    id: "q22",
    statement:
      "Getting through a normal day feels like it takes everything I have.",
    stage: 11,
  },
  {
    id: "q23",
    statement:
      "I\u2019ve had the thought that I simply cannot continue like this.",
    stage: 12,
  },
  {
    id: "q24",
    statement:
      "My body is telling me something is seriously wrong \u2014 through exhaustion, illness, pain, or breakdown.",
    stage: 12,
  },
];

// ─── Likert Scale ───────────────────────────────────────────────────

export const likertOptions = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

// ─── Stage Names (for results) ──────────────────────────────────────

export const stageNames: Record<number, string> = {
  1: "Compulsion to Prove",
  2: "Working Harder",
  3: "Neglecting Needs",
  4: "Displacement of Conflicts",
  5: "Revision of Values",
  6: "Denial of Emerging Problems",
  7: "Withdrawal",
  8: "Behavioral Changes",
  9: "Depersonalization",
  10: "Inner Emptiness",
  11: "Depression",
  12: "Burnout Syndrome",
  13: "The 13th Stage",
};

// ─── Score Bands ────────────────────────────────────────────────────

export const scoreBands: ScoreBand[] = [
  {
    id: "early",
    label: "Early Signals",
    range: [24, 48],
    headline: "You\u2019re catching this early. That matters.",
    description:
      "Your score suggests you\u2019re in the early stages of the burnout arc \u2014 the territory of proving, overworking, and starting to neglect your own needs. These stages are invisible because they look like success from the outside. Catching them now is the best possible time to intervene.",
    clusterNote:
      "your signals are concentrated in the early stages, where ambition and overwork are starting to erode your foundation",
    ctaPrimary:
      "You\u2019re in the best possible position to get ahead of this. Here\u2019s a free guide to the 13th Stage \u2014 our framework for what recovery actually looks like.",
    ctaSecondary:
      "Want to go deeper? The 13th Stage Workbook walks you through the full recovery process.",
    showCrisisResources: false,
  },
  {
    id: "middle",
    label: "The Messy Middle",
    range: [49, 72],
    headline: "You\u2019re in the middle of it. You\u2019re not imagining things.",
    description:
      "Your score places you in the middle stages \u2014 where work has started to eclipse everything else, where cynicism and withdrawal are creeping in, and where the people around you may be noticing changes you can\u2019t fully see yourself. This is the zone where most people first realize something is wrong.",
    clusterNote:
      "your signals are concentrated in the middle stages, where identity has merged with work and withdrawal has begun",
    ctaPrimary:
      "Here\u2019s a free guide to the 13th Stage \u2014 the recovery framework we\u2019ve built for exactly this moment.",
    ctaSecondary:
      "The 13th Stage Workbook is a self-guided recovery program with exercises, somatic practices, and a framework for building a life that doesn\u2019t send you back through the cycle.",
    ctaTertiary:
      "If you\u2019d rather not do this alone, Leah offers a six-week coaching program built around the workbook.",
    showCrisisResources: false,
  },
  {
    id: "serious",
    label: "Serious Territory",
    range: [73, 96],
    headline: "This is real, and it deserves your attention.",
    description:
      "Your score indicates you\u2019re experiencing significant burnout \u2014 the stages where depersonalization, inner emptiness, and exhaustion start to dominate. Your system is under real strain. This isn\u2019t something to push through. It\u2019s something to address.",
    clusterNote:
      "your signals are concentrated in the advanced stages, where disconnection and exhaustion are deeply affecting your daily experience",
    ctaPrimary:
      "Here\u2019s the guide, and I\u2019d genuinely encourage a conversation \u2014 with a coach, a therapist, or someone you trust. You don\u2019t have to figure this out alone.",
    ctaSecondary:
      "Leah\u2019s six-week coaching program is designed for exactly this moment. But a therapist or doctor may also be an important part of your recovery.",
    ctaTertiary:
      "The 13th Stage Workbook is available as a self-guided alternative if you\u2019re not ready for coaching.",
    showCrisisResources: true,
  },
  {
    id: "crisis",
    label: "Crisis Zone",
    range: [97, 120],
    headline: "You\u2019ve been carrying too much for too long.",
    description:
      "Your score suggests you\u2019re at or near the far end of the burnout arc. This is the territory of physical and emotional breakdown. Please hear this clearly: you are not weak for being here. But you need support \u2014 professional support \u2014 and you deserve it.",
    clusterNote:
      "your signals are at the most advanced stages of the burnout arc, indicating your system is in crisis",
    ctaPrimary:
      "Before anything else: please talk to someone. A therapist, a doctor, a friend you trust, or a crisis line. This is beyond what any workbook or quiz can address alone.",
    ctaSecondary:
      "When you\u2019re ready, the 13th Stage framework and coaching are here. But right now, the most important thing is that you\u2019re not doing this alone.",
    showCrisisResources: true,
  },
];

// ─── Crisis Resources ──────────────────────────────────────────────

export const crisisResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988",
    region: "US",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741",
    region: "US",
  },
  {
    name: "Samaritans",
    detail: "Call 116 123",
    region: "UK & Ireland",
  },
  {
    name: "SHOUT",
    detail: "Text SHOUT to 85258",
    region: "UK",
  },
];

// ─── Scoring Functions ─────────────────────────────────────────────

export interface QuizAnswers {
  context: Record<string, string | string[]>;
  scores: Record<string, number>; // questionId -> 1-5
}

export interface QuizResult {
  totalScore: number;
  band: ScoreBand;
  stageScores: Record<number, number>; // stage -> sum of 2 questions (2-10)
  flaggedStages: number[]; // stages scoring 8+
  highestFlaggedStage: number | null;
  hasClusterOverride: boolean; // highest cluster is 2+ stages above band midpoint
}

export function calculateResults(answers: QuizAnswers): QuizResult {
  const scores = answers.scores;

  // Total score
  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);

  // Find band
  const band =
    scoreBands.find(
      (b) => totalScore >= b.range[0] && totalScore <= b.range[1]
    ) || scoreBands[scoreBands.length - 1];

  // Stage scores
  const stageScores: Record<number, number> = {};
  for (let stage = 1; stage <= 12; stage++) {
    const stageQuestions = quizQuestions.filter((q) => q.stage === stage);
    stageScores[stage] = stageQuestions.reduce(
      (sum, q) => sum + (scores[q.id] || 0),
      0
    );
  }

  // Flagged stages (8+ out of 10)
  const flaggedStages = Object.entries(stageScores)
    .filter(([, score]) => score >= 8)
    .map(([stage]) => parseInt(stage))
    .sort((a, b) => a - b);

  // Highest flagged stage
  const highestFlaggedStage =
    flaggedStages.length > 0 ? Math.max(...flaggedStages) : null;

  // Highest stage with 7+
  const sevenPlusStages = Object.entries(stageScores)
    .filter(([, score]) => score >= 7)
    .map(([stage]) => parseInt(stage));
  const highestSevenPlus =
    sevenPlusStages.length > 0 ? Math.max(...sevenPlusStages) : null;

  // Determine band midpoint stage
  const bandIndex = scoreBands.indexOf(band);
  const bandMidStage = (bandIndex + 1) * 3; // rough mapping: band 0 -> stage 3, band 1 -> 6, etc.

  // Cluster override: highest flagged stage is 2+ stages above band midpoint
  const effectiveHighest = highestFlaggedStage || highestSevenPlus;
  const hasClusterOverride =
    effectiveHighest !== null && effectiveHighest >= bandMidStage + 2;

  return {
    totalScore,
    band,
    stageScores,
    flaggedStages,
    highestFlaggedStage: effectiveHighest,
    hasClusterOverride,
  };
}
