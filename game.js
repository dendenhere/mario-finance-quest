// ============================================================
// LIFE MONOPOLY — Age 20 to 100 (5-year steps)
// ============================================================

var START_AGE = 20;
var END_AGE = 100;
var STEP = 5;
var STARTING_CASH = 10000;

var AGE_STEPS = [];
for (var _a = START_AGE; _a <= END_AGE; _a += STEP) { AGE_STEPS.push(_a); }

var LIFE_STAGES = {
  20: { name: 'Young Adult', emoji: '🎓' },
  25: { name: 'Career Start', emoji: '💼' },
  30: { name: 'Settling Down', emoji: '💍' },
  35: { name: 'Family Start', emoji: '👶' },
  40: { name: 'Mid Career', emoji: '📈' },
  45: { name: 'Family Growth', emoji: '🏠' },
  50: { name: 'Pre-Retirement', emoji: '🏦' },
  55: { name: 'Late Career', emoji: '🧘' },
  60: { name: 'Early Retirement', emoji: '✈️' },
  65: { name: 'Active Retirement', emoji: '⛳' },
  70: { name: 'Retirement', emoji: '👴' },
  75: { name: 'Senior Years', emoji: '🌿' },
  80: { name: 'Elder', emoji: '🏥' },
  85: { name: 'Late Elder', emoji: '🕊️' },
  90: { name: 'Very Senior', emoji: '📜' },
  95: { name: 'Centenarian', emoji: '🎂' },
  100: { name: 'Century!', emoji: '🏆' }
};

var LIFE_STAGE_EVENTS = {
  20: [
    { icon: '🎓', name: 'Student Loan Repayment', desc: 'Pay off your university debt over 5 years', amount: -8000 },
    { icon: '💼', name: 'First Job Salary Boost', desc: 'You landed your first full-time job!', amount: 15000 }
  ],
  25: [
    { icon: '🚗', name: 'Buy First Car', desc: 'You need a car to get around', amount: -12000 },
    { icon: '💰', name: 'Career Progression', desc: 'Salary increment and bonus', amount: 8000 }
  ],
  30: [
    { icon: '💍', name: 'Wedding', desc: 'Congratulations! Wedding costs are real', amount: -30000 },
    { icon: '🏠', name: 'BTO Flat Down Payment', desc: 'Put down payment on your first home', amount: -25000 }
  ],
  35: [
    { icon: '👶', name: 'First Child Born', desc: 'Hospital, baby gear, and childcare setup', amount: -20000 },
    { icon: '🍼', name: 'Childcare and Infant Care', desc: 'Monthly infant care fees for 5 years', amount: -18000 }
  ],
  40: [
    { icon: '🎒', name: "Child's Primary School", desc: 'School fees, tuition, enrichment classes', amount: -10000 },
    { icon: '📈', name: 'Career Peak Bonus', desc: 'You hit your career stride — big bonus!', amount: 20000 }
  ],
  45: [
    { icon: '🏫', name: "Child's Secondary School", desc: 'Education costs continue to rise', amount: -12000 },
    { icon: '🏠', name: 'Home Renovation', desc: 'Refreshing the home after 10 years', amount: -15000 }
  ],
  50: [
    { icon: '🎓', name: "Child's University Fees", desc: 'Helping your child through university', amount: -25000 },
    { icon: '💊', name: 'Health Screening and Insurance', desc: 'Annual health checks become important', amount: -5000 }
  ],
  55: [
    { icon: '👴', name: 'Parent Care Expenses', desc: 'Supporting ageing parents financially', amount: -15000 },
    { icon: '🏦', name: 'CPF Top-Up Bonus', desc: 'Government CPF top-up for retirement', amount: 5000 }
  ],
  60: [
    { icon: '✈️', name: 'Retirement Travel Fund', desc: 'Finally time to see the world!', amount: -20000 },
    { icon: '💵', name: 'CPF Payout Begins', desc: 'Monthly CPF LIFE payouts start', amount: 30000 }
  ],
  65: [
    { icon: '🏥', name: 'Medical Costs Rise', desc: 'Healthcare expenses increase significantly', amount: -12000 },
    { icon: '🎁', name: 'Grandchildren Gifts', desc: 'Spoiling the grandkids is mandatory', amount: -5000 }
  ],
  70: [
    { icon: '🏡', name: 'Downsize Home', desc: 'Sell big flat, buy smaller unit', amount: 40000 },
    { icon: '💊', name: 'Ongoing Medication', desc: 'Monthly medication and specialist visits', amount: -10000 }
  ],
  75: [
    { icon: '🏥', name: 'Hospitalisation', desc: 'Major health event requiring hospital stay', amount: -20000 },
    { icon: '🌿', name: 'Senior Activity Fund', desc: 'Tai chi, community centre, hobbies', amount: -3000 }
  ],
  80: [
    { icon: '🏠', name: 'Nursing Home Consideration', desc: 'Part-time nursing care costs', amount: -25000 },
    { icon: '💊', name: 'High Medical Costs', desc: 'Specialist care and treatments', amount: -18000 }
  ],
  85: [
    { icon: '🕊️', name: 'End-of-Life Planning', desc: 'Legal fees, will writing, estate planning', amount: -8000 },
    { icon: '💊', name: 'Intensive Medical Care', desc: 'Ongoing specialist treatments', amount: -22000 }
  ],
  90: [
    { icon: '📜', name: 'Legacy Gifts', desc: 'Passing wealth to children and grandchildren', amount: -15000 },
    { icon: '🏥', name: 'Full-Time Care', desc: 'Round-the-clock care assistance', amount: -20000 }
  ],
  95: [
    { icon: '🎂', name: 'Centenary Celebration', desc: 'Family celebration for reaching 95!', amount: -5000 },
    { icon: '📜', name: 'Estate Distribution', desc: 'Final estate planning and distribution', amount: -10000 }
  ]
};

