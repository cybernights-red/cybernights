export default function LunarPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#e8dfc8]">
      <div className="mx-auto max-w-7xl px-8 py-8 md:px-16">

        {/* Header */}
        <nav className="flex items-center justify-between border-b border-[#d68a3a]/30 pb-6">
          <a
            href="/"
            className="font-mono text-sm tracking-[0.35em] text-[#d68a3a]"
          >
            CYBERNIGHTS
          </a>

          <div className="font-mono text-[10px] tracking-[0.3em] text-[#6f6b63]">
            PROJECT // 001
          </div>
        </nav>

        {/* Hero */}
        <section className="py-24">
          <div className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
            LOCAL AI SECURITY SYSTEM
          </div>

          <h1 className="mt-5 text-6xl font-semibold tracking-[-0.05em] text-[#f1eadb] md:text-8xl">
            LUNAR
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#99958c]">
            An experimental local AI platform designed to support
            offensive-security research, reconnaissance, analysis and
            security automation.
          </p>

          <div className="mt-12 grid gap-px border border-[#d68a3a]/20 bg-[#d68a3a]/20 md:grid-cols-4">
            <Info label="STATUS" value="ACTIVE DEVELOPMENT" />
            <Info label="COMPUTE" value="LOCAL" />
            <Info label="INTERFACE" value="WEB / TERMINAL / G1" />
            <Info label="NODE" value="AU-MEL" />
          </div>
        </section>

        {/* Overview */}
        <section className="border-t border-[#d68a3a]/20 py-24">
          <SectionLabel number="01" title="SYSTEM OVERVIEW" />

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#f1eadb]">
                LOCAL-FIRST AI FOR OFFENSIVE SECURITY
              </h2>

              <p className="mt-6 leading-8 text-[#8f8a80]">
                Lunar is being built as a local-first AI system capable of
                combining language models with security tooling, structured
                workflows and operator-controlled automation.
              </p>

              <p className="mt-5 leading-8 text-[#8f8a80]">
                The goal is to keep sensitive assessment data local while
                allowing the platform to coordinate reconnaissance, analyse
                results and assist with security research.
              </p>
            </div>

            <div className="border border-[#d68a3a]/20 bg-[#0a0908] p-7 font-mono text-xs leading-7">
              <div className="text-[#5f5b54]">SYSTEM PROFILE</div>

              <div className="mt-6 space-y-3">
                <DataRow label="SYSTEM" value="LUNAR" />
                <DataRow label="CLASS" value="AI SECURITY PLATFORM" />
                <DataRow label="EXECUTION" value="LOCAL" />
                <DataRow label="AUTOMATION" value="N8N / MCP" />
                <DataRow label="LLM" value="LOCAL MODEL" />
                <DataRow label="STATE" value="ACTIVE DEVELOPMENT" />
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="border-t border-[#d68a3a]/20 py-24">
          <SectionLabel number="02" title="ARCHITECTURE" />

          <div className="mt-12 overflow-hidden border border-[#d68a3a]/20 bg-[#0a0908] p-8 font-mono text-xs md:p-12">
            <div className="grid gap-6 text-center md:grid-cols-5 md:items-center">

              <ArchitectureNode title="OPERATOR" subtitle="USER INPUT" />

              <Arrow />

              <ArchitectureNode
                title="LUNAR CORE"
                subtitle="ORCHESTRATION"
                highlight
              />

              <Arrow />

              <ArchitectureNode title="SECURITY TOOLS" subtitle="MCP / WORKFLOWS" />

            </div>

            <div className="my-8 flex justify-center text-[#d68a3a]">
              ↓
            </div>

            <div className="grid gap-6 text-center md:grid-cols-5 md:items-center">

              <ArchitectureNode title="LOCAL LLM" subtitle="INFERENCE" />

              <Arrow />

              <ArchitectureNode title="POSTGRES" subtitle="SCAN DATA" />

              <Arrow />

              <ArchitectureNode title="EXTERNAL APIs" subtitle="OPT-IN ONLY" />

            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-t border-[#d68a3a]/20 py-24">
          <SectionLabel number="03" title="CAPABILITIES" />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Capability
              title="ASSET DISCOVERY"
              description="Subdomain and target discovery using integrated reconnaissance tooling."
            />

            <Capability
              title="HTTP DISCOVERY"
              description="Service identification, web endpoint discovery and application metadata collection."
            />

            <Capability
              title="PORT ENUMERATION"
              description="Local network and service discovery integrated into structured scan workflows."
            />

            <Capability
              title="VULNERABILITY DETECTION"
              description="Automated vulnerability checks using operator-controlled security tooling."
            />

            <Capability
              title="AI ANALYSIS"
              description="Local model analysis of reconnaissance, scan results and technical security data."
            />

            <Capability
              title="WORKFLOW AUTOMATION"
              description="Security workflows orchestrated through local automation and MCP-connected tools."
            />
          </div>
        </section>

        {/* Interfaces */}
        <section className="border-t border-[#d68a3a]/20 py-24">
          <SectionLabel number="04" title="INTERFACES" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <InterfaceCard
              code="01"
              title="TERMINAL"
              status="ONLINE"
              description="Primary local operator interface."
            />

            <InterfaceCard
              code="02"
              title="WEB"
              status="DEVELOPMENT"
              description="Browser-based system control and research interface."
            />

            <InterfaceCard
              code="03"
              title="G1"
              status="DEVELOPMENT"
              description="Wearable heads-up interface using Even G1 smart glasses."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="flex justify-between border-t border-[#d68a3a]/20 py-8 font-mono text-[10px] tracking-[0.25em] text-[#5f5b54]">
          <a href="/" className="transition hover:text-[#d68a3a]">
            ← RETURN TO CYBERNIGHTS
          </a>

          <span>LUNAR // 2026</span>
        </footer>

      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0a0908] p-5 font-mono">
      <div className="text-[9px] tracking-[0.3em] text-[#5f5b54]">
        {label}
      </div>

      <div className="mt-2 text-xs text-[#d68a3a]">
        {value}
      </div>
    </div>
  );
}

