import { getStore } from "@netlify/blobs";

const STORE_NAME = "darbdesign-site-stats";
const COUNTER_KEY = "portfolio-visits";
const MAX_RETRIES = 8;

const responseHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate",
  "x-content-type-options": "nosniff",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

function normalizeCount(value) {
  const count = Number.parseInt(value, 10);
  return Number.isFinite(count) && count >= 0 ? count : 0;
}

async function readCounter(store) {
  const entry = await store.getWithMetadata(COUNTER_KEY, {
    type: "json",
    consistency: "strong",
  });

  if (entry === null) {
    return { count: 0, etag: null };
  }

  return {
    count: normalizeCount(entry.data?.count),
    etag: entry.etag,
  };
}

async function incrementCounter(store) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    const current = await readCounter(store);
    const nextCount = current.count + 1;
    const payload = {
      count: nextCount,
      updatedAt: new Date().toISOString(),
    };

    const result = current.etag
      ? await store.setJSON(COUNTER_KEY, payload, { onlyIfMatch: current.etag })
      : await store.setJSON(COUNTER_KEY, payload, { onlyIfNew: true });

    if (result.modified) return nextCount;

    // Un'altra visita ha aggiornato il valore nello stesso istante: riprova.
    await new Promise((resolve) => setTimeout(resolve, 15 + attempt * 20));
  }

  throw new Error("Impossibile aggiornare il contatore dopo più tentativi");
}

export default async function handler(request) {
  if (request.method !== "GET" && request.method !== "POST") {
    return json({ error: "Metodo non consentito" }, 405);
  }

  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const count = request.method === "POST"
      ? await incrementCounter(store)
      : (await readCounter(store)).count;

    return json({ count });
  } catch (error) {
    console.error("Visitor counter error", error);
    return json({ error: "Contatore temporaneamente non disponibile" }, 500);
  }
}
