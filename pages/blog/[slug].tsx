import Image from "next/future/image";
import MDXComponent from "@/components/post/MDXComponent";
import SEO from "@/components/SEO";
import type { Post } from "contentlayer/generated";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { allPosts } from "contentlayer/generated";
import { formatDate } from "@/lib/helpers";

type Props = {
  post: Post;
};

const BlogPost: NextPage<Props> = ({ post }) => {
  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        image={post.banner}
        date={new Date(post.date)}
        updated={post.updated ? new Date(post.updated) : undefined}
      />

      <Image
        src={post.banner}
        alt={post.title}
        title={post.title}
        width={1200}
        height={630}
        className="rounded-lg"
      />

      {post.photographer && post.unsplashLink ? (
        <p className="my-2 px-4 text-center font-roboto-slab text-base font-medium text-zinc-800 dark:text-zinc-200">
          {"Photo by "}
          <a
            href={post.unsplashLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-600"
          >
            {post.photographer}
          </a>
        </p>
      ) : null}

      <h1 className="my-4 px-4 text-center font-sora text-4xl font-black text-zinc-800 dark:text-zinc-200">
        {post.title}
      </h1>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        <p>{`Posted on ${formatDate(post.date)}`}</p>

        {post.updated && (
          <>
            <span className="hidden sm:mx-2 sm:block">&bull;</span>
            <p>{`Last updated on ${formatDate(post.updated)}`}</p>
          </>
        )}
      </div>

      <div className="my-2 flex flex-col items-center px-4 font-roboto-slab text-lg font-medium text-zinc-800 dark:text-zinc-200 sm:flex-row sm:justify-center">
        {post.readingTime}
      </div>

      <MDXComponent code={post.body.code} />
    </>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug.toString();

  const post = allPosts.find((post) => post.slug === slug);

  return {
    props: {
      post,
    },
  };
};