var LUCK_BAD = [
  { icon: '🏥', name: 'Medical Emergency', desc: 'Unexpected hospitalisation and surgery', amount: -15000, type: 'bad' },
  { icon: '🚗', name: 'Car Accident', desc: 'Accident costs not fully covered by insurance', amount: -8000, type: 'bad' },
  { icon: '📉', name: 'Market Crash', desc: 'Your investments drop 30% in value', amount: -20000, type: 'bad', isMarketCrash: true },
  { icon: '🌊', name: 'Home Flood Damage', desc: 'Water damage not covered by insurance', amount: -12000, type: 'bad' },
  { icon: '🎣', name: 'Scam Victim', desc: 'You fell for an investment scam', amount: -10000, type: 'bad' },
  { icon: '💔', name: 'Divorce', desc: 'Legal fees and asset division', amount: -40000, type: 'bad' },
  { icon: '🔥', name: 'Business Failure', desc: 'Your side venture did not work out', amount: -20000, type: 'bad' },
  { icon: '🦠', name: 'Pandemic Job Loss', desc: 'Retrenchment during economic downturn', amount: -25000, type: 'bad' }
];
var LUCK_NEUTRAL = [
  { icon: '😐', name: 'Nothing Happened', desc: 'A quiet, uneventful period', amount: 0, type: 'neutral' },
  { icon: '🔧', name: 'Minor Car Repair', desc: 'Routine maintenance and small repairs', amount: -2000, type: 'neutral' },
  { icon: '🎉', name: 'Small Work Bonus', desc: 'A modest year-end performance bonus', amount: 3000, type: 'neutral' },
  { icon: '📦', name: 'Moving Costs', desc: 'Relocation expenses for a new opportunity', amount: -4000, type: 'neutral' }
];
var LUCK_GOOD = [
  { icon: '🎰', name: 'TOTO Windfall!', desc: 'You won the Singapore TOTO lottery!', amount: 50000, type: 'good' },
  { icon: '🚀', name: 'Job Promotion', desc: 'Promoted to senior management with big raise', amount: 15000, type: 'good' },
  { icon: '🏠', name: 'En Bloc Sale', desc: 'Your condo was en bloc — massive payout!', amount: 80000, type: 'good' },
  { icon: '💎', name: 'Inheritance', desc: 'Received inheritance from a relative', amount: 30000, type: 'good' },
  { icon: '📈', name: 'Stock Tip Pays Off', desc: 'Your investment doubled unexpectedly', amount: 20000, type: 'good' },
  { icon: '💡', name: 'Side Hustle Success', desc: 'Your side business took off this year', amount: 10000, type: 'good' },
  { icon: '🏆', name: 'Performance Bonus', desc: 'Record-breaking year at work', amount: 8000, type: 'good' },
  { icon: '🪙', name: 'Crypto Moonshot', desc: 'Early crypto investment paid off big', amount: 25000, type: 'good' },
  { icon: '🤝', name: 'Business Exit', desc: 'Sold your stake in a startup for a profit', amount: 45000, type: 'good' }
];

