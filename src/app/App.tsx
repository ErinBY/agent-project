import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, ArrowUp, ArrowDown, Minus, Check, AlertTriangle, RefreshCw, X, HelpCircle, Zap, Eye, CreditCard, RotateCcw, Clock, Server } from "lucide-react";

const SECTIONS = [
  { id: "s1", num: "01", title: "개선 과제 정의" },
  { id: "s2", num: "02", title: "목표와 성공 기준" },
  { id: "s3", num: "03", title: "Agentic Workflow" },
  { id: "s4", num: "04", title: "구성요소 정의" },
  { id: "s5", num: "05", title: "정책·예외 케이스" },
  { id: "s6", num: "06", title: "화면 설계" },
  { id: "s7", num: "07", title: "원가·운영 관점" },
  { id: "sa", num: "부록", title: "UX 개선점" },
];

function Tag({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "amber" | "green" | "red" | "blue" | "muted" }) {
  const styles = {
    default: "bg-black/5 text-[#2b2a28] border border-black/10",
    amber: "bg-[#b8862e]/15 text-[#b8862e] border border-[#b8862e]/30",
    green: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    red: "bg-red-500/10 text-red-600 border border-red-500/20",
    blue: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    muted: "bg-black/[0.03] text-[#75726c] border border-black/5",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12.5px] font-mono font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="font-mono text-[12.5px] text-[#b8862e] tracking-widest">{num}</span>
        <div className="h-px flex-1 bg-[#b8862e]/20" />
      </div>
      <h2 className="text-2xl font-medium text-[#2b2a28] tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-[#75726c] font-mono">{subtitle}</p>}
    </div>
  );
}

