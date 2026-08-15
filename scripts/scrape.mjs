import fs from "node:fs/promises";

// Add acts here as you collect their IDs
const ACTS = [
  {
    shortName: 'RTI 2005',
    name: 'Right to Information Act, 2005',
    year: 2005,
    actId: 'AC_CEN_26_36_00004_200522_1517807322955',
  },
  {
    shortName: 'TP Act 1882',
    name: 'Transfer of Property Act, 1882',
    year: 1882,
    actId: 'AC_CEN_3_20_00042_188204_1523272233671',
  },
]

const BASE = "https://www.indiacode.nic.in";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?br>/gi, "\n")
    .replace(/<hr[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

// Pull secId + title out of a section page
async function getSectionMeta(actId, orderno) {
  const res = await fetch(
    `${BASE}/show-data?actid=${actId}&orderno=${orderno}`,
  );
  if (!res.ok) return null;
  const html = await res.text();

  const secIdMatch = html.match(/secId\s*=\s*'(\d+)'/);
  if (!secIdMatch) return null;

  const titleMatch = html.match(
    /Section\s+([^<.]+)\.?\s*<\/span>\s*&nbsp;\s*([^<]+)/,
  );

  return {
    secId: secIdMatch[1],
    sectionNumber: titleMatch ? titleMatch[1].trim() : String(orderno),
    sectionTitle: titleMatch ? titleMatch[2].trim() : "",
  };
}

async function getSectionText(actId, secId) {
  const res = await fetch(
    `${BASE}/SectionPageContent?actid=${actId}&sectionID=${secId}`,
  );
  if (!res.ok) return "";
  const json = await res.json();
  return stripHtml(json.content ?? "");
}

async function scrapeAct(act) {
  console.log(`\n=== ${act.name} ===`);
  const sections = [];
  let misses = 0;

  for (let orderno = 1; orderno <= 600; orderno++) {
    const meta = await getSectionMeta(act.actId, orderno);

    if (!meta) {
      misses++;
      if (misses >= 3) {
        console.log(`  stopped at orderno ${orderno}`);
        break;
      }
      continue;
    }
    misses = 0;

    const text = await getSectionText(act.actId, meta.secId);

    if (text.length > 40) {
      sections.push({
        sectionNumber: meta.sectionNumber,
        sectionTitle: meta.sectionTitle,
        text,
      });
      console.log(
        `  ${meta.sectionNumber}. ${meta.sectionTitle} (${text.length} chars)`,
      );
    }

    await sleep(350); // be polite to a government server
  }

  return { ...act, sections };
}

const results = [];
for (const act of ACTS) {
  results.push(await scrapeAct(act));
}

await fs.writeFile("scripts/corpus.json", JSON.stringify(results, null, 2));

const total = results.reduce((n, a) => n + a.sections.length, 0);
console.log(`\nDone. ${total} sections written to scripts/corpus.json`);