function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
      {number} // {title}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[#d68a3a]/10 pb-2">
      <span className="text-[#6f6b63]">{label}</span>
      <span className="text-[#d68a3a]">{value}</span>
    </div>
  );
}

function ArchitectureNode({
  title,
  subtitle,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border p-5 ${
        highlight
          ? "border-[#d68a3a] text-[#d68a3a]"
          : "border-[#d68a3a]/20 text-[#8f8a80]"
      }`}
    >
      <div>{title}</div>

      <div className="mt-2 text-[9px] tracking-[0.2em] text-[#5f5b54]">
        {subtitle}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden text-[#d68a3a] md:block">
      →
    </div>
  );
}

function Capability({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#d68a3a]/20 bg-[#0a0908] p-7">
      <div className="font-mono text-xs tracking-[0.25em] text-[#d68a3a]">
        {title}
      </div>

      <p className="mt-4 leading-7 text-[#8f8a80]">
        {description}
      </p>
    </div>
  );
}

function InterfaceCard({
  code,
  title,
  status,
  description,
}: {
  code: string;
  title: string;
  status: string;
  description: string;
}) {
  return (
    <div className="border border-[#d68a3a]/20 bg-[#0a0908] p-7">
      <div className="font-mono text-[10px] tracking-[0.3em] text-[#5f5b54]">
        INTERFACE // {code}
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-[#f1eadb]">
        {title}
      </h3>

      <div className="mt-3 font-mono text-xs text-[#d68a3a]">
        ● {status}
      </div>

      <p className="mt-6 leading-7 text-[#8f8a80]">
        {description}
      </p>
    </div>
  );
}