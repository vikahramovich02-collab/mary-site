import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";

// Эхо-финал: человек долистал до конца тёплым — даём имя и кнопку ещё раз,
// не заставляя скроллить назад.
export function EchoFinal() {
  return (
    <section className="echo-section" aria-label="Попробовать Mary">
      <div className="echo-brand">
        <img alt="" src={maryMark} />
        <span>mary</span>
      </div>
      <p>Соберёт рабочую систему, пока вы занимаетесь бизнесом</p>
      <a className="pf-btn is-dark" href="/?page=platform">
        Попробовать
        <img alt="" src={arrowUpRight} />
      </a>
    </section>
  );
}
