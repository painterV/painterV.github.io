/* All site content lives here. Every text field is { en, zh }.
   Add a project = append to PROJECTS (slug must be unique) + drop a figure in img/projects/.
   ponytail: placeholder content this phase; populated from resume next phase. */

const T = (en, zh) => ({ en, zh });

const PROFILE = {
  name: T("Wenbao Li", "李文宝"),
  // shown big in the hero
  title: T("Senior Data Engineer", "高级数据工程师"),
  tagline: T(
    "Ex-Tencent & Baidu. Search, recommendation, and ML systems — now building data platforms in Tokyo.",
    "前腾讯、百度工程师。做过搜索、推荐与机器学习系统 —— 如今在东京构建数据平台。"
  ),
  blurb: T(
    "Data & software engineer with 5+ years building machine learning, data engineering, and large-scale systems for search, recommendation, and online advertising at Tencent and Baidu. Snowflake, Databricks, and Terraform certified. C++ · Python · Go.",
    "数据与软件工程师,5 年以上经验,曾在腾讯、百度构建搜索、推荐与在线广告领域的机器学习、数据工程与大规模系统。持有 Snowflake、Databricks、Terraform 认证。C++ · Python · Go。"
  ),
  location: T("Tokyo, Japan", "日本 · 东京"),
  email: "wenbaoli@hotmail.com",
  links: {
    github: "https://github.com/dearLilian",
    linkedin: "https://www.linkedin.com/in/wenbao-li-526553ab",
  },
};

/* Reverse chronological. date is language-neutral. */
const EXPERIENCE = [
  {
    slug: "catalina",
    company: T("Catalina Marketing Japan", "Catalina Marketing Japan"),
    url: "https://catalinamarketing.co.jp/",
    logo: "img/companies/catalina.png",
    color: "#1d3f63",
    current: true,
    location: T("Tokyo, Japan", "日本 · 东京"),
    mentored: 3, mentoredOngoing: true,
    domains: [
      { icon: "ic-basket", label: T("Basket", "购物篮") },
      { icon: "ic-coupon", label: T("Coupon", "优惠券") },
    ],
    role: T("Senior Data Engineer", "高级数据工程师"),
    date: "Sep 2023 — Present · Tokyo",
    summary: T(
      "Data engineering for retail marketing — settlement, basket & coupon data, and a legacy-to-Azure migration. Grew from individual contributor to manager.",
      "零售营销的数据工程 —— 结算、购物篮与优惠券数据,以及遗留系统上云(Azure)。已从独立贡献者成长为管理者。"
    ),
    focus: T(
      "Catalina's data engineering — turning in-store basket and coupon data into transaction-grade settlement, migrating legacy pipelines to a cloud-native Azure stack, and growing from individual contributor into management.",
      "Catalina 的数据工程 —— 把门店购物篮与优惠券数据做成交易级结算,把遗留管道迁移到云原生 Azure,并从独立贡献者成长为管理者。"
    ),
    journey: [
      { date: "Sep 2023", title: T("Joined — Data Engineer", "入职 — 数据工程师"),
        note: T("Took ownership of the digital-coupon settlement engine and led the Azure modernization.", "接手数字优惠券结算引擎,并主导 Azure 现代化迁移。") },
      { date: "Jun 2025", title: T("Promoted — senior individual contributor", "晋升 —— 资深独立贡献者"),
        note: T("Recognized for transaction-grade settlement and the legacy-to-cloud migration.", "因交易级结算与遗留系统上云获得晋升。") },
      { date: "Mar 2026", level: T("Manager", "管理"), title: T("Took on management", "开始带团队"),
        note: T("Gained management responsibility, with 2 direct reports.", "获得管理职责,直接下属 2 人。") },
    ],
    projects: ["core-settlement-engine", "cloud-modernization"],
  },
  {
    slug: "tencent-music",
    company: T("Tencent Music Entertainment", "腾讯音乐娱乐集团"),
    url: "https://www.tencentmusic.com/en-us/",
    logo: "img/companies/qqmusic.png",
    color: "#15b86c",
    location: T("Shenzhen, China", "中国 · 深圳"),
    mentored: 2,
    domains: [
      { icon: "ic-music", label: T("Music", "音乐") },
    ],
    role: T("Senior Software Engineer", "高级软件工程师"),
    date: "Sep 2019 — Nov 2022 · Shenzhen",
    summary: T(
      "Music-recommendation backend R&D at Tencent Music; promoted twice over three years.",
      "在腾讯音乐做音乐推荐后台研发;三年内两次晋升。"
    ),
    focus: T(
      "One of Tencent Music's core data teams — R&D on the music-recommendation backend for QQ Music. Three years climbing both the stack and the ladder, with two promotions.",
      "腾讯音乐核心数据团队之一,负责 QQ 音乐音乐推荐后台服务的研发。三年里在技术栈与职级上一路向上,期间两次晋升。"
    ),
    journey: [
      { date: "Sep 2019", title: T("Joined — Recommendation Backend", "入职 — 推荐后台"),
        note: T("Joined a core data team; built the real-time vector-retrieval stack (hundreds of indexes, a notable DAU lift).", "加入核心数据团队;构建实时向量检索栈(数百索引,DAU 显著提升)。") },
      { date: "Sep 2020", title: T("Promoted (after 1 year)", "晋升(一年后)"),
        note: T("Unified fragmented recall scenarios into a DAG operator framework.", "将碎片化召回场景统一为 DAG 算子框架。") },
      { date: "2022", title: T("Promoted again (1.5 years later)", "再次晋升(一年半后)"),
        note: T("Built the generalized recommendation engine and tag-based recommendation.", "构建通用推荐引擎与标签关联推荐。") },
    ],
    projects: ["qq-rec-engine", "qq-tag-recommendation", "qq-recall-system", "vector-retrieval"],
  },
  {
    slug: "baidu",
    company: T("Baidu", "百度"),
    url: "https://ir.baidu.com/",
    logo: "img/companies/baidu.svg",
    color: "#2319dc",
    location: T("Beijing, China", "中国 · 北京"),
    mentored: 1,
    domains: [
      { icon: "ic-ad", label: T("Advertising", "广告") },
    ],
    role: T("Engineer · Search Ads", "工程师 · 搜索广告"),
    date: "Jul 2017 — Sep 2019 · Beijing",
    summary: T(
      "Data analysis for search advertising at Baidu; grew from junior to senior engineer.",
      "百度搜索广告业务的数据分析;从初级工程师成长为高级工程师。"
    ),
    focus: T(
      "Baidu's search-advertising business — web-scale data analysis on Hadoop/MapReduce, mining user intent. This is where I grew from junior to senior engineer and got my first taste of large-scale data in production.",
      "百度搜索广告业务 —— 在海量规模上(Hadoop/MapReduce)做数据分析、挖掘用户意图。我在这里从初级成长为高级工程师,第一次接触生产环境的大规模数据。"
    ),
    journey: [
      { date: "Jul 2017", title: T("Junior Engineer — Search Ads", "初级工程师 — 搜索广告"),
        note: T("Joined the search-advertising business; data analysis at scale.", "加入搜索广告业务;从事大规模数据分析。") },
      { date: "2019", title: T("Promoted to Senior Engineer", "晋升高级工程师"),
        note: T("Grew from junior to senior, owning query-prefix ad suggestion and ad-matching strategy.", "从初级成长为高级,负责搜索前缀广告推荐与广告匹配策略。") },
    ],
    projects: ["search-ad-suggestion"],
  },
];

