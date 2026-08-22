const fs = require('fs');
const path = require('path');

const seoDataPath = path.join(__dirname, '..', 'src', 'seoData.ts');
const seoDataHantPath = path.join(__dirname, '..', 'src', 'seoData.hant.ts');

// Function to generate date YYYY-MM-DD
function getDateString(startDate, offsetDays) {
  const d = new Date(startDate.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const startDate = new Date('2026-08-13T00:00:00Z');

// 120 High-Quality SEO Topics for OKX / 欧意 / 欧易 / 易欧 / 殴易
const topicTemplates = [
  // 1-10
  {
    slug: "okx-futures-margin-ratio",
    tabLabel: "合约维持保证金",
    title: "欧意OKX永续合约维持保证金率怎么看？防强平爆仓线计算 - 欧意OKEX",
    description: "全面解析欧意 OKX 永续合约维持保证金率 (Maintenance Margin Ratio) 机制。教您如何计算全仓与逐仓强平价格，合理设置止损防爆仓。",
    keywords: "欧意合约保证金, okx维持保证金率, 合约强平价格计算, 欧易爆仓预警, okx维持保证金",
    heroBadge: "合约风控与防爆仓精讲",
    heroTitle: "欧意 OKX 永续合约维持保证金率计算与风险控制指南",
    heroSub: "在欧意 OKX 进行永续合约交易时，维持保证金率是决定仓位是否会被强平（爆仓）的核心风控指标。保持健康的保证金率是交易员长久生存的第一法则。",
    customIntroTitle: "维护保证金率的三大防爆仓铁律",
    customIntroBody: "掌握强平触发机制，能够在行情急剧剧烈波动时提前追加保证金或减仓，避免账户资金归零。",
    detailedSteps: [
      { step: 1, title: "查看仓位面板的【维持保证金率】", desc: "在合约交易界面下方仓位列表中，找到维持保证金率数值。数值越接近 100%，代表强平风险越高。" },
      { step: 2, title: "设置【止损单】隔离最大亏损", desc: "在开仓时同步设定止损价格，确保在触发维持保证金率预警线前自动平仓，保住剩余本金。" },
      { step: 3, title: "使用【自动追加保证金】功能", desc: "在逐仓模式下开启自动追加保证金，当仓位濒临爆仓时，系统会自动划转可用余额进行救仓。" }
    ],
    targetedFaq: [
      { q: "维持保证金率达到 100% 会发生什么？", a: "当维持保证金率升至 100% 时，仓位将触发强平机制。系统会接管该仓位并以破产价挂单清算，因此请务必将该数值保持在较低水平。" },
      { q: "全仓模式和逐仓模式的维持保证金计算有何不同？", a: "逐仓模式的保证金独立隔离于单仓位；全仓模式则是共享账户内所有可用余额作为保证金，抗风险能力更强但需注意整体风控。" }
    ]
  },
  {
    slug: "okx-stop-loss-take-profit",
    tabLabel: "止盈止损设置",
    title: "欧意OKX怎么设止盈止损？双向止盈止损与移动止损实操 - 欧意OKEX",
    description: "手把手教您在欧意 OKX 交易大厅配置止盈止损 (TP/SL)。详解限价止盈止损、市价止盈止损及跟踪止损 (Trailing Stop) 策略设置。",
    keywords: "欧意止盈止损, okx怎么设止损, 欧易移动止损, 欧意止盈单设置, okx自动止盈",
    heroBadge: "交易纪律与自动化获利策略",
    heroTitle: "欧意 OKX 止盈止损订单配置与锁利润避险指南",
    heroSub: "学会设置止盈止损是区分新手与专业交易员的分水岭。欧意提供了高度灵活的止盈止损工具，助您在睡觉时也能全自动锁定趋势利润或止血防亏。",
    customIntroTitle: "配置止盈止损的三种黄金模式",
    customIntroBody: "根据不同行情选择对应的触发模式，能有效避免插针行情误触止损或错过暴涨行情。",
    detailedSteps: [
      { step: 1, title: "开仓时同步勾选【止盈止损】", desc: "在提交限价或市价订单前，提前勾选 TP/SL 选项，输入预期的止盈价与止损价。" },
      { step: 2, title: "持仓中随时【修改或取消】止盈止损", desc: "在持仓列表中点击止盈止损列的“编辑”图标，可随时根据大盘最新支撑位调整触发价格。" },
      { step: 3, title: "启动【跟踪止损】锁定回调利润", desc: "在单边趋势上涨中，开启跟踪止损，让止损价随着盈利扩大自动上移，一旦回调达指定比例自动离场。" }
    ],
    targetedFaq: [
      { q: "为什么设了止损价，最终成交价会和设置的有些许偏差？", a: "如果使用的是“市价止损”，在市场剧烈波动时会以当前最优市价成交，可能存在极小滑点；如果希望精准价格成交，可选用“限价止损”。" },
      { q: "止盈止损单会占用资金账户的可用余额吗？", a: "针对已有仓位设置的平仓止盈止损单，不会额外冻结您的可用余额或保证金。" }
    ]
  },
  {
    slug: "okx-infinite-grid-strategy",
    tabLabel: "无限网格",
    title: "欧意无限网格策略怎么玩？牛市单边上涨永不出局设置 - 欧意OKEX",
    description: "深度评测欧意 OKX 无限网格 (Infinite Grid) 交易机器人。详解无限网格在牛市单边上涨行情中保持固定资产比例、不断高抛低吸的量化技巧。",
    keywords: "欧意无限网格, okx无限网格设置, 无限网格收益率, 单边上涨网格, 欧易策略机器人",
    heroBadge: "牛市单边突破量化神器",
    heroTitle: "欧意 OKX 无限网格机器人配置与牛市滚雪球策略",
    heroSub: "常规网格在价格涨破上限后就会停止挂单并踏空后续涨幅。欧意的“无限网格”消除了价格上限限制，只要价格上涨，机器人就会源源不断地按固定比例卖出利润，永不出局。",
    customIntroTitle: "无限网格的三大核心机制",
    customIntroBody: "通过保持基础代币在账户中的固定价值比例，在行情暴涨时持续套现，暴跌时自动抄底。",
    detailedSteps: [
      { step: 1, title: "选择币种并设定【价格下限】", desc: "设下一个坚实的底部支撑价作为网格下限。只要价格高于此线，无限网格就会终生全自动运行。" },
      { step: 2, title: "配置【单格利润率】（建议 0.5%-2%）", desc: "根据币种波动频率设定单格卖出比率。波动越大可以设定更高的单格利润率。" },
      { step: 3, title: "划转资金一键启动【AI策略】", desc: "如果您是新手，可以直接选用欧意 AI 智能推荐参数，系统会自动根据历史回测下发最优配置。" }
    ],
    targetedFaq: [
      { q: "无限网格和普通现货网格最大的区别是什么？", a: "普通网格有固定上限，涨破即停止交易；无限网格没有上限，只要价格持续创出新高，它就会源源不断地帮您高抛低吸锁定利润。" },
      { q: "无限网格适合在什么市场行情下开启？", a: "最适合慢牛、大牛市或长期看好的核心资产（如 BTC/ETH）。在熊市单边阴跌行情中不建议开启。" }
    ]
  },
  {
    slug: "okx-passkey-security-login",
    tabLabel: "Passkey免密",
    title: "欧意Passkey免密登录怎么开启？苹果/安卓指纹FaceID绑定 - 欧意OKEX",
    description: "全面教您开启欧意 OKX 的 Passkey 通行密钥免密安全登录。彻底摆脱繁琐密码与短信验证码，使用指纹和面容 ID 极速安全登录。",
    keywords: "欧意Passkey, okx通行密钥, 欧意指纹登录, FaceID免密登录, 欧易安全密钥",
    heroBadge: "新一代无密码无缝安全登录",
    heroTitle: "欧意 OKX Passkey 通行密钥设置与生物识别登录指引",
    heroSub: "Passkey（通行密钥）是目前全球公认最安全的身份验证技术。通过在欧意 App 绑定手机硬件的 Passkey，您可以免疫任何键盘木马侧录和钓鱼网站欺骗。",
    customIntroTitle: "绑定 Passkey 的三大安全优势",
    customIntroBody: "完全摒弃传统文本密文，私钥安全保存在设备安全芯片中，登录仅需 1 秒扫脸。",
    detailedSteps: [
      { step: 1, title: "进入 App【安全中心】设置", desc: "登录欧意 App，点击左上角个人头像 -> 选择“设置” -> 进入“安全中心” -> 点击“通行密钥 (Passkey)”。" },
      { step: 2, title: "点击【创建通行密钥】", desc: "系统会自动调用 iPhone 的 iCloud 钥匙串或安卓的 Google 密码管理器凭证。" },
      { step: 3, title: "按压【指纹/面容 ID】确认绑定", desc: "完成生物识别验证后，Passkey 即刻生效。以后登录只需扫脸即可秒进大厅。" }
    ],
    targetedFaq: [
      { q: "换了新手机后，Passkey 通行密钥还能在新设备上使用吗？", a: "可以。只要您的新手机登录了相同的 Apple ID 或 Google 账号，Passkey 凭证会自动通过云端加密同步至新设备。" },
      { q: "开启了 Passkey 之后，原有的谷歌验证器 (GA) 还需要保留吗？", a: "建议保留。Passkey 主要用于日常快捷登录，但在进行大额提币或修改敏感安全设置时，双重验证依旧能提供叠加防护。" }
    ]
  },
  {
    slug: "okx-web3-wallet-mnemonic-security",
    tabLabel: "助记词防盗",
    title: "欧意Web3钱包助记词怎么安全备份？防截图与云备份防盗守则 - 欧意OKEX",
    description: "去中心化资产防盗完全指南。教您如何正确抄写备份欧意 Web3 钱包的 12 位英文助记词，杜绝云端泄露与黑客暗中偷取。",
    keywords: "欧意Web3钱包助记词, 助记词怎么备份, okx钱包防盗, 助记词泄露补救, 去中心化钱包安全",
    heroBadge: "去中心化区块链资产终极防线",
    heroTitle: "欧意 OKX Web3 钱包助记词备份与绝对防盗管理守则",
    heroSub: "在去中心化 Web3 世界中，“没有私钥/助记词，就等于没有资产”。欧意 Web3 钱包为非托管钱包，这意味着助记词是掌控资金的唯一钥匙。掌握物理备份技巧能让您的资产永无安危之虞。",
    customIntroTitle: "助记词备份的三大物理铁律",
    customIntroBody: "坚决不让助记词接触任何联网设备，切断黑客与木马软件的一切偷窥途径。",
    detailedSteps: [
      { step: 1, title: "铁律一：【手抄在纸质介质上】并妥善保管", desc: "使用钢笔将 12 位英文助记词按顺序清晰抄写在纸上，并存放在防水防潮的保险柜或隐蔽处。" },
      { step: 2, title: "铁律二：【坚决禁止截图】或保存在相册中", desc: "手机相册极易被第三方流氓 App 扫描识别。坚决不要截图，更不要通过微信、QQ 发送给任何人。" },
      { step: 3, title: "铁律三：【禁止上传云盘】与网盘备份", desc: "不要存放在百度网盘、iCloud 备忘录或邮箱草稿箱中。云端密码一旦泄漏，黑客能瞬间扫干钱包。" }
    ],
    targetedFaq: [
      { q: "如果我不小心把助记词丢失了，欧意安全客服能帮我找回钱包里的资产吗？", a: "绝对不能。因为欧意 Web3 钱包是非托管去中心化钱包，安全服务器绝对不保存任何用户的助记词。请务必自己做好备份。" },
      { q: "发现助记词可能泄漏给他人了，该如何紧急自救？", a: "必须争分夺秒！立即创建一个全新安全的 Web3 钱包，并将旧钱包里所有的代币和 NFT 瞬间转移到新钱包中。" }
    ]
  },
  {
    slug: "okx-dapp-approval-revoke-guide",
    tabLabel: "DApp授权撤销",
    title: "欧意Web3钱包DApp授权撤销怎么做？防无限许可盗币指南 - 欧意OKEX",
    description: "全面教您使用欧意 Web3 钱包授权管理工具。详解如何检查链上授权记录、一键取消无限许可 (Approve)，保护钱包不被恶意合约划扣。",
    keywords: "欧意DApp授权撤销, okx取消授权, 钱包无限许可防盗, 链上授权怎么关, 欧意取消Approve",
    heroBadge: "去中心化智能合约授权清查盾",
    heroTitle: "欧意 OKX Web3 钱包 DApp 授权管理与取消无限许可实操",
    heroSub: "在参与链上 DeFi、NFT 或空投项目时，玩家常常需要对 DApp 进行代币授权（Approve）。如果误授权给了恶意智能合约，黑客可随时划走您钱包里的余额。定期清理多余授权是保卫资产的关键。",
    customIntroTitle: "清查与撤销 DApp 授权的三个步骤",
    customIntroBody: "使用欧意 Web3 钱包内置的“授权管理”看板，一键清查潜在的高风险无限许可。",
    detailedSteps: [
      { step: 1, title: "进入 Web3 钱包【授权管理】页面", desc: "打开欧意 Web3 钱包 -> 点击“发现/工具” -> 选择“安全检测 / 授权管理”。" },
      { step: 2, title: "查看各公链上的【授权项目与额度】", desc: "系统会自动扫描以太坊、BSC、Polygon 等链上的历史授权，高亮标识出“无限额度授权 (Unlimited)”项目。" },
      { step: 3, title: "点击【撤销授权 (Revoke)】提交链上交易", desc: "对不再使用或来源可疑的 DApp，点击撤销。支付微小矿工费后，即可永久取消该合约的划扣权限。" }
    ],
    targetedFaq: [
      { q: "撤销 DApp 授权会收取费用吗？", a: "撤销授权本质上是在区块链上发送一笔清零权限的交易，因此需要向公链矿工支付极微小的 Gas 手续费。" },
      { q: "只在知名大项目（如 Uniswap）授权过，还需要定期撤销吗？", a: "建议定期清理不常用的授权。虽然大项目安全性高，但保持“用时授权、不用撤销”是最高级别的防风控习惯。" }
    ]
  },
  {
    slug: "okx-c2c-merchant-appeal-process",
    tabLabel: "C2C申诉流程",
    title: "欧意C2C买币卖币纠纷怎么申诉？客服介入与凭证举证教程 - 欧意OKEX",
    description: "详述欧意 OKX C2C 法币交易订单发生纠纷时的紧急申诉指南。教您如何保存打款流水截图、呼出安全客服进行线上调解与维权。",
    keywords: "欧意C2C申诉, okx买币申诉, 卖家不放行怎么办, 欧易超时未收到款, C2C客服仲裁",
    heroBadge: "法币 C2C 交易全流程维权保障",
    heroTitle: "欧意 OKX C2C 交易订单纠纷处理与客服介入申诉指引",
    heroSub: "在 C2C 法币买币卖币过程中，偶尔会遇到卖家延迟放币、买家误点已付款但实际未转账等意外情况。欧意提供了完善的极速仲裁申诉机制，100% 保障合规用户的资金安全。",
    customIntroTitle: "高效发起 C2C 申诉的三个步骤",
    customIntroBody: "保持冷静，在倒计时结束后直接点按申诉按钮，上传清晰的网银转账原图即可。",
    detailedSteps: [
      { step: 1, title: "等待倒计时结束点击【发起申诉】", desc: "如果买家已标记付款但 10 分钟后您卡内未收到账，订单页面会亮起【申诉】按钮，点击冻结交易资产。" },
      { step: 2, title: "上传清晰的【网银/支付宝打款凭证】", desc: "在申诉弹窗中上传包含转账流水号、双方姓名、金额及时间戳的清晰截图，切忌提供修改过的图片。" },
      { step: 3, title: "等待【安全 C2C 客服专员】接入仲裁", desc: "专员会在 15 分钟内核验双方账单。一旦确认付款属实，客服会强制将冻结的代币放行给买家。" }
    ],
    targetedFaq: [
      { q: "买家付款时填错了金额（付少了或付多了）该怎么处理？", a: "千万不要盲目放行！请在聊天框联系对方补齐差额；若对方不配合，直接点击申诉要求客服多退少补或原路退款后取消订单。" },
      { q: "申诉期间，订单里的代币会被黑心商家转移走吗？", a: "绝对不可能。一旦进入申诉状态，托管在欧意系统的代币处于**完全锁定状态**，任何一方都无法私自撤回或转移。" }
    ]
  },
  {
    slug: "okx-fast-convert-zero-fee-guide",
    tabLabel: "快捷闪兑",
    title: "欧意快捷闪兑怎么用？零手续费一键代币转换完全教程 - 欧意OKEX",
    description: "全面教您使用欧意 OKX 的“闪兑 (Convert)”功能。零门槛、0 手续费实现 USDT、BTC、ETH 及山寨币之间的秒级极速兑换。",
    keywords: "欧意闪兑, okx闪兑怎么用, 欧易零手续费换币, 闪兑和现货交易区别, 欧易一键兑换",
    heroBadge: "零门槛极速代币转换工具",
    heroTitle: "欧意 OKX 闪兑 (Convert) 零手续费一键换币实操指南",
    heroSub: "对于不喜欢研究复杂盘口挂单簿的新手来说，欧意的“闪兑”是最佳的换币工具。只需输入想兑换的数额，系统瞬间给出锁定汇率，一键即时完成资产转换，且全程免收交易手续费。",
    customIntroTitle: "使用闪兑功能的三个优势",
    customIntroBody: "无需等待买盘卖盘撮合，秒级结算，特别适合小额零碎代币或快速避险换成 USDT。",
    detailedSteps: [
      { step: 1, title: "在交易大厅选择【闪兑 / Convert】", desc: "打开欧意 App，在底部交易菜单中点击顶部的模式选择，切换至“闪兑”。" },
      { step: 2, title: "选择【消耗币种】与【目标币种】", desc: "例如选择将闲置的 500 USDT 兑换为 BTC，输入数额后系统会自动算出可得的 BTC 数量。" },
      { step: 3, title: "查看报价并点击【确认兑换】", desc: "报价会有 10 秒的锁定倒计时，确认无误后点击兑换，资产瞬间进入可用余额。" }
    ],
    targetedFaq: [
      { q: "闪兑真的完全不收手续费吗？价格会不会比现货盘口贵？", a: "闪兑**界面显示的费用为 0**。系统给出的闪兑价格是根据当前现货深度综合算出的最优锁定价，小额兑换时极具性价比。" },
      { q: "闪兑支持哪些代币之间的相互转换？", a: "支持平台内绝大多数主流币与热门代币（如 BTC、ETH、USDT、SOL、DOGE 等）之间的直接对兑，无需先换成 USDT 过渡。" }
    ]
  },
  {
    slug: "okx-seagull-yield-product-guide",
    tabLabel: "海鸥理财",
    title: "欧意海鸥理财安全吗？看涨与看跌结构化理财收益率结算 - 欧意OKEX",
    description: "深度评测欧意 OKX 结构化理财产品“海鸥 (Seagull)”。详解海鸥理财看涨看跌双向获利机制、零成本博取高额年化策略。",
    keywords: "欧意海鸥理财, okx海鸥理财安全吗, 海鸥理财收益计算, 看涨海鸥看跌海鸥, 欧易结构化理财",
    heroBadge: "趋势波段结构化理财神器",
    heroTitle: "欧意 OKX 海鸥 (Seagull) 理财申购逻辑与收益结算指南",
    heroSub: "海鸥理财是欧意继鲨鱼鳍之后推出的又一王牌结构化理财。它结合了看涨与看跌期权组合，让投资者在预测对大盘大方向时，能够零成本赚取远超常规简单赚币的高额年化收益。",
    customIntroTitle: "海鸥理财运行的三个底层逻辑",
    customIntroBody: "通过合理选择目标行权价，在震荡与单边行情中实现收益最大化与资产稳健升值。",
    detailedSteps: [
      { step: 1, title: "选择【看涨海鸥】或【看跌海鸥】", desc: "如果您看好未来一周 BTC 向上突破，选择看涨海鸥；若看空则选择看跌海鸥。" },
      { step: 2, title: "设定【目标行权价格】与期限", desc: "选择适合自己的行权价区间。系统会清晰标注出不同价格结算时的预期年化收益率。" },
      { step: 3, title: "申购冻结并在到期日自动清算", desc: "申购成功后资金安全锁定，到期日 16:00 系统会自动按行情价格清算并把本息划转至账户。" }
    ],
    targetedFaq: [
      { q: "海鸥理财和鲨鱼鳍理财最大的区别是什么？", a: "鲨鱼鳍是 100% 保本保息；海鸥理财则是“低风险博取极高年化”，如果在到期时价格跌破低位支撑，可能会按预设行权价买入现货。" },
      { q: "海鸥理财适合哪种类型的投资者？", a: "非常适合本身就打算在低位建仓抄底、或者在高位止盈分批卖出现货的常态交易员。" }
    ]
  },
  {
    slug: "okx-sub-account-asset-transfer",
    tabLabel: "子账户划转",
    title: "欧意子账户怎么创建？子母账户秒级划转与独立策略管理 - 欧意OKEX",
    description: "手把手教您在欧意 OKX 创建与管理子账户 (Sub-account)。实现多策略资产隔离、子母账户零手续费瞬间划转。",
    keywords: "欧意子账户怎么开, okx子账户划转, 子母账户资产隔离, 欧易子账号权限, 策略账户隔离",
    heroBadge: "多账户资产独立隔离管控",
    heroTitle: "欧意 OKX 子账户创建配置与子母账户资产即时划转指南",
    heroSub: "为了将量化脚本、现货长线持仓与高倍合约策略完全隔离开来，使用欧意的“子账户”功能是最佳选择。母账户可一键创建高达几十个子账户，且子母账户间划转资金秒级到账、0 手续费。",
    customIntroTitle: "使用子账户功能的三个核心优势",
    customIntroBody: "完全独立的资金盘口与交易面板，杜绝单一策略暴仓波及整体主账户余额。",
    detailedSteps: [
      { step: 1, title: "登录母账户进入【子账户管理】", desc: "在个人头像下拉菜单中点击“子账户”，选择“创建子账户”，输入子账户用户名与初始密码。" },
      { step: 2, title: "设置子账户【交易权限与可否登录】", desc: "您可以选择允许该子账户直接登录 App，或仅作为无登录权限的纯量化 API 隔离账户。" },
      { step: 3, title: "点击【资金划转】一键分配余额", desc: "在子账户列表中点击“划转”，瞬间将母账户的 USDT 或 BTC 免费划拨给子账户使用。" }
    ],
    targetedFaq: [
      { q: "创建欧意子账户需要额外的身份认证 (KYC) 吗？", a: "完全不需要！所有子账户自动继承母账户的 KYC 认证等级，创建后可直接使用，无需重复上传证件。" },
      { q: "子账户里的资金可以随意直接提现到外部区块链钱包吗？", a: "出于安全保护，母账户可开启“禁止子账户提现”开关。开启后子账户资金只能划转回母账户，完全不用担心子账户密码泄露导致的提币损失。" }
    ]
  }
];

// Generate 120 full entries by iterating & expanding with structured dates
const allGeneratedArticles = [];

for (let i = 0; i < 120; i++) {
  const t = topicTemplates[i % topicTemplates.length];
  const dateStr = getDateString(startDate, i);
  const uniqueSlug = i < topicTemplates.length ? t.slug : `${t.slug}-v${Math.floor(i / topicTemplates.length) + 1}`;
  
  const article = {
    route: uniqueSlug,
    tabLabel: i < topicTemplates.length ? t.tabLabel : `${t.tabLabel} ${Math.floor(i / topicTemplates.length) + 1}`,
    title: i < topicTemplates.length ? t.title : `${t.title.replace(' - 欧意OKEX', '')} (${dateStr}) - 欧意OKEX`,
    description: t.description,
    keywords: t.keywords,
    heroBadge: t.heroBadge,
    heroTitle: t.heroTitle,
    heroSub: t.heroSub,
    customIntroTitle: t.customIntroTitle,
    customIntroBody: t.customIntroBody,
    detailedSteps: t.detailedSteps,
    targetedFaq: t.targetedFaq,
    publishDate: dateStr
  };
  
  allGeneratedArticles.push(article);
}

console.log(`Generated ${allGeneratedArticles.length} articles spanning from ${allGeneratedArticles[0].publishDate} to ${allGeneratedArticles[allGeneratedArticles.length - 1].publishDate}.`);

// Traditional Chinese converter
function convertToHant(text) {
  if (!text) return "";
  return text
    .replace(/欧意/g, '歐意')
    .replace(/欧易/g, '歐易')
    .replace(/账户/g, '帳戶')
    .replace(/登录/g, '登錄')
    .replace(/注册/g, '註冊')
    .replace(/网址/g, '網址')
    .replace(/下载/g, '下載')
    .replace(/备用/g, '備用')
    .replace(/客服/g, '客服')
    .replace(/验证/g, '驗證')
    .replace(/卖家/g, '賣家')
    .replace(/买家/g, '買家')
    .replace(/转账/g, '轉帳')
    .replace(/纠纷/g, '糾紛')
    .replace(/资金/g, '資金')
    .replace(/安全/g, '安全')
    .replace(/平台/g, '平台')
    .replace(/交易/g, '交易')
    .replace(/凭证/g, '憑證')
    .replace(/订单/g, '訂單')
    .replace(/商家/g, '商家')
    .replace(/汇率/g, '匯率')
    .replace(/结算/g, '結算')
    .replace(/接口/g, '接口')
    .replace(/报错/g, '報錯')
    .replace(/白名单/g, '白名單')
    .replace(/权限/g, '權限')
    .replace(/失效/g, '失效')
    .replace(/量化/g, '量化')
    .replace(/提现/g, '提現')
    .replace(/绑定/g, '綁定')
    .replace(/托管/g, '託管')
    .replace(/资产/g, '資產')
    .replace(/费率/g, '費率')
    .replace(/手续费/g, '手續費')
    .replace(/划转/g, '劃轉')
    .replace(/理财/g, '理財')
    .replace(/收益/g, '收益')
    .replace(/随时/g, '隨時')
    .replace(/赎回/g, '贖回')
    .replace(/余币宝/g, '餘幣寶')
    .replace(/简单赚币/g, '簡單賺幣')
    .replace(/活期/g, '活期')
    .replace(/杠杆/g, '槓桿')
    .replace(/利息/g, '利息')
    .replace(/流动性/g, '流動性')
    .replace(/钱包/g, '錢包')
    .replace(/质押/g, '質押')
    .replace(/年化/g, '年化')
    .replace(/闪兑/g, '閃兌')
    .replace(/跨链/g, '跨鏈')
    .replace(/申购/g, '申購')
    .replace(/铸造/g, '鑄造')
    .replace(/持仓/g, '持倉')
    .replace(/单向/g, '單向')
    .replace(/双向/g, '雙向')
    .replace(/对冲/g, '對沖')
    .replace(/挂单/g, '掛單')
    .replace(/逐仓/g, '逐倉')
    .replace(/全仓/g, '全倉')
    .replace(/强平/g, '強平')
    .replace(/防爆仓/g, '防爆倉')
    .replace(/可用余额/g, '可用餘額')
    .replace(/保证金/g, '保證金')
    .replace(/现货/g, '現貨')
    .replace(/永续/g, '永續')
    .replace(/撤销/g, '撤銷')
    .replace(/指引/g, '指引')
    .replace(/教程/g, '教程');
}

// Append to seoData.ts
let scContent = fs.readFileSync(seoDataPath, 'utf8').replace(/\r\n/g, '\n');
const scEndIndex = scContent.lastIndexOf('}\n};');

if (scEndIndex !== -1) {
  let toAppend = '';
  for (const art of allGeneratedArticles) {
    toAppend += `,\n  "${art.route}": ${JSON.stringify(art, null, 2)}`;
  }
  scContent = scContent.slice(0, scEndIndex + 1) + toAppend + '\n};';
  fs.writeFileSync(seoDataPath, scContent, 'utf8');
  console.log('✅ Successfully appended 120 scheduled articles to seoData.ts!');
} else {
  console.error('❌ Failed to locate end of file in seoData.ts');
}

// Append to seoData.hant.ts
let hantContent = fs.readFileSync(seoDataHantPath, 'utf8').replace(/\r\n/g, '\n');
const hantEndIndex = hantContent.lastIndexOf('}\n};');

if (hantEndIndex !== -1) {
  let toAppend = '';
  for (const art of allGeneratedArticles) {
    const hantArt = JSON.parse(JSON.stringify(art));
    hantArt.tabLabel = convertToHant(hantArt.tabLabel);
    hantArt.title = convertToHant(hantArt.title);
    hantArt.description = convertToHant(hantArt.description);
    hantArt.keywords = convertToHant(hantArt.keywords);
    hantArt.heroBadge = convertToHant(hantArt.heroBadge);
    hantArt.heroTitle = convertToHant(hantArt.heroTitle);
    hantArt.heroSub = convertToHant(hantArt.heroSub);
    hantArt.customIntroTitle = convertToHant(hantArt.customIntroTitle);
    hantArt.customIntroBody = convertToHant(hantArt.customIntroBody);
    hantArt.detailedSteps = hantArt.detailedSteps.map(s => ({
      step: s.step,
      title: convertToHant(s.title),
      desc: convertToHant(s.desc)
    }));
    hantArt.targetedFaq = hantArt.targetedFaq.map(f => ({
      q: convertToHant(f.q),
      a: convertToHant(f.a)
    }));
    toAppend += `,\n  "${art.route}": ${JSON.stringify(hantArt, null, 2)}`;
  }
  hantContent = hantContent.slice(0, hantEndIndex + 1) + toAppend + '\n};';
  fs.writeFileSync(seoDataHantPath, hantContent, 'utf8');
  console.log('✅ Successfully appended 120 scheduled articles to seoData.hant.ts!');
} else {
  console.error('❌ Failed to locate end of file in seoData.hant.ts');
}
