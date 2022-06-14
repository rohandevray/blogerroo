import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import { graphql } from "graphql";
import BlogCard from "../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4d2pwih59bq01z67b9t7ofy/master"
);

//we have use query to pull out the data from the above api

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      date_published
      content {
        html
      }
      author {
        name
        avator {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;
export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY); // we pull out the data we want to fetch out from the graphcms api kinda store
  return {
    props: {
      posts,
    },
    revalidate: 30, //this means if u visit your website and anything updated in graphcms it will automatically gets generated in like every 30s
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Scribbles</title>
        <meta name="description" content="A blog tutorial made with JAMstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.date_published}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}

//we always gonna return something as the props gets passed to the Home component so that we can work with the fetched data

//revalidate
//if u visit ur website and if there is new content its going to generate new static files for it as well
