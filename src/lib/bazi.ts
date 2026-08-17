
export interface BaziProfile {
  gender: '男' | '女';
  year: string;
  month: string;
  day: string;
  hour: string;
  luckPillar: string;
  age: number;
}

export const WU_SHU_DUN: Record<string, string[]> = {
  '甲': "甲子|乙丑|丙寅|丁卯|戊辰|己巳|庚午|辛未|壬申|癸酉|甲戌|乙亥|丙子".split('|'),
  '己': "甲子|乙丑|丙寅|丁卯|戊辰|己巳|庚午|辛未|壬申|癸酉|甲戌|乙亥|丙子".split('|'),
  '乙': "丙子|丁丑|戊寅|己卯|庚辰|辛巳|壬午|癸未|甲申|乙酉|丙戌|丁亥|戊子".split('|'),
  '庚': "丙子|丁丑|戊寅|己卯|庚辰|辛巳|壬午|癸未|甲申|乙酉|丙戌|丁亥|戊子".split('|'),
  '丙': "戊子|己丑|庚寅|辛卯|壬辰|癸巳|甲午|乙未|丙申|丁酉|戊戌|己亥|庚子".split('|'),
  '辛': "戊子|己丑|庚寅|辛卯|壬辰|癸巳|甲午|乙未|丙申|丁酉|戊戌|己亥|庚子".split('|'),
  '丁': "庚子|辛丑|壬寅|癸卯|甲辰|乙巳|丙午|丁未|戊申|己酉|庚戌|辛亥|壬子".split('|'),
  '壬': "庚子|辛丑|壬寅|癸卯|甲辰|乙巳|丙午|丁未|戊申|己酉|庚戌|辛亥|壬子".split('|'),
  '戊': "壬子|癸丑|甲寅|乙卯|丙辰|丁巳|戊午|己未|庚申|辛酉|壬戌|癸亥|甲子".split('|'),
  '癸': "壬子|癸丑|甲寅|乙卯|丙辰|丁巳|戊午|己未|庚申|辛酉|壬戌|癸亥|甲子".split('|'),
};

export const WU_SHU_DUN_RHYME: Record<string, string> = {
  '甲': '甲己还加甲',
  '己': '甲己还加甲',
  '乙': '乙庚丙作初',
  '庚': '乙庚丙作初',
  '丙': '丙辛从戊起',
  '辛': '丙辛从戊起',
  '丁': '丁壬庚子居',
  '壬': '丁壬庚子居',
  '戊': '戊癸起壬子',
  '癸': '戊癸起壬子',
};

const FIVE_ELEMENTS: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

const STEM_POLARITY: Record<string, 'yang' | 'yin'> = {
  '甲': 'yang', '乙': 'yin',
  '丙': 'yang', '丁': 'yin',
  '戊': 'yang', '己': 'yin',
  '庚': 'yang', '辛': 'yin',
  '壬': 'yang', '癸': 'yin',
};

const BRANCH_MAIN_QI: Record<string, string> = {
  '子': '癸',
  '丑': '己',
  '寅': '甲',
  '卯': '乙',
  '辰': '戊',
  '巳': '丙',
  '午': '丁',
  '未': '己',
  '申': '庚',
  '酉': '辛',
  '戌': '戊',
  '亥': '壬',
};

const YANG_BLADE: Record<string, string> = {
  '甲': '卯',
  '丙': '午',
  '戊': '午',
  '庚': '酉',
  '壬': '子',
};

export function getShiShen(dayMaster: string, targetStem: string): string {
  if (!dayMaster || !targetStem || !FIVE_ELEMENTS[dayMaster] || !FIVE_ELEMENTS[targetStem]) return '';
  const dmElem = FIVE_ELEMENTS[dayMaster];
  const targetElem = FIVE_ELEMENTS[targetStem];
  const samePolarity = STEM_POLARITY[dayMaster] === STEM_POLARITY[targetStem];

  if (dmElem === targetElem) {
    return samePolarity ? '比肩' : '劫财';
  }
  const generates: Record<string, string> = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  if (generates[dmElem] === targetElem) {
    return samePolarity ? '食神' : '伤官';
  }
  if (generates[targetElem] === dmElem) {
    return samePolarity ? '偏印' : '正印';
  }
  const overcomes: Record<string, string> = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  if (overcomes[dmElem] === targetElem) {
    return samePolarity ? '偏财' : '正财';
  }
  if (overcomes[targetElem] === dmElem) {
    return samePolarity ? '七杀' : '正官';
  }
  return '';
}