/* A course row: C(EN, 中文, score). slug links to a transcript page edu.html?d=<slug>. */
const C = (en, zh, score) => ({ name: T(en, zh), score: String(score) });

const EDUCATION = [
  {
    slug: "msc",
    school: T("Univ. of Electronic Science & Technology of China", "电子科技大学"),
    degree: T("M.Sc. · Computer Software & Theory", "硕士 · 计算机软件与理论"),
    date: "2014 — 2017 · Chengdu",
    gpa: "3.2 / 4.0 (78.15 / 100)",
    note: T(
      "Data Mining Lab, advised by Prof. Junming Shao — research in graph clustering and data mining. TA for Calculus and Probability Theory.",
      "数据挖掘实验室,导师 邵俊明 教授 —— 研究方向:图聚类与数据挖掘。担任微积分与概率论助教。"
    ),
    lab: { name: T("Data Mining Lab", "数据挖掘实验室"), url: "https://dm.uestc.edu.cn/" },
    courseGroups: [
      { group: T("Major & Research", "专业与研究"), courses: [
        C("Pattern Recognition", "模式识别", "65"),
        C("Pattern Recognition & Data Mining", "模式识别与数据挖掘", "Passed"),
        C("Neural Network Theory & Applications", "神经网络理论与应用", "Passed"),
        C("Algorithm Design & Analysis", "算法设计与分析", "76"),
        C("Combinatorial Design & Optimization Theory", "组合设计与组合优化理论", "Passed"),
        C("New Database Technologies", "数据库新技术", "Passed"),
      ]},
      { group: T("Mathematics", "数学"), courses: [
        C("Matrix Theory", "矩阵理论", "73.6"),
        C("Combinatorics", "组合数学", "91"),
        C("Stochastic Process & Queuing Theory", "随机过程与排队论", "76.8"),
        C("Optimization Theory & Applications", "最优化理论与应用", "88.4"),
      ]},
      { group: T("General & Other", "公共与其他"), courses: [
        C("English Listening & Writing (Postgraduate)", "硕士生英语听说与写作", "65.6"),
        C("English Reading & Translation (Postgraduate)", "硕士生英语阅读与翻译", "75"),
        C("Socialism w/ Chinese Characteristics: Theory & Practice", "中国特色社会主义理论与实践", "85.4"),
        C("Dialectics of Nature", "自然辩证法", "Passed"),
        C("Appreciation of Vocal Music Art", "声乐艺术欣赏", "Passed"),
        C("Music Fundamentals & Sight Singing", "音乐基础与视唱", "Passed"),
        C("Thesis Proposal & Literature Review", "论文开题报告及文献综述", "Passed"),
        C("Academic Activities (×10)", "学术活动(十次)", "Passed"),
      ]},
    ],
  },
  {
    slug: "bsc",
    school: T("Univ. of Electronic Science & Technology of China", "电子科技大学"),
    degree: T("B.Sc. · Mathematics & Applied Mathematics", "学士 · 数学与应用数学"),
    date: "2010 — 2014 · Chengdu",
    gpa: "3.31 / 4.0 (80.11 / 100)",
    note: T(
      "School of Mathematical Sciences. Excellent Undergraduate Thesis Award.",
      "数学科学学院。优秀本科毕业论文奖。"
    ),
    courseGroups: [
      { group: T("Mathematics", "数学"), courses: [
        C("Mathematical Analysis I–III", "数学分析 I–III", "69 / 74 / 70"),
        C("Advanced Algebra I–II", "高等代数 I–II", "77 / 70"),
        C("Analytic Geometry", "解析几何", "60"),
        C("Abstract Algebra", "抽象代数", "81"),
        C("Ordinary Differential Equations", "常微分方程", "84"),
        C("Mathematical Logic & Binary Relations", "数理逻辑与二元关系", "68"),
        C("Probability & Mathematical Statistics", "概率与数理统计", "72"),
        C("Functions of a Complex Variable", "复变函数", "63"),
        C("Functions of a Real Variable", "实变函数", "91"),
        C("Functional Analysis", "泛函分析", "78"),
        C("Equations of Mathematical Physics", "数学物理方程", "88"),
        C("Introduction to Topology", "拓扑学导论", "90"),
        C("Graph Theory & Combinatorics", "图论与组合数学", "96"),
        C("Applied Stochastic Processes", "应用随机过程", "92"),
        C("Optimization Methods", "最优化方法", "89"),
        C("Computational Methods", "计算方法", "71"),
        C("Mathematical Modeling", "数学建模", "65"),
        C("Mathematical Modeling Training", "数学建模训练", "85"),
        C("Mathematical Experiments", "数学实验", "65"),
      ]},
      { group: T("Computer Science & Engineering", "计算机与工程"), courses: [
        C("Data Structures", "数据结构", "60"),
        C("C Language", "C语言", "80"),
        C("C Program Design", "C程序设计", "90"),
        C("C++ Program Design", "C++程序设计", "80"),
        C("Software Engineering", "软件工程", "85"),
        C("Database Principles & Applications", "数据库原理及其应用", "80"),
        C("Fundamentals of Computer Applications", "计算机应用基础", "88"),
        C("Comprehensive Course Design", "综合课程设计", "85"),
        C("Fundamentals of Circuit Analysis", "电路分析基础", "72"),
        C("CNC Turning & Machining of Shaft Parts", "典型轴类零件的数控车削工艺与加工", "77"),
        C("Scientific Research Training", "科研实训", "93"),
        C("Productive Practice", "生产实习", "90"),
        C("Graduation Design (Thesis)", "毕业设计", "93"),
      ]},
      { group: T("Sciences", "理科"), courses: [
        C("College Physics I–II", "大学物理 I–II", "78 / 75"),
        C("College Physics Experiments I–II", "大学物理实验 I–II", "72 / 85"),
      ]},
      { group: T("General & Languages", "通识与语言"), courses: [
        C("College English I–II", "大学英语 I–II", "75 / 73"),
        C("English Electives (post-CET4) I–II", "CET4后英语选修 I–II", "88 / 89"),
        C("CET-4 (National Exam)", "大学英语国家统考四级", "527"),
        C("Advanced Military English Reading", "新世纪军事英语高级阅读", "79"),
        C("Online English Listening & Speaking L4", "在线体验英语听说4级", "90"),
        C("Japanese I", "日语 I", "87"),
        C("College Chinese", "大学语文", "72"),
        C("Fundamentals of Economics", "经济学基础", "78"),
        C("Quantitative Economics", "数量经济学", "88"),
        C("Publishing & Exchanging Papers", "发表论文和交流论文", "92"),
        C("Professional Education for Freshmen", "新生专业教育", "90"),
        C("Psychological Health & Innovation", "心理健康与创新能力", "92"),
        C("Ideological & Moral Cultivation, Legal Basis", "思想道德修养与法律基础", "84"),
        C("Modern Chinese History", "中国近现代史纲要", "78"),
        C("Mao Zedong Thought & Socialism Theory", "毛泽东思想和中国特色社会主义理论体系概论", "88"),
        C("Principles of Marxism", "马克思主义基本原理", "88"),
        C("Military Theory", "军事理论", "71"),
        C("Military Practice (incl. Training)", "军事实践(含军训)", "90"),
      ]},
      { group: T("PE & Arts", "体育与艺术"), courses: [
        C("Physical Education I", "大学体育 I", "95"),
        C("PE Electives I–II", "大学体育选修 I–II", "85 / 82"),
        C("Table Tennis", "乒乓球", "95"),
        C("Tennis", "网球", "92"),
      ]},
    ],
  },
];

