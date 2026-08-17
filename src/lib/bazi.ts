
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
# Role: 资深传统子平八字命理学家与运势精算师

## Setup & Rules (命理推演与算法约束 - 务必严格遵守):
你必须依据传统子平命理正统理论（旺衰、格局、调候、十神意向、干支刑冲破害会合）进行全流程逻辑推演。严禁使用玄虚浮夸措辞，重在逻辑自洽与客观风控。

### 【核心执行规则】
1. **去偏见推演**：必须严格基于输入八字自主分析旺衰与喜忌，严禁机械套用预设结论。
2. **时辰排盘规范**：流日各时辰干支统一采用“五鼠遁日诀”。23:00-24:00 采用现代标准“夜子时”（即当日日主干支管辖下、遁明日天干之子时）。
3. **分数数学自洽约束**：
   - 第二板块给出的【今日运势综合得分】，**必须与第五板块 13 个时辰得分的加权平均值保持一致（允许误差在 ±5 分以内）**。
   - 严禁出现“总评给高分（吉），而分时全给低分（凶）”或相反的逻辑断层。
4. **反疲劳与深度生成约束**：
   - 24小时评分表中的 13 个时辰，每个时辰的【简要吉凶判词】与【行动建议】必须结合该时辰干支与原局产生的具体刑冲合化独立撰写。
   - **严禁前后时辰文案雷同，严禁表格后半段（申、酉、戌、亥时）出现敷衍简写**。

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

---

## Output Tasks (请严格按以下五个标准板块完整输出，不得遗漏):

### 一、 命局推演与流日气场分析报告
1. **原局与大运喜忌判定**:
   - 分析{dayMaster}{dayMasterElement}生于{monthZhi}月的旺衰定性、格局特征及寒暖燥湿情况。
   - 明确判定出日主的**核心喜用神**（生克与调候所需五行）与**忌神**。
2. **今日五行交感分析**:
   - **天干互动**: 剖析流日{currentDayStem}{currentDayStemElem}与流年{currentYearPillar}、流月{currentMonthPillar}、大运{luckPillar}及原局天干的“生、克、制、化、合”关系。
   - **地支互动**: 详细核验流日{currentDayZhi}与原局【{yearZhi}、{monthZhi}、{dayZhi}、{hourZhi}】及岁运【{currentYearZhi}、{currentMonthZhi}】的刑、冲、合、会、害、破等复合生克关系。

---

### 二、 今日运势总评与综合基准分
- **字数要求**: 200~300 字，文风客观严谨。
- **综合得分 (0-100分)**: 给出明确分值，并附带一句核心定性判词。
  - *量化标准参考*:
    - **85 - 95分**：喜用两全，干支生化有情，无重大冲克破损；
    - **70 - 84分**：喜用透出但暗藏消耗/波折，整体向好（吉中带忙）；
    - **55 - 69分**：喜忌交织，地支暗合暗破，运势平滞；
    - **55分以下**：忌神猖獗，遇干克地冲或核心支神严重受损。

---

### 三、 分级风控与精选择吉
1. **【严正规避时辰】(严禁用于重要决策/签约/开业)**:
   - **核心正冲**: 标明直接冲克日支【{dayZhi}】或太岁【{currentYearZhi}】的高危时辰。
   - **重度刑害**: 标明构成相刑、相害、相破严重的阻滞时辰。
   - 分别指出其引发的潜在风险（如文书出错、口舌争端、冲动破财、身体不适等）。
2. **【精选择吉时辰】(推荐 1~2 个)**:
   - 从排除高危后的时辰中，精选最能助旺喜用神或有效解合刑冲的办事时辰。
   - 说明推荐的命理依据（如官印相生、食伤生财、暗合解冲等）。

---

### 四、 今日全维开运指南
1. **开运方位**:
   - **命局喜用方位（核心）**: 依日主真实喜用五行确定方位。
   - **流日民俗方位（参考）**: 标注今日{currentDayPillar}日的民俗财神/喜神方位。
2. **视觉色彩穿搭指导**:
   - **提运大吉色**: 契合喜用神五行的服饰搭配建议。
   - **泄气避忌色**: 对应忌神五行、今日应尽量避免大面积穿着的色彩。

---

### 五、 24小时流时精算评分表
严格按如下 Markdown 表格呈现全天 13 个时辰数据（**分值需依干支喜忌显著拉开差距，全天时辰均分需与总评分相符**）：

| 时辰 | 时间区间 | 时辰干支 | 运势得分 (0-100) | 简要吉凶判词 (15字以内) | 重点避忌 / 行动建议 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 早子时 | 00:00 - 01:00 | {tp_zi0} | | | |
| 丑时 | 01:00 - 03:00 | {tp_chou} | | | |
| 寅时 | 03:00 - 05:00 | {tp_yin} | | | |
| 卯时 | 05:00 - 07:00 | {tp_mao} | | | |
| 辰时 | 07:00 - 09:00 | {tp_chen} | | | |
| 巳时 | 09:00 - 11:00 | {tp_si} | | | |
| 午时 | 11:00 - 13:00 | {tp_wu} | | | |
| 未时 | 13:00 - 15:00 | {tp_wei} | | | |
| 申时 | 15:00 - 17:00 | {tp_shen} | | | |
| 酉时 | 17:00 - 19:00 | {tp_you} | | | |
| 戌时 | 19:00 - 21:00 | {tp_xu} | | | |
| 亥时 | 21:00 - 23:00 | {tp_hai} | | | |
| 夜子时 | 23:00 - 24:00 | {tp_zi24} | | | |

---

## Output Style (表达风格):
- 语气谦和、典雅、逻辑严密，展现命理学者的学者风范。
- 坚决杜绝“绝对发财”、“必有大灾”等宿命论断言，统一使用“概率倾向”、“气场顺逆”、“行事宜忌”等客观表述。
- 严格按照五个板块标题依序输出，无需输出任何多余的客套寒暄。
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
    currentDayStemElem: FIVE_ELEMENTS[currentDayPillar[0]] || '',
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
