import Link from "next/link"; //built-in link in next.js
import styles from "../styles/BlogCard.module.css";
import Image from "next/image";

function BlogPost({ title, author, coverPhoto, datePublished, slug }) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="xyzz" />
        </div>
      </Link>
      <div className={styles.text}>
        <h1>{title}</h1>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avator.url} alt="" />
            <h3>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{datePublished}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
