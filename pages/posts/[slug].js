import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4d2pwih59bq01z67b9t7ofy/master"
);

//we have use query to pull out the data from the above api

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      date_published
      author {
        id
        name
        avator {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
//in above query the first two line is gonna pull out the content whose matches the clicked slug

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false, //if not found the page for that path
  };
}

//we are passing down the params that we get from getStaticPaths from above

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug }); // we pull out the data we want to fetch out from the graphcms api kinda store
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30, //this means if u visit your website and anything updated in graphcms it will automatically gets generated in like every 30s
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} className={styles.cover} alt="" />
      <div className={styles.title}>
        <img src={post.author.avator.url} alt="" />
        <div className={post.authtext}>
          <h6>By {post.author.name}</h6>
          <h6 className={styles.date}>{post.datePublished}</h6>
        </div>
      </div>
      <h2>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
}
