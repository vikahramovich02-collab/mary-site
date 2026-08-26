import { useState } from "react";
import { blogPosts, blogTabs } from "./blogPosts.js";
import { BlogCard } from "./BlogCard.jsx";

// Блок «Блог» на лендинге (макет 11034:19540): заголовок по центру, пилюли
// разделов и три карточки. Полный список — на странице блога.
export function BlogTeaser() {
  const [tab, setTab] = useState("all");
  const visible = (tab === "all" ? blogPosts : blogPosts.filter((post) => post.kind === tab)).slice(0, 3);

  return (
    <section className="blog-block" id="blog">
      <h2>Блог</h2>

      <div className="blog-tabs" role="tablist" aria-label="Разделы блога">
        {blogTabs.map(([key, label]) => (
          <button
            aria-selected={tab === key}
            className={tab === key ? "is-active" : ""}
            key={key}
            onClick={() => setTab(key)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {visible.map((post) => <BlogCard key={post.id} post={post} />)}
        {!visible.length && <p className="blog-empty">Здесь пока пусто — скоро появится.</p>}
      </div>

      <a className="blog-block-all" href="/?page=blog">Все материалы →</a>
    </section>
  );
}
