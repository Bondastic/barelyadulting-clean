import {
  dataset,
  isSanityConfigured,
  projectId,
  sanityClient,
} from "@/sanity/client";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSanityConfigured || !sanityClient) {
    return Response.json({
      ok: true,
      configured: false,
      connected: false,
      projectId: null,
      dataset,
    });
  }

  try {
    await sanityClient.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]._id`);

    return Response.json({
      ok: true,
      configured: true,
      connected: true,
      projectId,
      dataset,
    });
  } catch {
    return Response.json(
      {
        ok: false,
        configured: true,
        connected: false,
        projectId,
        dataset,
      },
      { status: 503 },
    );
  }
}