var FINANCIAL_CHOICES = {
  property: {
    label: '🏠 Property',
    options: [
      { id: 'buy_hdb', icon: '🏢', name: 'Buy HDB Flat', desc: 'Purchase a public housing flat for stability and future rental income', cost: -25000, tags: [{label:'-$25K',type:'cost'},{label:'Stable',type:'safe'}], minAge: 21, maxAge: 50, passiveIncome: 2000 },
      { id: 'upgrade_condo', icon: '🏙️', name: 'Upgrade to Condo', desc: 'Upgrade your home to a private condominium', cost: -80000, tags: [{label:'-$80K',type:'cost'},{label:'Prestige',type:'safe'}], minAge: 30, maxAge: 60, passiveIncome: 3500 },
      { id: 'invest_property', icon: '🏘️', name: 'Investment Property', desc: 'Buy a second property purely for rental income', cost: -50000, tags: [{label:'-$50K',type:'cost'},{label:'+$3K/yr',type:'gain'}], minAge: 30, maxAge: 65, passiveIncome: 3000 },
      { id: 'sell_property', icon: '💰', name: 'Sell Property', desc: 'Liquidate your property for a lump sum gain', cost: 60000, tags: [{label:'+$60K',type:'gain'},{label:'One-time',type:'risk'}], minAge: 50, maxAge: 100 },
      { id: 'no_property', icon: '⏭️', name: 'Skip Property', desc: 'No property changes this period', cost: 0, tags: [{label:'Free',type:'safe'}], minAge: 20, maxAge: 100 }
    ]
  },
  investment: {
    label: '📈 Invest',
    options: [
      { id: 'index_fund', icon: '📊', name: 'Index Fund (S&P 500)', desc: 'Diversified index fund — investments grow at 7% per year over 5 years', cost: -10000, tags: [{label:'-$10K',type:'cost'},{label:'7% p.a.',type:'gain'},{label:'Low Risk',type:'safe'}], minAge: 20, maxAge: 80, annualReturn: 0.07 },
      { id: 'reits', icon: '🏦', name: 'REITs Portfolio', desc: 'Real estate investment trusts with steady 5% dividend yield', cost: -15000, tags: [{label:'-$15K',type:'cost'},{label:'5% yield',type:'gain'},{label:'Steady',type:'safe'}], minAge: 25, maxAge: 80, annualReturn: 0.05 },
      { id: 'business', icon: '🏪', name: 'Start a Business', desc: 'High risk, high reward. 50% chance to 3x, 50% chance to lose it all', cost: -30000, tags: [{label:'-$30K',type:'cost'},{label:'High Risk',type:'risk'},{label:'3x or 0',type:'risk'}], minAge: 25, maxAge: 60 },
      { id: 'crypto', icon: '🪙', name: 'Crypto Investment', desc: 'Very high risk. 30% chance to 5x, 70% chance to lose 80%', cost: -5000, tags: [{label:'-$5K',type:'cost'},{label:'Very High Risk',type:'risk'},{label:'5x or -80%',type:'risk'}], minAge: 20, maxAge: 55 },
      { id: 'cpf_topup', icon: '🏛️', name: 'CPF Top-Up', desc: 'Top up your CPF for guaranteed 4% returns and tax relief', cost: -7000, tags: [{label:'-$7K',type:'cost'},{label:'4% guaranteed',type:'gain'},{label:'Tax Relief',type:'safe'}], minAge: 20, maxAge: 65, annualReturn: 0.04 },
      { id: 'no_invest', icon: '⏭️', name: 'Skip Investment', desc: 'Keep cash on hand, no investment this period', cost: 0, tags: [{label:'Free',type:'safe'}], minAge: 20, maxAge: 100 }
    ]
  },
  insurance: {
    label: '🛡️ Protect',
    options: [
      { id: 'life_insurance', icon: '❤️', name: 'Life Insurance', desc: 'Protects your family. Reduces bad luck event impact by 40%', cost: -2000, tags: [{label:'-$2K',type:'cost'},{label:'-40% bad events',type:'gain'},{label:'Protection',type:'safe'}], minAge: 20, maxAge: 65, protection: 'life' },
      { id: 'health_insurance', icon: '🏥', name: 'Health Insurance', desc: 'Comprehensive health coverage. Reduces medical costs by 50%', cost: -3000, tags: [{label:'-$3K',type:'cost'},{label:'-50% medical',type:'gain'},{label:'Essential',type:'safe'}], minAge: 20, maxAge: 80, protection: 'health' },
      { id: 'no_insurance', icon: '⏭️', name: 'Skip Insurance', desc: 'Live dangerously without additional coverage', cost: 0, tags: [{label:'Free',type:'safe'}], minAge: 20, maxAge: 100 }
    ]
  }
};

var DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

var state = {
  currentAge: START_AGE, cash: STARTING_CASH, netWorth: STARTING_CASH,
  investments: 0, passiveIncome: 0, hasLifeInsurance: false, hasHealthInsurance: false,
  stepIndex: 0, phase: 'intro', diceRolled: false, luckEvent: null, lastDiceValue: null,
  selectedChoice: null, selectedChoiceCategory: 'property',
  history: [], totalGood: 0, totalBad: 0, bestEvent: null, worstEvent: null, lastNetWorthChange: 0
};

function saveState() { try { localStorage.setItem('lifeMonopoly_v3', JSON.stringify(state)); } catch(e) {} }
function loadState() { try { var s = localStorage.getItem('lifeMonopoly_v3'); if (s) { var p = JSON.parse(s); for (var k in p) state[k] = p[k]; } } catch(e) {} }
function resetState() {
  localStorage.removeItem('lifeMonopoly_v3');
  state = { currentAge:START_AGE, cash:STARTING_CASH, netWorth:STARTING_CASH, investments:0, passiveIncome:0, hasLifeInsurance:false, hasHealthInsurance:false, stepIndex:0, phase:'intro', diceRolled:false, luckEvent:null, lastDiceValue:null, selectedChoice:null, selectedChoiceCategory:'property', history:[], totalGood:0, totalBad:0, bestEvent:null, worstEvent:null, lastNetWorthChange:0 };
}

function fmt(n) {
  var abs = Math.abs(n), s;
  if (abs >= 1000000) s = '$' + (abs/1000000).toFixed(2) + 'M';
  else if (abs >= 1000) s = '$' + (abs/1000).toFixed(1) + 'K';
  else s = '$' + abs.toFixed(0);
  return n < 0 ? '-' + s : s;
}

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rollDice() { return Math.floor(Math.random() * 6) + 1; }

function getLuckEvent(v) {
  if (v <= 2) return pickRandom(LUCK_BAD);
  if (v === 3) return pickRandom(LUCK_NEUTRAL);
  return pickRandom(LUCK_GOOD);
}

