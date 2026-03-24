// ─── Constants ────────────────────────────────────────────────────
const START_AGE = 30;
const RETIREMENT_AGE = 65;
const STARTING_NET_WORTH = 25000;
const ANNUAL_GROWTH_RATE = 0.07;

// ─── Financial Events ─────────────────────────────────────────────
const FINANCIAL_EVENTS = [
  {
    id: 'emergency_fund',
    age: 30,
    icon: '🏦',
    title: 'Emergency Fund',
    scenario: "You just started your career at 30. Should you build a 6-month emergency fund or splurge on a lifestyle upgrade?",
    options: [
      {
        id: 'save_fund',
        label: 'Build Emergency Fund',
        emoji: '🏦',
        desc: 'Save 6 months of expenses. Boring but crucial financial foundation.',
        multiplier: 1.35,
        isGood: true,
      },
      {
        id: 'spend_lifestyle',
        label: 'Lifestyle Upgrade',
        emoji: '🛍️',
        desc: 'New car, fancy apartment, dining out. YOLO while you\'re young!',
        multiplier: 0.72,
        isGood: false,
      },
    ],
  },
  {
    id: 'first_investment',
    age: 32,
    icon: '📈',
    title: 'First Investment',
    scenario: "Your bank offers a savings account at 1.2% interest. Your friend says to invest in index funds. What do you do?",
    options: [
      {
        id: 'index_funds',
        label: 'Index Fund Portfolio',
        emoji: '📈',
        desc: 'Diversified low-cost index funds. Historically ~7% annual returns.',
        multiplier: 1.42,
        isGood: true,
      },
      {
        id: 'savings_account',
        label: 'Keep It in Savings',
        emoji: '💰',
        desc: 'Safe and liquid, but inflation eats your returns at 1.2%.',
        multiplier: 0.88,
        isGood: false,
      },
    ],
  },
  {
    id: 'first_home',
    age: 35,
    icon: '🏠',
    title: 'First Home',
    scenario: "You can afford a home. Buy within your means or stretch for a bigger place in a hot neighborhood?",
    options: [
      {
        id: 'affordable_home',
        label: 'Buy Within Budget',
        emoji: '🏡',
        desc: 'Modest home, 20% down payment. Mortgage is 25% of income.',
        multiplier: 1.38,
        isGood: true,
      },
      {
        id: 'stretch_home',
        label: 'Stretch for Dream Home',
        emoji: '🏰',
        desc: 'Bigger house, only 5% down. Mortgage is 45% of income.',
        multiplier: 0.68,
        isGood: false,
      },
    ],
  },
  {
    id: 'career_move',
    age: 37,
    icon: '💼',
    title: 'Career Move',
    scenario: "A startup offers you equity + 20% pay cut. Your current job offers a 10% raise. Which path do you take?",
    options: [
      {
        id: 'negotiate_raise',
        label: 'Negotiate + Stay',
        emoji: '💼',
        desc: 'Counter with 15% raise + bonus. Build on stable ground.',
        multiplier: 1.30,
        isGood: true,
      },
      {
        id: 'startup_gamble',
        label: 'Join the Startup',
        emoji: '🎲',
        desc: 'Exciting but risky. Most startups fail within 5 years.',
        multiplier: 0.75,
        isGood: false,
      },
    ],
  },
  {
    id: 'retirement_account',
    age: 40,
    icon: '🎯',
    title: 'Retirement Account',
    scenario: "You're 40 and haven't maxed out your 401(k). Your employer matches up to 6%. What's your move?",
    options: [
      {
        id: 'max_401k',
        label: 'Max Out 401(k)',
        emoji: '🎯',
        desc: 'Contribute max + get full employer match. Tax-advantaged compounding.',
        multiplier: 1.55,
        isGood: true,
      },
      {
        id: 'minimum_401k',
        label: 'Contribute Minimum',
        emoji: '😴',
        desc: 'Just enough to get partial match. Leaving free money on the table.',
        multiplier: 0.82,
        isGood: false,
      },
    ],
  },
  {
    id: 'kids_education',
    age: 42,
    icon: '🎓',
    title: "Kids' Education Fund",
    scenario: "Your child is 5 years old. Start a 529 college savings plan now, or wait until they're closer to college age?",
    options: [
      {
        id: 'start_529_now',
        label: 'Start 529 Plan Now',
        emoji: '🎓',
        desc: '13 years of tax-free compounding. Small monthly contributions add up.',
        multiplier: 1.32,
        isGood: true,
      },
      {
        id: 'wait_later',
        label: 'Wait Until Later',
        emoji: '⏰',
        desc: 'Procrastinate. You\'ll need to contribute 3x more later for same result.',
        multiplier: 0.85,
        isGood: false,
      },
    ],
  },
  {
    id: 'debt_payoff',
    age: 45,
    icon: '💳',
    title: 'Debt Decision',
    scenario: "You have $15,000 in credit card debt at 22% APR and $30,000 in student loans at 5%. What's your priority?",
    options: [
      {
        id: 'avalanche_method',
        label: 'Avalanche Method',
        emoji: '❄️',
        desc: 'Pay off high-interest credit card first. Saves the most in interest.',
        multiplier: 1.40,
        isGood: true,
      },
      {
        id: 'minimum_payments',
        label: 'Pay Minimums Only',
        emoji: '🐢',
        desc: 'Keep cash liquid but pay massive interest over time.',
        multiplier: 0.70,
        isGood: false,
      },
    ],
  },
  {
    id: 'side_income',
    age: 48,
    icon: '💡',
    title: 'Side Income',
    scenario: "You have skills that could earn $2,000/month on the side. Invest the time or keep your evenings free?",
    options: [
      {
        id: 'build_side_income',
        label: 'Build Side Income',
        emoji: '💡',
        desc: 'Consulting, freelancing, or a side business. Invest all profits.',
        multiplier: 1.45,
        isGood: true,
      },
      {
        id: 'leisure_time',
        label: 'Protect Your Time',
        emoji: '🛋️',
        desc: 'Work-life balance matters. But so does compound interest.',
        multiplier: 0.90,
        isGood: false,
      },
    ],
  },
  {
    id: 'market_crash',
    age: 50,
    icon: '📉',
    title: 'Market Crash!',
    scenario: "The stock market drops 35%. Your portfolio is down $80,000. What do you do?",
    options: [
      {
        id: 'stay_invested',
        label: 'Stay the Course',
        emoji: '💪',
        desc: 'Don\'t panic sell. Buy more if possible. Markets always recover.',
        multiplier: 1.50,
        isGood: true,
      },
      {
        id: 'panic_sell',
        label: 'Sell Everything',
        emoji: '😱',
        desc: 'Lock in losses. Miss the recovery. Classic panic sell mistake.',
        multiplier: 0.60,
        isGood: false,
      },
    ],
  },
  {
    id: 'real_estate',
    age: 53,
    icon: '🏢',
    title: 'Real Estate Investment',
    scenario: "An opportunity to buy a rental property. Positive cash flow but ties up capital. Or put it in the market?",
    options: [
      {
        id: 'rental_property',
        label: 'Buy Rental Property',
        emoji: '🏢',
        desc: 'Diversify with real estate. Passive income + appreciation.',
        multiplier: 1.38,
        isGood: true,
      },
      {
        id: 'skip_property',
        label: 'Skip It',
        emoji: '🚫',
        desc: 'Too much hassle. Keep everything in stocks... but miss diversification.',
        multiplier: 0.88,
        isGood: false,
      },
    ],
  },
  {
    id: 'pre_retirement',
    age: 58,
    icon: '🔒',
    title: 'Pre-Retirement Shift',
    scenario: "7 years to retirement. Should you shift to conservative bonds or stay aggressive in stocks?",
    options: [
      {
        id: 'balanced_portfolio',
        label: 'Balanced Portfolio',
        emoji: '⚖️',
        desc: '60/40 stocks/bonds. Protect gains while still growing.',
        multiplier: 1.28,
        isGood: true,
      },
      {
        id: 'all_stocks',
        label: 'Stay All Stocks',
        emoji: '🎰',
        desc: 'High risk near retirement. A crash could devastate your savings.',
        multiplier: 0.78,
        isGood: false,
      },
    ],
  },
  {
    id: 'final_push',
    age: 62,
    icon: '🚀',
    title: 'Final Push',
    scenario: "3 years to retirement. Maximize contributions or start winding down work hours?",
    options: [
      {
        id: 'maximize_contributions',
        label: 'Max Catch-Up Contributions',
        emoji: '🚀',
        desc: 'IRS allows extra $7,500/year catch-up at 50+. Use it!',
        multiplier: 1.32,
        isGood: true,
      },
      {
        id: 'coast_to_finish',
        label: 'Coast to Retirement',
        emoji: '🌴',
        desc: 'Reduce hours early. Enjoy life but miss the final compounding boost.',
        multiplier: 0.88,
        isGood: false,
      },
    ],
  },
];

