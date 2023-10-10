// import { Twitter } from "lucide-react";
import { notFound } from "next/navigation";
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
      console.log(posts.data);
      return posts.data;
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  console.log(await getAllPosts());

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  // const SocialLinks = ({ icon, href }: { icon: "twitter"; href: string }) => {
  //   const ICONS = {
  //     twitter: <Twitter />,
  //   };

  //   const LinkComponent = <Link href={href}>{ICONS[icon]}</Link>;

  //   return LinkComponent;
  // };

  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SocialLinks href="/twitter" icon="twitter" /> */}
      {posts[0].title}
    </main>
  );
}
