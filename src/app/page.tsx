import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "./components/elements/cta";
import directus from "./lib/directus";

export default async function Home() {
  const getAllPosts = async () => {
    try {
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
    } catch (error) {}
  };

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
      </div>
    </main>
  );
}
