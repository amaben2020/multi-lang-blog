import directus from "@/src/app/[lang]/lib/directus";
import { revalidateTag } from "next/cache";

const CTA = async () => {
  async function handleSubscription(formData: FormData) {
    "use server";

    const email = formData.get("email");

    // check if the email is already in db
    // const emailInDB = await directus.items("subscribe").readByQuery({
    //   filter: {
    //     email: {
    //       _eq: email,
    //     },
    //   },
    //   fields: ["email"],
    // });

    // console.log("emailInDB", emailInDB);
    // throw error if is

    // create if it isnt

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

      return response.meta.total_count;
    } catch (error) {
      console.log(error);
    }
  }

  const subscribersCount = await fetchSubscribersCount();

  return (
    <div className="border rounded-lg p-10 min-w-[800px] flex flex-col space-y-4 my-5">
      <h3>Subscribe for more</h3>

      <form
        key={subscribersCount + "subscribers-count"}
        action={handleSubscription}
        className="flex flex-col space-y-4"
      >
        <label id="aria-email">Email</label>
        <input
          type="text"
          name="email"
          className="rounded-md shadow-md p-3 text-black"
          aria-labelledby="aria-email"
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
