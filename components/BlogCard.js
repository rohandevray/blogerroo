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
    </div>
  );
}

export default BlogPost;