function getLifeStage(age) { return LIFE_STAGES[age] || LIFE_STAGES[20]; }
function getProgress() { return (state.stepIndex / (AGE_STEPS.length - 1)) * 100; }

function calcGrade() {
  var nw = state.netWorth;
  if (nw >= 1000000) return { grade:'S', title:'Monopoly Legend', color:'#FFD700' };
  if (nw >= 500000) return { grade:'A', title:'Property Tycoon', color:'#90EE90' };
  if (nw >= 200000) return { grade:'B', title:'Comfortable Retiree', color:'#42A5F5' };
  if (nw >= 50000) return { grade:'C', title:'Getting By', color:'#FFA500' };
  if (nw >= 0) return { grade:'D', title:'Broke at 100', color:'#9E9E9E' };
  return { grade:'F', title:'Bankrupt', color:'#CC0000' };
}

function updateNetWorth() { state.netWorth = state.cash + state.investments; }

function addHistory(age, text, amount) {
  state.history.unshift({ age:age, text:text, amount:amount });
  if (state.history.length > 60) state.history.pop();
  if (amount > 0) { state.totalGood += amount; if (!state.bestEvent || amount > state.bestEvent.amount) state.bestEvent = { text:text, amount:amount }; }
  else if (amount < 0) { state.totalBad += amount; if (!state.worstEvent || amount < state.worstEvent.amount) state.worstEvent = { text:text, amount:amount }; }
}

function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(function() { t.className = 'toast'; }, 3000);
}

function render() {
  var app = document.getElementById('app');
  if (state.phase === 'intro') app.innerHTML = renderIntro();
  else if (state.phase === 'end') app.innerHTML = renderEnd();
  else app.innerHTML = renderGame();
  attachEvents();
}

// ─── INTRO ────────────────────────────────────────────────────────────
function renderIntro() {
  return '<div class="intro-screen">' +
    '<img class="intro-logo" src="icon.png" alt="Life Monopoly" onerror="this.style.display=\'none\'" />' +
    '<div class="intro-title">LIFE MONOPOLY</div>' +
    '<div class="intro-subtitle">Age 20 to 100</div>' +
    '<div class="intro-tagline">Simulate your entire life journey. Roll the dice for luck, face real life events, and make smart financial choices every 5 years.</div>' +
    '<div class="intro-features">' +
    '<div class="intro-feature-chip">🎲 Luck Events</div>' +
    '<div class="intro-feature-chip">🎭 Life Stages</div>' +
    '<div class="intro-feature-chip">💰 Financial Choices</div>' +
    '<div class="intro-feature-chip">17 Steps</div>' +
    '</div>' +
    '<button class="btn-start" id="btn-start">▶ START LIFE</button>' +
    '<div class="intro-hint">Starting cash: $10,000 · Ages 20 to 100</div>' +
    '</div><div class="toast" id="toast"></div>';
}

// ─── BOARD TRACK ──────────────────────────────────────────────────────
function renderBoardTrack() {
  var tiles = AGE_STEPS.map(function(age, i) {
    var cls = 'board-tile future';
    if (i < state.stepIndex) cls = 'board-tile completed';
    else if (i === state.stepIndex) cls = 'board-tile current';
    if (age === END_AGE) cls += ' end-tile';
    var stage = getLifeStage(age);
    var check = i < state.stepIndex ? '<span class="tile-check">✓</span>' : '';
    return '<div class="' + cls + '">' + check + '<span class="tile-emoji">' + stage.emoji + '</span><span class="tile-age">' + age + '</span></div>';
  }).join('');
  return '<div class="board-section"><div class="board-section-title">🎲 Life Journey Board</div><div class="board-track" id="board-track">' + tiles + '</div></div>';
}

// ─── GAME SCREEN ──────────────────────────────────────────────────────
function renderGame() {
  var age = state.currentAge;
  var stage = getLifeStage(age);
  var progress = getProgress();
  var lifeEvents = LIFE_STAGE_EVENTS[age] || [];
  var phaseNames = ['dice','lifestage','choice'];
  var phaseIdx = phaseNames.indexOf(state.phase);
  var phaseDots = phaseNames.map(function(p, i) {
    var cls = 'phase-dot';
    if (i < phaseIdx) cls += ' done';
    else if (i === phaseIdx) cls += ' active';
    return '<div class="' + cls + '"></div>';
  }).join('');
  var mainSection = '';
  if (state.phase === 'dice') mainSection = renderDicePhase();
  else if (state.phase === 'lifestage') mainSection = renderLifeStagePhase(lifeEvents);
  else if (state.phase === 'choice') mainSection = renderChoicePhase(age);

  return '<div class="game-screen">' +
    '<div class="top-bar">' +
    '<div class="top-bar-title">🎲 Life Monopoly</div>' +
    '<div class="top-bar-stats">' +
    '<div class="stat-chip age">🎂 Age ' + age + '</div>' +
    '<div class="stat-chip cash">💵 ' + fmt(state.cash) + '</div>' +
    '<div class="stat-chip net">📊 ' + fmt(state.netWorth) + '</div>' +
    '<button class="btn-reset-top" id="btn-reset">↺ Reset</button>' +
    '</div></div>' +
    renderBoardTrack() +
    '<div class="main-content">' +
    '<div class="age-header">' +
    '<div class="age-header-left">' +
    '<div class="age-label">Current Age</div>' +
    '<div class="age-number">' + age + '</div>' +
    '<div class="age-range">Ages ' + age + ' to ' + (age + STEP - 1) + '</div>' +
    '</div>' +
    '<div class="age-header-right">' +
    '<div class="life-stage-badge">' + stage.emoji + ' ' + stage.name + '</div>' +
    '<div style="font-size:0.7rem;color:rgba(255,255,255,0.4);text-align:right;">Step ' + (state.stepIndex + 1) + ' of ' + AGE_STEPS.length + '</div>' +
    '<div class="progress-bar-wrap" style="margin-left:auto;"><div class="progress-bar-fill" style="width:' + progress + '%"></div></div>' +
    '</div></div>' +
    '<div class="phase-indicator">' + phaseDots + '</div>' +
    mainSection +
    renderNetWorthPanel() +
    renderHistory() +
    '</div></div>' +
    '<div class="toast" id="toast"></div>';
}