// ─── Tree Tiers ───────────────────────────────────────────────────
const TREE_TIERS = [
  { id: 'seedling',    label: 'Seedling',     min: 0,       max: 50000,   color: '#92400E', dotColor: '#D97706' },
  { id: 'sapling',    label: 'Sapling',       min: 50000,   max: 150000,  color: '#15803D', dotColor: '#22C55E' },
  { id: 'young',      label: 'Young Tree',    min: 150000,  max: 350000,  color: '#166534', dotColor: '#16A34A' },
  { id: 'mature',     label: 'Mature Tree',   min: 350000,  max: 700000,  color: '#14532D', dotColor: '#15803D' },
  { id: 'flourishing',label: 'Flourishing',   min: 700000,  max: 1200000, color: '#052E16', dotColor: '#166534' },
  { id: 'golden',     label: 'Golden Tree',   min: 1200000, max: Infinity,color: '#78350F', dotColor: '#F59E0B' },
];

// ─── Game State ───────────────────────────────────────────────────
let state = {
  phase: 'intro',   // intro | game | retired
  currentAge: START_AGE,
  netWorth: STARTING_NET_WORTH,
  decisions: [],    // { eventId, age, optionId, optionLabel, isGood, netWorthBefore, netWorthAfter, delta }
  netWorthHistory: [{ age: START_AGE, value: STARTING_NET_WORTH }],
};

let pendingEventId = null;
let selectedOptionId = null;
let activeTab = 'map';

// ─── Helpers ──────────────────────────────────────────────────────
function formatCurrency(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}

function getTreeTier(netWorth) {
  for (let i = TREE_TIERS.length - 1; i >= 0; i--) {
    if (netWorth >= TREE_TIERS[i].min) return TREE_TIERS[i];
  }
  return TREE_TIERS[0];
}

function getAgeProgress(age) {
  return Math.min(1, Math.max(0, (age - START_AGE) / (RETIREMENT_AGE - START_AGE)));
}

function applyCompoundGrowth(amount, years) {
  return Math.round(amount * Math.pow(1 + ANNUAL_GROWTH_RATE, years));
}

function isEventCompleted(eventId) {
  return state.decisions.some(d => d.eventId === eventId);
}

function getDecisionForEvent(eventId) {
  return state.decisions.find(d => d.eventId === eventId);
}

function getRetirementScore() {
  const total = state.decisions.length;
  if (total === 0) return { grade: 'F', label: 'No decisions made', goodCount: 0, badCount: 0, total: 0 };
  const goodCount = state.decisions.filter(d => d.isGood).length;
  const pct = goodCount / total;
  let grade, label;
  if (pct >= 0.92) { grade = 'S'; label = 'Legendary Investor!'; }
  else if (pct >= 0.75) { grade = 'A'; label = 'Smart Saver'; }
  else if (pct >= 0.58) { grade = 'B'; label = 'Decent Decisions'; }
  else if (pct >= 0.42) { grade = 'C'; label = 'Could Be Better'; }
  else if (pct >= 0.25) { grade = 'D'; label = 'Risky Choices'; }
  else { grade = 'F'; label = 'Financial Disaster'; }
  return { grade, label, goodCount, badCount: total - goodCount, total };
}

