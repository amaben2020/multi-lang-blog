import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&token=<token>`
export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== process.env.DIRECTUS_ADMIN_API) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  // we cannot revalidate a single slug so you must do for the entire route
  revalidatePath(`/[lang]/post/[slug]`);
  revalidatePath(`/[lang]/[category]`);
  revalidatePath(`/[lang]`);

  return Response.json({ revalidated: true, now: Date.now() });
}
