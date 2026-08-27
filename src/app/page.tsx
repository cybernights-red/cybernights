import LatestWriteups from "./LatestWriteups";
import Navigation from "./Navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#e8dfc8]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8 md:px-16">
        {/* Navigation */}
        <Navigation />

        {/* Hero */}
        <section className="flex flex-1 flex-col justify-center py-24">
          <div className="mb-5 font-mono text-xs tracking-[0.3em] text-[#d68a3a]">
            OFFENSIVE SECURITY // AI // RF
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.05em] text-[#f1eadb] sm:text-6xl md:text-8xl">
            CYBER
            <span className="text-[#d68a3a]">NIGHTS</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#99958c]">
            Experimental systems and independent research at the intersection of
            offensive security, artificial intelligence and radio frequency
            technology.
          </p>

          {/* System status */}
          <div className="system-panel mt-14 max-w-xl border border-[#d68a3a]/30 bg-[#0d0c0a] p-6 font-mono text-sm">
            <div className="mb-5 text-xs tracking-[0.3em] text-[#6f6b63]">
              SYSTEM STATUS
            </div>

            <div className="space-y-3">
              <Status name="LUNAR CORE" status="ONLINE" />
              <Status name="G1 INTERFACE" status="DEVELOPMENT" />
              <Status name="RF NODE" status="ONLINE" />
              <Status name="OSINTRECON" status="DEVELOPMENT" />
            </div>

            <div className="mt-6 border-t border-[#d68a3a]/20 pt-4 text-[#d68a3a]">
              &gt; SYSTEM READY<span className="terminal-cursor">_</span>
            </div>
          </div>
        </section>
        {/* Projects */}
        <section id="projects" className="border-t border-[#d68a3a]/20 py-24">
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
              PROJECTS // 001
            </div>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#f1eadb] md:text-6xl">
              ACTIVE SYSTEMS
            </h2>

            <p className="mt-5 max-w-2xl text-[#8f8a80]">
              Experimental systems built across offensive security, artificial
              intelligence, wearable computing and radio frequency research.
            </p>
          </div>

          <div className="space-y-6">
            {/* Lunar */}
            <Project
              number="01"
              type="FEATURED SYSTEM"
              title="LUNAR"
              subtitle="LOCAL AI SECURITY SYSTEM"
              description="A local AI platform designed to support offensive-security research, reconnaissance, analysis and security automation."
              status="ACTIVE DEVELOPMENT"
              tags={["LOCAL AI", "SECURITY", "AUTOMATION", "RECON"]}
              href="/projects/lunar"
            />

            {/* G1 */}
            <Project
              number="02"
              type="WEARABLE SYSTEM"
              title="G1 // LUNAR"
              subtitle="WEARABLE AI INTERFACE"
              description="An experimental wearable interface connecting Even G1 smart glasses to the Lunar platform for heads-up information and AI interaction."
              status="DEVELOPMENT"
              tags={["G1", "BLE", "AI", "WEARABLE"]}
            />

            {/* RF Node */}
            <Project
              number="03"
              type="RF SYSTEM"
              title="RF NODE"
              subtitle="REMOTE SOFTWARE-DEFINED RADIO"
              description="A remotely accessible Raspberry Pi and SDR platform for radio-frequency experimentation, signal analysis and satellite research."
              status="ONLINE"
              tags={["SDR", "RF", "RASPBERRY PI", "SATELLITE"]}
            />
          </div>
        </section>
        {/* Research */}
        <section id="research" className="border-t border-[#d68a3a]/20 py-24">
          <div className="mb-16">
            <div className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
              RESEARCH // 002
            </div>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#f1eadb] md:text-6xl">
              RESEARCH CHANNELS
            </h2>

            <p className="mt-5 max-w-2xl text-[#8f8a80]">
              Current areas of experimentation and technical research across AI
              security, offensive security and radio-frequency systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ResearchCard
              code="001"
              title="AI SECURITY"
              description="Research into local AI systems, agentic security, LLM attack surfaces, tool use, RAG security and offensive applications of artificial intelligence."
              status="ACTIVE"
              topics={["LLM SECURITY", "AGENTS", "RAG", "AI RED TEAMING"]}
            />

            <ResearchCard
              code="002"
              title="OFFENSIVE SECURITY"
              description="Technical research across web applications, APIs, Active Directory, cloud environments and security automation."
              status="ACTIVE"
              topics={["WEB", "API", "AD", "CLOUD"]}
            />

            <ResearchCard
              code="003"
              title="RF // SIGNALS"
              description="Experimentation with software-defined radio, satellite communications, signal analysis and remote RF infrastructure."
              status="ACTIVE"
              topics={["SDR", "RF", "SATELLITE", "SIGNALS"]}
            />
          </div>
        </section>

        <LatestWriteups />
        {/* About */}
        <section id="about" className="border-t border-[#d68a3a]/20 py-24">
          <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
                ABOUT // 004
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#f1eadb] md:text-6xl">
                CYBERNIGHTS
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#99958c]">
                CyberNights is an independent security research and experimental
                systems project focused on offensive security, artificial
                intelligence and radio-frequency technology.
              </p>

              <p className="mt-6 max-w-2xl leading-8 text-[#8f8a80]">
                The site documents technical research, security labs, tooling
                and systems being developed around local AI, authorised security
                testing, wearable computing and RF experimentation.
              </p>

              <p className="mt-6 max-w-2xl leading-8 text-[#8f8a80]">
                The emphasis is on practical experimentation, evidence-driven
                investigation and building systems that can be understood,
                tested and improved over time.
              </p>
            </div>

            <div className="border border-[#d68a3a]/20 bg-[#0a0908] p-7">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#5f5b54]">
                OPERATOR PROFILE
              </p>

              <div className="mt-7 space-y-5 font-mono text-xs">
                <ProfileRow label="FOCUS" value="OFFENSIVE SECURITY" />
                <ProfileRow label="AI" value="LOCAL / AGENTIC SYSTEMS" />
                <ProfileRow label="RF" value="SDR / SIGNAL RESEARCH" />
                <ProfileRow label="PROJECT" value="LUNAR" />
                <ProfileRow label="STATUS" value="ACTIVE RESEARCH" />
              </div>

              <div className="mt-8 border-t border-[#d68a3a]/10 pt-6">
                <p className="font-mono text-[10px] leading-6 tracking-[0.15em] text-[#6f6b63]">
                  BUILD // TEST // DOCUMENT
                  <br />
                  LOCAL-FIRST // OPERATOR CONTROLLED
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="flex justify-between border-t border-[#d68a3a]/20 py-6 font-mono text-[10px] tracking-[0.25em] text-[#5f5b54]">
          <span>CYBERNIGHTS // 2026</span>
          <span>NODE: AU-MEL</span>
        </footer>
      </div>
    </main>
  );
}

