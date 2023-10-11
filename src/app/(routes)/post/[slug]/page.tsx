import directus from "@/src/app/lib/directus";
import parse from "html-react-parser";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const post = await directus.items("post").readByQuery({
    filter: {
      status: {
        _eq: "published",
      },
    },
  });
  //@ts-ignore
  return post.data.map((post: any) => ({
    slug: post.slug,
  }));
};

const renderBody = (body: any) => parse(body);

const Post = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;

  const fetchPost = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          slug: {
            _eq: slug,
          },
        },

        fields: ["*", "category.id", "author.first_name"],
      });

      return post.data;
    } catch (error) {
      console.log(error);
    }
  };

  const singlePost: any = await fetchPost();

  if (!singlePost) notFound();

  return (
    <div className="p-10">
      <h2>{singlePost[0]?.title}</h2>

      <div className="prose wysiwyg">
        {renderBody(singlePost[0].body)}
        <p>okiki</p>
      </div>

      <button className="btn-primary">OK</button>
    </div>
  );
};

export default Post;
