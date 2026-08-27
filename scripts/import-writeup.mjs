import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripNotionId(filename) {
  return filename
    .replace(/\s+[a-f0-9]{32}(?=\.md$)/i, "")
    .replace(/\.md$/i, "");
}

function findMarkdownFile(exportFolder) {
  const entries = fs.readdirSync(exportFolder, {
    withFileTypes: true,
  });

  const markdownFiles = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.toLowerCase().endsWith(".md"));

  if (markdownFiles.length === 0) {
    throw new Error(
      "No Markdown file was found in the selected Notion export folder.",
    );
  }

  if (markdownFiles.length > 1) {
    console.log();
    console.log("Multiple Markdown files were found:");

    markdownFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}`);
    });

    throw new Error(
      "This importer currently expects one root Markdown file per export.",
    );
  }

  return markdownFiles[0].name;
}

function copyAssets(sourceFolder, destinationFolder) {
  if (!fs.existsSync(sourceFolder)) {
    return [];
  }

  fs.mkdirSync(destinationFolder, {
    recursive: true,
  });

  const copied = [];

  for (const entry of fs.readdirSync(sourceFolder, {
    withFileTypes: true,
  })) {
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    const allowedExtensions = [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".svg",
    ];

    if (!allowedExtensions.includes(extension)) {
      continue;
    }

    const source = path.join(sourceFolder, entry.name);
    const destination = path.join(destinationFolder, entry.name);

    fs.copyFileSync(source, destination);
    copied.push(entry.name);
  }

  return copied;
}

function cleanMarkdown(content, slug, sourceAssetFolderName = "") {
  let cleaned = content;

  // Notion nested asset paths:
  // Netmon/nmap.png -> /writeups/netmon/nmap.png
  if (sourceAssetFolderName) {
    const escaped = sourceAssetFolderName.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    const nestedImageRegex = new RegExp(`\\(${escaped}\\/([^\\)]+)\\)`, "g");

    cleaned = cleaned.replace(nestedImageRegex, `(/writeups/${slug}/$1)`);
  }

  // Images exported beside the Markdown:
  // nmap.png -> /writeups/cronos/nmap.png
  cleaned = cleaned.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^/)]+\.(?:png|jpe?g|gif|webp|svg))\)/gi,
    `![$1](/writeups/${slug}/$2)`,
  );

  return cleaned;
}

function buildFrontmatter({ title, description, category, date }) {
  return `---
title: "${title.replaceAll('"', '\\"')}"
description: "${description.replaceAll('"', '\\"')}"
category: "${category}"
date: "${date}"
tags: []
status: "DRAFT"
---

`;
}

async function main() {
  console.log();
  console.log("CYBERNIGHTS // NOTION WRITEUP IMPORTER");
  console.log("-------------------------------------");
  console.log();

  const exportFolder = await ask("Notion export folder: ");

  if (!exportFolder || !fs.existsSync(exportFolder)) {
    throw new Error("The supplied export folder does not exist.");
  }

  const markdownFilename = findMarkdownFile(exportFolder);

  const markdownPath = path.join(exportFolder, markdownFilename);

  const inferredTitle = stripNotionId(markdownFilename);

  const title = (await ask(`Title [${inferredTitle}]: `)) || inferredTitle;

  const defaultSlug = slugify(title);

  const slug = (await ask(`Slug [${defaultSlug}]: `)) || defaultSlug;

  console.log();
  console.log("Categories:");
  console.log("1. Hack The Box");
  console.log("2. TryHackMe");
  console.log("3. Active Directory");
  console.log("4. Web / API");
  console.log("5. AI Security");
  console.log("6. RF / SDR");
  console.log("7. Other");
  console.log();

  const categoryChoice = await ask("Category [1-7]: ");

  const categories = {
    1: "Hack The Box",
    2: "TryHackMe",
    3: "Active Directory",
    4: "Web / API",
    5: "AI Security",
    6: "RF / SDR",
    7: "Other",
  };

  const category = categories[categoryChoice] ?? "Other";

  const description = await ask("Short description: ");

  const today = new Date().toISOString().slice(0, 10);

  const date = (await ask(`Date [${today}]: `)) || today;

  const projectRoot = process.cwd();

  const contentDestination = path.join(
    projectRoot,
    "content",
    "writeups",
    slug,
  );

  const publicDestination = path.join(projectRoot, "public", "writeups", slug);

  if (fs.existsSync(contentDestination)) {
    throw new Error(`Writeup already exists: ${contentDestination}`);
  }

  fs.mkdirSync(contentDestination, {
    recursive: true,
  });

  fs.mkdirSync(publicDestination, {
    recursive: true,
  });

  const sourceEntries = fs.readdirSync(exportFolder, {
    withFileTypes: true,
  });

  const likelyAssetFolder =
    sourceEntries.find(
      (entry) =>
        entry.isDirectory() &&
        entry.name.toLowerCase() === inferredTitle.toLowerCase(),
    ) ?? sourceEntries.find((entry) => entry.isDirectory());

  let markdown = fs.readFileSync(markdownPath, "utf8");

  const directAssets = copyAssets(exportFolder, publicDestination);

  let nestedAssets = [];

  if (likelyAssetFolder) {
    const assetSource = path.join(exportFolder, likelyAssetFolder.name);

    nestedAssets = copyAssets(assetSource, publicDestination);

    markdown = cleanMarkdown(markdown, slug, likelyAssetFolder.name);
  } else {
    markdown = cleanMarkdown(markdown, slug);
  }

  // Remove the original top-level Notion H1,
  // because the page template already renders the title.
  markdown = markdown.replace(/^#\s+.+?\r?\n+/, "");

  const frontmatter = buildFrontmatter({
    title,
    description,
    category,
    date,
  });

  const finalMarkdown = frontmatter + markdown.trimStart();

  fs.writeFileSync(
    path.join(contentDestination, "index.md"),
    finalMarkdown,
    "utf8",
  );

  // Count all copied image assets
  const totalAssets = [...new Set([...directAssets, ...nestedAssets])];

  console.log();
  console.log("IMPORT COMPLETE");
  console.log();
  console.log(`TITLE ......... ${title}`);
  console.log(`SLUG .......... ${slug}`);
  console.log(`CATEGORY ...... ${category}`);
  console.log(`STATUS ........ DRAFT`);
  console.log(`ASSETS ........ ${totalAssets.length}`);
  console.log();
  console.log(`CONTENT ....... content/writeups/${slug}/index.md`);
  console.log(`PUBLIC ........ public/writeups/${slug}/`);
  console.log();
  console.log(`PREVIEW ....... http://localhost:3001/writeups/${slug}`);
  console.log();
  console.log(
    "Review, sanitise, polish, add tags, then change status to PUBLISHED.",
  );
  console.log();
}

main()
  .catch((error) => {
    console.error();
    console.error(`IMPORT FAILED: ${error.message}`);
    console.error();

    process.exitCode = 1;
  })
  .finally(() => {
    rl.close();
  });
