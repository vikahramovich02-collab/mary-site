import { ArrowRight, ArrowUpRight } from "lucide-react";

// Карточка блога по макету 11034:19540: белая плашка, обложка, заголовок,
// внизу серая пилюля «Mary → 2 мин» и круглая кнопка со стрелкой.
export function BlogCard({ post }) {
  const target = post.external ? "_blank" : undefined;
  const rel = post.external ? "noreferrer" : undefined;

  return (
    <article className="blog-card">
      <a className="blog-cover" href={post.href || undefined} rel={rel} target={target} tabIndex={-1}>
        {post.cover ? <img alt="" loading="lazy" src={post.cover} /> : <span className="blog-cover-empty" />}
      </a>

      <h3 className="blog-card-title">
        <a href={post.href || undefined} rel={rel} target={target}>{post.title}</a>
      </h3>

      <div className="blog-card-foot">
        <span className="blog-badge">
          {post.badge}
          <ArrowRight size={13} aria-hidden="true" />
          {post.read} мин
        </span>
        <a
          aria-label={`Читать: ${post.title}`}
          className="blog-go"
          href={post.href || undefined}
          rel={rel}
          target={target}
        >
          <ArrowUpRight size={18} />
        </a>
      </div>
    </article>
  );
}
