import { Shield, Sparkles, Orbit, Landmark, LineChart, Coins, MessageSquareHeart, Check, FileCheck, Keyboard, Laptop2, HelpCircle } from "lucide-react";

interface FeaturesSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function FeaturesSection({ currentRoute, locale = 'zh' }: FeaturesSectionProps) {
  const isHant = locale === 'hant';
  // Define dynamic layouts and texts depending on active route
  let title = isHant 
    ? "為什麼全球上億 Web3 生態用戶最終選擇歐易 OKX？"
    : "为什么全球上亿 Web3 生态用户最终选择欧易 OKX？";
  let subtitle = isHant 
    ? "核心高安全與低耗交易技術體系"
    : "核心高安全与低耗交易技术体系";
  let desc = isHant 
    ? "經歷多次行業洗禮，歐易以其自研的訂單高並發匹配、安全多重冷錢包隔離、以及默克爾樹資產儲備公開贏得全世界用戶持久讚譽。"
    : "经历多次行业洗礼，欧易以其自研的订单高并发匹配、安全多重冷钱包隔离、以及默克尔树资产储备公开赢得全世界用户持久赞誉。";
  
  let features = [
    {
      icon: <Shield className="text-yellow-500 w-6 h-6" />,
      title: isHant ? "自研資金隔離 · 100% 兌付比" : "自研资金隔离 · 100% 兑付比",
      desc: isHant 
        ? "採用行業前沿的多簽網關以及線下冷錢包完全隔離體系。拒絕任何挪用，從根本上保證本金高枕無憂。"
        : "采用行业前沿的多签网关以及线下冷钱包完全隔离体系。拒绝任何挪用，从根本上保证本金高忱无忧。"
    },
    {
      icon: <Orbit className="text-yellow-400 w-6 h-6" />,
      title: isHant ? "雙生態錢包秒級切換" : "双生态钱包秒级切滑",
      desc: isHant 
        ? "在平台中可自如在“交易所大廳”與“自託管多鏈 Web3 錢包”間秒換，零阻礙進入跨鏈 NFT、Degen 與質押中心。"
        : "在平台中可自如在“交易所大厅”与“自托管多链 Web3 钱包”间秒换，零阻碍进入跨链 NFT、Degen 与质押中心。"
    },
    {
      icon: <LineChart className="text-blue-400 w-6 h-6" />,
      title: isHant ? "超短延遲撮合及量化策略" : "超短延迟撮合及量化策略",
      desc: isHant 
        ? "交易大廳訂單解析及撮合速率低於 2 毫秒。原廠搭載網格策略、定投組合、屯幣寶等多套免編程智能自動化機器人。"
        : "交易大厅订单解析及撮合速率低于 2 毫秒。原厂搭载网格策略、定投组合、屯币宝等多套免编程智能自动化机器人。"
    },
    {
      icon: <Coins className="text-purple-400 w-6 h-6" />,
      title: isHant ? "千萬級流動性盤口深度" : "千万级流动性盘深深度",
      desc: isHant 
        ? "主流加密幣對點差及滑點極低，完美抵禦極端行情插針波動，安全流暢的出金通道更擁有全天候惡意提款盾牌守護。"
        : "主流加密币对点差及滑点极低，完美抵御极极端行情插针波动，安全流畅的出金通道更拥有全天候恶意提放盾牌守护。"
    }
  ];

