# Celestial Observation & Bazi HUD (Geospatial Observer)

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A sophisticated web application combining professional celestial mapping with Bazi (Chinese Astrology) profile management. Designed for high-precision analytics and AI-powered astrological reporting.

## 🌟 Features

- **Celestial Map HUD**: Real-time position tracking of stars and planets using a custom-styled Leaflet interface.
- **Bazi Profile Core**: Manage full natal charts (Year, Month, Day, Hour pillars) with integrated target date prediction and automatic ten-gods (十神) & five-elements (五行) annotation.
- **AI Fortune Report Generator (Gen Prompt v3.0)**: One-click generation of professional-grade prompts for Gemini and advanced LLMs, featuring five-tier spatiotemporal hierarchy deduction, "Base Score + Hourly Amplitude" mathematical consistency, and 13-hourly period actuarial tables.
- **Marked Sites System**: Bookmark specific coordinates with automatic elevation lookup and one-tap coordinate recall.
- **Geospatial Observer HUD**: Professional-grade telemetry display including Local Epoch, Chronos Alignment, Sun/Moon azimuth, and magnetic declination.
- **Responsive "Glassmorphism" UI**: High-density information display optimized for both desktop analysis and mobile field use.

## 🔮 Gen Prompt 提示词架构与子平精算规范 (Prompt v3.0 Specification)

点击 Bazi Profile 面板中的 **`Gen Prompt`** 按钮，系统将根据用户输入的命主原局、大运信息与选定预测日期的流日干支，自动组装并生成遵循正统子平命理推演规范的结构化 AI 提示词。

### 1. 角色定位与首行元数据 (Persona & Top Metadata)
- **首行置顶元数据**：提示词首行通过 Markdown 规范输出 `**今日日期**：{year}年{month}月{day}日（{nongli_str}）` 并附带 Markdown 分割线 `---`，清晰规范标识预测流日。
- **资深传统子平八字命理学家与运势精算师**：严谨依托旺衰、格局、调候、十神意向及干支刑冲破害会合进行因果链条推演，拒绝玄虚宿命论断语，注重逻辑自洽与行动风控。

### 2. 四大核心执行规则 (Core Execution Rules)
1. **五级命理时空尊卑统摄法则（大运 > 流年 > 流月 > 流日 > 流时）**：
   - **大运（势之基）**：司十年之休咎，统摄全局大盘基调与风控底线。
   - **流年/太岁（岁之君）**：至高无上的行政裁决者，一票否决；任何犯太岁之举皆为重灾。
   - **流月（月之令）**：司当令真气之权，主寒暖燥湿与旺相休囚死，为当下环境的气压晴雨表。
   - **流日（日之主）**：承接岁运月之气，引动原局干支发生实质性交感，决定今日具体事由。
   - **流时（时之机）**：全天吉凶发用与转折的微观触发点。
2. **生克方向与尊卑定性原则**：
   - **以尊降卑（上压下）**：岁运克日时，主外部环境倒逼、制度约束、被动承压（天命所迫）。
   - **以卑犯尊（下犯上）**：日时冲克岁运，主主观冒进、冲撞权威、惹是生非（自招祸端）。
   - 天干重路线生克制化，地支重刑冲合会破害之引动。
3. **“基准盘 + 流时振幅”数学自洽闭合模型**：
   - **流日基准分（Base Score）**：原局 + 大运 + 流年 + 流月 + 流日五方交感结算的全天综合基本盘（0~100分）。
   - **流时得分振荡**：流时得分围绕流日基准分呈 $\pm 5 \sim 35$ 分的逻辑震荡：
     $$\text{流时得分} = \text{流日基准分} \pm \Delta(\text{流时干支引动损益})$$
   - **加权均分自洽约束**：全天 13 个时辰得分的加权平均值与流日基准分**严格一致（误差 $\le \pm 3$ 分）**。
4. **排盘与技术规范**：
   - **五鼠遁日与夜子时**：严格依据五鼠遁日口诀推演 13 时辰；23:00 - 24:00 采用标准夜子时（当日日主管辖、遁明日天干之子时）。
   - **去偏见与反疲劳约束**：客观依据日主生于月令的旺衰定性格局，严禁前后雷同，杜绝后半段时辰敷衍减写。

### 3. 自动注入的高维参数体系 (Injected Parameters)
系统在组装 Prompt 时自动注入以下高精度计算数据：
- **命主原局**：性别、年龄、四柱（年、月、日、时）及其干支十神/五行/神煞属性自动标注（如日主、羊刃、湿印等）。
- **当前大运**：当前正在行使的大运干支。
- **流日数据**：公历年月日、农历干支纪年/月/日（如丙午年、丙申月、甲子日）及流日柱的十神属性。
- **十三时辰干支**：由五鼠遁日口诀动态派生的 13 个时辰（早子时 `00:00-01:00` 至夜子时 `23:00-24:00`）标准干支。

### 4. 标准化五大输出板块 (Standardized Output Modules)
提示词约束 AI 严格按顺序输出五大标准板块，杜绝无关客套：
- **一、五级时空层级命局推演与气场分析报告**：
  - *原局根基与大运定势*：旺衰定性、格局意向、喜用神与忌神、大运十年势能底线；
  - *五级时空链式交感*：宏观统摄（大运 ➔ 流年 ➔ 流月）、中观引动（流月 ➔ 流日）、微观承载（流日 ➔ 原局，辨清尊降卑与卑犯尊）。
- **二、今日基本盘总评与基准分**：
  - 200~300 字学术严谨总评；
  - 给出 0~100 分综合基准分及核心定性判词（85-95 大势通达 / 70-84 行事可进 / 55-69 宜守不宜攻 / 55以下 防暗礁险滩）。