// ─── DICE PHASE ───────────────────────────────────────────────────────
function renderDicePhase() {
  var diceFace = state.lastDiceValue ? DICE_FACES[state.lastDiceValue - 1] : '🎲';
  var rolled = state.diceRolled;
  var eventHtml = (rolled && state.luckEvent) ? renderEventResult(state.luckEvent) : '';
  var nextBtn = rolled ? '<button class="btn-confirm" id="btn-next-phase" style="margin-top:14px;">Continue to Life Events →</button>' : '';
  return '<div class="phase-label">Phase 1 — Luck Event</div>' +
    '<div class="dice-section">' +
    '<div class="dice-title">🎲 Roll the Dice of Fate</div>' +
    '<div class="dice-desc">Dice 1-2 = bad luck · 3 = neutral · 4-6 = good luck</div>' +
    '<div class="dice-row">' +
    '<div class="dice-display" id="dice-display">' + diceFace + '</div>' +
    '<button class="btn-roll" id="btn-roll"' + (rolled ? ' disabled' : '') + '>' + (rolled ? '✓ Rolled!' : '🎲 Roll Dice') + '</button>' +
    '</div>' + eventHtml + nextBtn + '</div>';
}

function renderEventResult(event) {
  var amtClass = event.amount > 0 ? 'positive' : event.amount < 0 ? 'negative' : 'zero';
  var amtText = event.amount > 0 ? '+' + fmt(event.amount) : event.amount < 0 ? '-' + fmt(Math.abs(event.amount)) : 'No change';
  return '<div class="event-result ' + event.type + '">' +
    '<div class="event-result-icon">' + event.icon + '</div>' +
    '<div class="event-result-body">' +
    '<div class="event-result-name">' + event.name + '</div>' +
    '<div class="event-result-desc">' + event.desc + '</div>' +
    '<div class="event-result-amount ' + amtClass + '">' + amtText + '</div>' +
    '</div></div>';
}

// ─── LIFE STAGE PHASE ─────────────────────────────────────────────────
function renderLifeStagePhase(lifeEvents) {
  var eventCards = lifeEvents.map(function(ev) {
    var costText = ev.amount >= 0 ? '+' + fmt(ev.amount) : '-' + fmt(Math.abs(ev.amount));
    var costCls = ev.amount >= 0 ? 'income' : '';
    return '<div class="lifestage-event-card">' +
      '<div class="lifestage-event-icon">' + ev.icon + '</div>' +
      '<div class="lifestage-event-body">' +
      '<div class="lifestage-event-name">' + ev.name + '</div>' +
      '<div class="lifestage-event-desc">' + ev.desc + '</div>' +
      '</div>' +
      '<div class="lifestage-event-cost ' + costCls + '">' + costText + '</div>' +
      '</div>';
  }).join('');
  var totalCost = lifeEvents.reduce(function(s, e) { return s + e.amount; }, 0);
  var totalText = totalCost >= 0 ? '+' + fmt(totalCost) : '-' + fmt(Math.abs(totalCost));
  var totalColor = totalCost >= 0 ? '#90EE90' : '#FF6B6B';
  var noEvents = lifeEvents.length === 0 ? '<div style="color:rgba(255,255,255,0.4);font-size:0.85rem;padding:8px 0;">No major life events this period.</div>' : '';
  return '<div class="phase-label">Phase 2 — Life Stage Events</div>' +
    '<div class="lifestage-section">' +
    '<div class="lifestage-title">🎭 Life Events This Period</div>' +
    '<div class="lifestage-desc">These events happen automatically. You cannot avoid them!</div>' +
    '<div class="lifestage-events">' + eventCards + noEvents + '</div>' +
    '<div style="margin-top:14px;padding:12px 14px;background:rgba(255,255,255,0.06);border-radius:10px;display:flex;justify-content:space-between;align-items:center;">' +
    '<span style="font-size:0.78rem;font-weight:800;color:rgba(255,255,255,0.5);">NET IMPACT THIS PERIOD</span>' +
    '<span style="font-family:Fredoka One,cursive;font-size:1.15rem;color:' + totalColor + ';">' + totalText + '</span>' +
    '</div>' +
    '<button class="btn-confirm" id="btn-accept-lifestage" style="margin-top:14px;">Accept and Make Financial Choices →</button>' +
    '</div>';
}

