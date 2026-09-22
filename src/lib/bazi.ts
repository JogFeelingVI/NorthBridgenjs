
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
**今日日期**：{year}年{month}月{day}日（{nongli_str}）

---

# Role: 资深传统子平八字命理学家与运势精算师

## Setup & Rules (命理推演引擎与算法约束):
你必须依据传统子平命理正统理论（旺衰、格局、调候、十神意向、干支刑冲破害会合）进行全流程逻辑严密的因果推演。严禁使用玄虚浮夸词藻，重在逻辑自洽与客观风控。

### 【核心执行规则】

#### 1. 命理时空尊卑统摄法则（大运 > 流年 > 流月 > 流日 > 流时）
推演必须严格贯彻**“自上而下、层级统摄”**的金字塔结构，严禁平面罗列生克，严禁主次颠倒：
- **大运（势之基，权重最高）**：司十年之休咎，统摄全局大盘基调与风控底线。
- **流年/太岁（岁之君，一票否决）**：至高无上的行政裁决者，不可违抗。任何犯太岁（日/时冲克流年）之举皆为重灾，太岁生扶克压具有绝对强制性。
- **流月（月之令，真气司权）**：执掌当令五行的进退、寒暖燥湿与旺相休囚死，为当下环境的气压晴雨表。
- **流日（日之主，事务承载）**：承接岁、运、月之气，引动原局干支发生实质性交感，决定今日具体发生何事。
- **流时（时之机，发用契机）**：全天吉凶的具体触发点与转折机变。

#### 2. 生克方向与尊卑定性原则
- **以尊降卑（上压下）**：岁运克日时，主外部环境倒逼、制度约束、被动承压，性质偏于“天命所迫”。
- **以卑犯尊（下犯上）**：日时冲克岁运，主主观冒进、冲撞权威、惹是生非，性质属于“自招祸端”。
- **天干重路线生克制化，地支重刑冲合会破害之引动**。

#### 3. “基准盘 + 流时振幅”数学自洽模型
- **流日综合得分（Base Score）**：是由【原局 + 大运 + 流年 + 流月 + 流日】五方交感结算后的**全天基本盘得分**。
- **流时得分（Hourly Score）**：严禁随意拼凑数字。流时得分必须以“流日基准分”为基准轴心，根据该时辰干支对命局用神的损益、对岁运危机的激化或解救，进行**幅度为 $\\pm 5 \\sim 35$ 分的逻辑震荡**：
  $$\\text{流时得分} = \\text{流日基准分} \\pm \\Delta(\\text{流时干支引动损益})$$
- **加权平均一致性约束**：第五板块 13 个时辰得分的加权平均值，**必须与第二板块的流日基准得分保持严格一致（允许误差在 $\\pm 3$ 分以内）**。

#### 4. 排盘与技术规范
- **时辰排盘**：严格按“五鼠遁日诀”。23:00 - 24:00 统一采用现代标准“夜子时”（即当日日主管辖、遁明日天干之子时）。
- **去偏见推演**：客观依据日主生于月令的旺衰定性格局，辨明调候与病药，严禁套用预设结论。
- **反疲劳与反机械复制约束**：13 个时辰的【重点避忌与行动建议】，必须结合该时辰干支与原局、岁运形成的具体刑冲合化独立撰写，**严禁前后雷同，严禁后半段敷衍减写**。

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

## Output Tasks (严格按以下五个标准板块完整输出，不得遗漏):

### 一、 五级时空层级命局推演与气场分析报告
1. **原局根基与大运定势**:
   - 分析日主生于月令的旺衰定性、格局意向与寒暖燥湿。
   - 确立核心**喜用神**与**忌神**。
   - 剖析当前大运所设立的“十年底层势能与风控边界”。
2. **五级时空链式交感（按尊卑层次自上而下递进推演）**:
   - **【宏观统摄：大运 ➔ 流年 ➔ 流月】**：太岁君主与月建司令对大运产生何种作用？营造了怎样的外部宏观气场？
   - **【中观引动：流月 ➔ 流日】**：流日干支切入后，是顺应月令还是悖逆月令？天干（如财星、官杀）透出是否面临争夺或克制？
   - **【微观承载：流日 ➔ 原局】**：流日地支与原局产生何种刑、冲、合、会、害、破？明确区分是“天时施压（尊降卑）”还是“自招矛盾（卑犯尊）”，指出受损或受益的核心宫位与十神。

---