- **三、分级风控与精选择吉**：
  - *严正规避时辰*：核心正冲时辰（冲克日时或犯太岁）、重度刑害时辰（自刑、三刑、穿害）及诱发的现实风险；
  - *精选择吉时辰*：1~2 个化解刑冲、助旺用神的最佳时辰与命理依据（贪合忘冲、官杀化刃等）。
- **四、今日全维开运指南**：
  - *开运方位*：命局喜用核心主场方位、流日民俗喜神/财神参考方位；
  - *色彩穿搭指导*：提运大吉色与泄气避忌色。
- **五、24小时流时精算评分表**：
  - Markdown 表格形式，包含全天 13 个时辰（早子时至夜子时）的时间区间、时辰干支、运势得分与结合刑冲合化独立撰写的重点避忌与行动建议。

### 5. 表达风格约束 (Output Style)
- 语言沉稳典雅，具备国手学者风范；
- 坚决杜绝粗俗宿命断语，统一使用“概率倾向”、“博弈顺逆”、“引动机制”、“行动风控”等客观理性表述。

## 🛠 Tech Stack

- **React 18** (Vite-powered)
- **Tailwind CSS**: Utility-first styling with custom "Cyber-HUD" theme.
- **Motion (Framer Motion)**: Fluid transitions and UI interactions.
- **Leaflet**: High-performance interactive maps.
- **Lunar-JavaScript**: Precise calendar and Bazi calculations.
- **Lucide React**: Vector-perfect iconography.

## 📜 Version History & Updates

### BUILD_REV: 20260907.0810 (Latest)
- **子平命理时空尊卑统摄与流时振幅精算升级 (Bazi Prompt v3.0)**:
  - 核心执行规则升级：
    1. **五级命理时空尊卑统摄法则**：明确确立「大运 > 流年 > 流月 > 流日 > 流时」自上而下的金字塔结构；
    2. **生克方向与尊卑定性原则**：明辨「以尊降卑（上压下）」与「以卑犯尊（下犯上）」的区别与责任归属；
    3. **“基准盘 + 流时振幅”数学自洽模型**：流日综合得分作为全天基准分，流时得分围绕基准分呈 $\pm 5 \sim 35$ 分逻辑震荡，13 个时辰均分与总分严格自洽（误差 $\le \pm 3$ 分）；
    4. **排盘与技术规范**：规范五鼠遁日诀、夜子时界分及反疲劳约束。
  - 标准化五大输出板块升级：
    - 一、五级时空层级命局推演与气场分析报告（原局大运定势、宏观统摄、中观引动、微观承载）；
    - 二、今日基本盘总评与基准分；
    - 三、分级风控与精选择吉（核心正冲、重度刑害、精选择吉）；
    - 四、今日全维开运指南（核心主场、参考气场、穿搭指导）；
    - 五、24小时流时精算评分表（严格闭合闭环与独立深度分析）。

### BUILD_REV: 20260903.0655
- **提示词精简 (Prompt Optimization)**:
  - 移除了 24 小时流时精算评分表中的「简要吉凶判词 (15字以内)」字段，精简表格结构，聚焦于流时运势得分与重点避忌/行动建议。

### BUILD_REV: 20260817.0104
- **子平八字命理精算师提示词升级 (Bazi Actuary Prompt v2.1)**:
  - 角色重塑为「资深传统子平八字命理学家与运势精算师」；
  - 强化核心执行规则：去偏见推演、夜子时标准排盘、分数数学自洽约束（总评分数与13个时辰加权均分误差≤±5分）、反疲劳与深度生成约束（杜绝时辰判词雷同与后半段敷衍）；
  - 优化输出五大板块：命局推演与流日气场分析报告、今日运势总评与综合基准分、分级风控与精选择吉、今日全维开运指南、24小时流时精算评分表；
  - 动态格式化时间区间（如 `00:00 - 01:00`, `01:00 - 03:00` ... `23:00 - 24:00`）。

### BUILD_REV: 20260817.0035

### BUILD_REV: 20260604.1351
- **标准八字算法恢复 (Standard Bazi Restored)**: 恢复标准的干支纪时算法，回归传统时刻界分逻辑。

### BUILD_REV: 20260604.0034
- **命理分析提示词重构 (Prompt Refactoring)**: 结合了严格的推理逻辑机制 (Chain of Thought - Step 1, Step 2)；
- **全天流时打分改进 (Hourly Score Table)**: 强制约束大语言模型输出二十四小时流时运势评分表格，杜绝所有时辰分数雷同，确保干支五行波动的真实性；
- **核心避险与开运 (Risk Controls & Orientation advice)**: 支持动态融合并检测日柱天克地冲与日支支神相刑，并输出对应的风控预警信息；
- **参数支持扩展 (Parameters Extended)**: 补充传入原局四柱年支、日支、时支、年干、日干、时干等高精维度变量，确保大语言模型能完美定位生克合化。

### BUILD_REV: 20260507.0716 (Latest)
- **Header Optimization**: Relocated "Local Epoch" and "Chronos Alignment" to the main header for instant visibility.
- **Bazi Styling**: Implemented specialized golden text for Bazi pillars in the HUD.
- **UI Simplification**: Removed redundant coordinate and timezone strings from the header to reduce visual clutter.
- **Modal Refinements**: 
  - Removed visible scrollbars from prompt text areas while maintaining full scroll capability.
  - Implemented background scroll-locking when modals are active.
- **Version Tracking**: Switched from static version numbers to a build-revision timestamp system.

---

## 🚀 Run locally

**Prerequisites:** Node.js

1. **Install dependencies**:
   `npm install`
2. **Environment Setup**:
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. **Start Development**:
   `npm run dev`

## 🌐 View your app
- **Live Deployment**: [gnesbazi.vercel.app](https://gnesbazi.vercel.app/)
