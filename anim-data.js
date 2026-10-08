/* 雞蛋武士 Tinkercad 教學：內容資料
 * 座標：Tinkercad 慣例，x 往右、y 往後、z 往上，單位 mm
 * 實機截圖：img/*.webp，標記座標以截圖像素（1144×734）為準
 */
(function () {
  const C = {
    egg: '#FFF0CC', white: '#FFFFFF', black: '#26262B', brow: '#6B4226', mus: '#3A2A1E',
    yellow: '#FFC21A', red: '#E53935', orange: '#F59E1B', wood: '#8D5A2B', silver: '#AEB9C2',
    blade: '#D3DBE2', gold: '#F2B705', grip: '#5D4037', wing: '#7E57C2', bone: '#40246E'
  };

  // ---------- 零件（成品） ----------
  const toe = (id, a, nm) => ({
    id, step: 3, name: nm, shape: 'sphere', size: [3.5, 13, 2.5],
    pos: [6 * Math.sin(a * Math.PI / 180), -6 * Math.cos(a * Math.PI / 180), 1.25],
    rot: [0, 0, a], group: 'foot', color: C.orange, pair: true,
    rotNote: a ? `轉 ${Math.abs(a)}°（${a > 0 ? '往右' : '往左'}攤開）` : ''
  });
  const PARTS = [
    { id: 'body', step: 1, name: '蛋身', shape: 'sphere', size: [30, 26, 38], pos: [0, 0, 31], color: C.egg },
    { id: 'leg', step: 2, name: '右腳', nameL: '左腳', shape: 'cyl', size: [3, 3, 14], pos: [6, 0, 7], color: C.orange, pair: true },
    toe('toe1', 0, '中間腳趾'), toe('toe2', 35, '右側腳趾'), toe('toe3', -35, '左側腳趾'),
    { id: 'eyeW', step: 4, name: '眼白', shape: 'sphere', size: [8, 3.5, 11], pos: [7, -10.8, 35], color: C.white, pair: true },
    { id: 'pupil', step: 4, name: '眼珠', shape: 'sphere', size: [3.5, 2, 5], pos: [7.3, -12.4, 34.5], color: C.black, pair: true },
    { id: 'brow', step: 5, name: '眉毛', shape: 'box', size: [10, 3, 2.5], pos: [7, -9.2, 42.3], rot: [0, -20, 0], color: C.brow, pair: true, rotNote: '正面那圈轉 20°' },
    { id: 'mus', step: 6, name: '鬍子', shape: 'sphere', size: [10, 4, 6], pos: [4.6, -12, 26.5], rot: [0, 15, 0], color: C.mus, pair: true, rotNote: '正面那圈轉 15°' },
    { id: 'helmet', step: 7, name: '安全帽', shape: 'half', size: [28, 26, 14], pos: [0, 0, 52], color: C.yellow },
    { id: 'brim', step: 7, name: '帽緣', shape: 'cyl', size: [32, 30, 1.5], pos: [0, -0.5, 45.25], color: C.yellow },
    { id: 'star', step: 7, name: '帽徽星星', shape: 'star', size: [7, 7, 1.5], pos: [0, -11.9, 51], rot: [90, 0, 0], color: C.red, rotNote: '轉 90° 讓它站起來' },
    { id: 'arm', step: 8, name: '手臂', shape: 'sphere', size: [7, 7, 16], pos: [17, -3, 28], rot: [0, -25, 0], color: C.egg, pair: true, rotNote: '正面那圈轉 25°' },
    { id: 'hand', step: 8, name: '拳頭', shape: 'sphere', size: [9, 9, 9], pos: [20.5, -4, 20.5], color: C.egg, pair: true },
    { id: 'axeH', step: 9, name: '斧柄', shape: 'cyl', size: [2.5, 2.5, 56], pos: [-20.5, -4, 32], color: C.wood },
    { id: 'axeB', step: 9, name: '斧刃', shape: 'halfdisc', size: [11, 2, 22], pos: [-26, -4, 50], color: C.silver, cardNote: '先做圓柱 22×22×2，再用「孔」挖掉一半' },
    { id: 'axeC', step: 9, name: '斧頭尖', shape: 'cone', size: [4, 4, 5], pos: [-20.5, -4, 62.5], color: C.silver },
    { id: 'pommel', step: 10, name: '柄頭', shape: 'sphere', size: [4.5, 4.5, 4.5], pos: [20.5, -4, 13.5], color: C.gold },
    { id: 'gripS', step: 10, name: '劍柄', shape: 'cyl', size: [3, 3, 10], pos: [20.5, -4, 19], color: C.grip },
    { id: 'guard', step: 10, name: '護手', shape: 'box', size: [14, 4, 3], pos: [20.5, -4, 25.5], color: C.gold },
    { id: 'bladeS', step: 10, name: '劍身', shape: 'box', size: [4, 1.5, 34], pos: [20.5, -4, 44], color: C.blade },
    { id: 'tip', step: 10, name: '劍尖', shape: 'roof', size: [4, 1.5, 6], pos: [20.5, -4, 64], color: C.blade },
    { id: 'bone', step: 11, name: '翅骨', shape: 'cyl', size: [2.5, 2.5, 34], pos: [17, 0, 0], rot: [0, 90, 0], group: 'wing', color: C.bone, pair: true, rotNote: '轉 90° 躺平' },
    { id: 'w1', step: 11, name: '翅膜（內）', shape: 'roof', size: [12, 1.5, 10], pos: [6, 0, -5], rot: [0, 180, 0], group: 'wing', color: C.wing, pair: true, rotNote: '轉 180° 尖端朝下' },
    { id: 'w2', step: 11, name: '翅膜（中）', shape: 'roof', size: [12, 1.5, 13], pos: [17, 0, -6.5], rot: [0, 180, 0], group: 'wing', color: C.wing, pair: true, rotNote: '轉 180° 尖端朝下' },
    { id: 'w3', step: 11, name: '翅膜（外）', shape: 'roof', size: [12, 1.5, 16], pos: [28, 0, -8], rot: [0, 180, 0], group: 'wing', color: C.wing, pair: true, rotNote: '轉 180° 尖端朝下' }
  ];
  const GROUPS = {
    foot: { pos: [6, -1, 0], rot: [0, 0, 0] },
    wing: { pos: [8, 7, 38], rot: [0, -20, 0] },
    wingFlat: { pos: [0, 0, 18], rot: [0, 0, 0] },
    wingTilt: { pos: [0, 0, 24], rot: [0, -20, 0] }
  };
  // 示範用零件（不在成品裡）
  const DEMO = [
    { id: 'liftBar', shape: 'cyl', size: [0.8, 0.8, 12], pos: [-17, -13, 6], color: '#E53935' },
    { id: 'starFlat', shape: 'star', size: [7, 7, 1.5], pos: [-7, 0, 0.75], color: C.red },
    { id: 'starUp', shape: 'star', size: [7, 7, 1.5], pos: [7, 0, 3.5], rot: [90, 0, 0], color: C.red },
    { id: 'coinFlat', shape: 'cyl', size: [22, 22, 2], pos: [0, 0, 1], color: C.silver },
    { id: 'coinUp', shape: 'cyl', size: [22, 22, 2], pos: [0, 0, 11], rot: [90, 0, 0], color: C.silver },
    { id: 'holeBox', shape: 'box', size: [12, 6, 26], pos: [6, 0, 11], hole: true, color: '#9aa4ad' },
    { id: 'halfRes', shape: 'halfdisc', size: [11, 2, 22], pos: [-5.5, 0, 11], color: C.silver },
    { id: 'fwBone', shape: 'cyl', size: [2.5, 2.5, 34], pos: [17, 0, 0], rot: [0, 90, 0], group: 'wingFlat', color: C.bone },
    { id: 'fw1', shape: 'roof', size: [12, 1.5, 10], pos: [6, 0, -5], rot: [0, 180, 0], group: 'wingFlat', color: C.wing },
    { id: 'fw2', shape: 'roof', size: [12, 1.5, 13], pos: [17, 0, -6.5], rot: [0, 180, 0], group: 'wingFlat', color: C.wing },
    { id: 'fw3', shape: 'roof', size: [12, 1.5, 16], pos: [28, 0, -8], rot: [0, 180, 0], group: 'wingFlat', color: C.wing },
    { id: 'twBone', shape: 'cyl', size: [2.5, 2.5, 34], pos: [17, 0, 0], rot: [0, 90, 0], group: 'wingTilt', color: C.bone },
    { id: 'tw1', shape: 'roof', size: [12, 1.5, 10], pos: [6, 0, -5], rot: [0, 180, 0], group: 'wingTilt', color: C.wing },
    { id: 'tw2', shape: 'roof', size: [12, 1.5, 13], pos: [17, 0, -6.5], rot: [0, 180, 0], group: 'wingTilt', color: C.wing },
    { id: 'tw3', shape: 'roof', size: [12, 1.5, 16], pos: [28, 0, -8], rot: [0, 180, 0], group: 'wingTilt', color: C.wing },
    // 貼合三種情況（上視角）
    { id: 'gEgg', shape: 'sphere', size: [30, 26, 38], pos: [0, 0, 19], color: C.egg },
    { id: 'gFloat', shape: 'sphere', size: [8, 3.5, 11], pos: [-7, -16.5, 24], color: '#FF7043' },
    { id: 'gTouch', shape: 'sphere', size: [8, 3.5, 11], pos: [0, -14.6, 24], color: '#FFCA28' },
    { id: 'gGood', shape: 'sphere', size: [8, 3.5, 11], pos: [7, -12, 24], color: '#66BB6A' },
    // 握持示範
    { id: 'hFist', shape: 'sphere', size: [12, 12, 12], pos: [0, 0, 6], color: C.egg, ghostAlpha: true },
    { id: 'hStick', shape: 'cyl', size: [3, 3, 40], pos: [0, 0, 16], color: C.wood },
    { id: 'hStickOff', shape: 'cyl', size: [3, 3, 40], pos: [14, 6, 20], color: C.wood }
  ];

  // ---------- 實機截圖圖說用小工具 ----------
  // marks: ['n',x,y,num] 紅色編號 / ['c',x,y,r] 紅圈 / ['r',x,y,w,h] 紅框 / ['t',x,y,'文字'] 標籤 / ['a',x1,y1,x2,y2] 箭頭
  const S = (img, cap, marks = [], crop = null, size = null) => ({ shot: img, cap, marks, crop, size });
  const R = (r, cap) => ({ r, cap });

  // ---------- 互動動畫（真實畫面逐格播放） ----------
  const PLAYERS = {
    align: {
      title: '對齊工具 L：把安全帽戴正',
      frames: [
        { img: 'a1_start', cur: [700, 445], cap: '帽子（黃色半圓球）放歪了，跑到蛋的右前方。我們要讓它剛好戴在蛋的正中間。', marks: [['c', 694, 440, 70], ['c', 450, 362, 62]] },
        { img: 'a2_selected', cur: [700, 440], click: true, key: 'Shift', cap: '先點「蛋」，再按住 Shift 點「帽子」，兩個都選起來（右上角會顯示 Shapes(2)）。', marks: [['r', 640, 112, 216, 32]] },
        { img: 'a3_L_dots', cur: [598, 72], key: 'L', cap: '按鍵盤 L（或點工具列的「對齊」按鈕），四周出現好多黑點。上方提示也會出現。', marks: [['r', 130, 112, 444, 54], ['c', 598, 72, 22]] },
        { img: 'a4_pinned', cur: [420, 395], click: true, cap: '⭐ 關鍵：先點一下「蛋」！蛋就被「釘住」當基準，不會亂跑。黑點會縮到蛋的周圍。', marks: [['c', 450, 362, 62]] },
        { img: 'a5_hover_lr', cur: [451, 463], cap: '把滑鼠移到「下面那排」中間的黑點，會先看到帽子的影子預覽（還沒動）。', marks: [['c', 451, 463, 16], ['t', 470, 505, '左右置中']] },
        { img: 'a6_lr_done', cur: [451, 463], click: true, cap: '點下去！帽子移到蛋的「左右正中間」了，但還在蛋的前面。', marks: [['c', 451, 463, 16]] },
        { img: 'a7_hover_fb', cur: [372, 410], cap: '再把滑鼠移到「左邊那排」中間的黑點，影子預覽顯示帽子會往後移到蛋上。', marks: [['c', 372, 410, 16], ['t', 210, 380, '前後置中']] },
        { img: 'a8_fb_done', cur: [372, 410], click: true, cap: '點下去！帽子前後也置中了，剛好戴在蛋頭上。', marks: [['c', 372, 410, 16]] },
        { img: 'a9_final', cur: [150, 630], click: true, cap: '點空白處取消選取，完成！⚠️ 右邊直立那排是「上下」對齊，不要點，不然帽子會掉到蛋的肚子裡。', marks: [['c', 450, 330, 75]] }
      ]
    },
    wp: {
      title: '工作平面工具 W：讓眼睛貼在蛋殼上',
      frames: [
        { img: 'w1_hover', cur: [483, 358], key: 'W', cap: '先切到「前」視角。按鍵盤 W（或點右上角的格子圖示），把滑鼠移到蛋上——出現一塊藍色小板，會跟著蛋殼的弧度歪來歪去。', marks: [['c', 480, 358, 95], ['r', 380, 112, 214, 36]] },
        { img: 'w2_placed', cur: [483, 358], click: true, cap: '在想放眼睛的位置點一下！整個畫面出現橘色格線——這是一塊「斜斜貼在蛋殼上」的臨時地板。', marks: [['c', 483, 358, 18]] },
        { img: 'w3_drop', cur: [483, 358], cap: '從右邊拖一顆「圓球」進來，放在剛剛點的位置。圓球自動「站」在蛋殼表面上，不會浮在空中！', marks: [['c', 515, 325, 95]] },
        { img: 'w4_size8', cur: [461, 336], click: true, cap: '點角落白點，按 Tab 鍵就能打字：寬 8、長 8。（在斜的地板上，數字一樣照輸入。）', marks: [['c', 438, 455, 26], ['c', 556, 311, 26]] },
        { img: 'w5_height', cur: [491, 487], click: true, cap: '找到「高度」白點（在斜地板上，它會跑到朝外的那一端），點它、按 Tab，輸入 4，讓眼睛扁扁地貼著。', marks: [['c', 491, 487, 16], ['c', 283, 537, 32]] },
        { img: 'w6_eye_front', cur: [397, 440], cap: '選白色，眼睛就乖乖貼在蛋殼上了！從正面看，剛好一半在殼外。', marks: [['c', 397, 440, 55]] },
        { img: 'w7_reset_hover', cur: [150, 620], key: 'W', cap: '做完一定要還原地板：再按一次 W，滑到「蛋以外的空白地方」。', marks: [['c', 150, 620, 45]] },
        { img: 'w8_reset_done', cur: [150, 620], click: true, cap: '點一下空白處，地板變回原本藍色的「工作平面」。之後拖進來的形狀才會放在地上。', marks: [['c', 450, 360, 70]] }
      ]
    },
    grip: {
      title: '握持：讓武器柄穿過拳頭',
      frames: [
        { img: 'h1_parts', cur: [366, 520], cap: '準備一顆拳頭（圓球）和一根柄（圓柱，寬 4、長 4、高 50）。', marks: [['c', 252, 497, 45], ['c', 366, 512, 40]] },
        { img: 'h2_L', cur: [598, 72], key: 'L', click: true, cap: '點拳頭，Shift＋點柄，兩個都選好後按 L 開啟對齊。', marks: [['c', 598, 72, 22]] },
        { img: 'h3_pinned', cur: [250, 497], click: true, cap: '先點「拳頭」當基準（拳頭不會動），黑點縮到拳頭周圍。', marks: [['c', 252, 497, 45]] },
        { img: 'h4_aligned', cur: [197, 519], click: true, cap: '點「下面那排」中間黑點、再點「左邊那排」中間黑點——柄就穿過拳頭正中心！變灰色的點代表「已經對齊了」。', marks: [['c', 248, 571, 14], ['c', 197, 519, 14]] },
        { img: 'h5_palette', size: [686, 440], cur: [535, 313], click: true, cap: '想看清楚柄有沒有在裡面？選拳頭 → 點顏色 → 「透明」選「開啟」。', marks: [['c', 535, 313, 22]] },
        { img: 'h6_transparent', cur: [150, 690], cap: '拳頭變透明，看得到柄確實從中間穿過去。確認好再把「透明」關掉。', marks: [['c', 310, 518, 50]] }
      ]
    },
    hole: {
      title: '挖孔：把圓柱切成半圓（斧刃）',
      frames: [
        { img: 'k1_coin', cur: [659, 563], cap: '拉一個圓柱，高度改成 2，變成一枚「硬幣」。', marks: [['c', 644, 605, 55], ['c', 735, 609, 26]] },
        { img: 'k3_hole_box', cur: [918, 275], cap: '從形狀庫第一排拉一個「透明條紋的方塊」——這就是「孔」方塊。', marks: [['c', 712, 535, 70]] },
        { img: 'k2_hole_panel', cur: [775, 199], cap: '任何形狀都能變成孔：在右上角面板點「孔」。條紋＝孔＝等一下要挖掉的地方。', marks: [['c', 775, 199, 30]] },
        { img: 'k4_hole_cover', cur: [700, 560], key: '→', cap: '用對齊把孔方塊對到硬幣中間，再按 → 鍵 10 下（往右 10 mm），蓋住硬幣右半邊。', marks: [['c', 690, 590, 80]] },
        { img: 'k5_both_selected', cur: [615, 605], click: true, key: 'Shift', cap: '框選（或 Shift＋點）硬幣和孔方塊，兩個一起選。', marks: [] },
        { img: 'k6_half_disc', cur: [450, 690], key: 'Ctrl+G', cap: '按 Ctrl＋G 群組——孔蓋到的地方被挖掉了，剩下半圓形！這就是斧刃。', marks: [['c', 625, 608, 55]] }
      ]
    }
  };

  // ---------- 課前與技巧 ----------
  const INTRO = {
    ui: S('ui_empty', 'Tinkercad 編輯畫面（真實截圖）', [
      ['n', 180, 23, 1], ['n', 610, 72, 2], ['n', 62, 160, 3], ['n', 34, 352, 4], ['n', 430, 520, 5],
      ['n', 960, 131, 6], ['n', 1005, 430, 7], ['n', 760, 711, 8]
    ]),
    uiLegend: [
      ['設計名稱', '點一下可以改名字，例如「雞蛋武士-五年三班-01號」。'],
      ['工具列', '複製、刪除、復原，還有群組、對齊、鏡射…之後每一節都會用到。'],
      ['視角方塊', '點「上」從上面看、點「前」從正面看。檢查零件位置超好用。'],
      ['視角按鈕', '⌂ 回到原本視角、◇ 放大到選取的形狀、＋／－ 縮放。'],
      ['工作平面', '藍色格子地板，一格 1 mm，零件都放在這裡。'],
      ['工作平面工具／尺規', '格子圖示＝工作平面工具（W），L 形尺＝尺規。'],
      ['基本造型（形狀庫）', '把形狀從這裡「拖」到地板上。第一排條紋的是「孔」。'],
      ['鎖點格線', '方向鍵每按一下移動多少 mm。要微調時改 0.5 或 0.1。']
    ],
    lib: S('lib_more', '往下捲動形狀庫，還有圓環、星形、愛心…（真實截圖）', [
      ['c', 918, 625, 34], ['t', 860, 575, '星形']
    ]),
    handles: S('s1_handles', '選取形狀後出現的「控制點」（真實截圖）', [
      ['n', 499, 493, 1], ['n', 496, 445, 2], ['n', 433, 351, 3], ['n', 433, 300, 4], ['n', 434, 522, 5], ['n', 727, 180, 6]
    ]),
    handlesLegend: [
      ['角落白點', '同時改「寬」和「長」。點它再按 Tab 就能打數字。'],
      ['側邊黑點', '只改一個方向。'],
      ['頂端白點', '改「高度」。點它、按 Tab、打數字、按 Enter。'],
      ['黑色小圓錐', '抬高／降低（拖它往上就浮起來）。'],
      ['彎彎的箭頭', '旋轉。點它、按 Tab，可以直接輸入角度。'],
      ['形狀面板', '「實體」點色塊換顏色；「孔」把形狀變成挖洞用的。']
    ],
    keys: [
      ['Ctrl＋C / Ctrl＋V', '複製／貼上', 't_dup'],
      ['Ctrl＋D', '複製並重複（原地多一個）', 't_dup'],
      ['Ctrl＋G', '聯集群組（黏成一個）', 't_union'],
      ['Ctrl＋Shift＋G', '取消群組（拆開）', null],
      ['L', '對齊', null],
      ['M', '鏡射（左右翻面）', null],
      ['W', '工作平面工具', null],
      ['D', '置放到工作平面（掉回地上）', 't_drop'],
      ['方向鍵', '前後左右移動 1 mm', null],
      ['Ctrl＋↑ / ↓', '往上／往下移動 1 mm', null],
      ['Ctrl＋Z', '復原（弄壞了就按它！）', null],
      ['Tab', '點完白點後按 Tab ＝ 直接打數字', null]
    ]
  };

  // ---------- 13 個步驟 ----------
  const STEPS = [
    {
      n: 1, L: 1, title: '做出蛋身', shapes: ['圓球'], skills: ['拖曳形狀', '改尺寸', 'Tab 打數字', '抬高', '上色'],
      why: '所有零件都要黏在蛋身上，所以先做蛋身，它是整隻武士的「基準」。',
      figs: [
        S('sphere_dropped', '① 從右邊把「圓球」拖到地板中間，右上角出現它的形狀面板。', [['c', 433, 415, 48], ['c', 1092, 373, 34], ['a', 1060, 380, 480, 412]]),
        S('s1_hover_corner', '② 滑鼠移到角落白點，會顯示寬、長（都是 20.00）。', [['c', 499, 493, 16], ['c', 451, 584, 34], ['c', 615, 453, 34]], [300, 300, 420, 320]),
        S('s1_num_selected', '③ 點角落白點，再點下方數字（或按 Tab），數字變藍＝可以打字。', [['c', 434, 575, 36]], [300, 300, 420, 320]),
        S('s1_typed30', '④ 輸入 30。', [['c', 434, 575, 36]], [300, 300, 420, 320]),
        S('s1_tab_length', '⑤ 按 Tab 跳到「長」，輸入 26，按 Enter。', [['c', 659, 444, 40]], [300, 280, 460, 330]),
        S('s1_height_handle', '⑥ 點頂端白點、按 Tab，高度數字變成可以輸入。', [['c', 450, 388, 14], ['c', 549, 415, 34]], [320, 280, 360, 260]),
        S('s1_height38', '⑦ 輸入 38、Enter——圓球變成直立的蛋！', [['c', 552, 393, 34]], [320, 250, 360, 280]),
        S('s1_lifted', '⑧ 選著蛋，按住 Ctrl 再按 ↑ 12 下（每下 1 mm），蛋浮起來，地上影子分開了。', [['c', 450, 440, 62]]),
        S('s1_palette', '⑨ 點右上角「實體」的色塊，打開調色盤。', [['c', 680, 199, 30], ['c', 539, 359, 18]]),
        S('s1_done', '⑩ 選淺黃色（蛋殼色），點空白處取消選取。蛋身完成！', [['c', 450, 362, 62]]),
        R({ view: 'front', only: true, extra: ['liftBar'], labels: [['liftBar', '離地 12 mm']] }, '⑪ 正面看：蛋底下留 12 mm 給雞腳（紅線是示意的尺）。')
      ],
      cards: ['body'],
      todo: [
        '在右邊「基本造型」找到<b>圓球</b>（藍色那顆），按住左鍵拖到地板中間再放開。',
        '點<b>角落的白色小方塊</b>，再按鍵盤 <kbd>Tab</kbd>，數字變藍色後輸入 <b>30</b>，按 <kbd>Tab</kbd> 跳到下一格輸入 <b>26</b>，按 <kbd>Enter</kbd>。',
        '點<b>頂端中間的白色小方塊</b>，按 <kbd>Tab</kbd>，輸入 <b>38</b>，按 <kbd>Enter</kbd>。圓球變成直立的蛋了！',
        '蛋還選著的時候，按住 <kbd>Ctrl</kbd> 再按 <kbd>↑</kbd> <b>12 下</b>，蛋就浮起來 12 mm。',
        '點右上角「實體」的色塊，選<b>淺黃色</b>（第一排第三個）。'
      ],
      tip: '數字一定要按 <kbd>Enter</kbd> 才算數。不小心弄壞了？按 <kbd>Ctrl</kbd>＋<kbd>Z</kbd> 可以一步一步回去。'
    },
    {
      n: 2, L: 1, title: '裝上雞腳', shapes: ['圓柱'], skills: ['複製並重複 Ctrl+D', '方向鍵移動'],
      why: '細細的圓柱就是雞腳。做好一隻，用複製做第二隻，兩隻一定一模一樣。',
      figs: [
        R({ view: 'iso', fit: 'focus', labels: [['leg', '右腳'], ['legL', '左腳']] }, '兩根細圓柱，上半截插進蛋裡。'),
        R({ view: 'front', labels: [['leg', '中心往右 6'], ['legL', '中心往左 6']] }, '正面看：兩隻腳相距 12 mm。')
      ],
      cards: ['leg'],
      todo: [
        '拖一個<b>圓柱</b>出來。點角落白點＋<kbd>Tab</kbd>：寬 <b>3</b>、長 <b>3</b>；點頂端白點＋<kbd>Tab</kbd>：高 <b>14</b>。',
        '顏色選<b>橘色</b>。',
        '用<b>方向鍵</b>把它移到蛋的正下方，再往右 <b>6</b> 下（每按一下移 1 mm）。從「前」視角看最清楚。',
        '選著這隻腳按 <kbd>Ctrl</kbd>＋<kbd>D</kbd>（複製並重複），新的腳疊在原地，按 <kbd>←</kbd> <b>12 下</b>移到左邊。'
      ],
      tip: '腳的上半截會插進蛋裡看不到，沒關係！零件要<b>插進去一點點</b>，3D 列印時才會黏在一起。'
    },
    {
      n: 3, L: 1, title: '做雞爪腳趾', shapes: ['圓球'], skills: ['旋轉', 'Tab 打角度', '框選', '群組'],
      why: '三根扁扁的長圓球攤開，就是雞爪。這一步學會「旋轉」。',
      figs: [
        R({ view: 'top', only: true, focus: ['toe1!', 'toe2!', 'toe3!', 'leg!'], labels: [['toe1', '0°'], ['toe2', '轉 35°'], ['toe3', '轉 −35°']] }, '從「上」往下看右腳：三根腳趾像扇子攤開。'),
        S('r1_ring', '旋轉：滑鼠移到彎箭頭，會出現量角器圓環。', [['c', 625, 537, 18], ['c', 651, 449, 26]], [430, 400, 380, 320]),
        S('r2_angle_box', '點彎箭頭、按 Tab，角度格變藍，可以直接打 35。', [['c', 651, 449, 30]], [430, 400, 380, 320]),
        S('r3_90', '打完按 Enter，形狀就轉好了（這張是轉 90° 的樣子，橘色扇形＝轉過的角度）。', [['c', 651, 446, 30]], [430, 400, 380, 320]),
        R({ view: 'iso' }, '兩隻腳都有雞爪了！')
      ],
      cards: ['toe1', 'toe2'],
      todo: [
        '拉一顆<b>圓球</b>：寬 <b>3.5</b>、長 <b>13</b>、高 <b>2.5</b>（長長扁扁），橘色。',
        '移到右腳底下，往前伸出來（朝你這邊）。',
        '按 <kbd>Ctrl</kbd>＋<kbd>D</kbd> 複製一根。點<b>最下面那個彎箭頭</b>（繞著地板轉的那個），按 <kbd>Tab</kbd>，輸入 <b>35</b>，<kbd>Enter</kbd>。',
        '用方向鍵挪一挪，讓轉好的腳趾後端接回腳底。',
        '再複製一根，輸入 <b>-35</b>，往另一邊攤開。',
        '框選三根腳趾（在空白處按住左鍵拉一個框），按 <kbd>Ctrl</kbd>＋<kbd>G</kbd> 群組，再 <kbd>Ctrl</kbd>＋<kbd>D</kbd> 複製一份移到左腳。'
      ],
      tip: 'Tinkercad 旋轉時是「繞著形狀自己的中心」轉，所以轉完通常要再移一下位置，這很正常。'
    },
    {
      n: 4, L: 2, title: '貼上眼睛', shapes: ['圓球'], skills: ['工作平面 W', '群組＋多色'],
      why: '蛋殼是彎的，眼睛最容易「浮在空中」或「整顆陷進去」。這一步用「關鍵技巧 B：工作平面」。',
      figs: [
        { player: 'wp', cap: '▶ 互動動畫：用工作平面把眼睛貼在蛋殼上（真實操作畫面）' },
        R({ view: 'front', fit: 'focus', focus: ['eyeW', 'pupil', 'eyeWL', 'pupilL', 'body'], labels: [['eyeW', '眼白'], ['pupil', '眼珠']] }, '完成圖：白色眼白＋黑色眼珠，一半露在殼外。'),
        R({ view: 'top', fit: 'focus', focus: ['eyeW', 'pupil', 'eyeWL', 'pupilL', 'body'], labels: [[[7, -14, 36], '眼珠要突出一點']] }, '從「上」看最容易檢查有沒有突出蛋殼。')
      ],
      cards: ['eyeW', 'pupil'],
      todo: [
        '點視角方塊的「<b>前</b>」。按 <kbd>W</kbd>，在蛋的右上方點一下，放一塊斜的工作平面。',
        '拖一顆<b>圓球</b>到那塊平面上：寬 <b>8</b>、長 <b>11</b>、高 <b>3.5</b>，白色 → 眼白。',
        '再拖一顆小圓球：寬 <b>3.5</b>、長 <b>5</b>、高 <b>2</b>，黑色，放在眼白中間 → 眼珠。眼珠要比眼白<b>突出一點點</b>。',
        '按 <kbd>W</kbd> 再點空白處，<b>把地板還原</b>。',
        '框選眼白＋眼珠 → <kbd>Ctrl</kbd>＋<kbd>G</kbd> 群組。<b>變成同一個顏色了？</b>點色塊 → 「多色」選<b>開啟</b>，顏色就回來了。',
        '<kbd>Ctrl</kbd>＋<kbd>D</kbd> 複製一組，往左移 <b>14</b> 格。'
      ],
      tip: '在斜的工作平面上，「寬、長」是貼著蛋殼的方向，「高」是往外凸出的厚度。厚度小一點，眼睛才會扁扁地貼著。',
      warn: '最常忘記：做完一定要按 <kbd>W</kbd> 點空白處還原地板！不然之後拖進來的形狀全部會歪歪的。'
    },
    {
      n: 5, L: 2, title: '生氣的眉毛', shapes: ['方塊'], skills: ['旋轉', '鏡射 M'],
      why: '眉毛一歪，表情就兇起來！左右對稱的零件，做一邊再「鏡射」最快。',
      figs: [
        R({ view: 'front', fit: 'focus', focus: ['brow', 'browL', 'eyeW', 'eyeWL', 'body'], labels: [['brow', '內低外高 → 很兇'], ['browL', '鏡射做出來的']] }, '正面看：兩條眉毛呈「八」字倒過來。'),
        S('m1_mirror_arrows', '按 M（鏡射）後，形狀旁出現三個雙箭頭；點<b>左右方向</b>那個就會左右翻面。', [['c', 248, 571, 40], ['c', 197, 519, 30], ['c', 311, 524, 30], ['t', 290, 600, '左右翻（點這個）']], [120, 360, 420, 300]),
        S('t_mirror', '工具列的「鏡射」按鈕，快捷鍵 M。', [['c', 646, 72, 22]], [520, 40, 260, 140])
      ],
      cards: ['brow'],
      todo: [
        '拉一個<b>方塊</b>：寬 <b>10</b>、長 <b>3</b>、高 <b>2.5</b>，深咖啡色。',
        '點視角方塊「<b>前</b>」，用正面那圈彎箭頭轉 <b>20°</b>，讓<b>靠中間那端低、外側高</b>。',
        '移到右眼上方（抬高約 40），往後推到黏在蛋殼上（從「上」視角檢查）。',
        '<kbd>Ctrl</kbd>＋<kbd>D</kbd> 複製 → 按 <kbd>M</kbd> → 點<b>左右方向</b>的雙箭頭 → 眉毛翻面了。',
        '用方向鍵把它移到左眼上方。'
      ],
      tip: '鏡射就像照鏡子，左右顛倒。眉毛、手臂、翅膀都用這招。'
    },
    {
      n: 6, L: 2, title: '八字鬍', shapes: ['圓球'], skills: ['旋轉', '鏡射'],
      why: '兩片扁圓球往外垂，就是很有威嚴的八字鬍。',
      figs: [
        R({ view: 'front', fit: 'focus', focus: ['mus', 'musL', 'body'], labels: [['mus', '外側往下垂'], ['musL', '鏡射']] }, '兩片鬍子在中間碰在一起。')
      ],
      cards: ['mus'],
      todo: [
        '拉一顆<b>圓球</b>：寬 <b>10</b>、長 <b>4</b>、高 <b>6</b>，深咖啡色。',
        '「前」視角，正面那圈轉 <b>15°</b>，讓外側往下垂。',
        '放在眼睛下方（抬高約 23），中心往右約 5 格，往後推到一半埋進蛋裡。',
        '<kbd>Ctrl</kbd>＋<kbd>D</kbd> → <kbd>M</kbd> → 點左右箭頭 → 移到左邊，兩片在中間碰在一起。'
      ],
      tip: '鬍子用「關鍵技巧 B」也可以：按 W 點在嘴巴位置，鬍子就直接貼在殼上。'
    },
    {
      n: 7, L: 2, title: '戴上工地安全帽', shapes: ['半圓球', '圓柱', '星形'], skills: ['對齊 L', '旋轉 90°'],
      why: '帽子一定要戴「正」。這一步用「關鍵技巧 A：對齊」，一點就置中。',
      figs: [
        { player: 'align', cap: '▶ 互動動畫：用對齊工具把帽子戴正（真實操作畫面）' },
        R({ view: 'iso', only: true, parts: ['starFlat', 'starUp'], labels: [['starFlat', '原本躺著'], ['starUp', '轉 90° 站起來']] }, '星形從形狀庫拖出來是躺著的，要轉 90° 才會站起來。'),
        R({ view: 'iso', fit: 'focus', focus: ['helmet', 'brim', 'star', 'body'], labels: [['helmet', '半圓球'], ['brim', '帽緣（扁圓柱）'], ['star', '星形']] }, '安全帽三件組。')
      ],
      cards: ['helmet', 'brim', 'star'],
      todo: [
        '拉一個<b>半圓球</b>：寬 <b>28</b>、長 <b>26</b>、高 <b>14</b>，黃色。按 <kbd>Ctrl</kbd>＋<kbd>↑</kbd> 抬高到 <b>45</b>（或拖黑色圓錐往上）。',
        '點蛋 → <kbd>Shift</kbd>＋點帽子 → 按 <kbd>L</kbd> → <b>先點蛋</b>（釘住）→ 點下排中間黑點 → 點左排中間黑點。帽子戴正了！',
        '拉一個<b>圓柱</b>：寬 <b>32</b>、長 <b>30</b>、高 <b>1.5</b>，黃色，抬高 <b>44.5</b> → 帽緣。一樣用對齊置中。',
        '往下捲形狀庫找到<b>星形</b>：寬 <b>7</b>、長 <b>7</b>、高 <b>1.5</b>，紅色。用側面的彎箭頭轉 <b>90°</b> 讓它站起來。',
        '把星星貼在帽子正前方（抬高約 47.5）。'
      ],
      warn: '對齊時<b>右邊直立那排黑點（上下）不要點</b>，不然帽子會掉進蛋的肚子裡！'
    },
    {
      n: 8, L: 2, title: '手臂和拳頭', shapes: ['圓球'], skills: ['群組', '鏡射'],
      why: '拉長的圓球是手臂，圓圓的圓球是拳頭。下一節要讓武器握在拳頭裡。',
      figs: [
        R({ view: 'front', labels: [['arm', '手臂（轉 25°）'], ['hand', '拳頭']] }, '正面看：手臂下端往外張開，拳頭在手臂下端。'),
        R({ view: 'iso' }, '第 2 節完成的樣子。')
      ],
      cards: ['arm', 'hand'],
      todo: [
        '拉一顆<b>圓球</b>：寬 <b>7</b>、長 <b>7</b>、高 <b>16</b>，蛋殼色 → 手臂。',
        '「前」視角，正面那圈轉 <b>25°</b>，讓手臂下端往外張開。',
        '放在蛋的右側（抬高約 20），上端<b>插進蛋身一點點</b>。',
        '拉一顆<b>圓球</b>：寬 <b>9</b>、長 <b>9</b>、高 <b>9</b> → 拳頭，放在手臂下端。',
        '框選手臂＋拳頭 → <kbd>Ctrl</kbd>＋<kbd>G</kbd> → <kbd>Ctrl</kbd>＋<kbd>D</kbd> → <kbd>M</kbd> 左右翻 → 移到左邊。'
      ],
      tip: '手臂上端如果沒插進蛋裡，從「上」視角會看到一條縫。看到縫就用方向鍵往蛋那邊推 1～2 格。'
    },
    {
      n: 9, L: 3, title: '戰斧（學挖孔）', shapes: ['圓柱', '方塊（孔）', '圓錐'], skills: ['孔', '群組挖洞', '握持'],
      why: 'Tinkercad 沒有「半圓形」，但可以用「孔」把圓柱挖掉一半！這是 3D 建模最重要的觀念之一。',
      figs: [
        { player: 'hole', cap: '▶ 互動動畫：用孔把圓柱挖成半圓（真實操作畫面）' },
        R({ view: 'iso', only: true, parts: ['coinUp', 'holeBox'], labels: [['coinUp', '硬幣立起來'], ['holeBox', '孔方塊蓋住右半']] }, '斧刃要「立起來面向前面」：硬幣先轉 90° 再蓋孔。'),
        R({ view: 'iso', only: true, parts: ['halfRes'], labels: [['halfRes', '群組後：半圓斧刃']] }, '群組後，孔蓋到的地方消失了。'),
        { player: 'grip', cap: '▶ 互動動畫：讓斧柄穿過拳頭（關鍵技巧 C）' },
        R({ view: 'iso', fit: 'focus', focus: ['axeH', 'axeB', 'axeC', 'handL', 'armL'], labels: [['axeB', '斧刃'], ['axeH', '斧柄穿過拳頭'], ['axeC', '斧頭尖（圓錐）']] }, '左手握著戰斧。')
      ],
      cards: ['axeH', 'axeB', 'axeC'],
      todo: [
        '<b>斧柄</b>：拉一個圓柱，寬 <b>2.5</b>、長 <b>2.5</b>、高 <b>56</b>，咖啡色，抬高 <b>4</b>。',
        '用「關鍵技巧 C」：選左拳頭＋斧柄 → <kbd>L</kbd> → 先點拳頭 → 點下排中間、左排中間，斧柄穿過拳頭。',
        '<b>斧刃</b>：拉一個圓柱，寬 <b>22</b>、長 <b>22</b>、高 <b>2</b>（一枚硬幣），轉 <b>90°</b> 讓它立起來面向你。',
        '從形狀庫第一排拉一個<b>孔方塊</b>（條紋的），蓋住硬幣的<b>右半邊</b>（要整個蓋滿）。',
        '框選硬幣＋孔方塊 → <kbd>Ctrl</kbd>＋<kbd>G</kbd>。右半邊被挖掉，剩下半圓！選銀灰色。',
        '把斧刃的<b>直邊</b>貼在斧柄外側，頂端比斧柄低一點（抬高約 39）。',
        '<b>斧頭尖</b>：拉一個<b>圓錐</b>，寬 <b>4</b>、長 <b>4</b>、高 <b>5</b>，銀色，放在斧柄頂端。'
      ],
      tip: '孔方塊要「完全蓋住」想挖掉的部分，邊緣差一點點就會留下薄薄一片。'
    },
    {
      n: 10, L: 3, title: '長劍', shapes: ['圓球', '圓柱', '方塊', '屋頂'], skills: ['疊高計算', '握持'],
      why: '劍是五個零件「疊」起來的。學會一個好用的算法：下一個零件的抬高＝下面零件的抬高＋下面零件的高。',
      figs: [
        R({ view: 'front', only: true, focus: ['pommel', 'gripS', 'guard', 'bladeS', 'tip'], labels: [['tip', '劍尖（屋頂）抬高 61'], ['bladeS', '劍身 抬高 27'], ['guard', '護手 抬高 24'], ['gripS', '劍柄 抬高 14'], ['pommel', '柄頭 抬高 11.25']] }, '五個零件由下往上疊。'),
        R({ view: 'iso', fit: 'focus', focus: ['pommel', 'gripS', 'guard', 'bladeS', 'tip', 'hand', 'arm'] }, '右手握著長劍。')
      ],
      cards: ['pommel', 'gripS', 'guard', 'bladeS', 'tip'],
      todo: [
        '<b>劍柄</b>：圓柱 寬 <b>3</b>、長 <b>3</b>、高 <b>10</b>，深咖啡色，抬高 <b>14</b>，用技巧 C 穿過右拳頭。',
        '<b>柄頭</b>：圓球 <b>4.5</b>×<b>4.5</b>×<b>4.5</b>，金色，放在劍柄下端（抬高 11.25）。',
        '<b>護手</b>：方塊 寬 <b>14</b>、長 <b>4</b>、高 <b>3</b>，金色，抬高 <b>24</b>（＝14＋10）。',
        '<b>劍身</b>：方塊 寬 <b>4</b>、長 <b>1.5</b>、高 <b>34</b>，銀白色，抬高 <b>27</b>（＝24＋3）。',
        '<b>劍尖</b>：<b>屋頂</b> 寬 <b>4</b>、長 <b>1.5</b>、高 <b>6</b>，銀白色，抬高 <b>61</b>（＝27＋34）。看起來不是三角形就轉 90° 試試。',
        '五個零件都用對齊「左右置中、前後置中」，最後框選 → <kbd>Ctrl</kbd>＋<kbd>G</kbd> → 多色開啟。'
      ],
      tip: '數學時間！抬高 27 ＝ 護手抬高 24 ＋ 護手高 3。這樣算，零件就會剛好疊在一起，不會懸空也不會重疊。'
    },
    {
      n: 11, L: 3, title: '蝙蝠翅膀', shapes: ['圓柱', '屋頂'], skills: ['模組化', '群組後旋轉', '鏡射'],
      why: '翅膀有 4 個零件。先在旁邊空地做好、群組，再整組轉、整組搬——這叫「模組化」。',
      figs: [
        R({ view: 'front', only: true, parts: ['fwBone', 'fw1', 'fw2', 'fw3'], labels: [['fwBone', '翅骨（圓柱躺平）'], ['fw2', '三個屋頂尖端朝下']] }, '① 先在空地把翅膀「平平地」做好。'),
        R({ view: 'front', only: true, parts: ['twBone', 'tw1', 'tw2', 'tw3'], labels: [['tw3', '整組轉 20°，外側翹起來']] }, '② 群組後整組旋轉。'),
        R({ view: 'back', labels: [['bone', '右翅'], ['boneL', '鏡射的左翅']] }, '③ 從背後看：翅膀裝在蛋的背後。'),
        R({ view: 'iso' }, '完成！')
      ],
      cards: ['bone', 'w1', 'w2', 'w3'],
      todo: [
        '在旁邊空地拉一個<b>圓柱</b>：寬 <b>2.5</b>、長 <b>2.5</b>、高 <b>34</b>，轉 <b>90°</b> 讓它躺平 → 翅骨，深紫色。',
        '拉一個<b>屋頂</b>：寬 <b>12</b>、長 <b>1.5</b>、高 <b>10</b>，轉 <b>180°</b> 讓尖端朝下，紫色，掛在翅骨下面靠內側。',
        '再做兩個屋頂（高 <b>13</b>、高 <b>16</b>），一個接一個掛在翅骨下面，越外面越長。',
        '框選這 4 個零件 → <kbd>Ctrl</kbd>＋<kbd>G</kbd> → 多色開啟。',
        '「前」視角，整組轉 <b>20°</b>，外側往上翹。',
        '搬到蛋的<b>背後右邊</b>，內側那端插進蛋身。',
        '<kbd>Ctrl</kbd>＋<kbd>D</kbd> → <kbd>M</kbd> 左右翻 → 移到左邊。蝙蝠翅膀完成！'
      ],
      tip: '先在空地做好再搬過去，比直接在身上一片一片拼簡單很多。'
    },
    {
      n: 12, L: 3, title: '上色與「多色」', shapes: [], skills: ['聯集群組', '多色', '集合群組'],
      why: '最常見的問題：「群組之後，顏色怎麼全部變一樣了？」這一步一次搞懂。',
      figs: [
        S('g1_boxselect', '① 框選三個零件（蛋、眼睛、帽子）。右上角顯示 Shapes(3)。', [['r', 640, 112, 216, 32]]),
        S('g3_union_onecolor', '② 按 Ctrl＋G（聯集群組）：全部變成同一個顏色！面板顯示「群組類型：聯集」。', [['c', 450, 330, 75], ['r', 612, 300, 230, 82]]),
        S('g5_palette_multi_off', '③ 點色塊，看到下面的「多色：關閉／開啟」。', [['r', 440, 485, 165, 60]]),
        S('g6_multi_on', '④ 點「開啟」，色塊變成彩虹色。', [['c', 571, 524, 26], ['c', 680, 199, 28]]),
        S('g7_multi_result', '⑤ 每個零件的顏色都回來了，而且還是同一個群組！', [['c', 450, 340, 75]]),
        S('g2_tooltip_collection', '補充：工具列第一顆「集合群組 Ctrl＋B」也是一種群組方式，可以試試看跟聯集有什麼不同。', [['c', 454, 72, 22]], [330, 40, 400, 180]),
        R({ view: 'iso', mono: '#FFC21A' }, '沒開多色的樣子：整隻變成同一個顏色。'),
        R({ view: 'iso' }, '開了多色：每個零件保留自己的顏色。')
      ],
      todo: [
        '想換某個零件的顏色：點它 → 右上角「實體」色塊 → 選顏色。',
        '如果它已經在群組裡：先 <kbd>Ctrl</kbd>＋<kbd>Shift</kbd>＋<kbd>G</kbd> 拆開，改好顏色再重新群組。',
        '<b>每次 <kbd>Ctrl</kbd>＋<kbd>G</kbd> 群組後，記得點色塊 → 「多色」選開啟。</b>',
        '想看裡面藏了什麼？調色盤右下角「透明」選開啟。'
      ],
      warn: '「多色」只有選到<b>群組</b>時才能按；選單一形狀時它是灰色的，這是正常的。'
    },
    {
      n: 13, L: 3, title: '拆開（取消群組）', shapes: [], skills: ['取消群組', '一層一層拆'],
      why: '想修改群組裡的某個零件、或要分開 3D 列印時，就要把群組拆開。',
      figs: [
        S('u1_tooltip', '① 選群組，點工具列「取消群組」（Ctrl＋Shift＋G）。', [['c', 550, 72, 22]]),
        S('u2_ungrouped', '② 拆開了！右上角從「Union」變回 Shapes(3)，每個零件都能單獨選。', [['r', 640, 112, 216, 32]]),
        R({ view: 'iso', explode: 0.9 }, '「爆炸圖」：把 40 個零件全部拆開排好，就看得出每一塊。')
      ],
      todo: [
        '點選要拆的群組，按 <kbd>Ctrl</kbd>＋<kbd>Shift</kbd>＋<kbd>G</kbd>（或工具列「取消群組」）。',
        '群組裡面還有小群組（例如劍、翅膀），選到它再按一次，<b>一層一層拆</b>。',
        '「取消群組」是灰色、按不下去？可能是：①選到的本來就是單一形狀；②它是<b>匯入的 STL／OBJ 檔</b>，Tinkercad 把整個模型當成一顆，拆不開——只能用孔方塊把它切開。'
      ],
      tip: '要用單色 3D 印表機印出彩色武士：把零件拆開，分別匯出、用不同顏色線材各印一份，再黏起來。'
    }
  ];

  const LESSONS = {
    1: { name: '第 1 節　蛋身與雞腳', color: '#F57C00', goal: '學會：拖曳形狀、改尺寸（Tab 打數字）、抬高、上色、複製、旋轉' },
    2: { name: '第 2 節　表情與裝備', color: '#00897B', goal: '學會：工作平面 W、對齊 L、鏡射 M、群組＋多色' },
    3: { name: '第 3 節　武器、翅膀、上色與拆開', color: '#7E57C2', goal: '學會：孔（挖洞）、握持、模組化、多色、取消群組' }
  };

  window.EGG = { C, PARTS, GROUPS, DEMO, STEPS, LESSONS, PLAYERS, INTRO };
})();
