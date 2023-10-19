import { i18n } from "@/i18n";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import CTA from "./components/elements/cta";
import { getLanguageFromDictionary } from "./lib/dictionary";
import directus from "./lib/directus";

// TODO: use get static params for {lang: "", slug: ""}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const generateMetadata = async ({
  params,
}: {
  params: { lang: "en" | "de" };
}) => {
  const info = await getLanguageFromDictionary(params.lang);

  return {
    title: info.header.title,
    description: info.header.description,
  };
};

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  // TODO: Move to services
  const getAllPosts = cache(async () => {
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
            "category.slug",
          ],
        });

        return posts.data;
      } else {
        const translatedPosts = await directus.items("post").readByQuery({
          fields: ["translations.*", "category.translations.slug"],
        });

        return translatedPosts?.data?.map((post) => {
          return {
            id: post.translations[0].id,
            post_id: post.translations[0].post_id,
            languages_code: post.translations[0].languages_code,
            description: post.translations[0].description,
            slug: post.translations[0].slug,
            body: post.translations[0].body,
            title: post.translations[0].title,
            category: {
              slug: post.category.translations[0].slug,
              title: post.category.translations[0].slug,
            },
          };
        });
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  });

  const posts = await getAllPosts();

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
              href={`/${params.lang}/${post?.category?.slug}`}
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
