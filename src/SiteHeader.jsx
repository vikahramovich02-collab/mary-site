import { useState } from "react";
import { ChevronDown } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import navDot from "./assets/nav-dot.svg";

// Общая шапка внутренних страниц (блог, вакансии) — чтобы они не разъезжались
// между собой при правках.
export function SiteHeader() {
  const [companies, setCompanies] = useState(false);

  return (
    <header className="custom-header pf-header">
      <nav className="pf-nav" aria-label="Навигация">
        <a href="/?page=blog"><img alt="" src={navDot} />Блог</a>
        <a href="/?page=jobs"><img alt="" src={navDot} />Вакансии</a>
        <div className="mary-dd">
          <button type="button" onClick={() => setCompanies((v) => !v)} aria-expanded={companies}>
            <img alt="" src={navDot} />
            Для компаний
            <ChevronDown size={16} />
          </button>
          {companies && (
            <div className="mary-dd-menu wide">
              <a href="/?page=beauty">Красота<small>Доступно</small></a>
              <a className="soon">Производство<small>Доступно</small></a>
            </div>
          )}
        </div>
      </nav>

      <a className="custom-brand" href="/" aria-label="Mary, на главную">
        <img src={maryMark} alt="" />
        <span>mary</span>
      </a>

      <div className="custom-header-actions">
        <a className="pf-link" href="#investors">Для инвесторов<img alt="" src={arrowUpRight} /></a>
        <a className="pf-link" href="/?page=custom">Заказать разработку<img alt="" src={arrowUpRight} /></a>
        <a className="pf-btn is-soft" href="/?page=platform">Войти в Mary<img alt="" src={arrowUpRight} /></a>
      </div>
    </header>
  );
}