// ——— SECTION 1 ———
function Section1() {
  const problems = [
    {
      icon: "①",
      title: "요청이 항목으로 분해되지 않음",
      body: "무엇이 구체적이고 무엇이 모호한지 시스템이 구분하지 못합니다.",
    },
    {
      icon: "②",
      title: "실행 전 구체화 단계 없음",
      body: "해석이 전부 모델 안에서만 일어납니다. 사용자는 결과가 나올 때까지 알 수 없습니다.",
    },
    {
      icon: "③",
      title: "크레딧이 결과가 아니라 시도에 차감됨",
      body: '"생각과 다르네 → 다시 요청 → 또 차감"이라는 반복의 비용을 사용자가 부담합니다.',
    },
  ];

  return (
    <section id="s1" className="mb-20">
      <SectionHeader num="SECTION 01" title="개선 과제 정의" />

      <div className="space-y-5 text-[#55534f] leading-[1.85] text-[16px] mb-8">
        <p>
          ModoAI의 이미지 수정은 텍스트 입력창 하나로 여러 요청을 한 번에 받습니다. 그릇 교체, 테이블보 변경, 소품 추가까지 6가지를 한 번에 요청했을 때 반영 품질은 기대 이상이었습니다. <strong className="text-[#2b2a28] font-medium">문제는 반영이 아니라 다른 곳에 있었습니다.</strong>
        </p>
        <p>
          "테이블보를 좀 더 밝은 것으로", "그릇은 좀 더 모던한 것으로"처럼 모호한 표현을 쓰게 됩니다. AI가 '밝은'과 '모던한'을 어떻게 해석했는지 실행 전에는 알 수 없고, 결과는 크레딧이 차감된 뒤에야 확인할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8">
        {problems.map((p) => (
          <div key={p.icon} className="flex gap-4 p-4 rounded-lg bg-[#ffffff] border border-black/[0.06] group hover:border-[#b8862e]/30 transition-colors duration-200">
            <span className="font-mono text-[#b8862e] text-sm mt-0.5 shrink-0">{p.icon}</span>
            <div>
              <div className="text-[#2b2a28] text-sm font-medium mb-1">{p.title}</div>
              <div className="text-[#75726c] text-[14.5px] leading-relaxed">{p.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-lg border border-[#b8862e]/25 bg-[#b8862e]/5">
        <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-2">MISSION STATEMENT</div>
        <p className="text-[#2b2a28] text-sm leading-relaxed">
          모호한 수정 요청을 실행 전에 구체화하고, 실행 후에는 해석이 의도와 맞았는지 제품이 스스로 검증하는 <strong>'수정 에이전트'</strong>를 설계한다.
        </p>
      </div>
    </section>
  );
}

// ——— SECTION 2 ———
function Section2() {
  const metrics = [
    { name: "첫 시도 의도 일치율", def: "첫 수정 결과를 사용자가 그대로 수락한 비율", dir: "up" },
    { name: "목표 도달 크레딧 수", def: "최종 만족한 결과까지 쓴 평균 크레딧", dir: "down" },
    { name: "동일 대상 재수정률", def: "같은 요소를 연속으로 다시 고친 비율 — 해석이 빗나갔다는 신호", dir: "down" },
    { name: "구체화 단계 응답률", def: "AI가 보여준 선택지에서 사용자가 실제로 고른 비율", dir: "up" },
    { name: "수정 기능 재사용률", def: "수정을 써본 사용자가 다음 촬영에서도 수정을 쓰는 비율", dir: "up" },
  ];

  return (
    <section id="s2" className="mb-20">
      <SectionHeader num="SECTION 02" title="목표와 성공 기준" />

      <div className="p-4 rounded-lg bg-[#f0eee7] border border-black/[0.06] mb-8">
        <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-2">OBJECTIVE</div>
        <p className="text-[#2b2a28] text-sm leading-relaxed">
          셀러가 프롬프트 실력 없이도, 최소한의 크레딧으로 의도한 결과에 도달하게 한다.<br />
          <span className="text-[#75726c]">모호함은 실행 전에 풀고, 해석이 맞았는지는 사용자가 아니라 제품이 확인합니다.</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[14.5px]">
          <thead>
            <tr className="border-b border-black/[0.07]">
              <th className="text-left py-3 px-4 font-mono text-[11.5px] text-[#75726c] tracking-widest">METRIC</th>
              <th className="text-left py-3 px-4 font-mono text-[11.5px] text-[#75726c] tracking-widest">DEFINITION</th>
              <th className="text-left py-3 px-4 font-mono text-[12.5px] text-[#75726c] tracking-widest w-[130px]">방향</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={i} className={`border-b border-black/[0.04] hover:bg-black/[0.02] transition-colors border-l-4 ${m.dir === "up" ? "border-l-emerald-500" : "border-l-red-500"}`}>
                <td className="py-3.5 px-4 text-[#2b2a28] font-medium whitespace-nowrap">{m.name}</td>
                <td className="py-3.5 px-4 text-[#75726c] leading-relaxed">{m.def}</td>
                <td className="py-3.5 px-4 text-center">
                  {m.dir === "up" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-semibold text-[13.5px] shadow-sm whitespace-nowrap">
                      <ArrowUp size={14} strokeWidth={3} /> 높을수록 좋음
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white font-semibold text-[13.5px] shadow-sm whitespace-nowrap">
                      <ArrowDown size={14} strokeWidth={3} /> 낮을수록 좋음
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-[#ffffff] border border-black/[0.06]">
        <p className="text-[14.5px] text-[#75726c] leading-relaxed">
          <strong className="text-[#55534f]">구체화 단계 응답률</strong>을 지표에 넣은 이유: 되묻기가 너무 잦으면 그 자체가 마찰이 됩니다. 이 숫자가 낮으면 되묻는 기준을 완화하라는 신호로 씁니다.
        </p>
      </div>
    </section>
  );
}

// ——— SECTION 3 ———
const FLOW_STEPS = [
  {
    id: 1, label: "요청 분해", badge: "PARSE",
    desc: "자유 텍스트를 항목 단위로 쪼갭니다.",
    input: "사용자가 입력한 자유 텍스트",
    output: '"테이블보 밝게 + 그릇 교체 + 나이프 추가" → 칩 3개로 분리',
    onFail: "분해가 어려운 문장은 통째로 모호 항목 처리",
    type: "normal",
  },
  {
    id: 2, label: "모호성 판정", badge: "CLASSIFY",
    desc: '항목마다 "이대로 실행 가능한가?" 판단합니다.',
    input: "분해된 항목 각각",
    output: '"나이프 추가" = 명확 / "밝게" = 모호 → 분기',
    onFail: "판정이 애매하면 모호 쪽으로 분류 (되묻는 비용 < 재생성 비용)",
    type: "gate",
  },
  {
    id: 3, label: "구체화", badge: "CLARIFY",
    desc: "모호한 항목에 대해 선택지 칩을 제시합니다.",
    input: "모호 항목 + 현재 이미지",
    output: '"밝은 테이블보" → 화이트 린넨 / 크림 / 라이트 그레이 / 직접 입력',
    onFail: "선택 건너뛰면 AI 추천안(1순위)으로 실행 + 해석 표시",
    type: "human",
  },
  {
    id: 4, label: "실행", badge: "EXECUTE",
    desc: "확정된 항목들로 이미지 편집 모델을 호출합니다.",
    input: "확정된 항목 목록 + 원본 이미지",
    output: "이미지 편집 모델 호출 (항목 간 충돌·순서 처리 포함)",
    onFail: "모델 호출 실패 시 크레딧 차감 없이 재호출",
    type: "auto",
  },
  {
    id: 5, label: "검증", badge: "VERIFY",
    desc: "결과 이미지를 항목별로 두 가지 축으로 확인합니다.",
    input: "수정 전후 이미지 + 확정 항목 목록",
    output: "① 요청 반영 여부 ② 제품 원형 보존 여부 → 항목별 통과/미달",
    onFail: "미달 항목만 4단계로 자동 재시도 (최대 2회, 크레딧 차감 없음)",
    type: "auto",
  },
  {
    id: 6, label: "전달", badge: "DELIVER",
    desc: "검증 결과에 따라 결과를 전달하고 크레딧을 차감합니다.",
    input: "검증 결과",
    output: "(a) 통과: 결과 전달 + 크레딧 차감 (b) 미달: 상황 보고 + 선택지",
    onFail: "—",
    type: "credit",
  },
];

const typeStyle: Record<string, string> = {
  normal: "border-black/10 bg-black/[0.03]",
  gate: "border-[#b8862e]/20 bg-[#b8862e]/5",
  human: "border-blue-500/20 bg-blue-500/5",
  auto: "border-emerald-500/15 bg-emerald-500/[0.04]",
  credit: "border-purple-500/20 bg-purple-500/5",
};
const typeBadge: Record<string, string> = {
  normal: "bg-black/5 text-[#75726c]",
  gate: "bg-[#b8862e]/15 text-[#b8862e]",
  human: "bg-blue-500/10 text-blue-600",
  auto: "bg-emerald-500/10 text-emerald-600",
  credit: "bg-purple-500/10 text-purple-600",
};

function Section3() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="s3" className="mb-20">
      <SectionHeader num="SECTION 03" title="Agentic Workflow" subtitle="수정 에이전트는 어떤 순서로 일하는가" />

      <p className="text-[15px] text-[#75726c] leading-relaxed mb-8">
        사용자 요청 입력부터 결과 전달까지 <strong className="text-[#55534f]">6단계, 2개의 관문</strong>으로 이루어집니다. 각 단계를 클릭해 상세 내용을 확인하세요.
      </p>

      {/* Flow steps */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-black/[0.06]" />
        <div className="space-y-2">
          {FLOW_STEPS.map((step, i) => {
            const isOpen = active === step.id;
            return (
              <div key={step.id}>
                <button
                  onClick={() => setActive(isOpen ? null : step.id)}
                  className={`w-full text-left flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 ${isOpen ? typeStyle[step.type] + " " + (step.type === "gate" || step.type === "human" || step.type === "credit" ? "border-opacity-100" : "") : "border-black/[0.04] bg-transparent hover:bg-black/[0.02]"}`}
                >
                  <div className="relative z-10 shrink-0">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono text-xs font-semibold ${isOpen ? typeBadge[step.type] + " border-current/30" : "bg-[#ffffff] border-black/10 text-[#75726c]"}`}>
                      {step.id}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[#2b2a28] font-medium text-sm">{step.label}</span>
                      <span className={`font-mono text-[11.5px] px-1.5 py-0.5 rounded tracking-wider ${typeBadge[step.type]}`}>{step.badge}</span>
                      {(step.type === "human") && <Tag variant="blue">Human-in-the-loop</Tag>}
                      {(step.type === "credit") && <Tag variant="amber">크레딧 차감</Tag>}
                    </div>
                    <p className="text-[#75726c] text-[14.5px]">{step.desc}</p>
                  </div>
                  <ChevronDown size={14} className={`text-[#75726c] shrink-0 mt-1.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className={`ml-13 ml-[52px] mt-1 mb-2 p-4 rounded-lg border ${typeStyle[step.type]} text-[14.5px] space-y-3`}>
                    <div>
                      <span className="font-mono text-[11.5px] text-[#75726c] tracking-widest block mb-1">INPUT</span>
                      <span className="text-[#55534f]">{step.input}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[11.5px] text-[#75726c] tracking-widest block mb-1">OUTPUT</span>
                      <span className="text-[#55534f]">{step.output}</span>
                    </div>
                    {step.onFail !== "—" && (
                      <div>
                        <span className="font-mono text-[11.5px] text-[#75726c] tracking-widest block mb-1">실패하면</span>
                        <span className="text-[#75726c]">{step.onFail}</span>
                      </div>
                    )}
                  </div>
                )}
                {/* connector arrows */}
                {i < FLOW_STEPS.length - 1 && (
                  <div className="flex items-center gap-2 pl-[19px] py-1">
                    <div className="w-px h-4 bg-black/[0.06]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="p-4 rounded-lg bg-[#ffffff] border border-black/[0.06]">
          <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-2">DESIGN DECISION</div>
          <p className="text-[14.5px] text-[#75726c] leading-relaxed">
            3단계 구체화는 <strong className="text-[#55534f]">"해석이 하나로 정해지지 않는 항목"만</strong> 되묻습니다. "나이프 추가"는 묻지 않고 바로 실행합니다.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-[#ffffff] border border-black/[0.06]">
          <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-2">CREDIT TIMING</div>
          <p className="text-[14.5px] text-[#75726c] leading-relaxed">
            크레딧 차감 시점을 <strong className="text-[#55534f]">검증 통과 후 전달 시점</strong>으로 뒤로 옮겼습니다. 검증·재시도 비용은 제품이 부담합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// ——— SECTION 4 ———
const S4_TABS = [
  { id: "context", label: "Context", icon: <Server size={12} /> },
  { id: "memory", label: "Memory", icon: <Clock size={12} /> },
  { id: "tools", label: "Tool Calling", icon: <Zap size={12} /> },
  { id: "eval", label: "Evaluation", icon: <Eye size={12} /> },
  { id: "hitl", label: "Human-in-the-loop", icon: <HelpCircle size={12} /> },
];

function Section4() {
  const [tab, setTab] = useState("context");

  const content: Record<string, React.ReactNode> = {
    context: (
      <div className="space-y-4">
        <p className="text-[15px] text-[#75726c] leading-relaxed">
          수정 작업 하나를 맡길 때마다 에이전트에게 <strong className="text-[#55534f]">네 가지</strong>를 줍니다.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { n: "①", t: "원본 제품 사진", d: "변경 불가 기준점" },
            { n: "②", t: "현재 수정 이미지", d: "작업 대상" },
            { n: "③", t: "사용자 요청 텍스트", d: "수정 지시" },
            { n: "④", t: "촬영 컨셉 정보", d: "해석 방향 결정자" },
          ].map((item) => (
            <div key={item.n} className="p-3 rounded-lg bg-[#f0eee7] border border-black/[0.05]">
              <div className="font-mono text-[#b8862e] text-xs mb-1">{item.n}</div>
              <div className="text-[#2b2a28] text-sm font-medium">{item.t}</div>
              <div className="text-[#75726c] text-[13.5px] mt-0.5">{item.d}</div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-red-500/[0.06] border border-red-500/15 flex items-start gap-2">
          <AlertTriangle size={14} className="text-red-600 mt-0.5 shrink-0" />
          <p className="text-[14.5px] text-red-600 leading-relaxed">
            <strong>경고:</strong> 배경·소품·테이블보는 바꿔도 되지만, <strong>제품 자체는 건드리지 마.</strong>
          </p>
        </div>
        <div className="p-3 rounded-lg bg-[#f0eee7] border border-black/[0.05]">
          <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-2">컨셉이 해석을 바꾸는 예시</div>
          <div className="grid grid-cols-2 gap-2 text-[13.5px]">
            <div className="p-2 rounded bg-[#b8862e]/5 border border-[#b8862e]/15">
              <div className="text-[#b8862e] font-medium mb-1">브런치 컨셉</div>
              <div className="text-[#75726c]">"밝게" → 아이보리 린넨 (따뜻한 톤)</div>
            </div>
            <div className="p-2 rounded bg-black/[0.03] border border-black/[0.06]">
              <div className="text-[#55534f] font-medium mb-1">미니멀 컨셉</div>
              <div className="text-[#75726c]">"밝게" → 순백 (깔끔한 톤)</div>
            </div>
          </div>
        </div>
      </div>
    ),
    memory: (
      <div className="space-y-4">
        <p className="text-[15px] text-[#75726c] leading-relaxed">
          카페 직원이 단골을 기억하듯, 에이전트도 구체화 단계에서 고른 선택을 기억합니다.
        </p>
        <div className="p-4 rounded-lg bg-[#f0eee7] border border-black/[0.05]">
          <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-3">MEMORY RULE</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#b8862e]/15 border border-[#b8862e]/30 flex items-center justify-center shrink-0">
                <span className="font-mono text-[#b8862e] text-[11.5px]">3×</span>
              </div>
              <div>
                <div className="text-[#2b2a28] text-sm font-medium">취향으로 승격 조건</div>
                <div className="text-[#75726c] text-[13.5px] mt-0.5">같은 계열의 선택이 3번 쌓이면 취향으로 인정, 다음 방문부터 첫 번째 선택지로 올려줌</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center shrink-0">
                <span className="font-mono text-[#75726c] text-[11.5px]">1×</span>
              </div>
              <div>
                <div className="text-[#2b2a28] text-sm font-medium">단발성 선택</div>
                <div className="text-[#75726c] text-[13.5px] mt-0.5">한 번뿐인 선택은 그날만 쓰고 버림 ("크리스마스 느낌으로"를 취향으로 저장하지 않음)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-blue-500/[0.06] border border-blue-500/15">
          <div className="font-mono text-[11.5px] text-blue-600 tracking-widest mb-1">기억하되, 갇히지 않게</div>
          <p className="text-[14.5px] text-[#75726c]">
            취향이 저장된 뒤에도 선택지에 항상 <strong className="text-[#55534f]">다른 분위기의 옵션</strong>을 하나 섞어둡니다. 취향은 편하라고 있는 기본값이지, 사용자를 가두는 틀이 아닙니다.
          </p>
        </div>
      </div>
    ),
    tools: (
      <div className="space-y-4">
        <p className="text-[15px] text-[#75726c] leading-relaxed">에이전트는 스스로 그림을 그리지 못합니다. 판단을 하고, 프로그램을 부릅니다.</p>
        <div className="space-y-2">
          {[
            { icon: <Zap size={14} />, name: "이미지 편집 모델", desc: "이미지를 실제로 고치는 생성 모델. 크고 비쌈", tag: "HEAVY", tagStyle: "text-[#b8862e] bg-[#b8862e]/10" },
            { icon: <Eye size={14} />, name: "비전 검증 모델", desc: "결과가 요청대로 나왔는지 확인하는 경량 비전 모델", tag: "LIGHT", tagStyle: "text-emerald-600 bg-emerald-500/10" },
            { icon: <CreditCard size={14} />, name: "결제 API", desc: "크레딧을 차감하는 API. 검증 통과 후에만 호출됨", tag: "POST-VERIFY", tagStyle: "text-purple-600 bg-purple-500/10" },
          ].map((tool) => (
            <div key={tool.name} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#f0eee7] border border-black/[0.05]">
              <div className="text-[#75726c] mt-0.5">{tool.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[#2b2a28] text-sm font-medium">{tool.name}</span>
                  <span className={`font-mono text-[11.5px] px-1.5 py-0.5 rounded ${tool.tagStyle}`}>{tool.tag}</span>
                </div>
                <p className="text-[#75726c] text-[13.5px]">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-[#ffffff] border border-black/[0.06]">
          <p className="text-[13.5px] text-[#75726c]">도구 호출 자체가 실패(무응답·오류)하면 크레딧 차감 없이 처리합니다. 상세 정책은 섹션 05 참고.</p>
        </div>
      </div>
    ),
    eval: (
      <div className="space-y-4">
        <p className="text-[15px] text-[#75726c] leading-relaxed">이 에이전트의 검수는 딱 두 가지를 봅니다.</p>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 rounded-lg bg-emerald-500/[0.05] border border-emerald-500/15">
            <div className="flex items-center gap-2 mb-2">
              <Check size={14} className="text-emerald-600" />
              <span className="text-emerald-600 font-medium text-sm">① 시킨 건 됐나</span>
            </div>
            <p className="text-[14.5px] text-[#75726c]">"나이프 추가해줘"라고 했으면 결과에 나이프가 있는지 확인. 항목별로 하나씩 봅니다.</p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/[0.05] border border-red-500/15">
            <div className="flex items-center gap-2 mb-2">
              <X size={14} className="text-red-600" />
              <span className="text-red-600 font-medium text-sm">② 안 시킨 걸 건드렸나</span>
            </div>
            <p className="text-[14.5px] text-[#75726c]">제품 모양·색이 변하지 않았는지, AI 특유의 결함(손가락 6개 등)이 생기지 않았는지 확인.</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[#b8862e]/5 border border-[#b8862e]/20">
          <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-2">SUCCESS = ① AND ②</div>
          <p className="text-[14.5px] text-[#55534f]">①만 보면 "나이프는 있는데 에그타르트가 찌그러진" 이미지가 통과됩니다. ②만 보면 "제품은 멀쩡한데 나이프를 무시한" 이미지가 통과됩니다. 두 검사를 모두 통과한 것만 성공입니다.</p>
        </div>
      </div>
    ),
    hitl: (
      <div className="space-y-4">
        <p className="text-[15px] text-[#75726c] leading-relaxed">이 에이전트가 반드시 사용자에게 물어보는 지점은 세 곳입니다.</p>
        <div className="space-y-2">
          {[
            { n: "①", when: "실행 전", desc: "요청이 모호하면 해석 선택지를 보여주고 고르게 합니다.", tag: "구체화 칩" },
            { n: "②", when: "실행 후", desc: "재시도까지 했는데도 실패한 항목은 어떻게 할지 사용자가 정합니다.", tag: "이대로 받기 / 재시도 / 취소" },
            { n: "③", when: "위험한 요청", desc: '"제품 색을 바꿔줘"처럼 제품 자체를 바꾸는 요청은 바로 실행하지 않습니다.', tag: "확인 필요" },
          ].map((item) => (
            <div key={item.n} className="flex gap-3 p-3.5 rounded-lg bg-[#f0eee7] border border-black/[0.05]">
              <span className="font-mono text-[#b8862e] text-sm shrink-0 mt-0.5">{item.n}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#2b2a28] text-sm font-medium">{item.when}</span>
                  <Tag variant="blue">{item.tag}</Tag>
                </div>
                <p className="text-[#75726c] text-[13.5px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-[#b8862e]/5 border border-[#b8862e]/20">
          <p className="text-[14.5px] text-[#55534f]">
            <strong>공통 원칙:</strong> <span className="text-[#75726c]">돈(크레딧)이 걸린 결정과 제품이 걸린 결정은 AI가 대신하지 않는다. 자동화는 사용자의 수고를 줄이는 것이지, 결정권을 가져가는 게 아닙니다.</span>
          </p>
        </div>
      </div>
    ),
  };

  return (
    <section id="s4" className="mb-20">
      <SectionHeader num="SECTION 04" title="구성요소 정의" subtitle="에이전트에게 무엇을 쥐여줄 것인가" />

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {S4_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-[13.5px] font-medium whitespace-nowrap transition-all duration-150 ${tab === t.id ? "bg-[#c9992f] text-[#2b2a28]" : "text-[#75726c] hover:text-[#55534f] hover:bg-black/[0.04]"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-lg border border-black/[0.07] bg-[#ffffff] min-h-[280px]">
        {content[tab]}
      </div>
    </section>
  );
}

// ——— SECTION 5 ———
type PolicyRow = { case: string; system: string; visible: string; credit: string; creditType: "none" | "partial" | "normal" | "return" | "delayed" | "na" };

const creditBadge = (type: PolicyRow["creditType"]) => {
  const map: Record<PolicyRow["creditType"], { label: string; cls: string }> = {
    none: { label: "차감 없음", cls: "text-emerald-600 bg-emerald-500/10" },
    partial: { label: "부분 차감", cls: "text-[#b8862e] bg-[#b8862e]/10" },
    normal: { label: "정상 차감", cls: "text-[#75726c] bg-black/5" },
    return: { label: "반환", cls: "text-blue-600 bg-blue-500/10" },
    delayed: { label: "지연 차감", cls: "text-purple-600 bg-purple-500/10" },
    na: { label: "—", cls: "text-[#75726c] bg-transparent" },
  };
  const v = map[type];
  return <span className={`font-mono text-[11.5px] px-1.5 py-0.5 rounded ${v.cls}`}>{v.label}</span>;
};

const S5_CATEGORIES = [
  {
    id: "a", label: "A. 품질 실패", desc: "AI가 일을 못 했을 때",
    rows: [
      { case: "일부 항목만 검증 통과", system: "실패 항목만 자동 재시도 (최대 2회)", visible: '항목별 상태 표시: "그릇 교체 ✓ / 나이프 추가 진행 중"', credit: "이 단계에서는 차감 없음", creditType: "none" },
      { case: "재시도에도 일부 실패", system: "성공분만 반영된 결과 + 선택지 제시", visible: '"3개 중 2개 반영됐어요. ① 이대로 받기 ② 다시 시도 ③ 취소"', credit: "① 부분 차감 ② 추가 차감 없음 ③ 차감 없음", creditType: "partial" },
      { case: "전 항목 실패", system: "결과를 전달하지 않고 종료", visible: '"이번 수정은 반영에 실패했어요. 크레딧은 차감되지 않았습니다"', credit: "차감 없음", creditType: "none" },
      { case: "검증 AI의 오판", system: "'결과가 달라요' 버튼 → 크레딧 반환 + 개선 데이터로 적재", visible: "결과 화면에 상시 노출되는 '결과가 달라요' 버튼", credit: "반환", creditType: "return" },
    ] as PolicyRow[],
  },
  {
    id: "b", label: "B. 요청 문제", desc: "입력이 애매하거나 위험할 때",
    rows: [
      { case: "모호한 항목", system: "실행 보류, 구체화 칩 제시", visible: '"\'밝게\'를 이 중에서 골라주세요: 아이보리 린넨 / 순백 / 라이트 그레이"', credit: "차감 없음", creditType: "none" },
      { case: "구체화 칩 건너뜀", system: "AI 추천안(1순위)으로 실행 + 해석 표시", visible: '"테이블보는 \'아이보리 린넨\'으로 해석해 반영했어요"', credit: "정상 차감 (검증 통과 시)", creditType: "normal" },
      { case: "항목 충돌", system: "실행 보류, 우선순위 질문", visible: '"두 요청이 서로 반대돼요. 어느 쪽을 우선할까요?"', credit: "차감 없음", creditType: "none" },
      { case: "제품 자체 변경 요청", system: "경고 후 의사 확인", visible: '"실제 판매 상품과 달라질 수 있어요. 그래도 진행할까요?"', credit: "동의 시에만 정상 차감", creditType: "normal" },
      { case: "지원 범위 밖 요청", system: "실행하지 않고 사유 안내", visible: '"이 요청은 아직 지원하지 않아요" + 지원 가능한 유형 안내', credit: "차감 없음", creditType: "none" },
    ] as PolicyRow[],
  },
  {
    id: "c", label: "C. 시스템 장애", desc: "도구가 실패하거나 흐름이 끊겼을 때",
    rows: [
      { case: "편집 모델 호출 실패", system: "자동 재호출 1회 → 실패 시 중단", visible: '"일시적인 오류예요. 잠시 후 다시 시도해주세요"', credit: "차감 없음", creditType: "none" },
      { case: "검증 모델 호출 실패", system: "검증 없이 전달하지 않음. '검증 대기' 상태로 보관", visible: '"결과 확인이 지연되고 있어요. 완료되면 알려드릴게요"', credit: "검증 완료 후 차감", creditType: "delayed" },
      { case: "크레딧 차감 실패 (이미지 전달됨)", system: "백그라운드 재시도, 사용자 흐름은 막지 않음", visible: "정상 완료로 보임", credit: "지연 차감 (내부 재처리)", creditType: "delayed" },
      { case: "이미지 전달 실패 (차감됨)", system: "전달 재시도 → 실패 시 크레딧 자동 복구", visible: '"오류가 발생해 크레딧을 돌려드렸어요"', credit: "자동 반환", creditType: "return" },
      { case: "크레딧 잔액 부족", system: "실행 전 차단 (실행 후 발견 없어야 함)", visible: '요청 입력 시 "크레딧이 부족해요" + 충전 안내', credit: "—", creditType: "na" },
      { case: "진행 중 이탈", system: "서버 기준으로 계속 진행, 완료 결과 보관", visible: '재접속 시 "진행 중이던 수정이 완료됐어요" 알림', credit: "검증 통과분만 정상 차감", creditType: "normal" },
    ] as PolicyRow[],
  },
];

function Section5() {
  const [cat, setCat] = useState("a");
  const current = S5_CATEGORIES.find((c) => c.id === cat)!;

  return (
    <section id="s5" className="mb-20">
      <SectionHeader num="SECTION 05" title="정책·예외 케이스" subtitle="틀리면 어떻게 되는가" />

      <div className="p-4 rounded-lg bg-[#b8862e]/5 border border-[#b8862e]/20 mb-6">
        <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-1">PRINCIPLE</div>
        <p className="text-[15px] text-[#2b2a28]">비용은 성공한 결과에만 발생한다.</p>
      </div>

      <div className="flex gap-1 mb-5">
        {S5_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`px-3 py-2 rounded-md text-[13.5px] font-medium transition-all duration-150 ${cat === c.id ? "bg-[#f0eee7] text-[#2b2a28] border border-black/10" : "text-[#75726c] hover:text-[#55534f]"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="text-[13.5px] text-[#75726c] mb-4 font-mono">{current.desc}</div>

      <div className="overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="border-b border-black/[0.07]">
              {["케이스", "시스템 동작", "사용자에게 보이는 것", "크레딧"].map((h) => (
                <th key={h} className="text-left py-2.5 px-3 font-mono text-[11.5px] text-[#75726c] tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.rows.map((row, i) => (
              <tr key={i} className="border-b border-black/[0.04] hover:bg-black/[0.015] transition-colors">
                <td className="py-3 px-3 text-[#2b2a28] font-medium align-top whitespace-nowrap">{row.case}</td>
                <td className="py-3 px-3 text-[#75726c] align-top leading-relaxed">{row.system}</td>
                <td className="py-3 px-3 text-[#75726c] align-top leading-relaxed italic">{row.visible}</td>
                <td className="py-3 px-3 align-top">{creditBadge(row.creditType as PolicyRow["creditType"])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-2">
        <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-3">4가지 관통 원칙</div>
        {[
          "실행 전에 막을 수 있는 문제는 실행 전에 막는다.",
          "제품의 실패 비용을 사용자에게 넘기지 않는다.",
          "검증 AI도 틀릴 수 있음을 인정한다.",
          "작업의 기준은 화면이 아니라 서버다.",
        ].map((rule, i) => (
          <div key={i} className="flex gap-3 items-start py-2 border-b border-black/[0.04]">
            <span className="font-mono text-[#b8862e] text-[12.5px] shrink-0 mt-0.5">{i + 1}.</span>
            <span className="text-[14.5px] text-[#55534f]">{rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ——— SECTION 6 ———
const SCREENS = [
  {
    id: 1,
    title: "화면 1 — 수정 요청 입력",
    subtitle: "내 요청이 어떻게 이해됐는지 보인다",
    states: [
      { label: "명확", desc: "즉시 실행 가능", variant: "green" as const },
      { label: "모호", desc: "선택 대기", variant: "amber" as const },
      { label: "충돌", desc: "우선순위 질문", variant: "red" as const },
      { label: "제품 변경", desc: "경고 확인 대기", variant: "red" as const },
    ],
    mockup: (
      <div className="p-4 rounded-lg bg-[#faf8f4] border border-black/10 text-[13.5px] space-y-3">
        <div className="text-[#75726c] font-mono text-[11.5px] tracking-widest mb-2">EDIT REQUEST INPUT</div>
        <div className="p-3 rounded bg-[#f0eee7] border border-black/[0.06] text-[#55534f] italic">
          "그릇은 모던하게, 테이블보는 밝게, 나이프 추가해줘"
        </div>
        <div className="text-[#75726c] text-[12.5px]">→ 요청 분해 결과:</div>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f0eee7] border border-black/10 text-[#55534f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#75726c]" /> 그릇 교체
            <span className="text-[11.5px] text-[#b8862e] font-mono ml-1">?</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f0eee7] border border-black/10 text-[#55534f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#75726c]" /> 테이블보 변경
            <span className="text-[11.5px] text-[#b8862e] font-mono ml-1">?</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600">
            <Check size={10} /> 나이프 추가
          </span>
        </div>
        <div className="p-2.5 rounded bg-[#b8862e]/5 border border-[#b8862e]/15 text-[#75726c]">
          <div className="text-[#b8862e] text-[11.5px] font-mono mb-1">"테이블보를 밝게"란?</div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {["아이보리 린넨", "순백", "라이트 그레이", "직접 입력"].map((opt) => (
              <span key={opt} className="px-2 py-1 rounded border border-black/10 bg-black/[0.03] text-[#55534f] cursor-pointer hover:border-[#b8862e]/40 hover:text-[#b8862e] transition-colors">{opt}</span>
            ))}
          </div>
        </div>
        <button className="w-full py-2 rounded bg-[#f0eee7] border border-black/[0.06] text-[#75726c] text-[12.5px] cursor-not-allowed">
          모든 항목이 확정되면 실행 활성화됩니다
        </button>
      </div>
    ),
  },
  {
    id: 2,
    title: "화면 2 — 진행 상태",
    subtitle: "에이전트가 지금 뭘 하고 있는지 보인다",
    states: [
      { label: "실행 중", desc: "", variant: "blue" as const },
      { label: "검증 중", desc: "", variant: "amber" as const },
      { label: "완료", desc: "", variant: "green" as const },
      { label: "재시도 중(n/2)", desc: "", variant: "amber" as const },
      { label: "실패", desc: "", variant: "red" as const },
    ],
    mockup: (
      <div className="p-4 rounded-lg bg-[#faf8f4] border border-black/10 text-[13.5px] space-y-3">
        <div className="text-[#75726c] font-mono text-[11.5px] tracking-widest mb-2">PROGRESS</div>
        {[
          { label: "그릇 교체", status: "완료", icon: <Check size={11} />, cls: "text-emerald-600 bg-emerald-500/10" },
          { label: "테이블보 변경", status: "완료", icon: <Check size={11} />, cls: "text-emerald-600 bg-emerald-500/10" },
          { label: "나이프 추가", status: "재시도 중 (1/2)", icon: <RefreshCw size={11} className="animate-spin" />, cls: "text-[#b8862e] bg-[#b8862e]/10" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between p-2.5 rounded bg-[#f0eee7] border border-black/[0.05]">
            <span className="text-[#55534f]">{item.label}</span>
            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[12.5px] font-mono ${item.cls}`}>
              {item.icon} {item.status}
            </span>
          </div>
        ))}
        <div className="p-2.5 rounded bg-[#f0eee7] border border-black/[0.04] text-[#75726c] text-[12.5px] text-center animate-pulse">
          결과를 확인하고 있어요...
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "화면 3 — 결과·부분 실패",
    subtitle: "무엇이 됐고 무엇이 안 됐는지 보인다",
    states: [
      { label: "전체 성공", desc: "", variant: "green" as const },
      { label: "부분 실패(선택 대기)", desc: "", variant: "amber" as const },
      { label: "사용자 확정", desc: "", variant: "default" as const },
      { label: "이의 접수", desc: "", variant: "blue" as const },
    ],
    mockup: (
      <div className="p-4 rounded-lg bg-[#faf8f4] border border-black/10 text-[13.5px] space-y-3">
        <div className="text-[#75726c] font-mono text-[11.5px] tracking-widest mb-2">RESULT — PARTIAL FAILURE</div>
        <div className="p-3 rounded bg-[#f0eee7] border border-black/[0.06]">
          <div className="text-[#b8862e] text-[12.5px] font-mono mb-2">3개 중 2개가 반영됐어요</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-600"><Check size={11} /> 그릇 교체</div>
            <div className="flex items-center gap-2 text-emerald-600"><Check size={11} /> 테이블보 변경</div>
            <div className="flex items-center gap-2 text-red-600"><X size={11} /> 나이프 추가 (실패)</div>
          </div>
        </div>
        <div className="space-y-1.5">
          <button className="w-full py-2 px-3 rounded border border-black/10 bg-[#f0eee7] text-left text-[#55534f] hover:border-[#b8862e]/30 transition-colors flex justify-between items-center">
            <span>이대로 받기</span>
            <Tag variant="amber">크레딧 2/3 차감</Tag>
          </button>
          <button className="w-full py-2 px-3 rounded border border-black/10 bg-[#f0eee7] text-left text-[#55534f] hover:border-emerald-500/30 transition-colors flex justify-between items-center">
            <span>실패 항목만 다시 시도</span>
            <Tag variant="green">추가 차감 없음</Tag>
          </button>
          <button className="w-full py-2 px-3 rounded border border-black/10 bg-[#f0eee7] text-left text-[#55534f] hover:border-black/20 transition-colors flex justify-between items-center">
            <span>취소</span>
            <Tag variant="muted">차감 없음</Tag>
          </button>
        </div>
        <button className="w-full text-center text-[#75726c] hover:text-[#55534f] text-[12.5px] border-t border-black/[0.04] pt-2 transition-colors">
          결과가 달라요 →
        </button>
      </div>
    ),
  },
];

function Section6() {
  const [screen, setScreen] = useState(1);
  const current = SCREENS.find((s) => s.id === screen)!;

  return (
    <section id="s6" className="mb-20">
      <SectionHeader num="SECTION 06" title="화면 설계" subtitle="사용자 눈에는 어떻게 보이는가" />

      <p className="text-[15px] text-[#75726c] leading-relaxed mb-6">
        에이전트가 아무리 잘 일해도, 사용자가 보는 건 화면뿐입니다. 지금의 ModoAI는 중간이 보이지 않습니다. 이 에이전트는 <strong className="text-[#55534f]">중간을 보여줍니다.</strong>
      </p>

      <div className="flex gap-1 mb-6">
        {SCREENS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className={`flex-1 py-2.5 px-3 rounded-md text-[13.5px] font-medium transition-all duration-150 text-center ${screen === s.id ? "bg-[#f0eee7] text-[#2b2a28] border border-black/10" : "text-[#75726c] hover:text-[#55534f]"}`}
          >
            화면 {s.id}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-lg border border-black/[0.07] bg-[#ffffff]">
        <div className="font-mono text-[11.5px] text-[#b8862e] tracking-widest mb-1">{`SCREEN ${current.id}`}</div>
        <h3 className="text-[#2b2a28] font-medium mb-0.5">{current.title}</h3>
        <p className="text-[13.5px] text-[#75726c] mb-4">{current.subtitle}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {current.states.map((s) => (
            <Tag key={s.label} variant={s.variant}>{s.label}</Tag>
          ))}
        </div>

        {current.mockup}

        <div className="mt-4 p-3 rounded bg-[#f0eee7] border border-black/[0.05]">
          <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-1">설계 의도</div>
          <p className="text-[13.5px] text-[#75726c]">
            {current.id === 1 && "실행 버튼은 모든 칩이 확정 상태가 되어야 활성화됩니다. 크레딧이 쓰이기 전에 해석을 확정 짓는 구조를 화면으로 강제합니다."}
            {current.id === 2 && "재시도가 몇 번째인지(1/2)까지 보여주는 이유는 기다림에 근거를 주기 위해서입니다. 사용자가 창을 닫아도 이 상태는 서버에 남아 재접속 시 복원됩니다."}
            {current.id === 3 && '실패를 숨기지 않고 선택지로 바꾸는 것. "안 됐다"로 끝나면 불만이지만, "여기까지 됐고, 다음은 당신이 정한다"면 통제감이 됩니다.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// ——— SECTION 7 ———
const S7_ITEMS = [
  {
    num: "①",
    title: "검사는 가벼운 모델에게, 생성은 무거운 모델에게",
    body: "이미지를 만드는 데는 크고 비싼 생성 모델이 필요하지만, 결과를 확인하는 데는 작고 저렴한 비전 모델로 충분합니다. 검증 비용이 충분히 싸지면, 검사를 여러 번 해서 비싼 재생성 한 번을 막는 쪽이 이득입니다. 요청 분해와 모호성 판정도 같은 논리로 경량 모델에게 맡깁니다.",
    chips: [
      { label: "요청 분해·판정", tag: "경량 LM" },
      { label: "이미지 생성", tag: "Heavy Gen" },
      { label: "결과 검증", tag: "Light Vision" },
    ],
  },
  {
    num: "②",
    title: "재시도 상한은 2회",
    body: "재시도 비용은 회사가 부담합니다. 상한을 2회로 정한 근거는 확률입니다. 2차까지 실패한 항목은 모델이 그 요청 자체를 처리하지 못할 가능성이 높습니다. 3차부터는 비용만 쓰고 결과는 같을 공산이 큽니다. 상한 값은 출시 후 '재시도 회차별 성공률' 데이터를 보고 재조정합니다.",
    chips: [],
  },
  {
    num: "③",
    title: "실시간과 배치의 구분",
    body: "사용자가 화면 앞에서 기다리는 일(요청 분해, 실행, 검증)은 실시간. 기다리는 사람이 없는 일(오판 사례 학습, 취향 Memory 갱신, 실패 유형 분석)은 배치로 돌립니다.",
    chips: [
      { label: "요청 분해·실행·검증", tag: "실시간" },
      { label: "오판 학습·Memory 갱신", tag: "배치" },
    ],
  },
  {
    num: "④",
    title: "돈이 새는지 지켜보는 계기판",
    body: "결과 1건당 평균 호출 수. 이 숫자가 커지면 어딘가에서 비용이 새고 있다는 뜻입니다. 모호성 판정 기준을 조이거나 재시도 상한을 낮추라는 신호로 읽습니다. 사용자 지표(섹션 02)와 원가 지표를 같은 대시보드에서 봅니다.",
    chips: [],
  },
];

function Section7() {
  const [open, setOpen] = useState<string | null>("①");

  return (
    <section id="s7" className="mb-20">
      <SectionHeader num="SECTION 07" title="원가·운영 관점" subtitle="이걸 돌리면 돈이 얼마나 드는가" />

      <p className="text-[15px] text-[#75726c] leading-relaxed mb-6">
        AI는 부를 때마다 회사가 비용을 냅니다. 어디에 돈을 쓰고 어디서 아낄지를 함께 정하지 않으면 이 기획은 완성이 아닙니다.
      </p>

      <div className="space-y-2">
        {S7_ITEMS.map((item) => {
          const isOpen = open === item.num;
          return (
            <div key={item.num} className={`rounded-lg border transition-colors duration-200 ${isOpen ? "border-[#b8862e]/25 bg-[#b8862e]/[0.03]" : "border-black/[0.06] bg-[#ffffff]"}`}>
              <button
                onClick={() => setOpen(isOpen ? null : item.num)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <span className="font-mono text-[#b8862e] text-sm shrink-0">{item.num}</span>
                <span className="text-[#2b2a28] text-sm font-medium flex-1">{item.title}</span>
                <ChevronDown size={14} className={`text-[#75726c] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-[14.5px] text-[#75726c] leading-relaxed">{item.body}</p>
                  {item.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <div key={chip.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0eee7] border border-black/[0.07]">
                          <span className="text-[#55534f] text-[13.5px]">{chip.label}</span>
                          <span className="font-mono text-[11.5px] text-[#b8862e]">→ {chip.tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ——— APPENDIX ———
function SectionAppendix() {
  return (
    <section id="sa" className="mb-20">
      <SectionHeader num="부록" title="그 외 관찰한 UX 개선점" />
      <div className="p-5 rounded-lg border border-black/[0.07] bg-[#ffffff]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#b8862e]/10 border border-[#b8862e]/20 shrink-0 mt-0.5">
            <Eye size={14} className="text-[#b8862e]" />
          </div>
          <div>
            <div className="text-[#2b2a28] font-medium text-sm mb-1">생성 비율 미리보기</div>
            <p className="text-[14.5px] text-[#75726c] leading-relaxed">
              생성 비율(4:5, 1:1 등) 선택 시 숫자만으로는 결과물의 형태를 체감하기 어렵습니다. 비율을 탭하면 미리보기 프레임이 해당 비율로 바뀌어 보이는 방식이면, 생성 전에 결과의 쓰임새(피드용, 썸네일용)를 판단하기 쉬워질 것입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ——— MAIN ———
export default function App() {
  const [activeSection, setActiveSection] = useState("s1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0px -70% 0px",
    });
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] font-['Inter',sans-serif] text-[#2b2a28]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.06] bg-[#faf8f4]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-[#75726c] hover:text-[#2b2a28] transition-colors"
            >
              <div className="space-y-1">
                <div className="w-4 h-px bg-current" />
                <div className="w-4 h-px bg-current" />
                <div className="w-4 h-px bg-current" />
              </div>
            </button>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[#b8862e] text-[12.5px] tracking-widest">MODOAI</span>
              <span className="text-[#75726c] text-[12.5px]">/</span>
              <span className="text-[#75726c] text-[12.5px]">수정 에이전트 PRD</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tag variant="amber">v2 · 완성본</Tag>
            <Tag variant="muted">섹션 1–7</Tag>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto pt-12 flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-12 h-[calc(100vh-3rem)] w-56 shrink-0 border-r border-black/[0.05] bg-[#faf8f4] flex flex-col z-40 transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-0.5">
            <div className="font-mono text-[10.5px] text-[#75726c] tracking-[0.15em] px-3 mb-3">목차</div>
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] transition-all duration-150 ${isActive ? "bg-[#b8862e]/10 text-[#b8862e]" : "text-[#75726c] hover:text-[#55534f] hover:bg-black/[0.03]"}`}
                >
                  <span className="font-mono text-[11.5px] shrink-0 opacity-60">{s.num}</span>
                  <span>{s.title}</span>
                  {isActive && <ChevronRight size={10} className="ml-auto" />}
                </button>
              );
            })}
          </div>
          <div className="p-4 border-t border-black/[0.05]">
            <div className="text-[12.5px] text-[#75726c]">변세영</div>
            <div className="font-mono text-[11.5px] text-[#75726c]/60">유니드컴즈 · AI Native</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-8 lg:px-12 py-12 max-w-3xl">
          {/* Hero */}
          <div className="mb-16">
            <div className="font-mono text-[11.5px] text-[#75726c] tracking-widest mb-4">PRODUCT REQUIREMENTS DOCUMENT</div>
            <h1 className="text-3xl font-medium text-[#2b2a28] leading-tight mb-3">ModoAI 수정 에이전트 설계</h1>
            <p className="text-[#75726c] text-sm leading-relaxed mb-6">
              모호한 수정 요청을 실행 전에 구체화하고, 실행 후에는 해석이 의도와 맞았는지 제품이 스스로 검증하는 에이전트를 설계합니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag variant="amber">AI Native Product</Tag>
              <Tag variant="muted">포트폴리오</Tag>
              <Tag variant="muted">섹션 1–7 확정</Tag>
            </div>
          </div>

          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section7 />
          <SectionAppendix />

          {/* Back to top */}
          <div className="flex justify-center pt-8 border-t border-black/[0.05]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-[#75726c] hover:text-[#2b2a28] text-[13.5px] font-mono transition-colors"
            >
              <ArrowUp size={12} /> 맨 위로
            </button>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>{`
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