  // Tailor content based on specific route
  if (currentRoute === "zhuce") {
    title = isHant 
      ? "輕鬆開啟歐易帳戶：新秀專享註冊三大核心權益"
      : "轻松开启欧易账户：新秀专享注册三大核心权益";
    subtitle = isHant 
      ? "註冊返現及帳戶安全尊享指南"
      : "注册返现及账户安全尊享指南";
    desc = isHant 
      ? "本防偽專區長期同步安全註冊服務器。只要正確鎖定註冊，即可安全開啟合規高返傭、新手盲盒及雙因子高級防護屬性。"
      : "本防伪专区长期同步安全注册服务器。只要正确锁定注册，即可安全开启合规高返佣、新手盲盒及双因子高级防护属性。";
    features = [
      {
        icon: <Sparkles className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "推薦碼 ACE528829 永久讓利保障" : "推荐码 ACE528829 永久让利保障",
        desc: isHant 
          ? "只要您在填報表格時認準邀請碼 ACE528829，系統便會自動將您交易產生的現貨與合約手續費自動減返 20%，長期執行，絕不更改。"
          : "只要您在填报表格时认准邀请码 ACE528829，系统便会自动将您交易产生的现货与合约手续费自动减返 20%，长期执行，绝不更改。"
      },
      {
        icon: <Shield className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "自選 2FA 雙重身份驗證限制" : "自选 2FA 双重身份验证限制",
        desc: isHant 
          ? "註冊完畢後推薦立即開通谷歌 / 微軟 Authenticator 兩步防盜驗證，徹底杜絕單純密碼洩露或手機卡複製遭遇黑客入侵。"
          : "注册完毕后推荐立即开通谷歌 / 微软 Authenticator 两步防盗验证，彻底杜绝单纯密码泄露或手机卡复制遭遇黑进。"
      },
      {
        icon: <Coins className="text-blue-400 w-6 h-6" />,
        title: isHant ? "最高 $10,000 數字代幣盲盒" : "最高 $10,000 数字代币盲盒",
        desc: isHant 
          ? "新註冊帳號自建立起 30 天內，首次完成登錄 OKX 以及足額出入金額度劃撥，即可自主抽取豐厚實物盲盒與返現券獎勵。"
          : "新注册账号自建立起 30 天内，首次完成登录 OKX 以及足额出入金额度划拨，即可自动抽取丰厚实物盲盒与返现券奖励。"
      },
      {
        icon: <Check className="text-purple-400 w-6 h-6" />,
        title: isHant ? "完全滿足多國 KYC 防護底線" : "完全满足多国 KYC 防护底线",
        desc: isHant 
          ? "遵循前沿合規防洗錢審查，快速通過身份證與極速三維活體面容掃描。全程信息經高強度非對稱算法多重加密封裝，萬無一漏。"
          : "遵循前沿合规防洗钱审查，快速通过身份证与极速三维活体面容扫描。全程信息经高强度非对称算法多密封装，万无一漏。"
      }
    ];
  } else if (currentRoute === "denglu") {
    title = isHant 
      ? "防解析污染、更安定、更極速的歐易安全登錄環境"
      : "防解析污染、更安定、更极速的欧易安全登录环境";
    subtitle = isHant 
      ? "多維安全防禦，無畏解析异常重定向"
      : "多维安全防御，无畏解析异常重定向";
    desc = isHant 
      ? "面對惡性網絡解析异常與虛假重寫，本專區為您提供全天候原版原裝登錄防禦保障以及 2FA 全套常見報錯解除指南。"
      : "面对恶性网络解析异常与虚假重写，本专区为您提供全天候原版原装登录防御保障以及 2FA 全套常见报错解除指南。";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "設置獨特的專屬防釣魚安全提示碼" : "设置独特的专属防钓鱼安全提示码",
        desc: isHant 
          ? "在歐易登錄後的“個人中心-安全中心”自定義預留一串中文防釣魚碼。此後凡是由平台發送的郵件和驗證消息均會附帶此專屬標記，極好核驗真偽。"
          : "在欧易登录后的“个人中心-安全中心”自定义预留一串中文防钓鱼码。此后凡是由平台发送 of 邮件和验证消息均会附带此专属标记，极好核验真伪。"
      },
      {
        icon: <Keyboard className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "異地登錄或網絡 IP 突變二次防護" : "异地登录或网络 IP 突变二次重盾",
        desc: isHant 
          ? "若監測到網絡節點或代用線路異地跳空（如頻繁切換不同地區的網絡環境），歐易會自動掛起交易，必須額外輸入安全提示短信與二次動態碼驗證。"
          : "若监测到网络节点或代用线路异地跳空（如频繁切换不同地区的网络环境），欧易会自动挂起交易，必须额外输入安全提示短信与二次动态码验证。"
      },
      {
        icon: <Orbit className="text-blue-400 w-6 h-6" />,
        title: isHant ? "支持無密安全密鑰(Passkey)快捷登入" : "支持无密安全密钥(Passkey)快捷登入",
        desc: isHant 
          ? "完美支持 Apple FaceID 和 Windows Hello。免輸複雜密碼即可秒級安全解密登錄，防止鍵盤側錄木馬收集。"
          : "完美支持 Apple FaceID 和 Windows Hello。免输复杂密码即可秒级安全解密登录，防止键盘侧录木马收集。"
      },
      {
        icon: <LineChart className="text-purple-400 w-6 h-6" />,
        title: isHant ? "設備一鍵下線與安全掛鎖" : "设备一键下线与安全挂锁",
        desc: isHant 
          ? "一鍵調閱平台曾成功许可的移動手機與網頁瀏覽器，發現異常可一鍵清退剔除所有已许可終端，並支持 24 小時掛鎖不可提，保障資產堅固安全。"
          : "一键调阅平台曾成功许可的移动手机与网页浏览器，发现异常可一键清退剔除所有已许可终端，并支持 24 小时挂锁不可提，保障资产坚固安全。"
      }
    ];
  } else if (currentRoute === "diannao") {
    title = isHant 
      ? "為職業交易員而生：歐易 PC 電腦桌面端極致體驗"
      : "为职业交易员而生：欧易 PC 电脑桌面端极致体验";
    subtitle = isHant 
      ? "全維度高頻監控，操作行雲流水"
      : "全维度高频监控，操作行云流水";
    desc = isHant 
      ? "下載安裝歐易 PC 專業桌面客戶端 (Windows/macOS)，解鎖無限多窗口看盤、極速熱鍵鍵盤狙擊、以及毫秒級高性能數據饋送。"
      : "下载安装欧易 PC 专业桌面客户端 (Windows/macOS)，解锁无限多窗口看盘、极速热键键盘狙击、以及毫秒级高性能数据馈送。";
    features = [
      {
        icon: <Laptop2 className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "多屏幕網格看盤 · 專屬快捷視盤" : "多屏幕网格看盘 · 专属快捷视盘",
        desc: isHant 
          ? "告別瀏覽器標籤頁頻繁切換，電腦端最高支持在同一桌面並列分屏開啟 16 張深度 K 線圖，自適應定義自選和多組追蹤盤指標。"
          : "告别浏览器标签页频繁切滑，电脑端最高支持在同一桌面并屏开启 16 张深度 K 线图，自适应定义自选和多组追踪盘指标。"
      },
      {
        icon: <Keyboard className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "原生鍵盤快捷鍵狙擊操作" : "原生键盘快捷键狙击操作",
        desc: isHant 
          ? "完美集成獨立熱鍵下單、一鍵市價快速止盈止損、或緊急全倉一键自動撤單。在激烈行情波動時搶佔極佳買賣先機。"
          : "完美集成独立热键下单、一键市价快速止盈止损、或紧急全仓一键自动撤单。在激烈行情波动时抢占极佳买卖先机。"
      },
      {
        icon: <LineChart className="text-blue-400 w-6 h-6" />,
        title: isHant ? "首創多線程 Websocket 直接饋送" : "首创多线程 Websocket 直接馈送",
        desc: isHant 
          ? "跳過瀏覽器 HTTP 無效拉取，直接與歐易內存交易大廳創建底層長連接。保證數據跳動延遲降到極限 1ms，極速無閃爍。"
          : "跳过浏览器 HTTP 无效拉取，直接与欧易内存交易大厅创建底层长连接。保证数据跳动延迟降到极限 1ms，极速无闪烁。"
      },
      {
        icon: <Shield className="text-purple-400 w-6 h-6" />,
        title: isHant ? "獨立強護沙盒，免疫流氓瀏覽器插件" : "独立强护沙盒，免疫流氓浏览器插件",
        desc: isHant 
          ? "使用電腦原生桌面客戶端可避免遭瀏覽器惡意插件盜刷、篡改輸入交易收款地址或後台監聽操作情況，安全性提升百倍。"
          : "使用电脑原生桌面客户端可避免遭浏览器恶质恶意插件盗刷、篡改输入交易收款地址或后台监听操作情况，安全性提升百倍。"
      }
    ];
  } else if (currentRoute === "anzhuangbao") {
    title = isHant 
      ? "安全原生態：歐易原廠綠色純淨安裝包質保"
      : "安全原生态：欧易原厂绿色纯净安装包质保";
    subtitle = isHant 
      ? "白名單鏡像，捍衛資產免遭解析异常假包危害"
      : "白名单镜像，捍卫资产免遭解析异常假包危害";
    desc = isHant 
      ? "拒絕多簽惡意假包，本頁為您打撈並直聯原生發布的極速包合輯。通過對哈希簽名的無縫監控，全盤捍衛每一塊資產不被侵襲。"
      : "拒绝多签恶意假包，本页为您打捞并直联原生发布的极速包合辑。通过对哈希签名的无缝监控，全盘捍卫每一块资产不被侵袭。";
    features = [
      {
        icon: <FileCheck className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "高透明 SHA-256 全校驗防偽指紋" : "高透明 SHA-256 全校验防伪指纹",
        desc: isHant 
          ? "絕非網上搜索所得的二手壓縮。所有 APK 及 PC 端安裝包哈希公開發行，下載後可比對指紋，防止任何網絡網絡服務商在中途限制注入非法代碼。"
          : "绝非网上搜索所得的二手压缩。所有 APK 及 PC 端安装包哈希公开发行，下载后可比对指纹，防止任何网络网络服务商在中途限制注入非法代码。"
      },
      {
        icon: <Shield className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "雙重殺毒軟件 100% 綠標過審" : "双重杀毒软件 100% 绿标过审",
        desc: isHant 
          ? "經過騰訊、網易、360 以及境外卡巴斯基等多核心在內的高級別掃毒測試，完美繞過錯誤警告。純淨安裝，資產大門常駐保障。"
          : "经过腾讯、网易、360 以及境外卡巴斯基等多核心在内的高级别扫毒测试，完美绕过错误警告。纯净安装，资产大门常驻保障。"
      },
      {
        icon: <Orbit className="text-blue-400 w-6 h-6" />,
        title: isHant ? "完美支持後台多通道無感極速熱更新" : "完美支持后台多通道无感极速热更新",
        desc: isHant 
          ? "首次安裝完畢之後，後續若有新補丁或安全規則更迭，歐易客戶端會自動向雲存儲驗證原廠包校驗並增量更新，省去多次繁雜的手動下載。"
          : "首次安装完毕之后，后续若有新补丁或安全规则更迭，欧易客户端会自动向云存储验证原厂包校验并增量更新，省去多次繁杂的手动下载。"
      },
      {
        icon: <Check className="text-purple-400 w-6 h-6" />,
        title: isHant ? "原生代碼免閃退，長效保活底層框架" : "原生代码免闪退，长效保活底层框架",
        desc: isHant 
          ? "自適應配屬市面上 99.9% 不同的系統底層（兼容老舊安卓及蘋果新版系統架構），長效穩定保活不閃退、閃屏，絕不丟失買單賣單響應。"
          : "自适应配属市面上 99.9% 不同的系统底层（兼容老旧安卓及苹果新版系统架构），长效稳定保活不闪退、闪屏，绝不丢失买单卖单响应。"
      }
    ];
  } else if (currentRoute === "pingguo") {
    title = isHant 
      ? "針對蘋果 iOS 端歐易 (OKX) 的全套防跑路下載指引"
      : "针对苹果 iOS 端欧易 (OKX) 的全套防跑路下载指引";
    subtitle = isHant 
      ? "iOS 專屬海外 Apple ID 安全避坑技巧"
      : "iOS 专属海外 Apple ID 安全避坑技巧";
    desc = isHant 
      ? "面對大陸 Apple Store 的下架限制，我們貼心為您精簡梳理出 100% 綠色過審、不閃退、不怕證書吊銷的蘋果 App Store 下載細則。"
      : "面对大陆 Apple Store 的下架限制，我们贴心为您精简梳理出 100% 绿色过审、不闪退、不怕证书包装的苹果 App Store 下载细则。";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "拒絕易吊銷的“網頁企業證書/免簽版”" : "拒绝易吊销的“网页企业证书/免签版”",
        desc: isHant 
          ? "絕不使用網上流傳的企業重簽名重封裝包。那些包不僅存有極高隱匿釣魚風險，且隨時可能閃退無法開啟。我們只推薦原版 Apple Store 通路下載。"
          : "绝不使用网上流传的企业重签名重封装包。那些包不仅存有钓鱼极高极高隐匿侧漏，且随时可能闪退无法开启。我们只推荐原版 Apple Store 通路下载。"
      },
      {
        icon: <Orbit className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "海外 Apple ID 快速換區登錄" : "海外 Apple ID 快速换区登录",
        desc: isHant 
          ? "登錄香港、美國、新加坡等海外空白蘋果 ID，即可在 App Store 直接點擊搜尋安裝，享受完全蘋果核查的安全保護，極好隔離釣魚包。"
          : "登录香港、美国、新加坡等海外空白苹果 ID，即可在 App Store 直接点击搜寻安装，享受完全苹果核查的安全保护，极好隔离钓鱼包。"
      },
      {
        icon: <Sparkles className="text-blue-400 w-6 h-6" />,
        title: isHant ? "自動檢測並提醒 iOS 原廠更新" : "自动检测并提醒 iOS 原厂更新",
        desc: isHant 
          ? "通過 App Store 渠道下載的 OKX 享有自動靜默更新權限，無需反覆卸載重裝，安全與新交易功能永遠快人一步，穩定舒適一整年。"
          : "通过 App Store 渠道下载 of OKX 享有自动静默更新权限，无需反复卸载重装，安全与新交易功能永远快人一步，稳定舒适一整年。"
      },
      {
        icon: <Check className="text-purple-400 w-6 h-6" />,
        title: isHant ? "無漏洞 Apple iCloud 雲端自動同步" : "无漏洞 Apple iCloud 云端自动同步",
        desc: isHant 
          ? "在原版應用運行過程中，可啟用 Face ID 指紋生物密鑰，不向任何本地文本寫入密碼，即便整機丟失、帳號重置也決不因外部干擾造成虧空。"
          : "在原版应用运行过程中，可启用 Face ID 指纹生物密钥，不向任何本地文本写入密码，即便整机丢失、账号重置也决不因外部干扰造成亏空。"
      }
    ];
  } else if (currentRoute === "anzhuo") {
    title = isHant 
      ? "極致精簡：安卓平台高速純淨 APK 直連通道"
      : "极致精简：安卓平台高速纯净 APK 直连通道";
    subtitle = isHant 
      ? "安卓無假包，安裝無感限制指要"
      : "安卓无假包，安装无感限制指要";
    desc = isHant 
      ? "針對所有安卓手機（非鴻蒙/MIUI限制干擾），直接打標接入新加坡、香港 BGP 機房的 CDN 白名單包，讓速度達到極致，不含流氓木馬解析异常。"
      : "针对所有安卓手机（非鸿蒙/MIUI限制干扰），直接打标接入新加坡、香港 BGP 机房的 CDN 白名单包，让速度达到极致，不含流氓木马解析异常。";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "原汁原味原廠簽名，資產純淨如新" : "原汁原味原厂签名，资产纯净如新",
        desc: isHant 
          ? "所有下掛安卓文件由 OKX 前端打包總機通過 HTTPS 回源輸出，杜絕某些國產手機瀏覽器中途惡意解析异常為山寨假歐易、山寨合約的重災區。"
          : "所有下挂安卓文件由 OKX 前端打包总机通过 HTTPS 回源输出，杜绝某些国产手机浏览器中途恶意解析异常为山寨假欧易、山寨合约的重灾区。"
      },
      {
        icon: <Check className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "繞過各類“防沉迷、防詐騙”安全欺詐誤殺限制" : "绕过各类“防沉迷、防诈骗”安全欺诈误杀限制",
        desc: isHant 
          ? "由於內地特定合規網絡阻攔，國產安卓機內置防禦經常會對數字貨幣軟件強行高風險彈窗。我們提供斷網、停用純淨模式等完美避坑技巧。"
          : "由于内地特定合规网络阻拦，国产安卓机内置防御经常会对数字货币软件强行高风险弹窗。我们提供断网、停用纯净模式等完美避坑技巧。"
      },
      {
        icon: <Orbit className="text-blue-400 w-6 h-6" />,
        title: isHant ? "首發 MEME 代幣 & Web3 高頻兼容性" : "首发 MEME 代币 & Web3 高频兼容性",
        desc: isHant 
          ? "安卓 APK 內嵌頂配 OKX Web3 極客錢包，極好承託各種最新土狗、打新、跨鏈 DApps、空投、和一鍵無感轉簽安全防護。"
          : "安卓 APK 内嵌顶配 OKX Web3 极客钱包，极好承托各种最新土狗、打新、跨链 DApps、空投、和一键无感转签安全防护。"
      },
      {
        icon: <LineChart className="text-purple-400 w-6 h-6" />,
        title: isHant ? "超高適配性，低端千元機暢快平滑極佳" : "超高适配性，低端千元机畅快平滑极佳",
        desc: isHant 
          ? "歷經上萬款真機內核調試，哪怕是不帶谷歌套件 (GMS) 的極其老舊國產手機亦能保持毫秒級流暢刷新，K 線無粘滯感，平滑入鏡。"
          : "历经上万款真机内核调试，哪怕是不带谷歌套件 (GMS) 的极其老旧国产手机亦能保持毫秒级流畅刷新，K 线无粘滞感，平滑入镜。"
      }
    ];
  } else if (currentRoute === "wangye" || currentRoute === "guanwang") {
    title = isHant 
      ? "唯一歐易 OKX 合規安全直連通道大堂"
      : "唯一欧易 OKX 合规安全直连通道大堂";
    subtitle = isHant 
      ? "防釣魚跳轉重定向，高可用的中繼白名單解析"
      : "防钓鱼跳转重定向，高可用的重用白名单解析";
    desc = isHant 
      ? "中國內地網絡服務商寬帶（尤其是移動/廣電等）頻發域名解析异常，將主站路徑變更為野雞站。多線抗干擾高配服務器全時刻守護本站，只在真入口相見！"
      : "中国内地网络服务商宽带（尤其是移动/广电等）频分域名解析异常，将主站路径变更为野鸡站。多快抗干扰高配服务器全时刻守护本站，只在真入口相见！";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "安全域名資質校驗，防止被投毒" : "安全域名资质校验，防止被投毒",
        desc: isHant 
          ? "我們的跳轉白名單始終保持只回源到帶有頂級 SSL 及原廠 CDN 的核心地址。絕無中介，絕無代託管，防止在跳轉瞬間遭高科技投毒中轉。"
          : "我们的跳转白名单始终保持只回源到带有顶级 SSL 及原厂 CDN 的核心地址。绝无中介，绝无代托管，防止在跳转瞬间遭高科技投毒中转。"
      },
      {
        icon: <Orbit className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "全球多組抗阻 BGP 海外服務器多備" : "全球多组抗阻 BGP 海外服务器多备",
        desc: isHant 
          ? "即便是遇到重大活動流量擠佔、惡意 DDoS 阻擊，我們的多備份鏡像也能在 1 秒鐘內自適應熱重載至可用節點，讓您任何時候安全查看訪問入口。"
          : "即便是遇到重大活动流量挤占、恶意 DDoS 阻击，我们的多备份镜像也能在 1 秒钟内自适应热重载至可用节点，让您任何时候安全查看访问入口。"
      },
      {
        icon: <LineChart className="text-blue-400 w-6 h-6" />,
        title: isHant ? "全站加密會話保障 3A 通信級防護" : "全站加密会话保障 3A 通信级防护",
        desc: isHant 
          ? "客戶端與主站前端的通信全部採用 2048 位 TLS 加密，在極不安全的公共 Wi-Fi 網絡下登入、交易，您的資金與密碼依舊宛在金剛保險箱中。"
          : "客户端与主站前端的通信全部采用 2048 位 TLS 加密，在极不安全的公共 Wi-Fi 网络下登入、交易，您的资金与密码依旧宛在金刚保险箱中。"
      },
      {
        icon: <Check className="text-purple-400 w-6 h-6" />,
        title: isHant ? "安全防偽識別庫（Verification Portal）一鍵呼出" : "安全防伪识别库（Verification Portal）一键呼出",
        desc: isHant 
          ? "我們將指引如何調閱歐易的安全防偽核驗單。任何號稱是“平台客服、網貸清算、扣稅警告”的分支，均可在一鍵核驗中辨清真偽。"
          : "我们将指引如何调阅欧易的安全防伪核验单。任何号称是“平台客服、网贷清算、扣税警告”的分支，均可在一键核验中辨清真伪。"
      }
    ];
  } else if (currentRoute === "zhongwen") {
    title = isHant 
      ? "原生繁體中文體驗，更符合國人慣例的交易生態"
      : "原生简体中文体验，更符合国人惯例的交易生态";
    subtitle = isHant 
      ? "解決英文不習慣、CNY 匯率不適配痛點"
      : "解决英文不习惯、CNY 汇率不适配痛点";
    desc = isHant 
      ? "即使是海外版 OKX，也能在一鍵調控中還原全繁體漢化界面，支持精準的中國本地 CNY 人民幣法幣溢價，看盤更加胸有成竹。"
      : "即使是海外版 OKX，也能在一键调控中还原全简体汉化界面，支持精准 of 中国本地 CNY 人民币法币溢价，看盘更加胸有成竹。";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "24/7/365 國語純淨極速真人客服" : "24/7/365 国语纯净极速真人客服",
        desc: isHant 
          ? "提供行業頂配反應時間的華人客服協助。無溝通滯阻，無論充提幣解卡疑雲還是防騙質詢，幾秒鐘即可匹配專業國語專家接入處理。"
          : "提供行业配属的华人客服协助。无沟通滞阻，无论充提币解卡疑云还是防骗质询，几秒钟即可匹配专业国语专家接入处理。"
      },
      {
        icon: <Coins className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "獨家匯率自適應：一目了然看 CNY 計價" : "独家汇率自适应：一目了然看 CNY 计价",
        desc: isHant 
          ? "不再為看美元/各種雜多匯率產生心生困頓。一鍵啟用 CNY 本地定價後，所有主流 K 線報價與出入金專享價格全量以人民幣標識清楚。"
          : "不再为看美元/各种杂多汇率产生心生困顿。一键启用 CNY 本地定价后，所有主流 K 线报价与出入金专享价格全量以人民币标识清楚。"
      },
      {
        icon: <Orbit className="text-blue-400 w-6 h-6" />,
        title: isHant ? "中文白卡避障：貼合東亞交易風氣特徵" : "中文白卡避障：贴合东亚交易风气特征",
        desc: isHant 
          ? "平台在大陸、亞太大區運營擁有數年資政沉澱。各種風控掛死、買賣遇滯、提幣超額限制等情況均備置有極其接地氣的解決方案與問答庫。"
          : "平台在大陆、亚太大区运营拥有数年政绩沉淀。各种风控挂死、买卖遇滞、提币超额限制等情况均备置有极其接地气的解决方案与问答库。"
      },
      {
        icon: <Check className="text-purple-400 w-6 h-6" />,
        title: isHant ? "精湛漢化：上萬個 Web3 專業金融詞彙精準還原" : "精尽汉化：上万个 Web3 专业金融词汇精准还原",
        desc: isHant 
          ? "告別翻譯器生澀的中英硬譯。無論是期權希臘字母、衍生跨幣種、網格自動化、還是 DEFI 挖礦，均經專業東亞 Web3 分析師全量繁體漢化。"
          : "告别翻译器生涩的中英硬译。无论是期权希腊字母、衍生跨币种、网格自动化、还是 DEFI 矿池，均经专业东亚Web3分析师全量简体汉化。"
      }
    ];
  } else if (currentRoute === "xiazai") {
    title = isHant 
      ? "自適應多端高速直下白名單中繼中心 (多重鏡像)"
      : "自适应多端高速直下白名单中继中心 (多重镜像)";
    subtitle = isHant 
      ? "告別下載龜速與虛假李鬼包限制障礙"
      : "告别下载龟速与虚假李鬼包限制障碍";
    desc = isHant 
      ? "由海外數套獨用骨幹光纜支持的直下專線，讓您的安卓 APK 及 PC 客戶端瞬間拉滿帶寬，不插廣告、更不需要開啟付費网络代理。"
      : "由海外数套独立骨干光缆支持的直下专线，让您的安卓 APK 及 PC 客户端瞬间拉满带宽，不插广告、更不需要开启付费网络代理。";
    features = [
      {
        icon: <Shield className="text-yellow-500 w-6 h-6" />,
        title: isHant ? "全球多節點專用 CDN 高速分發" : "全球多节点专用 CDN 高速分发",
        desc: isHant 
          ? "我們在沿海及核心地區布建有多組安全加速服務器，無論晚高峰如何擁堵，皆能為您保障全帶寬秒下 APK 與桌面完整安裝包。"
          : "我们在沿海及核心地区布建有多组安全加速服务器，无论晚高峰如何拥堵，皆能为您保障全带宽秒下 APK 与桌面完整安装包。"
      },
      {
        icon: <Check className="text-yellow-400 w-6 h-6" />,
        title: isHant ? "100% 同步歐易版本發布狀態，無延遲" : "100% 同步欧易版本发布状态，无延迟",
        desc: isHant 
          ? "自動檢測版本發布。只要歐易上架發布全新性能升級包，我們的分發目錄將在毫秒間完成同步。"
          : "自动爬网上报进程每隔 10 分钟自动执行一次。只要欧易上架发布全新性能升级包，我们的中继下载目录将在毫秒间完成无损同步。"
      },
      {
        icon: <Orbit className="text-blue-400 w-6 h-6" />,
        title: isHant ? "自帶哈希自動對齊框架，告別病毒限制" : "自带哈希自动对齐框架，告别病毒限制",
        desc: isHant 
          ? "下載過程中配備簡易的 MD5 & SHA 安全校驗，極大程度克服網絡網絡服務商在中途強塞各種理財解析异常廣告，杜絕假充值包。"
          : "下载过程中配备简易的 MD5 & SHA 安全校验，极大程度克服网络网络服务商在中途强塞各种理财解析异常广告，杜绝假充值包。"
      },
      {
        icon: <LineChart className="text-purple-400 w-6 h-6" />,
        title: isHant ? "多設備型號（華為/小米/蘋果/PC/Mac）智能型號配對" : "多设备型号（华为/小米/苹果/PC/Mac）智能型号配对",
        desc: isHant 
          ? "根據您當前載入設備的 HTTP user-agent 標識，為您首推最適配、最高效能、防卡死、不佔冗餘空間的指定物理端安裝包。"
          : "根据您当前载入设备的 HTTP user-agent 标识，为您首推最适配、最高效能、防卡死、不占冗余空间的指定物理端安装包。"
      }
    ];
  }

  return (
    <section id="features" className="py-20 bg-zinc-950 text-zinc-350 border-b border-zinc-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-bold font-mono">
            <Sparkles size={12} />
            <span>{subtitle}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-white tracking-tight leading-normal">
            {title}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {features.map((feat, index) => (
            <div 
              key={index}
              className="p-6 md:p-8 bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl space-y-4 transition-all duration-300 shadow-sm hover:shadow-black/40"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center shrink-0">
                {feat.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-white text-base leading-normal">{feat.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Proof of Reserves Showcase */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-900 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1 text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-semibold font-mono">
              <Landmark size={12} /> {isHant ? "1:1 % 默克爾樹儲備公審核標" : "1:1 % 默克尔树储备公审核标"}
            </div>
            <h4 className="font-display font-bold text-white text-lg">{isHant ? "歐易獨立資金儲備率證明 (Proof of Reserves)" : "欧易独立资金储备率证明 (Proof of Reserves)"}</h4>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl">
              {isHant 
                ? "即使市場動盪，歐易亦常備 100% 準備金。每月定時利用 zk-SNARKs 及默克爾樹校驗披露真實鏈上數據。BTC 保持 102%、ETH 為 104%、USDT 達 103%，任何瞬間皆保證對全球儲戶的無縫全額贖回兌現。"
                : "即使市场动荡，欧易亦常备 100% 准备金。每月定时利用 zk-SNARKs 及默克尔树校验披露真实链上数据。BTC 保持 102%、ETH 为 104%、USDT 达 103%，任何瞬间皆保证对全球储户的无缝全额赎回兑现。"}
            </p>
          </div>
          
          <div className="shrink-0 flex items-center gap-4 bg-zinc-950 p-4 border border-zinc-900 rounded-2xl">
            <div className="text-center px-4">
              <span className="block font-mono text-xl font-bold text-white">102%</span>
              <span className="block text-[10px] text-zinc-500 mt-1 uppercase font-semibold font-mono">{isHant ? "BTC 儲備比值" : "BTC 储备比值"}</span>
            </div>
            <div className="h-8 w-px bg-zinc-900"></div>
            <div className="text-center px-4">
              <span className="block font-mono text-xl font-bold text-yellow-400">104%</span>
              <span className="block text-[10px] text-zinc-500 mt-1 uppercase font-semibold font-mono">{isHant ? "ETH 儲備比值" : "ETH 储备比值"}</span>
            </div>
            <div className="h-8 w-px bg-zinc-900"></div>
            <div className="text-center px-4">
              <span className="block font-mono text-xl font-bold text-yellow-500">103%</span>
              <span className="block text-[10px] text-zinc-500 mt-1 uppercase font-semibold font-mono">{isHant ? "USDT 儲備比值" : "USDT 储备比值"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
