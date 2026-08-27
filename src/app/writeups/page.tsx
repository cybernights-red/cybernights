import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

type Writeup = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: string;
  tags: string[];
};

function getWriteups(): Writeup[] {
  const writeupsDirectory = path.join(process.cwd(), "content", "writeups");

  if (!fs.existsSync(writeupsDirectory)) {
    return [];
  }

  const directories = fs
    .readdirSync(writeupsDirectory, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory());

  const writeups = directories
    .map((directory) => {
      const slug = directory.name;

      const filePath = path.join(writeupsDirectory, slug, "index.md");

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const file = fs.readFileSync(filePath, "utf8");
      const { data } = matter(file);

      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        category: String(data.category ?? "FIELD NOTE"),
        date: String(data.date ?? ""),
        status: String(data.status ?? "DRAFT"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .filter((writeup): writeup is Writeup => writeup !== null)
    .filter((writeup) => writeup.status.toUpperCase() === "PUBLISHED");

  return writeups.sort((a, b) => b.date.localeCompare(a.date));
}

export default function WriteupsPage() {
  const writeups = getWriteups();

  const sections = [
    "Hack The Box",
    "TryHackMe",
    "Active Directory",
    "Web / API",
    "AI Security",
    "RF / SDR",
    "Other",
  ];

  return (
    <main className="min-h-screen bg-[#070706] text-[#e9e3d8]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <nav className="flex items-center justify-between border-b border-[#d68a3a]/20 pb-6">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]"
          >
            CYBERNIGHTS
          </Link>

          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] text-[#6f6b63] transition hover:text-[#d68a3a]"
          >
            RETURN // HOME
          </Link>
        </nav>

        <header className="py-24">
          <p className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
            WRITEUPS // ARCHIVE
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[#f1eadb] md:text-7xl">
            FIELD NOTES &
            <br />
            TECHNICAL ARCHIVE
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#8f8a80]">
            Technical walkthroughs, research notes and observations from
            security labs, offensive security research and experimental systems.
          </p>

          <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-[#5f5b54]">
            ARCHIVE ENTRIES // {writeups.length}
          </p>
        </header>

        <section className="border-t border-[#d68a3a]/20">
          {writeups.length === 0 ? (
            <div className="py-20">
              <p className="font-mono text-xs tracking-[0.2em] text-[#5f5b54]">
                NO PUBLISHED FIELD LOGS_
              </p>
            </div>
          ) : (
            writeups.map((writeup, index) => (
              <article
                key={writeup.slug}
                className="group border-b border-[#d68a3a]/20 py-12"
              >
                <Link href={`/writeups/${writeup.slug}`} className="block">
                  <div className="grid gap-8 md:grid-cols-[140px_1fr_140px]">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.2em] text-[#5f5b54]">
                        LOG // {String(index + 1).padStart(3, "0")}
                      </p>

                      <p className="mt-3 font-mono text-[10px] tracking-[0.15em] text-[#777168]">
                        {writeup.date}
                      </p>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] tracking-[0.25em] text-[#d68a3a]">
                        {writeup.category.toUpperCase()}
                      </div>

                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#f1eadb] transition group-hover:text-[#d68a3a] md:text-4xl">
                        {writeup.title.toUpperCase()}
                      </h2>

                      <p className="mt-5 max-w-2xl leading-7 text-[#8f8a80]">
                        {writeup.description}
                      </p>

                      {writeup.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {writeup.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-[#d68a3a]/20 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[#666159]"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end md:justify-end">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#5f5b54] transition group-hover:text-[#d68a3a]">
                        READ LOG →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </section>

        <footer className="flex justify-between py-8 font-mono text-[9px] tracking-[0.2em] text-[#4f4b45]">
          <span>CYBERNIGHTS // FIELD ARCHIVE</span>
          <span>LOCAL NODE</span>
        </footer>
      </div>
    </main>
  );
}