// ─── CHOICE PHASE ─────────────────────────────────────────────────────
function renderChoicePhase(age) {
  var cats = Object.keys(FINANCIAL_CHOICES);
  var tabsHtml = cats.map(function(key) {
    return '<button class="choice-tab' + (state.selectedChoiceCategory === key ? ' active' : '') + '" data-cat="' + key + '">' + FINANCIAL_CHOICES[key].label + '</button>';
  }).join('');
  var currentCat = FINANCIAL_CHOICES[state.selectedChoiceCategory];
  var optionsHtml = currentCat.options.map(function(opt) {
    var disabled = age < opt.minAge || age > opt.maxAge;
    var selected = state.selectedChoice && state.selectedChoice.id === opt.id;
    var tagsHtml = opt.tags.map(function(t) { return '<span class="choice-tag ' + t.type + '">' + t.label + '</span>'; }).join('');
    var check = selected ? '<div class="choice-selected-check">✓</div>' : '';
    var clickAttr = disabled ? '' : ' onclick="selectChoice(this)"';
    return '<div class="choice-card' + (disabled ? ' disabled-choice' : '') + (selected ? ' selected' : '') + '" data-opt-id="' + opt.id + '" data-cat="' + state.selectedChoiceCategory + '"' + clickAttr + '>' +
      '<div class="choice-card-icon">' + opt.icon + '</div>' +
      '<div class="choice-card-body">' +
      '<div class="choice-card-name">' + opt.name + '</div>' +
      '<div class="choice-card-desc">' + opt.desc + '</div>' +
      '<div class="choice-card-meta">' + tagsHtml + '</div>' +
      '</div>' + check + '</div>';
  }).join('');
  var insHtml = '';
  if (state.hasLifeInsurance) insHtml += '<span class="ins-badge">❤️ Life Ins.</span>';
  if (state.hasHealthInsurance) insHtml += '<span class="ins-badge">🏥 Health Ins.</span>';
  var insBadges = insHtml ? '<div class="insurance-badges">' + insHtml + '</div>' : '';
  var isLast = state.stepIndex >= AGE_STEPS.length - 1;
  var confirmLabel = isLast ? '🏆 See Final Results' : '⏭️ End Turn — Age ' + (state.currentAge + STEP);
  return '<div class="phase-label">Phase 3 — Financial Choice</div>' +
    '<div class="choices-section">' +
    '<div class="choices-title">💰 Make Your Financial Move</div>' +
    '<div class="choices-desc">Choose one action per category, or skip. Your choices compound over time!</div>' +
    insBadges +
    '<div class="choices-tabs">' + tabsHtml + '</div>' +
    '<div class="choice-options" id="choice-options">' + optionsHtml + '</div>' +
    '</div>' +
    '<button class="btn-confirm" id="btn-end-turn"' + (state.selectedChoice ? '' : ' disabled') + '>' + confirmLabel + '</button>';
}

// ─── NET WORTH PANEL ──────────────────────────────────────────────────
function renderNetWorthPanel() {
  return '<div class="networth-panel">' +
    '<div class="networth-title">📊 Financial Snapshot</div>' +
    '<div class="networth-grid">' +
    '<div class="nw-card"><div class="nw-card-label">Cash on Hand</div><div class="nw-card-value ' + (state.cash >= 0 ? 'positive' : 'negative') + '">' + fmt(state.cash) + '</div></div>' +
    '<div class="nw-card"><div class="nw-card-label">Investments</div><div class="nw-card-value gold">' + fmt(state.investments) + '</div></div>' +
    '<div class="nw-card"><div class="nw-card-label">Net Worth</div><div class="nw-card-value ' + (state.netWorth >= 0 ? 'positive' : 'negative') + '">' + fmt(state.netWorth) + '</div></div>' +
    '<div class="nw-card"><div class="nw-card-label">Passive Income/yr</div><div class="nw-card-value gold">' + fmt(state.passiveIncome) + '</div></div>' +
    '</div></div>';
}

// ─── HISTORY ──────────────────────────────────────────────────────────
function renderHistory() {
  if (!state.history.length) return '';
  var items = state.history.slice(0, 15).map(function(h) {
    var amtClass = h.amount > 0 ? 'pos' : h.amount < 0 ? 'neg' : '';
    var amtText = h.amount > 0 ? '+' + fmt(h.amount) : h.amount < 0 ? '-' + fmt(Math.abs(h.amount)) : '';
    return '<div class="history-item">' +
      '<span class="history-age-badge">Age ' + h.age + '</span>' +
      '<span class="history-text">' + h.text + '</span>' +
      (amtText ? '<span class="history-amount ' + amtClass + '">' + amtText + '</span>' : '') +
      '</div>';
  }).join('');
  return '<div class="history-section"><div class="history-title">📋 Life History</div><div class="history-list">' + items + '</div></div>';
}

