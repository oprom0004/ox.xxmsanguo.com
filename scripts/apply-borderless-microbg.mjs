import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 重构 Hero.tsx：彻底去除右侧卡片内部分割线与所有硬描边，改用半透明深色微底 (bg-white/[0.03])
const heroPath = path.join(rootDir, 'src', 'components', 'Hero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');

// 去掉右侧卡片外部硬边框和内部分割线，改用高级极简微底
const oldRightCard = `<div className="lg:col-span-5 w-full">
            <div className="bg-[#0b101c]/90 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              
              <div className="pb-3 border-b border-zinc-800/80">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-400 text-xs mt-0.5">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤列表 */}
              <div className="space-y-3">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/70 hover:border-blue-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="text-zinc-100 text-xs font-bold">{step.title}</h4>
                      <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部按钮 */}
              <div className="pt-1">
                <button 
                  data-cta="true"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 hover:border-blue-500/40 text-xs text-blue-400 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <span>{isHant ? "一鍵進入專屬通道" : "一键进入专属通道"}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>`;

const newRightCard = `<div className="lg:col-span-5 w-full">
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-400 text-xs mt-1">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤列表 (无边框，采用极简自然微底) */}
              <div className="space-y-2.5">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="text-zinc-100 text-xs font-bold">{step.title}</h4>
                      <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部按钮 (无生硬边框) */}
              <div className="pt-1">
                <button 
                  data-cta="true"
                  className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-blue-600/20 text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>{isHant ? "一鍵進入專屬通道" : "一键进入专属通道"}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>`;

heroContent = heroContent.replace(oldRightCard, newRightCard);
fs.writeFileSync(heroPath, heroContent, 'utf8');

// 2. 重新构建与推送
console.log('🚀 执行无边框纯净微底 (bg-white/[0.03]) 重构并推送到 GitHub...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "style: remove internal dividers and hard borders on right card, adopting translucent clean micro-background bg-white/[0.03]"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 1、2、3 项全部完成，纯净无边框科技蓝 UI 已成功部署并推送到 GitHub！');