function getGradeColor(grade) {
  const map = { S: '#F59E0B', A: '#22C55E', B: '#3B82F6', C: '#F97316', D: '#EF4444', F: '#7F1D1D' };
  return map[grade] || '#6B7280';
}

function saveState() {
  try { localStorage.setItem('mfq_state', JSON.stringify(state)); } catch(e) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem('mfq_state');
    if (saved) state = JSON.parse(saved);
  } catch(e) {}
}

// ─── Tree SVG ─────────────────────────────────────────────────────
function renderTreeSVG(tierId, size = 120) {
  const s = size;
  const trees = {
    seedling: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="88" rx="22" ry="6" fill="rgba(0,0,0,0.15)"/>
        <rect x="46" y="60" width="8" height="28" rx="3" fill="#92400E"/>
        <circle cx="50" cy="52" r="18" fill="#86EFAC"/>
        <circle cx="40" cy="56" r="10" fill="#4ADE80"/>
        <circle cx="60" cy="56" r="10" fill="#4ADE80"/>
        <circle cx="50" cy="44" r="12" fill="#22C55E"/>
      </svg>`,
    sapling: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="90" rx="26" ry="7" fill="rgba(0,0,0,0.15)"/>
        <rect x="45" y="55" width="10" height="35" rx="4" fill="#78350F"/>
        <circle cx="50" cy="46" r="22" fill="#86EFAC"/>
        <circle cx="36" cy="52" r="14" fill="#4ADE80"/>
        <circle cx="64" cy="52" r="14" fill="#4ADE80"/>
        <circle cx="50" cy="36" r="16" fill="#22C55E"/>
        <circle cx="38" cy="42" r="6" fill="#FFD700" opacity="0.9"/>
        <circle cx="62" cy="44" r="6" fill="#FFD700" opacity="0.9"/>
      </svg>`,
    young: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="92" rx="30" ry="8" fill="rgba(0,0,0,0.15)"/>
        <rect x="44" y="52" width="12" height="40" rx="5" fill="#78350F"/>
        <line x1="50" y1="62" x2="34" y2="52" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="62" x2="66" y2="52" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="40" r="26" fill="#86EFAC"/>
        <circle cx="32" cy="48" r="16" fill="#4ADE80"/>
        <circle cx="68" cy="48" r="16" fill="#4ADE80"/>
        <circle cx="50" cy="28" r="18" fill="#22C55E"/>
        <circle cx="36" cy="36" r="7" fill="#FFD700" opacity="0.9"/>
        <circle cx="64" cy="38" r="7" fill="#FFD700" opacity="0.9"/>
        <circle cx="50" cy="30" r="6" fill="#FFD700" opacity="0.9"/>
      </svg>`,
    mature: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="93" rx="34" ry="8" fill="rgba(0,0,0,0.15)"/>
        <rect x="43" y="48" width="14" height="45" rx="6" fill="#78350F"/>
        <line x1="50" y1="58" x2="28" y2="46" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
        <line x1="50" y1="58" x2="72" y2="46" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
        <line x1="50" y1="65" x2="30" y2="60" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="65" x2="70" y2="60" stroke="#92400E" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="36" r="30" fill="#86EFAC"/>
        <circle cx="28" cy="46" r="18" fill="#4ADE80"/>
        <circle cx="72" cy="46" r="18" fill="#4ADE80"/>
        <circle cx="50" cy="22" r="20" fill="#22C55E"/>
        <circle cx="34" cy="32" r="8" fill="#FFD700" opacity="0.9"/>
        <circle cx="66" cy="34" r="8" fill="#FFD700" opacity="0.9"/>
        <circle cx="50" cy="22" r="7" fill="#FFD700" opacity="0.9"/>
        <circle cx="26" cy="44" r="6" fill="#FFD700" opacity="0.85"/>
        <circle cx="74" cy="44" r="6" fill="#FFD700" opacity="0.85"/>
      </svg>`,
    flourishing: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="94" rx="36" ry="8" fill="rgba(0,0,0,0.15)"/>
        <rect x="42" y="46" width="16" height="48" rx="7" fill="#78350F"/>
        <line x1="50" y1="54" x2="24" y2="40" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
        <line x1="50" y1="54" x2="76" y2="40" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
        <line x1="50" y1="62" x2="26" y2="56" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="62" x2="74" y2="56" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="32" r="32" fill="#86EFAC"/>
        <circle cx="26" cy="44" r="20" fill="#4ADE80"/>
        <circle cx="74" cy="44" r="20" fill="#4ADE80"/>
        <circle cx="50" cy="18" r="22" fill="#22C55E"/>
        <circle cx="50" cy="32" r="16" fill="#16A34A"/>
        <circle cx="32" cy="30" r="8" fill="#FFD700" opacity="0.95"/>
        <circle cx="68" cy="30" r="8" fill="#FFD700" opacity="0.95"/>
        <circle cx="50" cy="18" r="8" fill="#FFD700" opacity="0.95"/>
        <circle cx="24" cy="42" r="7" fill="#FFD700" opacity="0.9"/>
        <circle cx="76" cy="42" r="7" fill="#FFD700" opacity="0.9"/>
        <circle cx="38" cy="24" r="6" fill="#FFD700" opacity="0.85"/>
        <circle cx="62" cy="24" r="6" fill="#FFD700" opacity="0.85"/>
      </svg>`,
    golden: `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100">
        <ellipse cx="50" cy="94" rx="38" ry="8" fill="rgba(0,0,0,0.2)"/>
        <rect x="41" y="44" width="18" height="50" rx="8" fill="#92400E"/>
        <line x1="50" y1="52" x2="20" y2="36" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
        <line x1="50" y1="52" x2="80" y2="36" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
        <line x1="50" y1="60" x2="22" y2="52" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="60" x2="78" y2="52" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="28" r="34" fill="#FDE68A"/>
        <circle cx="24" cy="42" r="22" fill="#FCD34D"/>
        <circle cx="76" cy="42" r="22" fill="#FCD34D"/>
        <circle cx="50" cy="14" r="24" fill="#FBBF24"/>
        <circle cx="50" cy="28" r="18" fill="#F59E0B"/>
        <circle cx="30" cy="26" r="9" fill="#FFD700" opacity="1"/>
        <circle cx="70" cy="26" r="9" fill="#FFD700" opacity="1"/>
        <circle cx="50" cy="12" r="9" fill="#FFD700" opacity="1"/>
        <circle cx="22" cy="40" r="8" fill="#FFD700" opacity="1"/>
        <circle cx="78" cy="40" r="8" fill="#FFD700" opacity="1"/>
        <circle cx="36" cy="18" r="7" fill="#FFD700" opacity="0.95"/>
        <circle cx="64" cy="18" r="7" fill="#FFD700" opacity="0.95"/>
        <circle cx="50" cy="28" r="6" fill="#FFF" opacity="0.4"/>
      </svg>`,
  };
  return trees[tierId] || trees.seedling;
}

// ─── Render Functions ─────────────────────────────────────────────

function renderIntro() {
  document.getElementById('screen-intro').classList.add('active');
  document.getElementById('screen-game').classList.remove('active');
  document.getElementById('screen-retired').classList.remove('active');
}

function renderGame() {
  document.getElementById('screen-intro').classList.remove('active');
  document.getElementById('screen-game').classList.add('active');
  document.getElementById('screen-retired').classList.remove('active');
  updateSidebar();
  renderActiveTab();
  updateMainDisplay();
}

function renderRetired() {
  document.getElementById('screen-intro').classList.remove('active');
  document.getElementById('screen-game').classList.remove('active');
  document.getElementById('screen-retired').classList.add('active');

  const score = getRetirementScore();
  const tier = getTreeTier(state.netWorth);
  const gradeColor = getGradeColor(score.grade);

  document.getElementById('retired-tree').innerHTML = renderTreeSVG(tier.id, 160);
  document.getElementById('retired-worth').textContent = formatCurrency(state.netWorth);
  document.getElementById('retired-grade').textContent = score.grade;
  document.getElementById('retired-grade-badge').style.background = gradeColor;
  document.getElementById('retired-decisions').textContent = `${score.goodCount}/${score.total} smart decisions — ${score.label}`;
}

function updateSidebar() {
  const tier = getTreeTier(state.netWorth);
  const progress = getAgeProgress(state.currentAge);

  document.getElementById('sb-age').textContent = state.currentAge;
  document.getElementById('sb-worth').textContent = formatCurrency(state.netWorth);
  document.getElementById('sb-tier').textContent = tier.label;
  document.getElementById('sb-tier').style.color = tier.dotColor;
  document.getElementById('sb-progress-fill').style.width = `${Math.round(progress * 100)}%`;
  document.getElementById('sb-years-left').textContent = `${RETIREMENT_AGE - state.currentAge} years to retirement`;
  document.getElementById('sb-tree').innerHTML = renderTreeSVG(tier.id, 80);
  updateMainDisplay();
}

function renderActiveTab() {
  if (activeTab === 'map') renderMapTab();
  else if (activeTab === 'tree') renderTreeTab();
  else if (activeTab === 'stats') renderStatsTab();
}

function renderMapTab() {
  const container = document.getElementById('map-events');
  container.innerHTML = '';

  FINANCIAL_EVENTS.forEach((event, index) => {
    const done = isEventCompleted(event.id);
    const decision = getDecisionForEvent(event.id);
    const isNext = !done && FINANCIAL_EVENTS.slice(0, index).every(e => isEventCompleted(e.id));
    const isFuture = !done && !isNext;

    // Connector line
    if (index > 0) {
      const connector = document.createElement('div');
      connector.className = `map-connector${done ? ' done' : ''}`;
      container.appendChild(connector);
    }

    const row = document.createElement('div');
    row.className = 'map-event';

    // Node
    let nodeClass = 'map-node';
    if (done && decision?.isGood) nodeClass += ' done-good';
    else if (done && !decision?.isGood) nodeClass += ' done-bad';
    else if (isNext) nodeClass += ' next';
    else nodeClass += ' future';

    const ageColor = (done || isNext) ? 'node-age' : 'node-age light';

    let checkMark = '';
    if (done) checkMark = `<span class="node-check">${decision?.isGood ? '✓' : '✗'}</span>`;

    row.innerHTML = `
      <div class="${nodeClass}" ${isNext ? `onclick="openDecision('${event.id}')"` : ''}>
        <span class="node-icon">${event.icon}</span>
        <span class="${ageColor}">${event.age}</span>
        ${checkMark}
      </div>
      <div class="map-info">
        <div class="map-event-title${isFuture ? ' future' : ''}">${event.title}</div>
        <div class="map-event-subtitle ${done ? (decision?.isGood ? 'good' : 'bad') : isNext ? 'next' : 'future'}">
          ${done
            ? (decision?.isGood ? `✓ ${decision.optionLabel} · ${formatCurrency(decision.delta)}` : `✗ ${decision.optionLabel} · ${formatCurrency(decision.delta)}`)
            : isNext ? '👆 Tap to decide!'
            : `Age ${event.age}`}
        </div>
      </div>
    `;

    container.appendChild(row);
  });

  // Retirement node
  const retirementConnector = document.createElement('div');
  retirementConnector.className = `map-connector${state.decisions.length === FINANCIAL_EVENTS.length ? ' done' : ''}`;
  container.appendChild(retirementConnector);

  const retirementRow = document.createElement('div');
  retirementRow.className = 'map-event';
  retirementRow.innerHTML = `
    <div class="map-node retirement" style="background:${state.decisions.length === FINANCIAL_EVENTS.length ? '#F59E0B' : 'rgba(255,255,255,0.12)'}; border-color:${state.decisions.length === FINANCIAL_EVENTS.length ? '#B45309' : 'rgba(255,255,255,0.3)'}">
      <span class="node-icon">🏖️</span>
      <span class="node-age">${RETIREMENT_AGE}</span>
    </div>
    <div class="map-info">
      <div class="map-event-title${state.decisions.length < FINANCIAL_EVENTS.length ? ' future' : ''}">Retirement!</div>
      <div class="map-event-subtitle ${state.decisions.length === FINANCIAL_EVENTS.length ? 'good' : 'future'}">
        ${state.decisions.length === FINANCIAL_EVENTS.length ? '🎉 You made it!' : `Age ${RETIREMENT_AGE}`}
      </div>
    </div>
  `;
  container.appendChild(retirementRow);
}

function renderTreeTab() {
  const tier = getTreeTier(state.netWorth);
  const score = getRetirementScore();

  document.getElementById('tree-stage-svg').innerHTML = renderTreeSVG(tier.id, 150);
  document.getElementById('tree-tier-badge').textContent = tier.label;
  document.getElementById('tree-tier-badge').style.color = tier.dotColor;
  document.getElementById('tree-tier-badge').style.borderColor = tier.dotColor;
  document.getElementById('tree-net-worth').textContent = formatCurrency(state.netWorth);

  document.getElementById('tree-good-count').textContent = score.goodCount;
  document.getElementById('tree-bad-count').textContent = score.badCount;

  // Tier guide
  const guide = document.getElementById('tier-guide');
  guide.innerHTML = TREE_TIERS.map(t => `
    <div class="tier-guide-row${tier.id === t.id ? ' current' : ''}">
      <div class="tier-dot" style="background:${t.dotColor}"></div>
      <span class="tier-guide-label">${t.label}</span>
      <span class="tier-guide-range">${formatCurrency(t.min)}${t.max === Infinity ? '+' : '–' + formatCurrency(t.max)}</span>
      ${tier.id === t.id ? '<span class="tier-current-marker">← YOU</span>' : ''}
    </div>
  `).join('');
}

function renderStatsTab() {
  const score = getRetirementScore();
  const gradeColor = getGradeColor(score.grade);

  // Chart
  renderChart();

  // Score
  document.getElementById('stats-good-count').textContent = score.goodCount;
  document.getElementById('stats-bad-count').textContent = score.badCount;
  const pct = score.total > 0 ? Math.round((score.goodCount / score.total) * 100) : 0;
  document.getElementById('stats-score-fill').style.width = `${pct}%`;
  document.getElementById('stats-score-pct').textContent = `${pct}% smart decisions`;

  // Grade
  document.getElementById('stats-grade-badge').style.background = gradeColor;
  document.getElementById('stats-grade-text').textContent = score.grade;
  document.getElementById('stats-grade-label').textContent = score.label;
  document.getElementById('stats-grade-desc').textContent =
    score.grade === 'S' ? 'Exceptional financial discipline. You\'re ready for a wealthy retirement.' :
    score.grade === 'A' ? 'Great choices! Your future self thanks you.' :
    score.grade === 'B' ? 'Solid decisions overall. A few missteps along the way.' :
    score.grade === 'C' ? 'Mixed results. More discipline could have doubled your wealth.' :
    score.grade === 'D' ? 'Risky choices hurt your portfolio significantly.' :
    'Financial decisions need serious reconsideration.';

  // Highlights
  const goodDecisions = state.decisions.filter(d => d.isGood).sort((a, b) => b.delta - a.delta);
  const badDecisions  = state.decisions.filter(d => !d.isGood).sort((a, b) => a.delta - b.delta);

  const bestEl = document.getElementById('stats-best');
  if (goodDecisions.length > 0) {
    const best = goodDecisions[0];
    bestEl.innerHTML = `
      <div class="highlight-row good">
        <span class="highlight-icon">🏆</span>
        <div class="highlight-info">
          <div class="highlight-title good">BEST DECISION</div>
          <div class="highlight-label">${best.optionLabel}</div>
          <div class="highlight-delta good">+${formatCurrency(best.delta)}</div>
        </div>
      </div>`;
  } else {
    bestEl.innerHTML = '';
  }

  const worstEl = document.getElementById('stats-worst');
  if (badDecisions.length > 0) {
    const worst = badDecisions[0];
    worstEl.innerHTML = `
      <div class="highlight-row bad">
        <span class="highlight-icon">💀</span>
        <div class="highlight-info">
          <div class="highlight-title bad">WORST DECISION</div>
          <div class="highlight-label">${worst.optionLabel}</div>
          <div class="highlight-delta bad">${formatCurrency(worst.delta)}</div>
        </div>
      </div>`;
  } else {
    worstEl.innerHTML = '';
  }

  // History
  const historyEl = document.getElementById('stats-history');
  if (state.decisions.length === 0) {
    historyEl.innerHTML = '<p class="empty-text">No decisions made yet.<br>Start the game to see your history!</p>';
  } else {
    historyEl.innerHTML = [...state.decisions].reverse().map(d => `
      <div class="history-item ${d.isGood ? 'good' : 'bad'}">
        <div class="history-header">
          <span class="history-age">Age ${d.age}</span>
          <span class="history-delta ${d.isGood ? 'good' : 'bad'}">${d.isGood ? '+' : ''}${formatCurrency(d.delta)}</span>
        </div>
        <div class="history-label">${d.optionLabel}</div>
        <div class="history-worth">${formatCurrency(d.netWorthBefore)} → ${formatCurrency(d.netWorthAfter)}</div>
      </div>
    `).join('');
  }
}

function renderChart() {
  const canvas = document.getElementById('net-worth-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.offsetWidth;
  const H = 120;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const history = state.netWorthHistory;
  if (history.length < 2) {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Make decisions to see your chart!', W / 2, H / 2);
    return;
  }

  const pad = { top: 10, right: 10, bottom: 24, left: 48 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const maxVal = Math.max(...history.map(h => h.value));
  const minVal = Math.min(...history.map(h => h.value));
  const range = maxVal - minVal || 1;

  const xOf = (i) => pad.left + (i / (history.length - 1)) * cW;
  const yOf = (v) => pad.top + cH - ((v - minVal) / range) * cH;

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
  grad.addColorStop(0, 'rgba(255,215,0,0.4)');
  grad.addColorStop(1, 'rgba(255,215,0,0.02)');

  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(history[0].value));
  history.forEach((h, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(h.value)); });
  ctx.lineTo(xOf(history.length - 1), pad.top + cH);
  ctx.lineTo(xOf(0), pad.top + cH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(history[0].value));
  history.forEach((h, i) => { if (i > 0) ctx.lineTo(xOf(i), yOf(h.value)); });
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Dots
  history.forEach((h, i) => {
    ctx.beginPath();
    ctx.arc(xOf(i), yOf(h.value), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
  });

  // Y labels
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '9px sans-serif';
  ctx.textAlign = 'right';
  [minVal, (minVal + maxVal) / 2, maxVal].forEach(v => {
    ctx.fillText(formatCurrency(v), pad.left - 4, yOf(v) + 3);
  });

  // X labels
  ctx.textAlign = 'center';
  history.forEach((h, i) => {
    if (i === 0 || i === history.length - 1 || i % 3 === 0) {
      ctx.fillText(h.age, xOf(i), H - 4);
    }
  });
}

// ─── Decision Modal ───────────────────────────────────────────────
function openDecision(eventId) {
  const event = FINANCIAL_EVENTS.find(e => e.id === eventId);
  if (!event || isEventCompleted(eventId)) return;

  pendingEventId = eventId;
  selectedOptionId = null;

  const modal = document.getElementById('modal-overlay');
  modal.classList.add('open');

  document.getElementById('modal-age-tag').textContent = `AGE ${event.age}`;
  document.getElementById('modal-icon').textContent = event.icon;
  document.getElementById('modal-title').textContent = event.title;
  document.getElementById('modal-scenario').textContent = event.scenario;
  document.getElementById('modal-current-worth').textContent = formatCurrency(state.netWorth);

  // Render options
  const optionsEl = document.getElementById('modal-options');
  optionsEl.innerHTML = event.options.map(opt => {
    const projectedWorth = Math.max(1000, Math.round(state.netWorth * opt.multiplier));
    const delta = projectedWorth - state.netWorth;
    return `
      <div class="option-card" id="opt-${opt.id}" onclick="selectOption('${opt.id}')">
        <div class="option-header">
          <span class="option-emoji">${opt.emoji}</span>
          <span class="option-label">${opt.label}</span>
          <span class="option-check" id="check-${opt.id}"></span>
        </div>
        <div class="option-desc">${opt.desc}</div>
        <div class="option-projection">
          <span class="proj-label">Projected:</span>
          <span class="proj-value ${opt.isGood ? 'positive' : 'negative'}">${formatCurrency(projectedWorth)}</span>
          <span class="proj-delta ${opt.isGood ? 'positive' : 'negative'}">(${delta >= 0 ? '+' : ''}${formatCurrency(delta)})</span>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('modal-result').innerHTML = '';
  document.getElementById('btn-confirm').disabled = true;
  document.getElementById('btn-confirm').style.opacity = '0.5';
}

function selectOption(optionId) {
  const event = FINANCIAL_EVENTS.find(e => e.id === pendingEventId);
  if (!event) return;

  selectedOptionId = optionId;
  const option = event.options.find(o => o.id === optionId);

  // Update card styles
  event.options.forEach(opt => {
    const card = document.getElementById(`opt-${opt.id}`);
    const check = document.getElementById(`check-${opt.id}`);
    card.className = 'option-card';
    check.textContent = '';
    if (opt.id === optionId) {
      card.classList.add(option.isGood ? 'selected-good' : 'selected-bad');
      check.textContent = option.isGood ? '✓' : '✗';
    }
  });

  // Show result preview
  const resultEl = document.getElementById('modal-result');
  resultEl.innerHTML = `
    <div class="result-banner ${option.isGood ? 'good' : 'bad'}">
      <span class="result-emoji">${option.isGood ? '🌱' : '🥀'}</span>
      <span class="result-text ${option.isGood ? 'good' : 'bad'}">
        ${option.isGood ? 'Smart choice! Your tree will grow.' : 'Risky move! Your tree may wither.'}
      </span>
    </div>
  `;

  document.getElementById('btn-confirm').disabled = false;
  document.getElementById('btn-confirm').style.opacity = '1';
}

function confirmDecision() {
  if (!pendingEventId || !selectedOptionId) return;

  const event = FINANCIAL_EVENTS.find(e => e.id === pendingEventId);
  const option = event.options.find(o => o.id === selectedOptionId);

  // Calculate years since last event
  const lastAge = state.decisions.length > 0
    ? state.decisions[state.decisions.length - 1].age
    : START_AGE;
  const yearsSince = event.age - lastAge;
  const grownWorth = applyCompoundGrowth(state.netWorth, yearsSince);

  const newNetWorth = Math.max(1000, Math.round(grownWorth * option.multiplier));
  const delta = newNetWorth - state.netWorth;

  const record = {
    eventId: event.id,
    age: event.age,
    optionId: option.id,
    optionLabel: option.label,
    isGood: option.isGood,
    netWorthBefore: state.netWorth,
    netWorthAfter: newNetWorth,
    delta,
  };

  state.decisions.push(record);
  state.netWorth = newNetWorth;
  state.currentAge = event.age;
  state.netWorthHistory.push({ age: event.age, value: newNetWorth });
  saveState();

  // Close modal
  document.getElementById('modal-overlay').classList.remove('open');
  pendingEventId = null;
  selectedOptionId = null;

  // Coin burst animation if good
  if (option.isGood) {
    burstCoins();
  }

  // Check if game over
  if (state.decisions.length >= FINANCIAL_EVENTS.length) {
    state.currentAge = RETIREMENT_AGE;
    state.phase = 'retired';
    saveState();
    setTimeout(() => renderRetired(), 600);
  } else {
    updateSidebar();
    renderActiveTab();
  }
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  pendingEventId = null;
  selectedOptionId = null;
}

// ─── Coin Burst Animation ─────────────────────────────────────────
function burstCoins() {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('div');
    coin.className = 'coin-burst';
    coin.textContent = '🪙';
    const angle = (i / count) * 2 * Math.PI;
    const dist = 80 + Math.random() * 60;
    coin.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    coin.style.setProperty('--ty', `${Math.sin(angle) * dist - 40}px`);
    coin.style.left = `${window.innerWidth / 2}px`;
    coin.style.top = `${window.innerHeight / 2}px`;
    coin.style.animationDelay = `${i * 0.05}s`;
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1100);
  }
}