// ─── END SCREEN ───────────────────────────────────────────────────────
function renderEnd() {
  var g = calcGrade();
  var goodCount = state.history.filter(function(h) { return h.amount > 0; }).length;
  var badCount = state.history.filter(function(h) { return h.amount < 0; }).length;
  var best = state.bestEvent ? state.bestEvent.text + ' (+' + fmt(state.bestEvent.amount) + ')' : 'None';
  var worst = state.worstEvent ? state.worstEvent.text + ' (-' + fmt(Math.abs(state.worstEvent.amount)) + ')' : 'None';
  return '<div class="end-screen">' +
    '<div class="end-trophy">🏆</div>' +
    '<div class="end-title">Life Complete!</div>' +
    '<div class="end-subtitle">You lived from age 20 to 100</div>' +
    '<div class="end-grade-badge ' + g.grade + '">' + g.grade + '</div>' +
    '<div class="end-grade-title" style="color:' + g.color + '">' + g.title + '</div>' +
    '<div class="end-stats-grid">' +
    '<div class="end-stat-card"><div class="end-stat-label">Final Net Worth</div><div class="end-stat-value ' + (state.netWorth >= 0 ? 'gold' : 'red') + '">' + fmt(state.netWorth) + '</div></div>' +
    '<div class="end-stat-card"><div class="end-stat-label">Cash on Hand</div><div class="end-stat-value ' + (state.cash >= 0 ? 'green' : 'red') + '">' + fmt(state.cash) + '</div></div>' +
    '<div class="end-stat-card"><div class="end-stat-label">Total Gained</div><div class="end-stat-value green">+' + fmt(state.totalGood) + '</div></div>' +
    '<div class="end-stat-card"><div class="end-stat-label">Total Lost</div><div class="end-stat-value red">-' + fmt(Math.abs(state.totalBad)) + '</div></div>' +
    '<div class="end-stat-card"><div class="end-stat-label">Good Events</div><div class="end-stat-value green">' + goodCount + '</div></div>' +
    '<div class="end-stat-card"><div class="end-stat-label">Bad Events</div><div class="end-stat-value red">' + badCount + '</div></div>' +
    '</div>' +
    '<div class="end-best-worst">' +
    '<div class="end-bw-card"><div class="end-bw-label">🌟 Best Moment</div><div class="end-bw-text">' + best + '</div></div>' +
    '<div class="end-bw-card"><div class="end-bw-label">💔 Worst Moment</div><div class="end-bw-text">' + worst + '</div></div>' +
    '</div>' +
    '<button class="btn-play-again" id="btn-play-again">▶ Play Again</button>' +
    '</div><div class="toast" id="toast"></div>';
}

// ─── EVENTS ───────────────────────────────────────────────────────────
function attachEvents() {
  var btnStart = document.getElementById('btn-start');
  if (btnStart) btnStart.onclick = function() { state.phase = 'dice'; render(); scrollBoardToCurrent(); };
  var btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.onclick = function() { if (confirm('Reset your entire life journey? This cannot be undone.')) { resetState(); render(); } };
  var btnPlayAgain = document.getElementById('btn-play-again');
  if (btnPlayAgain) btnPlayAgain.onclick = function() { resetState(); render(); };
  var btnRoll = document.getElementById('btn-roll');
  if (btnRoll) btnRoll.onclick = handleRoll;
  var btnNext = document.getElementById('btn-next-phase');
  if (btnNext) btnNext.onclick = function() { state.phase = 'lifestage'; render(); scrollBoardToCurrent(); };
  var btnAccept = document.getElementById('btn-accept-lifestage');
  if (btnAccept) btnAccept.onclick = handleAcceptLifeStage;
  document.querySelectorAll('.choice-tab').forEach(function(tab) {
    tab.onclick = function() { state.selectedChoiceCategory = tab.dataset.cat; state.selectedChoice = null; render(); scrollBoardToCurrent(); };
  });
  var btnEnd = document.getElementById('btn-end-turn');
  if (btnEnd) btnEnd.onclick = handleEndTurn;
}

function scrollBoardToCurrent() {
  setTimeout(function() {
    var track = document.getElementById('board-track');
    if (!track) return;
    var tile = track.children[state.stepIndex];
    if (tile) tile.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  }, 100);
}

window.selectChoice = function(el) {
  var optId = el.dataset.optId;
  var cat = el.dataset.cat;
  var catData = FINANCIAL_CHOICES[cat];
  if (!catData) return;
  var opt = null;
  for (var i = 0; i < catData.options.length; i++) { if (catData.options[i].id === optId) { opt = catData.options[i]; break; } }
  if (!opt) return;
  if (state.currentAge < opt.minAge || state.currentAge > opt.maxAge) return;
  state.selectedChoice = opt;
  state.selectedChoiceCategory = cat;
  render();
  scrollBoardToCurrent();
};