/* Each project gets its own page at project.html?slug=<slug>.
   figure: path to a figure shown on the home card AND the detail page. */
/* Skill set — soft/architectural competencies a project demonstrates (not tech stack). */
const SK = {
  systemDesign:   T("System Design", "系统设计"),
  distributed:    T("Distributed Systems", "分布式系统"),
  architecture:   T("Architecture", "架构设计"),
  perf:           T("Performance Optimization", "性能优化"),
  configDriven:   T("Config-driven Design", "配置化设计"),
  dataModeling:   T("Data Modeling", "数据建模"),
  crossTeam:      T("Cross-team Collaboration", "跨团队协作"),
  mentoring:      T("Mentoring", "指导带教"),
  techLead:       T("Technical Leadership", "技术领导"),
  ownership:      T("Ownership", "Owner 意识"),
  reliability:    T("Reliability Engineering", "可靠性工程"),
  comms:          T("Stakeholder Communication", "干系人沟通"),
  problemSolving: T("Problem Solving", "问题拆解"),
  legacy:         T("Legacy Modernization", "遗留系统现代化"),
  recsys:         T("Recommendation Systems", "推荐系统"),
  mlEng:          T("ML Engineering", "机器学习工程"),
};

const PROJECTS = [
  {
    slug: "core-settlement-engine",
    theme: "#1d3f63",
    skills: [SK.systemDesign, SK.reliability, SK.dataModeling, SK.techLead, SK.ownership],
    name: T("Core Settlement Engine", "核心结算引擎"),
    oneLiner: T(
      "Transaction-grade batch validation for digital coupon clearing.",
      "面向数字优惠券清算的交易级批量校验引擎。"
    ),
    figure: "img/projects/settlement.svg",
    role: T("Senior Data Engineer · Lead", "高级数据工程师 · 负责人"),
    date: "2023 — Present · Catalina",
    stack: ["databricks", "snowflake", "azure", "python", "sql"],
    description: T(
      "Designed and built a high-performance, UDF-based batch validation engine for digital coupon clearing — ensuring accurate, transaction-grade reward settlement for two major retail partners.",
      "设计并构建了一套高性能、基于 UDF 的批量校验引擎,用于数字优惠券清算 —— 为两家大型零售伙伴提供准确、交易级的奖励结算。"
    ),
    highlights: [
      T("Transaction-grade reward settlement for two major retailers", "为两家大型零售伙伴提供交易级奖励结算"),
      T("UDF-based batch validation on a modern cloud stack", "现代云栈上的 UDF 批量校验"),
      T("Led a team of 3 engineers end-to-end", "端到端带领 3 人工程团队"),
    ],
  },
  {
    slug: "cloud-modernization",
    theme: "#1d3f63",
    skills: [SK.architecture, SK.legacy, SK.crossTeam, SK.systemDesign, SK.reliability],
    name: T("Legacy → Azure Modernization", "遗留系统到 Azure 的现代化"),
    oneLiner: T(
      "Re-architecting legacy Informatica/Yellowbrick workflows onto Azure.",
      "将 Informatica/Yellowbrick 遗留流程重构到 Azure。"
    ),
    figure: "img/projects/modernization.svg",
    role: T("Senior Data Engineer · Lead", "高级数据工程师 · 负责人"),
    date: "2023 — Present · Catalina",
    stack: ["azure", "terraform", "databricks", "apachespark", "python"],
    description: T(
      "Led the end-to-end re-architecture of legacy workflows from Informatica/Yellowbrick to an Azure-based stack — reverse-engineering intertwined business logic and decoupling it into modular, maintainable services. During a US–Japan organizational split, consolidated workloads from 5+ global teams into a single local unit with 100% data integrity and zero downtime.",
      "主导将遗留工作流从 Informatica/Yellowbrick 端到端重构到基于 Azure 的技术栈 —— 逆向梳理交织的业务逻辑,解耦为模块化、可维护的服务。在美日组织拆分期间,将 5+ 全球团队的工作负载整合为一个本地单元,数据 100% 完整、零停机。"
    ),
    highlights: [
      T("Decoupled intertwined legacy logic into modular services", "将交织的遗留逻辑解耦为模块化服务"),
      T("Consolidated 5+ global teams' workloads, zero downtime", "整合 5+ 全球团队工作负载,零停机"),
      T("Automated validation + alerting that significantly reduced downstream discrepancies", "自动化校验与告警,显著降低下游差异"),
    ],
  },
  {
    slug: "qq-rec-engine",
    theme: "#15b86c",
    skills: [SK.systemDesign, SK.distributed, SK.configDriven, SK.ownership],
    name: T("QQ Music Recommendation Engine", "QQ 音乐推荐引擎"),
    oneLiner: T(
      "A generalized engine for real-time and scheduled music recommendations.",
      "面向实时与定时音乐推荐的通用引擎。"
    ),
    figure: "img/projects/rec-engine.svg",
    role: T("Senior Software Engineer · Owner", "高级软件工程师 · 负责人"),
    date: "2021 — 2022 · Tencent Music",
    stack: ["cplusplus", "go", "redis"],
    description: T(
      "Built a generalized recommendation engine supporting both real-time and customized periodic recommendations across content types and target scenarios. Powered 10+ track-based recommendation services — Personal Radio for IoT users, “Everyday 30” for VIPs, daily check-in song recommendations — on a DAG-based, operator-driven architecture with distributed configuration.",
      "构建了一套通用推荐引擎,支持跨内容类型与目标场景的实时与定制化周期推荐。以基于 DAG、算子驱动、分布式配置的架构,支撑 10+ 基于单曲的推荐服务 —— 面向 IoT 用户的「个人电台」、面向 VIP 的「每日 30 首」、每日签到歌曲推荐等。"
    ),
    highlights: [
      T("Powered 10+ recommendation scenarios", "支撑 10+ 推荐场景"),
      T("DAG + operator design with distributed configuration", "DAG + 算子设计,分布式配置"),
      T("Real-time and scheduled delivery", "实时与定时下发"),
    ],
  },
  {
    slug: "qq-tag-recommendation",
    theme: "#15b86c",
    skills: [SK.systemDesign, SK.configDriven, SK.recsys, SK.ownership],
    name: T("Tag-Based Related-Song Recommendation", "标签关联歌曲个性化推荐"),
    oneLiner: T(
      "Every song tag becomes a doorway to personalized, related top songs.",
      "让每个歌曲标签都成为通往个性化关联歌单的入口。"
    ),
    figure: "img/projects/qq-tags.svg",
    thumb: "img/projects/qq-tags-thumb.svg",
    role: T("Senior Software Engineer · Owner", "高级软件工程师 · 负责人"),
    date: "2021 — 2022 · Tencent Music",
    stack: [
      { label: "Go", slug: "go", url: "https://go.dev/" },
      { label: "JCE Protocol", url: "https://github.com/TarsCloud/Tars", note: "Tencent RPC serialization (Tars)" },
      { label: "Vector search (Faiss)", note: "Faiss-based vector recall" },
      { label: "Config center", note: "distributed configuration" },
      { label: "Redis", slug: "redis", url: "https://redis.io/", note: "Song metadata & tag store" },
      { label: "Polaris", url: "https://github.com/polarismesh/polaris", note: "Service discovery & governance" },
    ],
    description: T(
      "On a large-scale music app, every song carries tags — “artist you follow”, “10k+ favorites”, “chart No.1”, “genre”, and many more — assigned from editorial knowledge or system signals. This project makes those tags interactive: tapping a tag opens a personalized list of related songs, generated and ranked per user (chart-type tags route to the ranking page instead). I built it as a configuration-driven platform, so new tag types and destinations launch through config alone. Architecturally it follows a gateway → recall → ranking → serving pipeline, backed by a config center, a vector-search recall layer, a tag/metadata store, and a service-mesh foundation. (See the tech-stack tags above for the concrete components.)",
      "在一款大型音乐 App 中,每首歌都带有由专业编辑知识或系统关联生成的标签 ——「你收藏的歌手」「收藏 1 万+」「榜单 No.1」「曲风」等等。这个项目让这些标签变得可交互:点击标签,跳转到与之相关的个性化歌单,并按用户生成与排序(榜单类标签则跳转到对应榜单页)。整套系统以配置化方式构建 —— 新的标签类型与跳转仅通过配置即可上线。架构上遵循 gateway → recall → ranking → serving 的流水线,由配置中心、向量检索召回层、标签/元数据存储与服务网格基座支撑。(上方技术栈标签为具体组件。)"
    ),
    highlights: [
      T("Config-driven: new tag & jump types ship without code changes", "配置化:新标签与跳转类型无需改代码即可上线"),
      T("Per-tag personalized Top-20 related songs", "每个标签生成个性化 Top 20 关联歌单"),
      T("Chart-type tags route directly to the ranking page", "榜单类标签直达对应榜单页"),
    ],
    gallery: [
      { src: "img/projects/qq-tags/IMG_4376.png", caption: T("Songs carry tappable tags on the home feed", "首页歌曲上可点击的标签") },
      { src: "img/projects/qq-tags/IMG_4378.png", caption: T("A “10k+ favorites” tag → a personalized related list", "「收藏 1 万+」标签 → 个性化关联歌单") },
      { src: "img/projects/qq-tags/IMG_4380.png", caption: T("An artist-relation tag → “listeners also play”", "歌手关联标签 →「听…的也在听」") },
      { src: "img/projects/qq-tags/IMG_4377.png", caption: T("A chart-type tag jumps to the ranking page", "榜单类标签跳转到榜单页") },
      { src: "img/projects/qq-tags/IMG_4379.png", caption: T("Tags in context on the song detail page", "歌曲详情页中的标签场景") },
    ],
  },
  {
    slug: "qq-recall-system",
    theme: "#15b86c",
    skills: [SK.architecture, SK.distributed, SK.systemDesign, SK.ownership],
    name: T("QQ Music Recall System", "QQ 音乐召回系统"),
    oneLiner: T(
      "A unified recall framework abstracting business logic into operators.",
      "将业务逻辑抽象为可复用算子的统一召回框架。"
    ),
    figure: "img/projects/recall.svg",
    role: T("Senior Software Engineer · Owner", "高级软件工程师 · 负责人"),
    date: "2020 — 2021 · Tencent Music",
    stack: ["go", "redis", "elasticsearch"],
    description: T(
      "Built a unified recall system to centralize fragmented, hard-to-maintain recall scenarios — using a DAG streaming-execution framework to abstract recall logic into common operators. Provided multiple strategies including content-/user-based collaborative filtering and deep-learning recalls (YouTubeDNN, DSSM), supporting 10+ businesses and sharply speeding up strategy iteration.",
      "构建统一召回系统,集中化原本碎片化、难以维护的召回场景 —— 以 DAG 流式执行框架将召回逻辑抽象为通用算子。提供基于内容/用户的协同过滤以及深度学习召回(YouTubeDNN、DSSM)等多种策略,支撑 10+ 业务,显著加快策略迭代。"
    ),
    highlights: [
      T("Centralized 10+ fragmented recall scenarios", "集中化 10+ 碎片化召回场景"),
      T("CF + deep-learning recall (YouTubeDNN, DSSM)", "协同过滤 + 深度学习召回(YouTubeDNN、DSSM)"),
      T("DAG operators → faster strategy iteration", "DAG 算子 → 更快的策略迭代"),
    ],
  },
  {
    slug: "vector-retrieval",
    theme: "#15b86c",
    skills: [SK.perf, SK.distributed, SK.systemDesign, SK.reliability],
    name: T("Real-time Vector Retrieval", "实时向量检索系统"),
    oneLiner: T(
      "Online/offline vector search powering recommendation recall at scale.",
      "支撑大规模推荐召回的在线/离线向量检索。"
    ),
    figure: "img/projects/vector-retrieval.svg",
    role: T("Senior Software Engineer · Owner", "高级软件工程师 · 负责人"),
    date: "2019 — 2020 · Tencent Music",
    stack: ["cplusplus", "python", "apachehadoop", "mysql"],
    description: T(
      "Built the real-time vector-search stack for recommendation recall — online serving, an offline index-hosting platform, and performance tuning for scenarios like content-pool nearest-neighbor and u2i recall. Cut index go-live time from days to under an hour, scaled to hundreds of vector indexes across many businesses, and delivered a meaningful DAU lift. The retrieval engine sustained very high QPS with atomic alias-switching for full availability during daily re-indexing.",
      "为推荐召回构建实时向量检索栈 —— 在线服务、离线索引托管平台,以及面向内容池最近邻、u2i 召回等场景的性能优化。将索引上线时间从数天缩短到一小时以内,扩展到数百向量索引、覆盖多条业务线,模块 DAU 显著提升。检索引擎稳定支撑极高 QPS,通过原子化别名切换在每日重建索引时保持高可用。"
    ),
    highlights: [
      T("Index go-live: from days to under an hour", "索引上线:从数天到一小时内"),
      T("Hundreds of indexes across many businesses; notable DAU lift", "数百索引、覆盖多条业务线;DAU 显著提升"),
      T("Very high QPS with atomic, zero-downtime re-indexing", "极高 QPS,原子化、零停机重建索引"),
    ],
  },
  {
    slug: "search-ad-suggestion",
    thumb: "img/projects/ad-suggest-thumb.svg",
    theme: "#2319dc",
    skills: [SK.mlEng, SK.problemSolving, SK.dataModeling],
    name: T("Search-Prefix Ad Suggestion", "搜索前缀广告推荐"),
    oneLiner: T(
      "Mining query-prefix intent to surface relevant brand ads.",
      "挖掘查询前缀意图,呈现相关品牌广告。"
    ),
    figure: "img/projects/baidu-suggest.png",
    role: T("Machine Learning Engineer", "机器学习工程师"),
    date: "2018 — 2019 · Baidu",
    stack: ["cplusplus", "python", "apachehadoop"],
    description: T(
      "Developed ad-suggestion strategies for search query prefixes — mining user intent with text-matching and prefix-generation over Hadoop/MapReduce to correlate app-class name prefixes with relevant brand results, improving ad matching accuracy.",
      "为搜索查询前缀开发广告推荐策略 —— 在 Hadoop/MapReduce 上以文本匹配与前缀生成挖掘用户意图,将应用类名称前缀与相关品牌结果关联,提升广告匹配准确率。"
    ),
    highlights: [
      T("Query-prefix intent mining for ads", "面向广告的查询前缀意图挖掘"),
      T("Text matching + prefix generation on MapReduce", "MapReduce 上的文本匹配 + 前缀生成"),
      T("Correlated search intent with brand results", "将搜索意图与品牌结果关联"),
    ],
  },
];

