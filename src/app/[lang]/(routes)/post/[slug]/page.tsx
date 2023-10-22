import directus from "@/src/app/[lang]/lib/directus";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

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

const options: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    if (
      domNode.attribs &&
      domNode.name === "img" &&
      domNode instanceof Element
    ) {
      const { src, alt } = domNode.attribs;

      console.dir(domNode.name, { depth: null });
      console.dir(domNode.attribs, { depth: null });
      return (
        <Image
          src={src}
          alt={alt}
          height={1280}
          width={640}
          className="rounded-md w-full object-center my-3 h-auto max-h-[300px] md:max-h-[500px]"
        />
      );
    }
  },
};

console.log(options);

const renderBody = (body: any) => parse(body, options);

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

  const jsonLD = {
    "@context": singlePost[0].title,
    "@id": singlePost[0]?.id,
    body: renderBody(singlePost[0].body),
  };

  return (
    <section className="p-10">
      <Script
        id={singlePost[0]?.id}
        dangerouslySetInnerHTML={{
          __html: jsonLD,
        }}
      />

      <h2>{singlePost[0]?.title}</h2>

      <div className="prose wysiwyg">
        {renderBody(singlePost[0].body)}
        <p>okiki</p>
      </div>

      <button className="btn-primary">OK</button>
    </section>
  );
};

export default Post;
