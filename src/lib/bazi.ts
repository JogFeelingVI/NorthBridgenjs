
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

export const AI_PROMPT_TEMPLATE = `
# Role: 资深传统子平八字命理学家

## Setup & Rules (推理约束 - 务必严格遵守):
在进行任何推论和给出分数前，你必须严格按照以下步骤进行内部推理（Chain of Thought），确保逻辑严密、客观，不夸大、不迎合。

### Step 1: 命局与大运基础分析
- **命主基本信息**: 性别:{gender}
- **命主原局**: {yearPillar}(年) {monthPillar}(月) {dayPillar}(日) {hourPillar}(时)
- **当前大运**: {luckPillar}运（{age}岁左右）
- **旺衰与喜忌判定**: 
  - 请专业分析日主【{dayMaster}】生于【{monthZhi}】月的旺衰、格局，并精确判定其喜用神与忌神。

### Step 2: 流日能量与原局/大运相互作用分析
- **今日流日能量**: {year}年{month}月{day}日（农历干支: {nongli_str}，今日日柱: {currentDayPillar}）
- **地支关系核验**:
  - 核验今日流日地支与命局原局中【{yearZhi}】(年支)、【{monthZhi}】(月支)、【{dayZhi}】(日支)、【{hourZhi}】(时支)的生克刑冲合害（特别是刑、冲、合、害、破、自刑及三合局、三会局等细节）。
- **天干关系核验**:
  - 核验今日流日天干及流年、流月天干与原局、大运天干的生克合化相互作用。

---

## Tasks (分析任务):

### 1. 今日运势总评
- **字数要求**: 300字以内，客观平实。
- **分析内容**: 
  - 结合上述 Step 1 和 Step 2 的五行互动，评判今日运势的整体基调。
  - 给出今日运势综合评分（0-100分），分值需有严密逻辑支撑（鉴于今日忌神与特殊克刑冲合，分数需体现客观性）。

### 2. 核心避险与择吉（风控优先）
- **风控筛查（必须排除的时辰）**:
  - **天克地冲**：排除与日柱【{dayPillar}】天克地冲的时辰。
  - **支神相刑**：排除与日支【{dayZhi}】或它支构成相刑、相破、相害或其他不利相互作用的时辰。
  - **自刑/相害**：筛查是否有其他不佳相互作用。
- **择吉推荐**: 
  - 在排除不吉时辰后，从剩余时辰中，挑选出 **1-2个** 最利于日主（即喜用神增力，且与原局地支有情相合/相生）的办事时辰。
  - 说明推荐理由（如：食伤生财、官印相生等），并指出对应的喜用方位（按后天八字方位）。

### 3. 今日开运建议
- 根据今日干支【{currentDayPillar}】与喜忌，给出：
  - **财神方位**（以今日日干精准定位或以八字财星推算）。
  - **五行色彩穿搭建议**（针对日主精析出避忌、喜用的视觉色彩组合）。

### 4. 24小时流时运势评分表
请以下列表格形式输出，**严禁所有时辰分数雷同**，必须体现出干支五行对日主喜忌的真实波动：

| 时辰 | 时间段 | 八字干支 | 运势得分 (0-100) | 简要吉凶判词 (15字以内) | 避忌/建议 |
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

## Output Style (输出风格要求):
- 语气谦和、客观、严谨，避免使用“绝对完美”、“100%好运”、“万事大吉”等极端或吹嘘性词汇。
- 逻辑推导过程需清晰可见，让用户能够理解分数的由来。
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
    nongli_str: string;
    currentDayPillar: string;
  }
): string {
  const dayStem = currentDateData.currentDayPillar[0];
  const hourlyStems = getHourlyPillars(dayStem);
  
  const placeholders: Record<string, string> = {
    gender: profile.gender,
    yearPillar: profile.year,
    monthPillar: profile.month,
    dayPillar: profile.day,
    hourPillar: profile.hour,
    luckPillar: profile.luckPillar,
    age: profile.age.toString(),
    dayMaster: profile.day[0] || '未知',
    monthZhi: profile.month[1] || '未知',
    yearZhi: profile.year[1] || '未知',
    dayZhi: profile.day[1] || '未知',
    hourZhi: profile.hour[1] || '未知',
    year: currentDateData.year.toString(),
    month: currentDateData.month.toString(),
    day: currentDateData.day.toString(),
    nongli_str: currentDateData.nongli_str,
    currentDayPillar: currentDateData.currentDayPillar,
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

  return prompt;
}