export function getPillarDescription(dayMaster: string, pillar: string, isDayPillar = false): string {
  if (!pillar || pillar.length < 2) return '';
  const stem = pillar[0];
  const zhi = pillar[1];
  const stemElem = FIVE_ELEMENTS[stem] || '';
  const zhiStem = BRANCH_MAIN_QI[zhi] || '';
  const zhiElem = FIVE_ELEMENTS[zhiStem] || '';

  const stemShiShen = isDayPillar ? '日主' : getShiShen(dayMaster, stem);
  let zhiShiShen = getShiShen(dayMaster, zhiStem);
  
  if (YANG_BLADE[dayMaster] === zhi) {
    zhiShiShen = '羊刃';
  } else if (zhi === '丑' && dayMaster === '庚') {
    zhiShiShen = '湿印';
  }

  const stemText = stemElem ? `${stem}${stemElem}${stemShiShen}` : `${stem}${stemShiShen}`;
  const zhiText = zhiElem ? `${zhi}${zhiElem}${zhiShiShen}` : `${zhi}${zhiShiShen}`;

  return `（${stemText} / ${zhiText}）`;
}

export const AI_PROMPT_TEMPLATE = `
# Role: 资深传统子平八字命理学家

## Setup & Rules (命理推演与风控准则):
在生成分析前，你必须严格遵循传统子平命理学的“旺衰调候”、“正统五行生克”及“干支刑冲合会”逻辑进行严密推演。客观中立，重在风控与择吉，严禁浮夸与迎合。

---

### 【输入数据】
- **命主性别**: {gender}
- **命主原局**: 
  - 年柱: {yearPillar}{yearPillarDesc}
  - 月柱: {monthPillar}{monthPillarDesc}
  - 日柱: {dayPillar}{dayPillarDesc}
  - 时柱: {hourPillar}{hourPillarDesc}
- **当前大运**: {luckPillar}大运
- **今日流日**: {year}年{month}月{day}日
  - 流年: {currentYearPillar}
  - 流月: {currentMonthPillar}
  - 流日: {currentDayPillar}{currentDayPillarDesc}
  - 注：时辰干支依据“五鼠遁日诀”（{wuShuDunRule}）排盘。

---

## Output Tasks (请按以下五个标准板块完整输出):

### 一、 命局推演与流日气场简析 (CoT 推演)
1. **原局与大运喜忌判定**:
   - 简析{dayMaster}金生于{monthZhi}月的旺衰定性（印比重叠、身强/身弱等，结合原局与大运整体定性）。
   - 明确定出**喜用神**（木疏土生火、火炼金调候等）与**忌神**（金比劫夺财、土厚埋金寒滞等）。
2. **今日五行交感分析**:
   - **天干互动**: 分析流日{currentDayStem}引动岁运流年{currentYearStem}、流月{currentMonthStem}及大运生克日主{dayMaster}及原局干支的动向。
   - **地支互动**: 重点核验流日{currentDayZhi}与原局【{yearZhi}(年)、{monthZhi}(月)、{dayZhi}(日)、{hourZhi}(时)】以及流年【{currentYearZhi}】、流月【{currentMonthZhi}】的综合刑冲合害（刑、冲、合、会、害、破、自刑等）。

---

### 二、 今日运势总评与综合评分
- **字数要求**: 200~300字以内，文风客观严谨。
- **综合得分 (0-100分)**: 必须结合喜忌与冲合给出客观分值，并附带一句核心打分依据。
  - *打分参考量表*:
    - 85-95分：喜用齐来、干支有情、无重大刑冲；
    - 70-84分：喜用透出但伴随轻微摩擦/消耗（吉中带忙）；
    - 55-69分：吉凶参半、地支暗合暗破、进退两难；
    - 55分以下：忌神猖獗、干克地冲、关键支神正冲受损。

---

### 三、 核心避险与择吉时辰 (分级风控体系)
1. **【严正规避时辰】(绝对忌用)**:
   - **核心正冲**: 筛查直接冲克日支【{dayZhi}】的时辰（如冲克太岁与日支）。
   - **重度刑害**: 筛查构成严重刑克破害的时辰（如相刑、相害、相冲等）。
   - 说明其具体的负面影响（如情绪冲动、文书破败、人际冲突、破财等）。
2. **【精选择吉时辰】(推荐 1~2 个)**:
   - 从无严重刑冲的时辰中，挑选**最能生助喜用神**或**能化解局中不利冲合**的 1~2 个办事时辰。
   - 阐明推荐理由（如：官印相生、食伤生财、暗合解冲等）。

---

### 四、 今日开运指南
1. **吉利方位**:
   - **个人命理喜用方（核心）**: 依据命局喜用五行确定方位。
   - **流日民俗神煞参考**: 标注今日{currentDayPillar}日的民俗财神/喜神参考方位。
2. **五行色彩穿搭建议**:
   - **大吉色/提运色**: 对应喜用五行的视觉色彩。
   - **避忌色/泄气色**: 对应忌神五行的色彩。

---

### 五、 24小时流时运势评分与判词表
严格按照下表输出，**各时辰分数必须依干支喜忌与刑冲关系呈现明显分层波动**（严禁分数扎堆或雷同）：

| 时辰 | 时间段 | 时辰干支 | 运势得分 (0-100) | 简要吉凶判词 (15字以内) | 重点避忌 / 行动建议 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 早子时 | 00:00-00:59 | {tp_zi0} | | | |
| 丑时 | 01:00-02:59 | {tp_chou} | | | |
| 寅时 | 03:00-04:59 | {tp_yin} | | | |
| 卯时 | 05:00-06:59 | {tp_mao} | | | |
| 辰时 | 07:00-08:59 | {tp_chen} | | | |
| 巳时 | 09:00-10:59 | {tp_si} | | | |
| 午时 | 11:00-12:59 | {tp_wu} | | | |
| 未时 | 13:00-14:59 | {tp_wei} | | | |
| 申时 | 15:00-16:59 | {tp_shen} | | | |
| 酉时 | 17:00-18:59 | {tp_you} | | | |
| 戌时 | 19:00-20:59 | {tp_xu} | | | |
| 亥时 | 21:00-22:59 | {tp_hai} | | | |
| 夜子时 | 23:00-23:59 | {tp_zi24} | | | |

---

### Output Style (风格与语调限制):
- 语气谦和、严谨、文雅，具备传统命理学者的专业风范。
- 严禁出现“万事大吉”、“绝对发财”、“必定遇灾”等极端化迷信措辞，以“概率倾向”、“气场顺逆”与“修身处事”为表达落脚点。
- 严格遵循板块结构输出，无需输出多余的开场白或寒暄。
`;

