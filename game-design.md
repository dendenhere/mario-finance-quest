# Monopoly Life Simulation — Game Design

## Overview
- Age range: 20 → 100 (17 steps of 5 years each)
- Starting cash: $10,000
- Each turn: Luck Event → Life Stage Event → Financial Choice
- Goal: Maximize net worth by age 100

---

## Age Brackets & Life Stage Events

| Age | Life Stage | Mandatory Events |
|-----|-----------|-----------------|
| 20–24 | Young Adult | Start first job (+$2K/yr salary), student loan repayment (-$500/step) |
| 25–29 | Career Building | Career advancement, dating costs |
| 30–34 | Settling Down | Wedding (-$30K), BTO flat deposit (-$25K) |
| 35–39 | Family Start | First child born (-$20K), childcare costs (-$5K/yr) |
| 40–44 | Mid Career | Second child option (-$15K), career peak |
| 45–49 | Family Growth | Kids' education fund (-$10K), home upgrade option |
| 50–54 | Pre-Retirement | CPF top-up option, kids leaving home |
| 55–59 | Late Career | Retirement planning, health insurance (+$3K/yr) |
| 60–64 | Early Retirement | Pension starts (+$1.5K/mo), travel costs |
| 65–69 | Active Retirement | Healthcare costs rise (-$8K/step) |
| 70–74 | Retirement | Grandchildren gifts (-$5K), downsizing option |
| 75–79 | Senior | Medical costs (-$15K/step), senior activities |
| 80–84 | Elder | Nursing home option (-$30K/step), family support |
| 85–89 | Late Elder | High medical costs (-$20K/step) |
| 90–94 | Very Senior | Estate planning, legacy gifts |
| 95–99 | Centenarian | Final years, inheritance distribution |
| 100 | End of Journey | Final net worth calculated |

---

## Luck Events Pool (Randomised Dice Roll)

### Bad Events (probability ~40%)
- Illness/hospitalisation: -$15,000
- Car accident: -$8,000
- Job retrenchment: -$25,000 (working age only)
- Market crash (portfolio -30%): affects investments
- Flood/home damage: -$12,000
- Scam victim: -$10,000
- Divorce: -$40,000 (if married)
- Failed business: -$20,000
- Parent medical emergency: -$18,000

### Neutral Events (probability ~20%)
- Nothing happens: $0
- Minor car repair: -$2,000
- Small bonus at work: +$3,000

### Good Events (probability ~40%)
- TOTO windfall: +$50,000
- Job promotion: +$15,000 salary boost
- Inheritance from relative: +$30,000
- Stock tip pays off: +$20,000
- Property en bloc: +$80,000
- Side hustle success: +$10,000
- Bonus payout: +$8,000
- Crypto moonshot: +$25,000 (age 20-50 only)

---

## Financial Choices (Per Step)

### Property
- Buy HDB flat: -$25,000 down payment, +$2,000/mo rental income if rented
- Upgrade to condo: -$80,000 top-up
- Buy investment property: -$50,000, +$3,000/mo passive income
- Sell property: +market value (1.5x–3x original)
- Do nothing

### Investments
- Invest in index fund (S&P 500): -$10,000, 7% annual growth
- Buy REITs: -$15,000, 5% dividend yield
- Start a business: -$30,000, high risk/reward (50% chance 2x, 50% lose all)
- Buy crypto: -$5,000, very high risk (30% 5x, 70% lose 80%)
- CPF top-up: -$7,000, guaranteed 4% return
- Do nothing

### Insurance & Protection
- Buy life insurance: -$2,000/yr, protects against illness events
- Buy health insurance: -$3,000/yr, reduces medical costs by 50%
- Do nothing

---

## Scoring & Grades

| Net Worth at 100 | Grade | Title |
|-----------------|-------|-------|
| $1,000,000+ | S | Monopoly Legend |
| $500,000–$999,999 | A | Property Tycoon |
| $200,000–$499,999 | B | Comfortable Retiree |
| $50,000–$199,999 | C | Getting By |
| $0–$49,999 | D | Broke at 100 |
| Negative | F | Bankrupt |