/* Side / "vibe-coded" projects — link straight out to GitHub (no detail page).
   tech = short display string. repo = GitHub URL; demo = optional live URL. */
const SIDE = [
  {
    name: T("ExamPrep", "ExamPrep 备考"),
    oneLiner: T(
      "Multiple-choice exam practice with instant explanations and per-domain accuracy — JLPT N1, SnowPro, Databricks.",
      "多选题刷题应用:即时解析、按领域统计正确率 —— JLPT N1、SnowPro、Databricks。"
    ),
    tech: "FastAPI · React · TypeScript · SQLite",
    figure: "img/projects/examprep.svg",
    repo: "https://github.com/painterV/ACExam",
    demo: "https://painterv.github.io/ACExam/",
  },
  {
    name: T("発音コーチ — Japanese Pronunciation", "発音コーチ — 日语发音练习"),
    oneLiner: T(
      "A no-backend web app to practice Japanese pronunciation and kanji readings — mic scoring, JMdict, and spaced repetition.",
      "无后端网页应用:练习日语发音与汉字读音 —— 麦克风评分、JMdict 词典、间隔重复。"
    ),
    tech: "JavaScript · Web Speech API · JMdict",
    figure: "img/projects/hatsuonn.svg",
    repo: "https://github.com/painterV/ACEJapaneseHatsuOnn",
    demo: "https://painterv.github.io/ACEJapaneseHatsuOnn/",
  },
];

