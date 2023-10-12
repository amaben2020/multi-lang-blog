import directus from "@/src/app/lib/directus";
import { revalidateTag } from "next/cache";

const CTA = async () => {
  async function handleFormAction(formData: FormData) {
    "use server";

    const email = formData.get("email");

    await directus.items("subscriber").createOne({
      email,
    });

    revalidateTag("subscribers-count");
  }

  async function fetchSubscribersCount() {
    try {
      const count = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/subscriber?meta=total_count&access_token=${process.env.DIRECTUS_ADMIN_API}`,
        {
          next: {
            tags: ["subscribers-count"],
          },
        },
      );

      const response = await count.json();
      console.log(response);
      return response.meta.total_count;
    } catch (error) {}
  }

  const subscribersCount = await fetchSubscribersCount();

  return (
    <div className="border rounded-lg p-10 min-w-[800px] flex flex-col space-y-4 my-5">
      <h3>Subscribe for more</h3>

      <form
        key={subscribersCount + "subscribers-count"}
        action={handleFormAction}
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="email"
          className="rounded-md shadow-md p-3 text-black"
        />
        <button type="submit" className="border p-4 rounded-md w-1/2 mx-auto">
          {" "}
          Sign Up
        </button>
      </form>

      <span>Join {subscribersCount} other subscribers today</span>
    </div>
  );
};

export default CTA;