// ─── Tab Switching ────────────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tab}`);
  });
  renderActiveTab();
}

// ─── Start / Reset ────────────────────────────────────────────────
function startGame() {
  state.phase = 'game';
  saveState();
  renderGame();
}

function resetGame() {
  state = {
    phase: 'intro',
    currentAge: START_AGE,
    netWorth: STARTING_NET_WORTH,
    decisions: [],
    netWorthHistory: [{ age: START_AGE, value: STARTING_NET_WORTH }],
  };
  saveState();
  renderIntro();
}

// ─── Build Static HTML ────────────────────────────────────────────
function buildApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- INTRO SCREEN -->
    <div id="screen-intro" class="screen">
      <div class="intro-clouds">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
        <div class="cloud cloud-3"></div>
      </div>
      <div class="intro-content">
        <div class="intro-title">MARIO</div>
        <div class="intro-subtitle">FINANCE QUEST</div>
        <img src="icon.png" width="140" height="140" style="border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,0.35);margin:8px 0" alt="Mario Finance Quest" />
        <p class="intro-desc">
          You are <strong>30 years old.</strong><br/>
          Make smart financial decisions<br/>
          to grow your wealth tree!<br/>
          Retire rich at age 65! 🎯
        </p>
        <button class="btn-start" onclick="startGame()">▶  PRESS START</button>
      </div>
      <div class="intro-ground">
        <div class="ground-grass"></div>
        <div class="ground-dirt"></div>
      </div>
    </div>

    <!-- GAME SCREEN -->
    <div id="screen-game" class="screen">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="sidebar-header">
          <img src="icon.png" width="36" height="36" style="border-radius:8px;flex-shrink:0" alt="icon" />
          <div class="sidebar-header-title">MARIO<br/>FINANCE QUEST</div>
        </div>
        <div class="sidebar-stats">
          <div class="stat-row">
            <span class="stat-label">AGE</span>
            <span class="stat-value" id="sb-age">30</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">NET WORTH</span>
            <span class="stat-value gold" id="sb-worth">$25.0K</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">TREE</span>
            <span class="stat-value" id="sb-tier" style="font-size:13px">Seedling</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-labels">
              <span class="progress-bar-label">Age 30</span>
              <span class="progress-bar-label">Retire 65</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" id="sb-progress-fill" style="width:0%"></div>
            </div>
            <div class="progress-years" id="sb-years-left">35 years to retirement</div>
          </div>
        </div>
        <div class="sidebar-tree">
          <div id="sb-tree"></div>
          <div class="tree-tier-badge" id="sb-tree-badge"></div>
        </div>
        <div class="sidebar-tabs">
          <button class="tab-btn active" data-tab="map" onclick="switchTab('map')">🗺 MAP</button>
          <button class="tab-btn" data-tab="tree" onclick="switchTab('tree')">🌳 TREE</button>
          <button class="tab-btn" data-tab="stats" onclick="switchTab('stats')">📊 STATS</button>
        </div>
        <!-- MAP TAB -->
        <div class="tab-panel active" id="tab-map">
          <div class="map-section-title">YOUR JOURNEY</div>
          <div class="map-path" id="map-events"></div>
        </div>
        <!-- TREE TAB -->
        <div class="tab-panel" id="tab-tree">
          <div class="tree-stage">
            <div class="tree-stage-clouds">
              <div class="tree-stage-cloud tree-stage-cloud-1"></div>
              <div class="tree-stage-cloud tree-stage-cloud-2"></div>
            </div>
            <div id="tree-stage-svg"></div>
            <div class="tree-ground">
              <div class="tree-ground-grass"></div>
              <div class="tree-ground-dirt"></div>
            </div>
          </div>
          <div class="tier-badge" id="tree-tier-badge"></div>
          <div class="info-card">
            <div class="info-card-label">NET WORTH</div>
            <div class="net-worth-big" id="tree-net-worth">$25.0K</div>
            <div class="divider"></div>
            <div class="stats-row">
              <div class="stat-cell">
                <div class="stat-cell-value" id="tree-good-count" style="color:var(--green)">0</div>
                <div class="stat-cell-label">Smart Moves</div>
              </div>
              <div class="stat-cell-divider"></div>
              <div class="stat-cell">
                <div class="stat-cell-value" id="tree-bad-count" style="color:var(--red-err)">0</div>
                <div class="stat-cell-label">Risky Moves</div>
              </div>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-label">TREE GROWTH GUIDE</div>
            <div class="tier-guide" id="tier-guide"></div>
          </div>
        </div>
        <!-- STATS TAB -->
        <div class="tab-panel" id="tab-stats">
          <div class="chart-container">
            <div class="chart-label">NET WORTH OVER TIME</div>
            <canvas id="net-worth-chart" style="width:100%;height:120px"></canvas>
          </div>
          <div class="info-card">
            <div class="info-card-label">DECISION SCORE</div>
            <div class="score-row">
              <div class="score-cell good">
                <div class="score-cell-value good" id="stats-good-count">0</div>
                <div class="score-cell-label">Smart</div>
              </div>
              <div class="score-cell bad">
                <div class="score-cell-value bad" id="stats-bad-count">0</div>
                <div class="score-cell-label">Risky</div>
              </div>
            </div>
            <div class="score-bar"><div class="score-bar-fill" id="stats-score-fill" style="width:0%"></div></div>
            <div class="score-pct" id="stats-score-pct">0% smart decisions</div>
            <div class="divider"></div>
            <div class="grade-row">
              <div class="grade-badge" id="stats-grade-badge" style="background:#6B7280">
                <span class="grade-badge-text" id="stats-grade-text">?</span>
              </div>
              <div class="grade-info">
                <div class="grade-info-label" id="stats-grade-label">No decisions yet</div>
                <div class="grade-info-desc" id="stats-grade-desc">Start making decisions to get your grade!</div>
              </div>
            </div>
          </div>
          <div id="stats-best"></div>
          <div id="stats-worst"></div>
          <div class="info-card">
            <div class="info-card-label">DECISION HISTORY</div>
            <div id="stats-history"><p class="empty-text">No decisions yet.<br/>Start the game to see your history!</p></div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <div class="main-header">
          <span class="main-header-title">🗺 WORLD MAP</span>
          <button onclick="resetGame()" style="background:rgba(255,255,255,0.15);border:none;color:white;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">↺ RESET</button>
        </div>
        <div class="map-scroll">
          <p style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:20px;line-height:1.6">
            Tap the <strong style="color:var(--gold)">glowing gold node</strong> on the left to make your next financial decision. Each choice affects your wealth tree!
          </p>
          <!-- Visual world map -->
          <div style="background:rgba(0,0,0,0.2);border-radius:16px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:16px">
            <div id="main-tree-display" style="filter:drop-shadow(0 8px 32px rgba(0,0,0,0.3))"></div>
            <div style="text-align:center">
              <div style="font-family:var(--font-pixel);font-size:11px;color:var(--gold);letter-spacing:2px" id="main-tier-label">SEEDLING</div>
              <div style="font-size:28px;font-weight:900;color:white;margin-top:4px" id="main-worth-label">$25.0K</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px" id="main-age-label">Age 30 · 35 years to retirement</div>
            </div>
          </div>
          <div style="margin-top:20px;background:rgba(0,0,0,0.15);border-radius:12px;padding:16px">
            <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.5);letter-spacing:2px;margin-bottom:12px">FINANCIAL MILESTONES</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px" id="main-milestone-chips"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- RETIRED SCREEN -->
    <div id="screen-retired" class="screen">
      <div class="intro-clouds">
        <div class="cloud cloud-1"></div>
        <div class="cloud cloud-2"></div>
      </div>
      <div class="retired-content">
        <div class="retired-title">🎉 CONGRATULATIONS!</div>
        <div class="retired-subtitle">You've reached retirement at age 65!</div>
        <div id="retired-tree"></div>
        <div class="retired-card">
          <div class="retired-worth-label">FINAL NET WORTH</div>
          <div class="retired-worth" id="retired-worth">$0</div>
          <div class="retired-grade-badge" id="retired-grade-badge">
            <div class="retired-grade-text" id="retired-grade">?</div>
          </div>
          <div class="retired-decisions" id="retired-decisions"></div>
        </div>
        <button class="btn-replay" onclick="resetGame()">↺  PLAY AGAIN</button>
      </div>
    </div>

    <!-- DECISION MODAL -->
    <div id="modal-overlay" class="modal-overlay" onclick="handleOverlayClick(event)">
      <div class="modal-sheet">
        <div class="modal-header">
          <div class="modal-age-tag" id="modal-age-tag">AGE 30</div>
          <div class="modal-icon" id="modal-icon">🏦</div>
          <div class="modal-title" id="modal-title">Decision</div>
        </div>
        <div class="modal-body">
          <div class="question-block">?</div>
          <p class="modal-scenario" id="modal-scenario"></p>
          <div class="current-worth-badge">
            <div class="worth-label">CURRENT NET WORTH</div>
            <div class="worth-value" id="modal-current-worth">$25.0K</div>
          </div>
          <div class="choose-label">CHOOSE YOUR PATH</div>
          <div class="options-grid" id="modal-options"></div>
          <div id="modal-result"></div>
          <button class="btn-confirm" id="btn-confirm" onclick="confirmDecision()" disabled>
            CONFIRM DECISION
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function updateMainDisplay() {
  const tier = getTreeTier(state.netWorth);
  const mainTree = document.getElementById('main-tree-display');
  if (mainTree) mainTree.innerHTML = renderTreeSVG(tier.id, 200);

  const tierLabel = document.getElementById('main-tier-label');
  if (tierLabel) tierLabel.textContent = tier.label.toUpperCase();

  const worthLabel = document.getElementById('main-worth-label');
  if (worthLabel) worthLabel.textContent = formatCurrency(state.netWorth);

  const ageLabel = document.getElementById('main-age-label');
  if (ageLabel) ageLabel.textContent = `Age ${state.currentAge} · ${RETIREMENT_AGE - state.currentAge} years to retirement`;

  // Milestone chips
  const chips = document.getElementById('main-milestone-chips');
  if (chips) {
    chips.innerHTML = FINANCIAL_EVENTS.map(event => {
      const done = isEventCompleted(event.id);
      const decision = getDecisionForEvent(event.id);
      const isNext = !done && FINANCIAL_EVENTS.slice(0, FINANCIAL_EVENTS.indexOf(event)).every(e => isEventCompleted(e.id));
      let bg = 'rgba(255,255,255,0.1)';
      let color = 'rgba(255,255,255,0.4)';
      let cursor = 'default';
      if (done && decision?.isGood) { bg = 'rgba(34,197,94,0.25)'; color = '#4ADE80'; }
      else if (done && !decision?.isGood) { bg = 'rgba(239,68,68,0.25)'; color = '#F87171'; }
      else if (isNext) { bg = 'rgba(255,215,0,0.25)'; color = '#FFD700'; cursor = 'pointer'; }
      return `<div onclick="${isNext ? `openDecision('${event.id}')` : ''}" style="background:${bg};color:${color};padding:6px 10px;border-radius:8px;font-size:11px;font-weight:700;cursor:${cursor};border:1px solid ${color}30">
        ${event.icon} Age ${event.age}${done ? (decision?.isGood ? ' ✓' : ' ✗') : isNext ? ' 👆' : ''}
      </div>`;
    }).join('');
  }
}

// updateMainDisplay is called directly from renderGame and updateSidebar

// ─── Init ─────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildApp();
  loadState();
  if (state.phase === 'game') renderGame();
  else if (state.phase === 'retired') renderRetired();
  else renderIntro();

  // Resize chart on window resize
  window.addEventListener('resize', () => {
    if (activeTab === 'stats') renderChart();
  });
});
