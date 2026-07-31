import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;
  const providedSecret =
    request.headers.get("x-sanity-secret") ||
    new URL(request.url).searchParams.get("secret");

  if (!configuredSecret || providedSecret !== configuredSecret) {
    return Response.json(
      { ok: false, error: "Revalidation is not authorized." },
      { status: 401 },
    );
  }

  revalidatePath("/");
  revalidatePath("/privacy");

  return Response.json({ ok: true, revalidated: true });
}
