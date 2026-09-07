# Celestial Observation & Bazi HUD (Geospatial Observer)

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A sophisticated web application combining professional celestial mapping with Bazi (Chinese Astrology) profile management. Designed for high-precision analytics and AI-powered astrological reporting.

## 🌟 Features

- **Celestial Map HUD**: Real-time position tracking of stars and planets using a custom-styled Leaflet interface.
- **Bazi Profile Core**: Manage full natal charts (Year, Month, Day, Hour pillars) with integrated target date prediction.
- **AI Fortune Report Generator**: One-click generation of detailed prompts for Gemini/LLMs, combining celestial mechanics with traditional Bazi theory.
- **Marked Sites System**: Bookmark specific coordinates with automatic elevation lookup and one-tap coordinate recall.
- **Geospatial Observer HUD**: Professional-grade telemetry display including Local Epoch, Chronos Alignment, Sun/Moon azimuth, and magnetic declination.
- **Responsive "Glassmorphism" UI**: High-density information display optimized for both desktop analysis and mobile field use.

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