function Status({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#8f8a80]">{name}</span>
      <span className="text-[#d68a3a]">{status}</span>
    </div>
  );
}

function Project({
  number,
  type,
  title,
  subtitle,
  description,
  status,
  tags,
  href,
}: {
  number: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  tags: string[];
  href?: string;
}) {
  return (
    <article className="group border border-[#d68a3a]/20 bg-[#0a0908] transition duration-300 hover:-translate-y-1 hover:border-[#d68a3a]/60 hover:shadow-[0_0_30px_rgba(214,138,58,0.06)]">
      <div className="grid md:grid-cols-[140px_1fr_220px]">
        <div className="border-b border-[#d68a3a]/20 p-6 md:border-b-0 md:border-r">
          <div className="font-mono text-4xl text-[#d68a3a]">{number}</div>

          <div className="mt-3 font-mono text-[10px] tracking-[0.25em] text-[#5f5b54]">
            {type}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#d68a3a]">
            {subtitle}
          </div>

          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#f1eadb] md:text-4xl">
            {title}
          </h3>

          <p className="mt-5 max-w-2xl leading-7 text-[#8f8a80]">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#d68a3a]/20 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-[#6f6b63]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-[#d68a3a]/20 p-6 md:border-l md:border-t-0">
          <div>
            <div className="font-mono text-[9px] tracking-[0.3em] text-[#5f5b54]">
              STATUS
            </div>

            <div className="mt-2 font-mono text-xs text-[#d68a3a]">
              ● {status}
            </div>
          </div>

          {href ? (
            <a
              href={href}
              className="mt-8 font-mono text-xs tracking-[0.2em] text-[#8f8a80] transition group-hover:text-[#d68a3a]"
            >
              VIEW SYSTEM →
            </a>
          ) : (
            <div className="mt-8 font-mono text-xs tracking-[0.2em] text-[#5f5b54]">
              SYSTEM LOG PENDING
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ResearchCard({
  code,
  title,
  description,
  status,
  topics,
}: {
  code: string;
  title: string;
  description: string;
  status: string;
  topics: string[];
}) {
  return (
    <article className="group border border-[#d68a3a]/20 bg-[#0a0908] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d68a3a]/60 hover:shadow-[0_0_30px_rgba(214,138,58,0.06)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#5f5b54]">
          CHANNEL // {code}
        </span>

        <span className="font-mono text-[9px] tracking-[0.2em] text-[#d68a3a]">
          ● {status}
        </span>
      </div>

      <h3 className="mt-8 text-3xl font-semibold tracking-[-0.03em] text-[#f1eadb]">
        {title}
      </h3>

      <p className="mt-5 min-h-28 leading-7 text-[#8f8a80]">{description}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span
            key={topic}
            className="border border-[#d68a3a]/20 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[#6f6b63]"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-10 border-t border-[#d68a3a]/10 pt-5 font-mono text-[10px] tracking-[0.2em] text-[#5f5b54] transition group-hover:text-[#d68a3a]">
        RESEARCH LOG PENDING
      </div>
    </article>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#d68a3a]/10 pb-3">
      <span className="text-[#5f5b54]">{label}</span>
      <span className="text-[#d68a3a]">{value}</span>
    </div>
  );
}
