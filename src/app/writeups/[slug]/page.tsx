import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type WriteupPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WriteupPage({ params }: WriteupPageProps) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content",
    "writeups",
    slug,
    "index.md",
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const tags = Array.isArray(data.tags) ? data.tags : [];

  return (
    <main className="min-h-screen bg-[#070706] text-[#e9e3d8]">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <nav className="flex items-center justify-between border-b border-[#d68a3a]/20 pb-6">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.35em] text-[#d68a3a]"
          >
            CYBERNIGHTS
          </Link>

          <Link
            href="/#research"
            className="font-mono text-[10px] tracking-[0.2em] text-[#6f6b63] transition hover:text-[#d68a3a]"
          >
            RETURN // HOME
          </Link>
        </nav>

        <article className="mx-auto max-w-3xl py-20">
          <header className="border-b border-[#d68a3a]/20 pb-12">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.25em]">
              <span className="text-[#d68a3a]">
                WRITEUP // {String(data.category ?? "FIELD NOTE").toUpperCase()}
              </span>

              <span className="text-[#4f4b45]">{data.date ?? ""}</span>

              <span className="text-[#4f4b45]">{data.status ?? ""}</span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.05em] text-[#f1eadb] md:text-7xl">
              {data.title ?? slug}
            </h1>

            {data.description && (
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#8f8a80]">
                {data.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-[#d68a3a]/20 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-[#777168]"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mt-14 text-[15px] leading-8 text-[#aaa399]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="mb-6 mt-14 text-3xl font-semibold tracking-tight text-[#f1eadb]">
                    {children}
                  </h2>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-5 mt-12 text-2xl font-semibold text-[#f1eadb]">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-4 mt-10 text-xl font-semibold text-[#d7d0c5]">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="my-5 leading-8">{children}</p>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#d68a3a] underline decoration-[#d68a3a]/30 underline-offset-4"
                  >
                    {children}
                  </a>
                ),

                img: ({ src, alt }) => {
                  const originalSrc = String(src ?? "");

                  const imageSrc = originalSrc.startsWith("/writeups/")
                    ? originalSrc
                    : `/writeups/${slug}/${originalSrc.replace(/^images\//, "")}`;

                  return (
                    <img
                      src={imageSrc}
                      alt={alt ?? ""}
                      className="my-10 w-full border border-[#d68a3a]/20"
                    />
                  );
                },

                code: ({ children }) => (
                  <code className="font-mono text-sm text-[#d9a066]">
                    {children}
                  </code>
                ),

                pre: ({ children }) => (
                  <pre className="my-8 overflow-x-auto border border-[#d68a3a]/20 bg-[#0a0908] p-6 font-mono text-sm leading-7 text-[#c6b7a2]">
                    {children}
                  </pre>
                ),

                ul: ({ children }) => (
                  <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
                ),

                ol: ({ children }) => (
                  <ol className="my-6 list-decimal space-y-2 pl-6">
                    {children}
                  </ol>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-8 border-l border-[#d68a3a] pl-6 text-[#8f8a80]">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <footer className="mt-20 border-t border-[#d68a3a]/20 pt-8">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#5f5b54]">
              CYBERNIGHTS // FIELD ARCHIVE
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