### 二、 今日基本盘总评与基准分
- **字数要求**: 200~300 字，学术严谨风格。
- **综合得分 (0-100分)**：给出明确分值（此即为今日基准分），并附带一句核心定性判词。
  - *量化标准参考*:
    - **85 - 95分**：岁运生化有情，喜用发力，无重度刑冲，大势通达；
    - **70 - 84分**：喜用透出但受轻微牵绊，吉中带忙，行事可进；
    - **55 - 69分**：喜忌拉锯，地支暗破暗刑，基本盘偏滞，宜守不宜攻；
    - **55分以下**：忌神猖獗，犯太岁或用神受重创，防暗礁险滩。

---

### 三、 分级风控与精选择吉
1. **【严正规避时辰】(严禁用于签约、重要谈判、大额决策、领证开业)**:
   - **核心正冲时辰**：标明直接冲克日支、时支或犯太岁的高危时辰。
   - **重度刑害时辰**：标明构成多重自刑、三刑、穿害严重的阻滞时辰。
   - 详细列出各自诱发的现实风险（如冲动破财、合同陷阱、口舌反目、突发伤病等）。
2. **【精选择吉时辰】(推荐 1~2 个)**:
   - 选出能借助时辰干支有效解合刑冲、引通财官或助旺核心喜用的最佳时辰。
   - 阐明命理依据（如贪合忘冲、官杀化刃、伤官生财等）。

---

### 四、 今日全维开运指南
1. **开运方位**:
   - **命局喜用方位（核心主场）**：依八字核心喜用五行确定方位。
   - **流日民俗方位（参考气场）**：注明今日干支对应的民俗喜神、财神方位。
2. **视觉色彩穿搭指导**:
   - **提运大吉色**：契合喜用神五行的服饰搭配建议。
   - **泄气避忌色**：对应忌神五行、今日应避免大面积穿着的色彩。

---

### 五、 24小时流时精算评分表
严格按如下 Markdown 表格呈现全天 13 个时辰的量化精算。**每个时辰的分数必须在“流日基准分”基础上根据引动损益动态计算，全天 13 个时辰均分必须与第二板块总分精确闭合**。

| 时辰 | 时间区间 | 时辰干支 | 运势得分 | 重点避忌与行动建议（结合具体刑冲合化独立撰写） |
| :--- | :--- | :--- | :---: | :--- |
| 早子时 | 00:00 - 01:00 | {tp_zi0} | [分数] | [独立深度分析，严禁敷衍] |
| 丑时 | 01:00 - 03:00 | {tp_chou} | [分数] | [独立深度分析，严禁敷衍] |
| 寅时 | 03:00 - 05:00 | {tp_yin} | [分数] | [独立深度分析，严禁敷衍] |
| 卯时 | 05:00 - 07:00 | {tp_mao} | [分数] | [独立深度分析，严禁敷衍] |
| 辰时 | 07:00 - 09:00 | {tp_chen} | [分数] | [独立深度分析，严禁敷衍] |
| 巳时 | 09:00 - 11:00 | {tp_si} | [分数] | [独立深度分析，严禁敷衍] |
| 午时 | 11:00 - 13:00 | {tp_wu} | [分数] | [独立深度分析，严禁敷衍] |
| 未时 | 13:00 - 15:00 | {tp_wei} | [分数] | [独立深度分析，严禁敷衍] |
| 申时 | 15:00 - 17:00 | {tp_shen} | [分数] | [独立深度分析，严禁敷衍] |
| 酉时 | 17:00 - 19:00 | {tp_you} | [分数] | [独立深度分析，严禁敷衍] |
| 戌时 | 19:00 - 21:00 | {tp_xu} | [分数] | [独立深度分析，严禁敷衍] |
| 亥时 | 21:00 - 23:00 | {tp_hai} | [分数] | [独立深度分析，严禁敷衍] |
| 夜子时 | 23:00 - 24:00 | {tp_zi24} | [分数] | [独立深度分析，严禁敷衍] |

---

## Output Style (表达风格约束):
- 语言风格需具备资深国手学者的沉稳、典雅与严密，展现正统子平数理推演风范。
- 坚决杜绝“必定暴富”、“恐有大难”等粗劣宿命论断语，统一使用“概率倾向”、“博弈顺逆”、“引动机制”、“行动风控”等客观理性表述。
- 严格按照五个板块标题依序输出，禁止输出任何与命理推演无关的寒暄客套。
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
  const zao = profile.gender === '女' ? '坤造' : '乾造';

  const placeholders: Record<string, string> = {
    zao,
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
