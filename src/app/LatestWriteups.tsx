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
  tags: string[];
};

function getLatestWriteups(): Writeup[] {
  const directory = path.join(process.cwd(), "content", "writeups");

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const filePath = path.join(directory, entry.name, "index.md");

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const file = fs.readFileSync(filePath, "utf8");
      const { data } = matter(file);

      if (String(data.status ?? "").toUpperCase() !== "PUBLISHED") {
        return null;
      }

      return {
        slug: entry.name,
        title: String(data.title ?? entry.name),
        description: String(data.description ?? ""),
        category: String(data.category ?? "FIELD NOTE"),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .filter((item): item is Writeup => item !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
}

export default function LatestWriteups() {
  const writeups = getLatestWriteups();

  if (writeups.length === 0) {
    return null;
  }

  return (
    <section
      id="latest-writeups"
      className="border-t border-[#d68a3a]/20 py-24"
    >
      <div className="mb-14 flex items-end justify-between gap-8">
        <div>
          <p className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]">
            WRITEUPS // 003
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#f1eadb] md:text-6xl">
            LATEST FIELD LOGS
          </h2>

          <p className="mt-5 max-w-2xl text-[#8f8a80]">
            Recent technical walkthroughs, lab notes and security research from
            the CyberNights archive.
          </p>
        </div>

        <Link
          href="/writeups"
          className="hidden font-mono text-[10px] tracking-[0.2em] text-[#6f6b63] transition hover:text-[#d68a3a] md:block"
        >
          VIEW ARCHIVE →
        </Link>
      </div>

      <div className="border-t border-[#d68a3a]/20">
        {writeups.map((writeup) => (
          <Link
            key={writeup.slug}
            href={`/writeups/${writeup.slug}`}
            className="group grid gap-5 border-b border-[#d68a3a]/20 py-8 md:grid-cols-[140px_1fr_auto]"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#5f5b54]">
                {writeup.date}
              </p>

              <p className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[#d68a3a]">
                {writeup.category.toUpperCase()}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#f1eadb] transition group-hover:text-[#d68a3a]">
                {writeup.title.toUpperCase()}
              </h3>

              <p className="mt-3 max-w-2xl leading-7 text-[#8f8a80]">
                {writeup.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 font-mono text-[9px] tracking-[0.15em] text-[#5f5b54]">
                {writeup.tags.map((tag) => (
                  <span key={tag}>{tag.toUpperCase()}</span>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#5f5b54] transition group-hover:text-[#d68a3a]">
                READ LOG →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/writeups"
        className="mt-8 inline-block font-mono text-[10px] tracking-[0.2em] text-[#6f6b63] md:hidden"
      >
        VIEW ARCHIVE →
      </Link>
    </section>
  );
}