/* Tech stack. Each item -> clickable tag page at tech.html?s=<id>.
   icon: `slug` loads from Simple Icons CDN; `src` loads a local file (for marks
   the CDN dropped: aws/openai/dbt). since/level are PLACEHOLDERS — user fills.
   match = project-stack slugs that count as "uses this" (defaults to [id]).
   level.pct drives the proficiency bar; level.label is 熟练度. */
const LV = {
  expert: { pct: 92, label: T("Expert", "精通") },
  adv:    { pct: 80, label: T("Advanced", "熟练") },
  inter:  { pct: 62, label: T("Intermediate", "中级") },
  learn:  { pct: 42, label: T("Learning", "学习中") },
};
const TECH = [
  { group: T("Languages", "语言"), items: [
    { id: "python",     slug: "python",        label: "Python",      since: "2015", level: LV.expert },
    { id: "cpp",        slug: "cplusplus",     label: "C++",         since: "2014", level: LV.adv,   match: ["cplusplus"] },
    { id: "go",         slug: "go",            label: "Go",          since: "2019", level: LV.inter },
    { id: "sql",        slug: "sqlite",        label: "SQL",         since: "2017", level: LV.expert, match: ["snowflake", "postgresql", "mysql"] },
  ]},
  { group: T("Data", "数据"), items: [
    { id: "snowflake",  slug: "snowflake",     label: "Snowflake",   since: "2023", level: LV.adv,   match: ["snowflake"] },
    { id: "databricks", slug: "databricks",    label: "Databricks",  since: "2023", level: LV.adv,   match: ["databricks"] },
    { id: "spark",      slug: "apachespark",   label: "Spark",       since: "2019", level: LV.adv,   match: ["apachespark"] },
    { id: "airflow",    slug: "apacheairflow", label: "Airflow",     since: "2020", level: LV.adv,   match: ["apacheairflow"] },
    { id: "dbt",        src: "img/tech/dbt.svg", label: "dbt",       since: "2023", level: LV.adv,   match: ["dbt"] },
    { id: "pandas",     slug: "pandas",        label: "pandas",      since: "2017", level: LV.expert },
  ]},
  { group: T("AI / ML", "AI / ML"), items: [
    { id: "tensorflow", slug: "tensorflow",    label: "TensorFlow",  since: "2019", level: LV.adv,   match: ["tensorflow"] },
    { id: "pytorch",    slug: "pytorch",       label: "PyTorch",     since: "2020", level: LV.inter, match: ["pytorch"] },
    { id: "claude",     slug: "anthropic",     label: "Claude",      since: "2024", level: LV.adv,   match: ["anthropic"] },
    { id: "openai",     src: "img/tech/openai.svg", label: "OpenAI", since: "2023", level: LV.adv },
    { id: "huggingface",slug: "huggingface",   label: "Hugging Face",since: "2023", level: LV.inter },
  ]},
  { group: T("Infra", "基础设施"), items: [
    { id: "terraform",  slug: "terraform",     label: "Terraform",   since: "2023", level: LV.adv,   match: ["terraform"] },
    { id: "docker",     slug: "docker",        label: "Docker",      since: "2018", level: LV.adv,   match: ["docker"] },
    { id: "kubernetes", slug: "kubernetes",    label: "Kubernetes",  since: "2020", level: LV.inter, match: ["kubernetes"] },
    { id: "azure",      src: "img/tech/azure.svg", label: "Azure",   since: "2023", level: LV.adv,   match: ["azure"] },
    { id: "gcp",        slug: "googlecloud",   label: "GCP",         since: "2021", level: LV.inter },
    { id: "git",        slug: "git",           label: "Git",         since: "2015", level: LV.expert },
  ]},
];

