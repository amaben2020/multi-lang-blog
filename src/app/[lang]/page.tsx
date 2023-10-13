import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "./components/elements/cta";
import { getLanguageFromDictionary } from "./lib/dictionary";
import directus from "./lib/directus";

// TODO: use get static params for {lang: "", slug: ""}

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const getAllPosts = async () => {
    console.log("PARAMS", params.lang);
    try {
      if (params.lang === "en") {
        const posts = await directus.items("post").readByQuery({
          fields: [
            "*",
            "author.id",
            "author.first_name",
            "author.last_name",
            "category.id",
            "category.title",
          ],
        });
        return posts.data;
      } else {
        const translatedPosts = await directus.items("post").readByQuery({
          fields: ["translations.*"],
        });
        return translatedPosts?.data.map((post) => {
          return {
            id: post.translations[0].id,
            post_id: post.translations[0].post_id,
            languages_code: post.translations[0].languages_code,
            description: post.translations[0].description,
            slug: post.translations[0].slug,
            body: post.translations[0].body,
            title: post.translations[0].title,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = await getAllPosts();

  console.dir(posts, { depth: null });

  if (!posts) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between flex-wrap">
        {posts?.map((post) => (
          <>
            <Link
              className="border mx-5 p-10 rounded-lg max-w-[300px]"
              href={`/${post?.category?.title.toLowerCase()}`}
              key={post.id}
            >
              {post.title}
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}?key=optimized`}
                alt=""
                width={300}
                height={640}
              />
            </Link>
          </>
        ))}
      </div>
      <div>
        <CTA />

        <footer>
          Title :{" "}
          {
            (await getLanguageFromDictionary(params.lang as "en" | "de")).footer
              .mainText
          }
        </footer>
      </div>
    </main>
  );
}