// ─── HANDLE ROLL ──────────────────────────────────────────────────────
function handleRoll() {
  if (state.diceRolled) return;
  var diceEl = document.getElementById('dice-display');
  if (diceEl) diceEl.classList.add('rolling');
  var count = 0;
  var interval = setInterval(function() {
    if (diceEl) diceEl.textContent = DICE_FACES[Math.floor(Math.random() * 6)];
    count++;
    if (count >= 8) {
      clearInterval(interval);
      var value = rollDice();
      state.lastDiceValue = value;
      if (diceEl) { diceEl.textContent = DICE_FACES[value - 1]; diceEl.classList.remove('rolling'); }
      var event = getLuckEvent(value);
      state.luckEvent = event;
      state.diceRolled = true;
      var actualAmount = event.amount;
      if (event.type === 'bad' && state.hasLifeInsurance) actualAmount = Math.round(actualAmount * 0.6);
      if ((event.name.indexOf('Medical') >= 0 || event.name.indexOf('Hospitalisation') >= 0) && state.hasHealthInsurance) actualAmount = Math.round(actualAmount * 0.5);
      if (event.isMarketCrash) {
        var crashLoss = Math.round(state.investments * 0.3);
        state.investments = Math.max(0, state.investments - crashLoss);
        actualAmount = -crashLoss;
        state.luckEvent = { icon: event.icon, name: event.name, desc: event.desc, amount: actualAmount, type: event.type };
      }
      state.cash += actualAmount;
      updateNetWorth();
      addHistory(state.currentAge, '🎲 ' + event.name, actualAmount);
      if (actualAmount > 0) showToast('🎉 ' + event.name + ': +' + fmt(actualAmount), 'good');
      else if (actualAmount < 0) showToast('😬 ' + event.name + ': -' + fmt(Math.abs(actualAmount)), 'bad');
      else showToast('😐 ' + event.name + ': Nothing happened');
      saveState();
      render();
      scrollBoardToCurrent();
    }
  }, 80);
}

// ─── HANDLE LIFE STAGE ────────────────────────────────────────────────
function handleAcceptLifeStage() {
  var age = state.currentAge;
  var events = LIFE_STAGE_EVENTS[age] || [];
  for (var i = 0; i < events.length; i++) {
    state.cash += events[i].amount;
    addHistory(age, '🎭 ' + events[i].name, events[i].amount);
  }
  if (state.passiveIncome > 0) {
    var income = state.passiveIncome * STEP;
    state.cash += income;
    addHistory(age, '💵 Passive income (' + STEP + ' years)', income);
  }
  if (state.investments > 0) {
    var growth = Math.round(state.investments * 0.07 * STEP);
    state.investments += growth;
    addHistory(age, '📈 Investment growth (7% x ' + STEP + 'yr)', growth);
  }
  updateNetWorth();
  state.phase = 'choice';
  state.selectedChoice = null;
  saveState();
  render();
  scrollBoardToCurrent();
}

// ─── HANDLE END TURN ──────────────────────────────────────────────────
function handleEndTurn() {
  if (!state.selectedChoice) return;
  var choice = state.selectedChoice;
  var prevNW = state.netWorth;
  if (choice.cost !== 0) {
    state.cash += choice.cost;
    if (choice.cost < 0 && choice.annualReturn) state.investments += Math.abs(choice.cost);
  }
  if (choice.id === 'business') {
    if (Math.random() < 0.5) {
      var gainB = Math.abs(choice.cost) * 2;
      state.cash += gainB;
      addHistory(state.currentAge, '🏪 Business Success! 3x return', gainB);
      showToast('🎉 Business succeeded! 3x return!', 'good');
    } else {
      addHistory(state.currentAge, '🏪 Business Failed — lost investment', choice.cost);
      showToast('😬 Business failed — lost everything!', 'bad');
    }
  } else if (choice.id === 'crypto') {
    if (Math.random() < 0.3) {
      var gainC = Math.abs(choice.cost) * 4;
      state.cash += gainC;
      addHistory(state.currentAge, '🪙 Crypto moonshot! 5x return', gainC);
      showToast('🚀 Crypto 5x! To the moon!', 'good');
    } else {
      var lossC = Math.round(Math.abs(choice.cost) * 0.8);
      state.cash -= lossC;
      addHistory(state.currentAge, '🪙 Crypto crashed — lost 80%', -lossC);
      showToast('📉 Crypto crashed — lost 80%!', 'bad');
    }
  } else if (choice.id === 'sell_property') {
    addHistory(state.currentAge, '🏠 Sold property', choice.cost);
    showToast('💰 Property sold for +' + fmt(choice.cost) + '!', 'good');
  } else if (choice.cost !== 0) {
    addHistory(state.currentAge, '💰 ' + choice.name, choice.cost);
  }
  if (choice.protection === 'life') state.hasLifeInsurance = true;
  if (choice.protection === 'health') state.hasHealthInsurance = true;
  if (choice.passiveIncome) state.passiveIncome += choice.passiveIncome;
  updateNetWorth();
  state.lastNetWorthChange = state.netWorth - prevNW;
  state.stepIndex++;
  if (state.stepIndex >= AGE_STEPS.length) {
    state.phase = 'end';
    saveState();
    render();
    return;
  }
  state.currentAge = AGE_STEPS[state.stepIndex];
  state.phase = 'dice';
  state.diceRolled = false;
  state.luckEvent = null;
  state.selectedChoice = null;
  state.lastDiceValue = null;
  saveState();
  render();
  scrollBoardToCurrent();
  window.scrollTo({ top:0, behavior:'smooth' });
  showToast('🎂 Welcome to Age ' + state.currentAge + '!');
}

// ─── INIT ─────────────────────────────────────────────────────────────
loadState();
render();
if (state.phase !== 'intro' && state.phase !== 'end') { setTimeout(scrollBoardToCurrent, 300); }