/* Floating toys in the hero. `portal` toys glow on hover and link to a TOPIC page.
   icon = sprite id (see js/icons.js). */
const HERO_TOYS = [
  { icon: "ic-helmet", size: 64, portal: "motorcycle" },
  { icon: "ic-cat",    size: 48, portal: "cats" },
  { icon: "ic-chart",  size: 48, portal: "data" },
  { icon: "ic-chip",   size: 44 },
  { icon: "ic-code",   size: 40 },
  { icon: "ic-db",     size: 42 },
  { icon: "ic-bolt",   size: 34 },
  { icon: "ic-paw",    size: 32 },
  { icon: "ic-chip",   size: 30 },
  { icon: "ic-bolt",   size: 28 },
  { icon: "ic-code",   size: 30 },
  { icon: "ic-drop",   size: 28 },
];

/* Explorable interest pages at topic.html?t=<slug>. Same shape as projects, lighter.
   ponytail: placeholder copy; user fills real content + figures next. */
const TOPICS = [
  {
    slug: "motorcycle",
    icon: "ic-helmet",
    label: T("I ride 🏍️", "我骑摩托 🏍️"),
    name: T("On Two Wheels", "两个轮子上"),
    intro: T(
      "I ride a 2025 Kawasaki Ninja ZX-4R. Cornering clears my head.",
      "我骑一台 2025 川崎 Ninja ZX-4R。压弯让我脑子放空。"
    ),
    figure: "img/topics/motorcycle.svg",
    body: T(
      "Weekend rides, maintenance I do myself, and the roads worth chasing. [FILL IN: favorite routes, mods, a photo or two.]",
      "周末骑行、自己动手保养,以及值得追逐的山路。[待补充:常跑路线、改装、几张照片。]"
    ),
  },
  {
    slug: "cats",
    icon: "ic-cat",
    label: T("Cats 🐾", "猫 🐾"),
    name: T("Cats", "猫"),
    intro: T("Resident debugging supervisors.", "常驻的 debug 监工。"),
    figure: "img/topics/cats.svg",
    body: T(
      "The cats that keep me company while I work. [FILL IN: names, photos, personalities.]",
      "工作时陪着我的猫们。[待补充:名字、照片、性格。]"
    ),
  },
  {
    slug: "data",
    icon: "ic-chart",
    label: T("Data & quant", "数据与量化"),
    name: T("Data & Quant", "数据与量化"),
    intro: T(
      "Where engineering meets markets — my side quests in quant.",
      "工程与市场的交汇 —— 我在量化上的副本。"
    ),
    figure: "img/topics/data.svg",
    body: T(
      "Experiments in market data, backtesting, and trading systems. [FILL IN: tools, results, lessons.]",
      "在市场数据、回测与交易系统上的实验。[待补充:工具、结果、经验。]"
    ),
  },
];

