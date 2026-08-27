export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#e8dfc8]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8 md:px-16">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-[#d68a3a]/30 pb-6">
          <div className="font-mono text-sm tracking-[0.35em] text-[#d68a3a]">
            CYBERNIGHTS
          </div>

          <div className="hidden gap-8 font-mono text-xs tracking-widest text-[#8f8a80] md:flex">
            <a href="#projects" className="transition hover:text-[#d68a3a]">
              PROJECTS
            </a>
            <a href="#research" className="transition hover:text-[#d68a3a]">
              RESEARCH
            </a>
            <a href="#writeups" className="transition hover:text-[#d68a3a]">
              WRITEUPS
            </a>
            <a href="#about" className="transition hover:text-[#d68a3a]">
              ABOUT
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-1 flex-col justify-center py-24">
          <div className="mb-5 font-mono text-xs tracking-[0.3em] text-[#d68a3a]">
            OFFENSIVE SECURITY // AI // RF
          </div>

          <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.05em] text-[#f1eadb] md:text-8xl">
            CYBER
            <span className="text-[#d68a3a]">NIGHTS</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#99958c]">
            Experimental systems and independent research at the intersection
            of offensive security, artificial intelligence and radio
            frequency technology.
          </p>

          {/* System status */}
          <div className="mt-14 max-w-xl border border-[#d68a3a]/30 bg-[#0d0c0a] p-6 font-mono text-sm">
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
              &gt; SYSTEM READY_
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