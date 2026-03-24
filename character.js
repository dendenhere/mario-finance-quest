// ============================================================
// PIXEL ART CHARACTER SYSTEM — Life Monopoly
// Renders a canvas-based pixel art character that changes
// based on age, life events, luck outcomes, and finances.
// ============================================================

var CHAR = (function () {

  // ── Palette ─────────────────────────────────────────────
  var P = {
    skin1:  '#FDBCB4', skin2:  '#F4956A', skin3:  '#C68642',
    hair1:  '#2C1810', hair2:  '#6B3A2A', hair3:  '#C8A96E', hair4:  '#E8E8E8',
    shirt1: '#E74C3C', shirt2: '#3498DB', shirt3: '#2ECC71', shirt4: '#9B59B6', shirt5: '#F39C12', shirt6: '#1ABC9C',
    pants1: '#2C3E50', pants2: '#7F8C8D', pants3: '#8B4513',
    shoe1:  '#1A1A1A', shoe2:  '#4A3728',
    acc1:   '#F1C40F', acc2:   '#E74C3C', acc3:   '#ECF0F1',
    bg1:    'transparent',
    white:  '#FFFFFF', black:  '#000000',
    outline:'#1A1A1A',
    gold:   '#FFD700', silver: '#C0C0C0',
    red:    '#E74C3C', green:  '#2ECC71', blue:   '#3498DB',
    orange: '#E67E22', purple: '#9B59B6', teal:   '#1ABC9C',
    pink:   '#FF69B4', lime:   '#ADFF2F',
    grey1:  '#BDC3C7', grey2:  '#95A5A6',
    cane:   '#8B4513', wheelchair: '#4A90D9',
    halo:   '#FFD700', angel:  '#FFFDE7',
  };

  // ── Pixel grid helpers ───────────────────────────────────
  // Each sprite is a 16×20 grid of [color|null] entries
  // drawGrid(ctx, grid, scale) — renders it
  function drawGrid(ctx, grid, scale, offsetX, offsetY) {
    var ox = offsetX || 0;
    var oy = offsetY || 0;
    for (var row = 0; row < grid.length; row++) {
      for (var col = 0; col < grid[row].length; col++) {
        var c = grid[row][col];
        if (!c) continue;
        ctx.fillStyle = c;
        ctx.fillRect(ox + col * scale, oy + row * scale, scale, scale);
        // subtle pixel outline
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(ox + col * scale + scale - 1, oy + row * scale, 1, scale);
        ctx.fillRect(ox + col * scale, oy + row * scale + scale - 1, scale, 1);
      }
    }
  }

  // ── Sprite definitions ───────────────────────────────────
  // W = 16 cols, H = 20 rows. null = transparent.
  // Each sprite is a function(palette) → 2D array

  function spriteYoungAdult(p) {
    // Energetic student with backpack vibe
    var s = p.skin1, h = p.hair1, sh = p.shirt2, pn = p.pants1, sk = p.shoe1, a = p.acc1;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteCareerStart(p) {
    // Smart office worker with tie
    var s = p.skin1, h = p.hair1, sh = p.acc3, pn = p.pants1, sk = p.shoe1;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,p.acc1,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,p.acc1,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,p.acc1,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,p.acc1,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteSettlingDown(p) {
    // Couple — character with ring
    var s = p.skin1, h = p.hair2, sh = p.shirt3, pn = p.pants2, sk = p.shoe2;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,p.gold,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,p.gold,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteFamilyStart(p) {
    // Parent holding baby
    var s = p.skin1, h = p.hair2, sh = p.shirt5, pn = p.pants1, sk = p.shoe1;
    var bs = p.skin2; // baby skin
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,bs,bs,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,bs,bs,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteMidCareer(p) {
    // Power suit — peak career
    var s = p.skin1, h = p.hair1, sh = p.pants1, pn = p.pants1, sk = p.shoe1;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,p.acc3,p.acc3,p.acc3,p.acc3,p.acc3,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,p.acc3,p.acc3,p.acc3,p.acc3,p.acc3,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,p.acc3,p.acc3,p.acc3,p.acc3,p.acc3,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,p.acc3,p.acc3,p.acc3,p.acc3,p.acc3,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteFamilyGrowth(p) {
    // Casual family person, slightly greying
    var s = p.skin1, h = p.hair3, sh = p.shirt4, pn = p.pants2, sk = p.shoe2;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spritePreRetirement(p) {
    // Greying hair, relaxed shirt
    var s = p.skin2, h = p.hair4, sh = p.shirt6, pn = p.pants2, sk = p.shoe2;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.red,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,null,null,null,null,null],
    ];
  }

  function spriteRetirement(p) {
    // Retiree with walking cane
    var s = p.skin2, h = p.hair4, sh = p.shirt1, pn = p.pants2, sk = p.shoe2, c = p.cane;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.grey1,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,c,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,c,null,null,null,null],
    ];
  }

  function spriteElder(p) {
    // Elder with white hair, hunched slightly
    var s = p.skin3, h = p.hair4, sh = p.grey1, pn = p.grey2, sk = p.shoe2, c = p.cane;
    return [
      [null,null,null,null,null,null,h,h,h,h,null,null,null,null,null,null],
      [null,null,null,null,null,h,h,h,h,h,h,null,null,null,null,null],
      [null,null,null,null,h,h,h,h,h,h,h,h,null,null,null,null],
      [null,null,null,null,h,s,s,s,s,s,h,null,null,null,null,null],
      [null,null,null,null,s,s,s,s,s,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,p.black,s,p.black,s,s,null,null,null,null,null],
      [null,null,null,null,s,s,s,p.grey1,s,s,s,null,null,null,null,null],
      [null,null,null,null,null,s,s,s,s,s,null,null,null,null,null,null],
      [null,null,null,null,sh,sh,sh,sh,sh,sh,sh,null,null,null,null,null],
      [null,null,null,sh,sh,sh,sh,sh,sh,sh,sh,sh,null,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,s,sh,sh,sh,sh,sh,sh,sh,sh,sh,s,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,pn,pn,pn,pn,pn,pn,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,null,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,null,pn,pn,null,null,pn,pn,null,null,c,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,c,null,null,null,null],
      [null,null,sk,sk,sk,null,null,sk,sk,sk,null,c,null,null,null,null],
    ];
  }

  // ── Overlay sprites (event reactions) ───────────────────
  function overlayBadLuck(ctx, scale) {
    // Red X or sweat drops
    ctx.fillStyle = 'rgba(231,76,60,0.85)';
    ctx.font = 'bold ' + (scale * 5) + 'px sans-serif';
    ctx.fillText('😰', scale * 1, scale * 4);
  }
  function overlayGoodLuck(ctx, scale) {
    ctx.fillStyle = 'rgba(255,215,0,0.9)';
    ctx.font = 'bold ' + (scale * 5) + 'px sans-serif';
    ctx.fillText('🎉', scale * 1, scale * 4);
  }
  function overlayRich(ctx, scale) {
    ctx.fillStyle = 'rgba(255,215,0,0.9)';
    ctx.font = 'bold ' + (scale * 4) + 'px sans-serif';
    ctx.fillText('💰', scale * 9, scale * 4);
  }
  function overlayBroke(ctx, scale) {
    ctx.fillStyle = 'rgba(231,76,60,0.9)';
    ctx.font = 'bold ' + (scale * 4) + 'px sans-serif';
    ctx.fillText('💸', scale * 9, scale * 4);
  }

  // ── Sprite selector by age ───────────────────────────────
  function getSpriteForAge(age) {
    if (age <= 24) return spriteYoungAdult;
    if (age <= 29) return spriteCareerStart;
    if (age <= 34) return spriteSettlingDown;
    if (age <= 39) return spriteFamilyStart;
    if (age <= 44) return spriteMidCareer;
    if (age <= 49) return spriteFamilyGrowth;
    if (age <= 59) return spritePreRetirement;
    if (age <= 74) return spriteRetirement;
    return spriteElder;
  }

  // ── Background colours by life stage ────────────────────
  function getBgForAge(age) {
    if (age <= 24) return ['#1a2a6c', '#b21f1f'];
    if (age <= 29) return ['#134E5E', '#71B280'];
    if (age <= 34) return ['#c94b4b', '#4b134f'];
    if (age <= 39) return ['#f7971e', '#ffd200'];
    if (age <= 44) return ['#0f0c29', '#302b63'];
    if (age <= 49) return ['#1D4350', '#A43931'];
    if (age <= 59) return ['#373B44', '#4286f4'];
    if (age <= 74) return ['#2c3e50', '#4ca1af'];
    return ['#0f2027', '#203a43'];
  }

  // ── Main render function ─────────────────────────────────
  function render(canvasId, state) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var scale = Math.floor(Math.min(W, H) / 20);
    var spriteW = 16 * scale;
    var spriteH = 20 * scale;
    var ox = Math.floor((W - spriteW) / 2);
    var oy = Math.floor((H - spriteH) / 2);

    ctx.clearRect(0, 0, W, H);

    // Background gradient
    var age = state.currentAge || 20;
    var bg = getBgForAge(age);
    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, bg[0]);
    grad.addColorStop(1, bg[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Pixel grid overlay (subtle)
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    for (var gx = 0; gx < W; gx += scale) {
      for (var gy = 0; gy < H; gy += scale) {
        ctx.fillRect(gx, gy, 1, 1);
      }
    }

    // Draw sprite
    var spriteFn = getSpriteForAge(age);
    var grid = spriteFn(P);
    drawGrid(ctx, grid, scale, ox, oy);

    // Draw event overlay emoji
    var nw = state.netWorth || 0;
    var lastEvent = state.lastEventType || null;
    if (lastEvent === 'bad') overlayBadLuck(ctx, scale);
    else if (lastEvent === 'good') overlayGoodLuck(ctx, scale);
    if (nw >= 500000) overlayRich(ctx, scale);
    else if (nw < 0) overlayBroke(ctx, scale);

    // Age label at bottom
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, H - scale * 2.5, W, scale * 2.5);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold ' + Math.floor(scale * 1.6) + 'px "Fredoka One", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('AGE ' + age, W / 2, H - scale * 0.6);
  }

  // ── Bobbing animation ────────────────────────────────────
  var _animFrame = null;
  var _bobOffset = 0;
  var _bobDir = 1;
  var _bobSpeed = 0.3;

  function startAnimation(canvasId, getState) {
    stopAnimation();
    function loop() {
      _bobOffset += _bobDir * _bobSpeed;
      if (_bobOffset > 2) _bobDir = -1;
      if (_bobOffset < -2) _bobDir = 1;
      var canvas = document.getElementById(canvasId);
      if (!canvas) { stopAnimation(); return; }
      var ctx = canvas.getContext('2d');
      var W = canvas.width, H = canvas.height;
      var scale = Math.floor(Math.min(W, H) / 20);
      // Re-render with vertical bob
      ctx.clearRect(0, 0, W, H);
      var st = getState();
      var age = st.currentAge || 20;
      var bg = getBgForAge(age);
      var grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, bg[0]);
      grad.addColorStop(1, bg[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      for (var gx = 0; gx < W; gx += scale) {
        for (var gy = 0; gy < H; gy += scale) {
          ctx.fillRect(gx, gy, 1, 1);
        }
      }
      var spriteW = 16 * scale;
      var spriteH = 20 * scale;
      var ox = Math.floor((W - spriteW) / 2);
      var oy = Math.floor((H - spriteH) / 2) + Math.round(_bobOffset);
      var spriteFn = getSpriteForAge(age);
      var grid = spriteFn(P);
      drawGrid(ctx, grid, scale, ox, oy);
      var nw = st.netWorth || 0;
      var lastEvent = st.lastEventType || null;
      if (lastEvent === 'bad') overlayBadLuck(ctx, scale);
      else if (lastEvent === 'good') overlayGoodLuck(ctx, scale);
      if (nw >= 500000) overlayRich(ctx, scale);
      else if (nw < 0) overlayBroke(ctx, scale);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, H - scale * 2.5, W, scale * 2.5);
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold ' + Math.floor(scale * 1.6) + 'px "Fredoka One", cursive';
      ctx.textAlign = 'center';
      ctx.fillText('AGE ' + age, W / 2, H - scale * 0.6);
      _animFrame = requestAnimationFrame(loop);
    }
    _animFrame = requestAnimationFrame(loop);
  }

  function stopAnimation() {
    if (_animFrame) { cancelAnimationFrame(_animFrame); _animFrame = null; }
  }

  return { render: render, startAnimation: startAnimation, stopAnimation: stopAnimation };
})();