/* Certificates. icon = { slug } (Simple Icons CDN) or { src } (local file).
   url = credential link (optional; card becomes clickable). ponytail: placeholder. */
const CERTS = [
  {
    name: T("Certified Data Engineer Associate", "数据工程师助理认证"),
    issuer: "Databricks", date: "2025",
    icon: { slug: "databricks" },
    url: "https://credentials.databricks.com/0be1e0ab-ecbc-40b3-9821-d27e65e37916",
  },
  {
    name: T("Terraform Associate (003)", "Terraform Associate (003)"),
    issuer: "HashiCorp", date: "2025",
    icon: { slug: "terraform" },
    url: "https://www.credly.com/badges/a6e0a269-b819-4489-8cc0-2cac91f60cd9/linked_in_profile",
  },
  {
    name: T("SnowPro Core", "SnowPro Core"),
    issuer: "Snowflake", date: "2024",
    icon: { slug: "snowflake" },
    url: "https://achieve.snowflake.com/95b7d518-ee43-40d4-a3e5-75dadc62599c#acc.oswtAmr5",
  },
  {
    name: T("TensorFlow Developer", "TensorFlow 开发者"),
    issuer: "DeepLearning.AI", date: "2022",
    icon: { slug: "tensorflow" },
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/ZRYTHSQM3ZKZ",
  },
  {
    name: T("Lakehouse Fundamentals", "Lakehouse 基础"),
    issuer: "Databricks", date: "2023",
    icon: { slug: "databricks" },
    url: "https://credentials.databricks.com/dd55ff52-6243-41e7-bc3a-5267704ef9bb",
  },
  {
    name: T("JLPT N2", "日本语能力测试 N2"),
    issuer: T("Japanese-Language Proficiency", "日本语能力测试"), date: "2024",
    icon: null, url: "",
  },
];

const DATA = { PROFILE, EXPERIENCE, EDUCATION, PROJECTS, SIDE, TECH, HERO_TOYS, TOPICS, CERTS };