export function getHourlyPillars(dayStem: string): string[] {
  const result = WU_SHU_DUN[dayStem];
  if (!result) return Array(13).fill('未知');
  return result;
}

export function generateAIReportPrompt(
  profile: BaziProfile,
  currentDateData: {
    year: number;
    month: number;
    day: number;
    currentYearPillar?: string;
    currentMonthPillar?: string;
    currentDayPillar: string;
    nongli_str?: string;
  }
): string {
  const dayStem = currentDateData.currentDayPillar[0] || '甲';
  const hourlyStems = getHourlyPillars(dayStem);
  const dayMaster = profile.day[0] || '庚';

  const currentYearPillar = currentDateData.currentYearPillar || '丙午';
  const currentMonthPillar = currentDateData.currentMonthPillar || '丙申';
  const currentDayPillar = currentDateData.currentDayPillar || '甲子';

  const placeholders: Record<string, string> = {
    gender: profile.gender,
    yearPillar: profile.year,
    yearPillarDesc: getPillarDescription(dayMaster, profile.year),
    monthPillar: profile.month,
    monthPillarDesc: getPillarDescription(dayMaster, profile.month),
    dayPillar: profile.day,
    dayPillarDesc: getPillarDescription(dayMaster, profile.day, true),
    hourPillar: profile.hour,
    hourPillarDesc: getPillarDescription(dayMaster, profile.hour),
    luckPillar: profile.luckPillar,
    age: profile.age.toString(),
    dayMaster: dayMaster,
    dayMasterElement: FIVE_ELEMENTS[dayMaster] || '',
    monthZhi: profile.month[1] || '未知',
    yearZhi: profile.year[1] || '未知',
    dayZhi: profile.day[1] || '未知',
    hourZhi: profile.hour[1] || '未知',
    year: currentDateData.year.toString(),
    month: currentDateData.month.toString(),
    day: currentDateData.day.toString(),
    currentYearPillar: currentYearPillar,
    currentYearStem: currentYearPillar[0] || '',
    currentYearZhi: currentYearPillar[1] || '',
    currentMonthPillar: currentMonthPillar,
    currentMonthStem: currentMonthPillar[0] || '',
    currentMonthZhi: currentMonthPillar[1] || '',
    currentDayPillar: currentDayPillar,
    currentDayStem: currentDayPillar[0] || '',
    currentDayZhi: currentDayPillar[1] || '',
    currentDayPillarDesc: getPillarDescription(dayMaster, currentDayPillar),
    wuShuDunRule: WU_SHU_DUN_RHYME[dayStem] || '甲己还加甲',
    nongli_str: currentDateData.nongli_str || `${currentYearPillar}年 ${currentMonthPillar}月 ${currentDayPillar}日`,
    tp_zi0: hourlyStems[0],
    tp_chou: hourlyStems[1],
    tp_yin: hourlyStems[2],
    tp_mao: hourlyStems[3],
    tp_chen: hourlyStems[4],
    tp_si: hourlyStems[5],
    tp_wu: hourlyStems[6],
    tp_wei: hourlyStems[7],
    tp_shen: hourlyStems[8],
    tp_you: hourlyStems[9],
    tp_xu: hourlyStems[10],
    tp_hai: hourlyStems[11],
    tp_zi24: hourlyStems[12],
  };

  let prompt = AI_PROMPT_TEMPLATE;
  Object.entries(placeholders).forEach(([key, value]) => {
    prompt = prompt.split(`{${key}}`).join(value);
  });

  return prompt.trim();
}
