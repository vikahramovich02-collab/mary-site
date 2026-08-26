// Один список постов на два места: страница блога и блок «Блог» на лендинге.
// badge — что показываем в плашке под заголовком (наш пост — «Mary», внешний —
// издание), read — минуты чтения.
export const blogTabs = [
  ["all", "Все"],
  ["news", "Новости"],
  ["articles", "Разборы"],
  ["updates", "Апдейты Mary"],
];

export const blogPosts = [
  {
    id: "onliner",
    kind: "news",
    title: "«Мы не платим зарплату лишним программистам…»",
    badge: "Onliner",
    read: 6,
    href: "https://tech.onliner.by/2026/05/21/ai-13",
    external: true,
    cover: "/media/blog/onliner-ai.jpg",
  },
  {
    id: "devby-angels",
    kind: "news",
    title: "Первый стартап из инкубатора ПВТ получил ангельские инвестиции",
    badge: "dev.by",
    read: 4,
    href: "https://devby.io/news/pervyi-startap-iz-inkubatora-pvt-poluchil-angelskie-investitsii-ot-vypusknika-venchurnoi-akademii-pvt",
    external: true,
    cover: "/media/blog/devby.jpg",
  },
  {
    id: "newsby-startups",
    kind: "news",
    title: "Агродроны, ИИ-стартапы, песни на белорусском: как молодёжь движет страну вперёд",
    badge: "News.by",
    read: 5,
    href: "https://news.by/news/obshchestvo/agrodrony-ii-startapy-pesni-na-belorusskom-yazyke-kak-molodezh-belarusi-dvizhet-stranu-vpered",
    external: true,
    cover: "/media/blog/newsby.jpg",
  },
  {
    id: "poteri",
    kind: "articles",
    title: "Сколько салон теряет на пропущенных сообщениях: считаем на калькуляторе",
    badge: "Mary",
    read: 7,
    href: "/?page=article&slug=poteri-na-propushchennyh-soobshcheniyah",
    cover: "/media/blog/cover-raschet.jpg",
  },
  {
    id: "posle-zakrytiya",
    kind: "articles",
    title: "Кто отвечает в салоне после закрытия",
    badge: "Mary",
    read: 6,
    href: "/?page=article&slug=kto-otvechaet-posle-zakrytiya",
    cover: "/media/blog/cover-noch.jpg",
  },
  {
    id: "yclients",
    kind: "articles",
    title: "YCLIENTS и Instagram: как связать запись и переписку",
    badge: "Mary",
    read: 7,
    href: "/?page=article&slug=yclients-i-instagram",
    cover: "/media/blog/cover-svyaz.jpg",
  },
  {
    id: "oshibki",
    kind: "articles",
    title: "Что делать, если AI ответил клиенту неправильно",
    badge: "Mary",
    read: 6,
    href: "/?page=article&slug=esli-ai-otvetil-nepravilno",
    cover: "/media/blog/cover-oshibka.jpg",
  },
];
