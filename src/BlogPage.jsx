import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import { BlogCard } from "./BlogCard.jsx";
import { blogPosts, blogTabs } from "./blogPosts.js";
import "./custom-landing.css";

export function BlogPage() {
  const [tab, setTab] = useState("all");
  const visible = tab === "all" ? blogPosts : blogPosts.filter((post) => post.kind === tab);

  return (
    <main className="custom-site beauty-light blog-page" id="top">
      <SiteHeader />

      <section className="blog-head">
        <h1>Блог</h1>
        <p className="blog-lead">
          Как внедрить искусственный интеллект в реальные бизнес-процессы: разборы кейсов,
          лайфхаки по автоматизации рутины, новости мира AI и разборы трендов.
        </p>
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
      </section>

      <section className="blog-grid">
        {visible.map((post) => <BlogCard key={post.id} post={post} />)}

        {!visible.length && <p className="blog-empty">Здесь пока пусто — скоро появится.</p>}
      </section>

      <div className="blog-cta">
        <a className="pf-btn is-dark" href="/?page=platform">
          <MessageCircle size={16} aria-hidden="true" />
          Создать с Mary
        </a>
        <a className="blog-cta-plus" href="/?page=platform" aria-label="Открыть Mary">
          <Plus size={18} />
        </a>
      </div>
    </main>
  );
}
