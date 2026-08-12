import { useEffect, useState } from "react";
import {
  ArrowRight,
  ExternalLink as ArrowSquareOut,
  ArrowUp,
  Bell,
  BookOpen,
  Building2 as Buildings,
  CalendarDays as CalendarBlank,
  ChevronDown as CaretDown,
  ChevronLeft as CaretLeft,
  ChevronRight as CaretRight,
  ChartLine as ChartLineUp,
  MessageCircle as ChatCircle,
  Check,
  CircleCheck as CheckCircle,
  SquareCheck as CheckSquare,
  Clock,
  History as ClockCounterClockwise,
  Copy,
  MoreHorizontal as DotsThree,
  FileText,
  Filter as Funnel,
  Settings as Gear,
  Image,
  Inbox,
  Info,
  Zap as Lightning,
  Link as LinkSimple,
  List as ListBullets,
  Search as MagnifyingGlass,
  Mic as Microphone,
  StickyNote as NotePencil,
  Package,
  Paperclip,
  Send as PaperPlaneTilt,
  Pause,
  Pencil as PencilSimple,
  Play,
  PlugZap as PlugsConnected,
  Plus,
  Bot as Robot,
  ShieldCheck,
  PanelLeftClose as SidebarSimple,
  LogOut as SignOut,
  Sparkles as Sparkle,
  LayoutGrid as SquaresFour,
  Tag,
  ThumbsDown,
  ThumbsUp,
  Timer,
  Trash2 as Trash,
  TrendingUp as TrendUp,
  Upload,
  User,
  Users as UsersThree,
  TriangleAlert as WarningCircle,
  X,
} from "lucide-react";
import { CustomLanding } from "./CustomLanding.jsx";
import { BlogPage } from "./BlogPage.jsx";
import { JobsPage } from "./JobsPage.jsx";
import { ContactsPage } from "./ContactsPage.jsx";
import { ArticlePage } from "./ArticlePage.jsx";
import { BeautyLanding } from "./BeautyLanding.jsx";
import { PlatformLanding } from "./PlatformLanding.jsx";
import { Onboarding } from "./Onboarding.jsx";

const clients = [
  {
    id: 1,
    name: "Даниела",
    initials: "Д",
    handle: "@dorofeeva_daniela",
    channel: "Telegram",
    manager: "Ярослава",
    status: "Ожидает решения",
    lastContact: "Сегодня, 15:42",
    order: "№58625",
    amount: "5 370 ₽",
    issue: "Товар пришёл с дефектом",
    tags: ["Повторное обращение", "Возврат"],
  },
  {
    id: 2,
    name: "Оксана Дране́вич",
    initials: "ОД",
    handle: "@oksana_dranevich",
    channel: "Instagram",
    manager: "Ярослава",
    status: "Новый",
    lastContact: "Сегодня, 15:31",
    order: "№58490",
    amount: "3 120 ₽",
    issue: "Уточнение по доставке",
    tags: ["Доставка"],
  },
  {
    id: 3,
    name: "Дарья Шакалида",
    initials: "ДШ",
    handle: "@daryalips",
    channel: "Instagram",
    manager: "Вероника",
    status: "В работе",
    lastContact: "Сегодня, 14:58",
    order: "№58317",
    amount: "7 860 ₽",
    issue: "Нужна помощь с макетом",
    tags: ["Фотокнига"],
  },
  {
    id: 4,
    name: "Кобец Екатерина",
    initials: "КЕ",
    handle: "@e_kobets",
    channel: "Instagram",
    manager: "Анастасия",
    status: "Решено",
    lastContact: "Вчера, 18:20",
    order: "№57944",
    amount: "2 940 ₽",
    issue: "Оплата не отобразилась",
    tags: ["Оплата"],
  },
];

const inboxItems = [
  { id: 1, clientId: 1, unread: 2, time: "2 мин", preview: "На товаре заметный дефект…" },
  { id: 2, clientId: 2, unread: 1, time: "11 мин", preview: "Подскажите, когда доставят заказ?" },
  { id: 3, clientId: 3, unread: 0, time: "28 мин", preview: "Прикрепляю фотографии для макета" },
  { id: 4, clientId: 4, unread: 0, time: "1 ч", preview: "Спасибо, оплата прошла" },
];

const tasksSeed = [
  { id: 1, title: "Согласовать замену заказа №58625", client: "Даниела", due: "Сегодня, 17:00", status: "Новые", owner: "Ярослава" },
  { id: 2, title: "Уточнить адрес доставки №58490", client: "Оксана Дране́вич", due: "Сегодня, 18:30", status: "В работе", owner: "Ярослава" },
  { id: 3, title: "Проверить макет фотокниги", client: "Дарья Шакалида", due: "26 июля, 11:00", status: "В работе", owner: "Вероника" },
  { id: 4, title: "Подтвердить возврат средств", client: "Даниела", due: "27 июля, 12:00", status: "Готово", owner: "Вероника" },
];

const automationsSeed = [
  { id: 1, name: "Жалоба на дефект товара", description: "Распознаёт жалобу, собирает заказ и готовит черновик ответа", status: "active", runs: 128, lastRun: "6 мин назад" },
  { id: 2, name: "Вопрос о статусе доставки", description: "Проверяет этап заказа и отвечает клиенту после подтверждения", status: "active", runs: 94, lastRun: "18 мин назад" },
  { id: 3, name: "Не прошла оплата", description: "Создаёт задачу менеджеру и запрашивает данные платежа", status: "paused", runs: 37, lastRun: "Вчера, 19:14" },
];

const viewMeta = {
  chat: { label: "Чат с Mary", icon: ChatCircle },
  automations: { label: "Автоматизации", icon: Lightning },
  inbox: { label: "Входящие", icon: Inbox },
  clients: { label: "Клиенты", icon: UsersThree },
  tasks: { label: "Задачи", icon: CheckSquare },
  calendar: { label: "Календарь", icon: CalendarBlank },
  analytics: { label: "Аналитика", icon: ChartLineUp },
  knowledge: { label: "База знаний", icon: BookOpen },
  team: { label: "Команда", icon: UsersThree },
  integrations: { label: "Интеграции", icon: PlugsConnected },
  settings: { label: "Настройки", icon: Gear },
};

function IconButton({ label, children, className = "", onClick, active = false }) {
  return (
    <button
      type="button"
      className={`icon-button ${active ? "is-active" : ""} ${className}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Avatar({ client, size = "md" }) {
  return <span className={`avatar avatar-${size}`}>{client.initials}</span>;
}

function StatusDot({ status }) {
  const type =
    status === "Решено" || status === "Готово" || status === "active"
      ? "success"
      : status === "Новый"
        ? "info"
        : status === "paused"
          ? "muted"
          : "warning";
  return <span className={`status-dot status-${type}`} aria-hidden="true" />;
}

function Sidebar({ activeView, onNavigate, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const [crmOpen, setCrmOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const crmItems = ["inbox", "clients", "tasks", "calendar", "analytics"];
  const navigate = (view) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Закрыть меню" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
        <div className="brand-row">
          <button className="brand" type="button" onClick={() => navigate("chat")} aria-label="Mary, на главную">
            <span className="brand-mark" aria-hidden="true">m</span>
            {!collapsed && <span>mary</span>}
          </button>
          {!collapsed && (
            <IconButton label="Свернуть меню" onClick={() => setCollapsed(true)}>
              <SidebarSimple size={19} />
            </IconButton>
          )}
          {collapsed && (
            <IconButton label="Развернуть меню" onClick={() => setCollapsed(false)}>
              <CaretRight size={18} />
            </IconButton>
          )}
        </div>

        <nav className="main-nav" aria-label="Основная навигация">
          <NavItem icon={ChatCircle} label="Чат" active={activeView === "chat"} collapsed={collapsed} onClick={() => navigate("chat")} />
          <NavItem icon={Lightning} label="Автоматизации" active={activeView === "automations"} collapsed={collapsed} onClick={() => navigate("automations")} />

          <button
            type="button"
            className={`nav-item nav-parent ${crmItems.includes(activeView) ? "parent-active" : ""}`}
            onClick={() => setCrmOpen((value) => !value)}
            aria-expanded={crmOpen}
          >
            <SquaresFour size={21} />
            {!collapsed && (
              <>
                <span>CRM</span>
                {crmOpen ? <CaretDown className="nav-caret" size={15} /> : <CaretRight className="nav-caret" size={15} />}
              </>
            )}
          </button>
          {crmOpen && (
            <div className="nav-nested">
              <NavItem icon={Inbox} label="Входящие" active={activeView === "inbox"} collapsed={collapsed} badge="12" onClick={() => navigate("inbox")} />
              <NavItem icon={User} label="Клиенты" active={activeView === "clients"} collapsed={collapsed} onClick={() => navigate("clients")} />
              <NavItem icon={CheckSquare} label="Задачи" active={activeView === "tasks"} collapsed={collapsed} badge="4" onClick={() => navigate("tasks")} />
              <NavItem icon={CalendarBlank} label="Календарь" active={activeView === "calendar"} collapsed={collapsed} onClick={() => navigate("calendar")} />
              <NavItem icon={ChartLineUp} label="Аналитика" active={activeView === "analytics"} collapsed={collapsed} onClick={() => navigate("analytics")} />
            </div>
          )}
          <NavItem icon={BookOpen} label="База знаний" active={activeView === "knowledge"} collapsed={collapsed} onClick={() => navigate("knowledge")} />
        </nav>

        <div className="nav-divider" />
        <nav className="utility-nav" aria-label="Управление">
          <NavItem icon={UsersThree} label="Команда" active={activeView === "team"} collapsed={collapsed} onClick={() => navigate("team")} />
          <NavItem icon={PlugsConnected} label="Интеграции" active={activeView === "integrations"} collapsed={collapsed} onClick={() => navigate("integrations")} />
          <NavItem icon={Gear} label="Настройки" active={activeView === "settings"} collapsed={collapsed} onClick={() => navigate("settings")} />
        </nav>

        <div className="account-wrap">
          {profileOpen && !collapsed && (
            <div className="account-popover">
              <button type="button"><Buildings size={19} />Профиль компании</button>
              <button type="button" onClick={() => navigate("settings")}><User size={19} />Настройки аккаунта</button>
              <button type="button"><SignOut size={19} />Выйти</button>
            </div>
          )}
          <button className="account-button" type="button" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}>
            <span className="avatar avatar-md">ВА</span>
            {!collapsed && (
              <>
                <span className="account-name">Виктория Ахрамова</span>
                <CaretDown className="account-caret" size={15} />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon: Icon, label, active, collapsed, badge, onClick }) {
  return (
    <button type="button" className={`nav-item ${active ? "is-active" : ""}`} onClick={onClick} title={collapsed ? label : undefined}>
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
      {!collapsed && badge && <span className="nav-badge">{badge}</span>}
    </button>
  );
}

function Topbar({ activeView, onMenu, onSearch, search, onCreate }) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <IconButton label="Открыть меню" className="mobile-menu-button" onClick={onMenu}>
          <ListBullets size={21} />
        </IconButton>
        <span>{viewMeta[activeView].label}</span>
      </div>
      <div className="topbar-actions">
        <label className="global-search">
          <MagnifyingGlass size={18} />
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Поиск клиентов…" />
        </label>
        <button className="button secondary compact" type="button" onClick={onCreate}>
          <Plus size={17} /> Создать
        </button>
        <span className="online-dot" title="Mary онлайн" />
        <IconButton label="Уведомления"><Bell size={19} /></IconButton>
      </div>
    </header>
  );
}

function SectionHeader({ icon: Icon, title, description, actions }) {
  return (
    <div className="section-header">
      <div className="section-title-wrap">
        {Icon && <Icon size={22} />}
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </div>
      {actions && <div className="section-actions">{actions}</div>}
    </div>
  );
}

function ChatComposer({ placeholder = "Спросить у Mary" }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    window.setTimeout(() => setSent(false), 1600);
  };
  return (
    <div className="composer">
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") submit();
        }}
        placeholder={sent ? "Сообщение отправлено" : placeholder}
        aria-label={placeholder}
      />
      <div className="composer-actions">
        <IconButton label="Добавить"><Plus size={20} /></IconButton>
        <IconButton label="Прикрепить файл"><Paperclip size={20} /></IconButton>
        <span className="composer-spacer" />
        <IconButton label="Записать голосовое"><Microphone size={19} /></IconButton>
        <IconButton label="Отправить" className="send-button" onClick={submit}><ArrowUp size={19} /></IconButton>
      </div>
    </div>
  );
}

function DraftResponse({ onApproved, approved }) {
  return (
    <section className="draft-block">
      <div className="content-heading"><ChatCircle size={24} /><h2>Черновик ответа клиенту</h2></div>
      <p className="draft-copy">
        Здравствуйте, Даниела! Сожалеем, что товар пришёл с дефектом. Это не соответствует нашим
        стандартам качества. Мы готовы заменить товар или оформить возврат денег. Подскажите,
        пожалуйста, что для вас предпочтительнее?
      </p>
      <div className="draft-actions">
        <span className={approved ? "status-inline is-success" : "status-inline"}>
          {approved ? <CheckCircle size={18} /> : <Info size={18} />}
          {approved ? "Ответ подтверждён и отправлен." : "Не отправлено. Требует подтверждения."}
        </span>
        <button className="button primary" type="button" onClick={onApproved} disabled={approved}>
          {approved ? <><Check size={18} /> Отправлено</> : "Подтвердить ответ"}
        </button>
      </div>
      <div className="reaction-row">
        <IconButton label="Копировать"><Copy size={19} /></IconButton>
        <IconButton label="Полезно"><ThumbsUp size={19} /></IconButton>
        <IconButton label="Не полезно"><ThumbsDown size={19} /></IconButton>
      </div>
    </section>
  );
}

function MaryInsight({ onBuild }) {
  return (
    <section className="mary-insight">
      <Sparkle size={24} />
      <div>
        <p>Такое обращение повторяется: 12 случаев за последние 30 дней.</p>
        <span>Рекомендую автоматизировать распознавание жалоб и подготовку черновиков ответов.</span>
        <button className="button secondary" type="button" onClick={onBuild}><Lightning size={18} /> Собрать автоматизацию</button>
      </div>
    </section>
  );
}

function ChatScreen({ onOpenClient, onBuildAutomation }) {
  const [approved, setApproved] = useState(false);
  return (
    <div className="chat-layout">
      <main className="chat-canvas dotted-bg">
        <div className="chat-toolbar">
          <div className="reaction-row">
            <IconButton label="Копировать чат"><Copy size={18} /></IconButton>
            <IconButton label="Полезно"><ThumbsUp size={18} /></IconButton>
            <IconButton label="Не полезно"><ThumbsDown size={18} /></IconButton>
          </div>
          <div>
            <IconButton label="История"><ClockCounterClockwise size={20} /></IconButton>
            <IconButton label="Новый чат"><Plus size={20} /></IconButton>
          </div>
        </div>
        <div className="chat-thread">
          <div className="user-message">
            <p>Помоги обработать жалобу клиента и предложи, что можно автоматизировать</p>
            <span>25.07.2026 15:42&nbsp;&nbsp;✓✓</span>
          </div>
          <div className="mary-message">
            <div className="mary-label"><span className="mary-avatar">m</span><strong>Mary</strong></div>
            <p>Поняла, обработаю жалобу и предложу, что можно автоматизировать.</p>
            <h3>Краткое резюме обращения</h3>
            <ul>
              <li><button className="text-link" type="button" onClick={onOpenClient}>Клиент: Даниела (@dorofeeva_daniela, Telegram)</button></li>
              <li>Заказ: №58625 от 23.07.2026</li>
              <li>Проблема: товар пришёл с дефектом (см. фото)</li>
              <li>Требование: замена или возврат средств</li>
            </ul>
            <DraftResponse approved={approved} onApproved={() => setApproved(true)} />
            <MaryInsight onBuild={onBuildAutomation} />
          </div>
        </div>
        <ChatComposer />
      </main>
      <ClientContextPanel client={clients[0]} onClose={null} compact />
    </div>
  );
}

function ClientContextPanel({ client, onClose, compact = false, onFullProfile }) {
  if (!client) return null;
  return (
    <aside className={`context-panel ${compact ? "is-persistent" : "is-drawer"}`} aria-label={`Карточка клиента ${client.name}`}>
      <div className="context-header">
        <div>
          <span className="eyebrow">Карточка клиента</span>
          <h2>{client.name}</h2>
        </div>
        {onClose && <IconButton label="Закрыть карточку" onClick={onClose}><X size={20} /></IconButton>}
      </div>
      <div className="client-identity">
        <Avatar client={client} size="lg" />
        <div>
          <strong>{client.name}</strong>
          <span>{client.handle}</span>
        </div>
        <Badge><StatusDot status={client.status} />{client.status}</Badge>
      </div>
      <div className="quick-actions">
        <button type="button"><ChatCircle size={18} />Написать</button>
        <button type="button"><CheckSquare size={18} />Задача</button>
        <button type="button"><NotePencil size={18} />Заметка</button>
      </div>
      <ContextGroup icon={User} title="Контакт">
        <p>{client.channel}</p><span>{client.handle}</span>
        <p>Менеджер: {client.manager}</p>
      </ContextGroup>
      <ContextGroup icon={Package} title="Последний заказ">
        <div className="context-row"><strong>{client.order}</strong><span>{client.amount}</span></div>
        <span>23.07.2026 · Оплачен</span>
      </ContextGroup>
      <ContextGroup icon={Sparkle} title="Резюме Mary">
        <p>{client.issue}. Клиент ожидает выбор между заменой товара и возвратом.</p>
      </ContextGroup>
      <ContextGroup icon={Tag} title="Теги">
        <div className="tag-row">{client.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      </ContextGroup>
      <ContextGroup icon={Image} title="Вложения">
        <button className="file-row" type="button"><span className="file-preview"><Image size={23} /></span><span>IMG_58625.jpg<small>2,4 МБ</small></span><ArrowSquareOut size={17} /></button>
      </ContextGroup>
      {onFullProfile && (
        <button className="button secondary full-width" type="button" onClick={onFullProfile}>
          Открыть полный профиль <ArrowRight size={18} />
        </button>
      )}
    </aside>
  );
}

function ContextGroup({ icon: Icon, title, children }) {
  return (
    <section className="context-group">
      <div className="context-group-title"><Icon size={18} /><strong>{title}</strong></div>
      <div className="context-group-body">{children}</div>
    </section>
  );
}

function InboxScreen({ onOpenClient }) {
  const [selectedId, setSelectedId] = useState(1);
  const [tab, setTab] = useState("new");
  const [approved, setApproved] = useState(false);
  const selected = clients.find((client) => client.id === selectedId) || clients[0];
  return (
    <div className="inbox-layout">
      <aside className="conversation-list">
        <div className="panel-heading">
          <div><h1>Сообщения</h1><p>12 требуют внимания</p></div>
          <IconButton label="Фильтры"><Funnel size={19} /></IconButton>
        </div>
        <div className="segment-tabs">
          <button className={tab === "new" ? "is-active" : ""} onClick={() => setTab("new")}>Новые <Badge>3</Badge></button>
          <button className={tab === "work" ? "is-active" : ""} onClick={() => setTab("work")}>В работе <Badge>9</Badge></button>
        </div>
        <label className="list-search"><MagnifyingGlass size={17} /><input placeholder="Поиск в сообщениях" /></label>
        <div className="inbox-rows">
          {inboxItems.map((item) => {
            const client = clients.find((entry) => entry.id === item.clientId);
            return (
              <button className={`inbox-row ${selectedId === item.clientId ? "is-active" : ""}`} type="button" key={item.id} onClick={() => setSelectedId(item.clientId)}>
                <Avatar client={client} />
                <span className="inbox-row-copy">
                  <strong>{client.name}</strong>
                  <span>{item.preview}</span>
                  <small>{client.channel} · {client.manager}</small>
                </span>
                <span className="inbox-row-meta"><small>{item.time}</small>{item.unread > 0 && <Badge tone="dark">{item.unread}</Badge>}</span>
              </button>
            );
          })}
        </div>
      </aside>
      <main className="conversation">
        <div className="conversation-header">
          <button className="client-heading-button" type="button" onClick={() => onOpenClient(selected)}>
            <Avatar client={selected} /><span><strong>{selected.name}</strong><small>{selected.channel} · {selected.handle}</small></span>
          </button>
          <div className="conversation-actions">
            <button className="button secondary compact" type="button"><Check size={17} />В работу</button>
            <IconButton label="Создать задачу"><CheckSquare size={19} /></IconButton>
            <IconButton label="Ещё"><DotsThree size={20} /></IconButton>
          </div>
        </div>
        <div className="conversation-body dotted-bg">
          <div className="day-divider"><span>Сегодня</span></div>
          <div className="incoming-message"><strong>{selected.name}</strong><p>{selected.issue}. Подскажите, что можно сделать?</p><span>15:38</span></div>
          <div className="mary-note"><Sparkle size={19} /><p>Mary нашла заказ {selected.order}, проверила оплату и подготовила ответ.</p></div>
          <DraftResponse approved={approved} onApproved={() => setApproved(true)} />
        </div>
        <ChatComposer placeholder={`Ответить клиенту ${selected.name}`} />
      </main>
      <ClientContextPanel client={selected} compact />
    </div>
  );
}

function ClientsScreen({ search, onOpenClient }) {
  const [filter, setFilter] = useState("Все");
  const filteredClients = clients.filter((client) => {
    const matchesSearch = `${client.name} ${client.handle} ${client.order}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === "Все" || client.channel === filter);
  });
  return (
    <div className="page-scroll">
      <SectionHeader
        icon={UsersThree}
        title="Клиенты"
        description="Единая история диалогов, заказов и задач"
        actions={<button className="button primary" type="button"><Plus size={18} />Новый клиент</button>}
      />
      <div className="toolbar-row">
        <div className="filter-pills">
          {["Все", "Telegram", "Instagram"].map((item) => <button className={filter === item ? "is-active" : ""} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <button className="button secondary compact" type="button"><Upload size={17} />Экспорт</button>
      </div>
      <div className="table-surface">
        <div className="data-row data-head client-grid">
          <span>Клиент</span><span>Контакт</span><span>Канал</span><span>Менеджер</span><span>Последний контакт</span><span />
        </div>
        {filteredClients.map((client) => (
          <div className="data-row client-grid" key={client.id}>
            <button className="person-cell" type="button" onClick={() => onOpenClient(client)}><Avatar client={client} /><strong>{client.name}</strong></button>
            <button className="text-link" type="button" onClick={() => onOpenClient(client)}>{client.handle}</button>
            <span><Badge>{client.channel}</Badge></span>
            <span>{client.manager}</span>
            <span className="muted">{client.lastContact}</span>
            <span className="row-actions">
              <IconButton label="Открыть диалог"><ChatCircle size={18} /></IconButton>
              <IconButton label="Редактировать" onClick={() => onOpenClient(client)}><PencilSimple size={18} /></IconButton>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksScreen({ onOpenClient }) {
  const [view, setView] = useState("board");
  const [tasks, setTasks] = useState(tasksSeed);
  const columns = ["Новые", "В работе", "Для руководителя", "Готово"];
  const moveTask = (taskId) => {
    setTasks((items) => items.map((item) => item.id === taskId ? { ...item, status: item.status === "Новые" ? "В работе" : "Готово" } : item));
  };
  return (
    <div className="page-scroll">
      <SectionHeader
        icon={CheckSquare}
        title="Задачи"
        description="Работа команды по обращениям клиентов"
        actions={<><div className="view-switch"><IconButton label="Доска" active={view === "board"} onClick={() => setView("board")}><SquaresFour size={18} /></IconButton><IconButton label="Список" active={view === "list"} onClick={() => setView("list")}><ListBullets size={18} /></IconButton></div><button className="button primary" type="button"><Plus size={18} />Новая задача</button></>}
      />
      {view === "board" ? (
        <div className="task-board">
          {columns.map((column) => (
            <section className="task-column" key={column}>
              <div className="column-heading"><span><StatusDot status={column} />{column}</span><Badge>{tasks.filter((task) => task.status === column).length}</Badge></div>
              <div className="task-list">
                {tasks.filter((task) => task.status === column).map((task) => (
                  <article className="task-card" key={task.id}>
                    <div className="task-card-top"><Badge>{task.client}</Badge><IconButton label="Меню задачи"><DotsThree size={18} /></IconButton></div>
                    <h3>{task.title}</h3>
                    <button className="text-link" type="button" onClick={() => onOpenClient(clients.find((client) => client.name === task.client))}>{task.client}</button>
                    <div className="task-meta"><span><Clock size={16} />{task.due}</span><span className="mini-avatar">{task.owner.slice(0, 1)}</span></div>
                    {column !== "Готово" && <button className="task-move" type="button" onClick={() => moveTask(task.id)}>{column === "Новые" ? "Взять в работу" : "Завершить"}<ArrowRight size={16} /></button>}
                  </article>
                ))}
                {tasks.filter((task) => task.status === column).length === 0 && <div className="empty-column">Нет задач</div>}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="table-surface">
          {tasks.map((task) => <div className="data-row task-table-row" key={task.id}><CheckSquare size={18} /><strong>{task.title}</strong><span>{task.client}</span><span>{task.owner}</span><span>{task.due}</span><Badge>{task.status}</Badge></div>)}
        </div>
      )}
    </div>
  );
}

function CalendarScreen() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const events = {
    1: ["Проверить статус заказа №58174"],
    3: ["Помощь с оплатой"],
    6: ["Брак №58625 · Даниела"],
    7: ["Проверить оплату №58490", "Созвон с Вероникой"],
    10: ["Передать макет в печать"],
    15: ["Ответить Даниеле", "Проверить возврат"],
    20: ["Разбор повторных жалоб"],
    24: ["Отчёт по автоматизациям"],
  };
  return (
    <div className="page-scroll">
      <SectionHeader icon={CalendarBlank} title="Календарь" description="Сроки задач, встречи и события клиентов" actions={<button className="button primary"><Plus size={18} />Событие</button>} />
      <div className="calendar-toolbar"><button className="button secondary compact"><CaretLeft size={17} />Назад</button><h2>Июль 2026</h2><button className="button secondary compact">Вперёд<CaretRight size={17} /></button></div>
      <div className="calendar-grid">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => <div className="calendar-weekday" key={day}>{day}</div>)}
        {days.map((day) => (
          <div className={`calendar-day ${day === 25 ? "is-today" : ""}`} key={day}>
            <span className="day-number">{day}</span>
            {events[day]?.map((event) => <button className="calendar-event" type="button" key={event}>{event}</button>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const bars = [42, 58, 34, 72, 66, 84, 61];
  return (
    <div className="page-scroll">
      <SectionHeader icon={ChartLineUp} title="Аналитика" description="Работа с клиентами за 19–25 июля" actions={<button className="button secondary compact"><CalendarBlank size={17} />7 дней<CaretDown size={15} /></button>} />
      <div className="metric-strip">
        <Metric label="Новых обращений" value="82" detail="+14% к прошлой неделе" />
        <Metric label="Решено" value="74" detail="90% всех обращений" />
        <Metric label="Среднее время ответа" value="5 мин 49 с" detail="на 1 мин 12 с быстрее" />
        <Metric label="Mary помогла" value="68%" detail="56 подготовленных ответов" />
      </div>
      <div className="analytics-grid">
        <section className="analytics-main">
          <div className="panel-heading"><div><h2>Обращения и ответы</h2><p>Количество по дням</p></div><Badge><TrendUp size={15} />+14%</Badge></div>
          <div className="bar-chart" aria-label="График обращений за неделю">
            {bars.map((value, index) => <div className="bar-column" key={value + index}><span style={{ height: `${value}%` }} /><small>{19 + index} июл</small></div>)}
          </div>
        </section>
        <section className="analytics-side">
          <div className="panel-heading"><div><h2>Каналы</h2><p>Доля обращений</p></div></div>
          {[["Instagram", 54], ["Telegram", 28], ["Веб-чат", 12], ["Email", 6]].map(([name, value]) => (
            <div className="progress-row" key={name}><span>{name}</span><div><i style={{ width: `${value}%` }} /></div><strong>{value}%</strong></div>
          ))}
        </section>
        <section className="analytics-table">
          <div className="panel-heading"><div><h2>Команда</h2><p>Скорость и качество ответов</p></div></div>
          <div className="data-row data-head team-metric-row"><span>Менеджер</span><span>Обработано</span><span>Средний ответ</span><span>Качество</span></div>
          {[["Анастасия", "46", "5 мин 23 с", "98%"], ["Вероника", "27", "2 мин 46 с", "99%"], ["Ярослава", "9", "17 мин 10 с", "98%"]].map((row) => <div className="data-row team-metric-row" key={row[0]}>{row.map((cell, index) => <span key={cell}>{index === 0 ? <strong>{cell}</strong> : cell}</span>)}</div>)}
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, detail }) {
  return <article className="metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function AutomationsScreen({ openBuilder, setOpenBuilder }) {
  const [items, setItems] = useState(automationsSeed);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const toggle = (id) => setItems((entries) => entries.map((entry) => entry.id === id ? { ...entry, status: entry.status === "active" ? "paused" : "active" } : entry));
  const connected = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const recommendations = [
    { id: "return", name: "Возврат клиентов", description: "Mary замечает клиентов без повторной покупки и предлагает уместный повод вернуться", cases: "Повторяется регулярно", icon: ClockCounterClockwise },
    { id: "support", name: "Поддержка клиентов", description: "Mary готовит ответы на частые вопросы и передаёт сложные случаи сотруднику", cases: "12 похожих обращений", icon: ChatCircle },
    { id: "payment", name: "Контроль оплаты", description: "Mary проверяет статус заказа, напоминает об оплате и фиксирует результат", cases: "8 ручных проверок", icon: CheckCircle },
  ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const showConnected = tab === "all" || tab === "connected";
  const showRecommended = tab === "all" || tab === "recommended";

  return (
    <div className="page-scroll automation-library-page">
      <div className="automation-library-header">
        <div>
          <h1>Автоматизации</h1>
          <p>Здесь собраны процессы, которые Mary уже может вести сама.</p>
        </div>
        <button className="button primary automation-create-button" type="button" onClick={() => setOpenBuilder(true)}>
          <Sparkle size={17} />Собрать с Mary
        </button>
      </div>

      <section className="automation-department-overview" aria-labelledby="departments-title">
        <div className="automation-overview-heading">
          <h2 id="departments-title">Отделы</h2>
          <span>Краткий обзор процессов</span>
        </div>
        <div className="automation-department-strip">
          {[
            { title: "Клиентский сервис", description: "Ответы, возвраты и передача сотруднику", meta: "2 процесса", icon: ChatCircle },
            { title: "Продажи", description: "Заявки, CRM и следующее действие", meta: "1 процесс", icon: TrendUp },
            { title: "Операции", description: "Оплата, заказы и внутренние задачи", meta: "2 процесса", icon: Package },
          ].map((department) => {
            const DepartmentIcon = department.icon;
            return (
              <article key={department.title}>
                <span className="automation-department-icon"><DepartmentIcon size={19} /></span>
                <span className="automation-department-copy">
                  <strong>{department.title}</strong>
                  <small>{department.description}</small>
                </span>
                <span className="automation-department-meta">{department.meta}</span>
              </article>
            );
          })}
        </div>
      </section>

      <div className="automation-library-toolbar">
        <div className="automation-tabs" role="tablist" aria-label="Фильтр автоматизаций">
          {[["all", "Все"], ["connected", "Подключённые"], ["recommended", "Рекомендуемые"]].map(([value, label]) => (
            <button type="button" role="tab" aria-selected={tab === value} className={tab === value ? "is-active" : ""} onClick={() => setTab(value)} key={value}>{label}</button>
          ))}
        </div>
        <label className="automation-search">
          <MagnifyingGlass size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Искать процесс" aria-label="Искать процесс" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск"><X size={16} /></button>}
        </label>
      </div>

      <div className="automation-library-content">
        {showConnected && connected.length > 0 && (
          <section className="automation-group" aria-labelledby="connected-title">
            <div className="automation-group-heading">
              <h2 id="connected-title">Подключённые</h2>
              <span>{connected.length}</span>
            </div>
            <div className="automation-rows">
              {connected.map((item) => (
                <article className="automation-library-row" key={item.id}>
                  <button className="automation-row-main" type="button" onClick={() => setOpenBuilder(true)}>
                    <span className="automation-row-icon"><Lightning size={20} /></span>
                    <span className="automation-row-copy">
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </span>
                  </button>
                  <span className={`automation-status ${item.status === "active" ? "is-active" : ""}`}>
                    <StatusDot status={item.status} />{item.status === "active" ? "Активна" : "На паузе"}
                  </span>
                  <span className="automation-row-meta"><strong>{item.runs}</strong><small>обработано</small></span>
                  <span className="automation-row-meta"><strong>{item.lastRun}</strong><small>последнее событие</small></span>
                  <span className="automation-row-actions">
                    <IconButton label={item.status === "active" ? "Поставить на паузу" : "Возобновить"} onClick={() => toggle(item.id)}>
                      {item.status === "active" ? <Pause size={18} /> : <Play size={18} />}
                    </IconButton>
                    <IconButton label="Другие действия"><DotsThree size={19} /></IconButton>
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}

        {showRecommended && recommendations.length > 0 && (
          <section className="automation-group automation-recommended" aria-labelledby="recommended-title">
            <div className="automation-group-heading">
              <div>
                <h2 id="recommended-title">Рекомендуемые</h2>
                <p>Mary заметила повторяющуюся работу, которую можно упростить.</p>
              </div>
              <span>{recommendations.length}</span>
            </div>
            <div className="automation-recommendation-grid">
              {recommendations.map((item) => {
                const RecommendationIcon = item.icon;
                return (
                  <article className="automation-recommendation" key={item.id}>
                    <span className="automation-row-icon"><RecommendationIcon size={20} /></span>
                    <span className="automation-recommendation-label">{item.cases}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button className="button secondary" type="button" onClick={() => setOpenBuilder(true)}>Обсудить с Mary <ArrowRight size={16} /></button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {(showConnected ? connected.length : 0) + (showRecommended ? recommendations.length : 0) === 0 && (
          <div className="automation-empty">
            <MagnifyingGlass size={24} />
            <h2>Ничего не найдено</h2>
            <p>Попробуйте изменить запрос или расскажите Mary, какой процесс хотите собрать.</p>
            <button className="button secondary" type="button" onClick={() => setQuery("")}>Сбросить поиск</button>
          </div>
        )}
      </div>
      {openBuilder && <AutomationBuilder onClose={() => setOpenBuilder(false)} />}
    </div>
  );
}

function AutomationBuilder({ onClose }) {
  const [step, setStep] = useState(1);
  return (
    <div className="drawer-scrim">
      <aside className="builder-drawer">
        <div className="context-header"><div><span className="eyebrow">Новая автоматизация</span><h2>Жалоба на дефект</h2></div><IconButton label="Закрыть" onClick={onClose}><X size={20} /></IconButton></div>
        <div className="stepper">{[1, 2, 3].map((item) => <span className={step >= item ? "is-active" : ""} key={item}><i>{step > item ? <Check size={14} /> : item}</i>{["Условие", "Действия", "Проверка"][item - 1]}</span>)}</div>
        <div className="builder-content">
          {step === 1 && <><h3>Когда запускать</h3><p>Mary распознаёт сообщение клиента по смыслу.</p><label className="field-label">Условие<textarea defaultValue="Клиент сообщает, что товар повреждён, напечатан с браком или не соответствует заказу" /></label><div className="example-box"><Sparkle size={20} /><span><strong>Mary понимает формулировки</strong><small>«фото смазанные», «пришло с дефектом», «цвета отличаются»</small></span></div></>}
          {step === 2 && <><h3>Что сделать</h3>{["Найти клиента и последний заказ", "Проверить статус оплаты", "Подготовить черновик ответа", "Создать задачу, если нужна компенсация"].map((item, index) => <div className="action-step" key={item}><span>{index + 1}</span><strong>{item}</strong><DotsThree size={19} /></div>)}</>}
          {step === 3 && <><h3>Перед запуском</h3><div className="review-box"><CheckCircle size={24} /><div><strong>Автоматизация готова</strong><p>Важные действия останутся на подтверждении менеджера.</p></div></div><label className="switch-row"><span><strong>Подтверждать ответы</strong><small>Mary не отправит сообщение самостоятельно</small></span><input type="checkbox" defaultChecked /></label></>}
        </div>
        <div className="builder-footer"><button className="button secondary" type="button" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Отмена" : "Назад"}</button><button className="button primary" type="button" onClick={step === 3 ? onClose : () => setStep(step + 1)}>{step === 3 ? "Запустить" : "Продолжить"}<ArrowRight size={18} /></button></div>
      </aside>
    </div>
  );
}

function KnowledgeScreen() {
  const docs = [
    ["Возвраты и дефекты товаров", "Правила компенсаций, замены и сроки ответа", "Обновлено 18.06.2026", "12 фрагментов"],
    ["Доставка заказов", "Сроки, тарифы и зоны доставки", "Обновлено 20.07.2026", "8 фрагментов"],
    ["Фотокниги и макеты", "Требования к файлам и подготовке макета", "Обновлено 12.07.2026", "24 фрагмента"],
    ["Оплата и чеки", "Способы оплаты и решение частых ошибок", "Обновлено 05.07.2026", "10 фрагментов"],
  ];
  return (
    <div className="page-scroll">
      <SectionHeader icon={BookOpen} title="База знаний" description="Источники, на которые Mary опирается в ответах" actions={<button className="button primary"><Upload size={18} />Добавить источник</button>} />
      <div className="knowledge-layout">
        <aside className="knowledge-nav"><button className="is-active"><FileText size={18} />Все источники<Badge>18</Badge></button><button><Buildings size={18} />Компания</button><button><Package size={18} />Продукты</button><button><ShieldCheck size={18} />Правила</button></aside>
        <div className="knowledge-list">
          <div className="knowledge-health"><CheckCircle size={23} /><div><strong>Mary использует актуальные материалы</strong><p>16 из 18 источников обновлены за последние 90 дней.</p></div><button className="button secondary compact">Проверить</button></div>
          {docs.map((doc) => <article className="document-row" key={doc[0]}><span className="document-icon"><FileText size={21} /></span><span className="document-copy"><strong>{doc[0]}</strong><p>{doc[1]}</p><small>{doc[2]}</small></span><Badge>{doc[3]}</Badge><IconButton label="Открыть"><ArrowRight size={18} /></IconButton></article>)}
        </div>
      </div>
    </div>
  );
}

function TeamScreen() {
  const members = [
    ["Ярослава", "Менеджер", "Онлайн", "9", "98%"],
    ["Вероника", "Менеджер", "Онлайн", "27", "99%"],
    ["Анастасия", "Менеджер", "Не в сети", "46", "98%"],
    ["Элина Емельянчик", "Администратор", "Онлайн", "1", "100%"],
  ];
  return (
    <div className="page-scroll">
      <SectionHeader icon={UsersThree} title="Команда" description="Нагрузка, роли и качество работы" actions={<button className="button primary"><Plus size={18} />Добавить участника</button>} />
      <div className="team-strip"><span><StatusDot status="active" />Сейчас онлайн: 3</span><span>Всего участников: 4</span><span>Среднее качество: 99%</span></div>
      <div className="table-surface">
        <div className="data-row data-head member-grid"><span>Сотрудник</span><span>Роль</span><span>Статус</span><span>Диалогов сегодня</span><span>Качество</span><span /></div>
        {members.map((member) => <div className="data-row member-grid" key={member[0]}><span className="person-cell"><span className="avatar avatar-md">{member[0].split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><strong>{member[0]}</strong></span><span>{member[1]}</span><span><StatusDot status={member[2] === "Онлайн" ? "active" : "paused"} />{member[2]}</span><strong>{member[3]}</strong><strong>{member[4]}</strong><IconButton label="Настройки участника"><DotsThree size={19} /></IconButton></div>)}
      </div>
    </div>
  );
}

function IntegrationsScreen() {
  const integrations = [
    ["Telegram", "Сообщения и уведомления", true],
    ["Instagram", "Входящие сообщения", true],
    ["Email", "Поддержка и заказы", true],
    ["Битрикс24", "Заказы и данные клиентов", false],
    ["Google Calendar", "События и сроки задач", false],
    ["МойСклад", "Товары и остатки", false],
  ];
  return (
    <div className="page-scroll">
      <SectionHeader icon={PlugsConnected} title="Интеграции" description="Каналы и сервисы, через которые работает Mary" />
      <div className="integration-grid">
        {integrations.map(([name, description, connected]) => <article className="integration-item" key={name}><span className="integration-logo"><LinkSimple size={22} /></span><div><h3>{name}</h3><p>{description}</p></div><Badge tone={connected ? "success" : "neutral"}><StatusDot status={connected ? "active" : "paused"} />{connected ? "Подключено" : "Не подключено"}</Badge><button className={`button ${connected ? "secondary" : "primary"} compact`}>{connected ? "Настроить" : "Подключить"}</button></article>)}
      </div>
    </div>
  );
}

function SettingsScreen() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="page-scroll narrow-page">
      <SectionHeader icon={Gear} title="Настройки" description="Параметры компании и правила работы Mary" />
      <div className="settings-layout">
        <aside className="settings-nav"><button className="is-active">Компания</button><button>Mary</button><button>Уведомления</button><button>Безопасность</button></aside>
        <div className="settings-form">
          <section><h2>Профиль компании</h2><p>Эти данные Mary использует в общении с клиентами.</p><div className="form-grid"><label className="field-label">Название компании<input defaultValue="PicPac" /></label><label className="field-label">Часовой пояс<select defaultValue="Europe/Minsk"><option>Europe/Minsk</option></select></label><label className="field-label full-span">Описание<textarea defaultValue="Сервис печати фотографий и создания фотокниг." /></label></div></section>
          <section><h2>Правила Mary</h2><label className="switch-row"><span><strong>Всегда подтверждать ответы</strong><small>Mary готовит черновик, менеджер решает, когда отправить</small></span><input type="checkbox" defaultChecked /></label><label className="switch-row"><span><strong>Предлагать автоматизации</strong><small>Показывать повторяющиеся процессы в диалогах</small></span><input type="checkbox" defaultChecked /></label></section>
          <div className="form-actions">{saved && <span className="saved-message"><CheckCircle size={18} />Сохранено</span>}<button className="button primary" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); }}>Сохранить изменения</button></div>
        </div>
      </div>
    </div>
  );
}

function DashboardFallback({ activeView }) {
  return <div className="page-scroll"><SectionHeader icon={viewMeta[activeView].icon} title={viewMeta[activeView].label} /><div className="empty-state"><Sparkle size={30} /><h2>Раздел связан с Mary</h2><p>Данные из чатов, клиентов и задач появятся здесь автоматически.</p></div></div>;
}

function AppContent({ activeView, search, onOpenClient, onBuildAutomation, automationBuilder, setAutomationBuilder }) {
  if (activeView === "chat") return <ChatScreen onOpenClient={() => onOpenClient(clients[0])} onBuildAutomation={onBuildAutomation} />;
  if (activeView === "inbox") return <InboxScreen onOpenClient={onOpenClient} />;
  if (activeView === "clients") return <ClientsScreen search={search} onOpenClient={onOpenClient} />;
  if (activeView === "tasks") return <TasksScreen onOpenClient={onOpenClient} />;
  if (activeView === "calendar") return <CalendarScreen />;
  if (activeView === "analytics") return <AnalyticsScreen />;
  if (activeView === "automations") return <AutomationsScreen openBuilder={automationBuilder} setOpenBuilder={setAutomationBuilder} />;
  if (activeView === "knowledge") return <KnowledgeScreen />;
  if (activeView === "team") return <TeamScreen />;
  if (activeView === "integrations") return <IntegrationsScreen />;
  if (activeView === "settings") return <SettingsScreen />;
  return <DashboardFallback activeView={activeView} />;
}

function PlatformApp() {
  const [activeView, setActiveView] = useState("inbox");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [automationBuilder, setAutomationBuilder] = useState(false);
  const [toast, setToast] = useState("");

  const navigate = (view) => {
    setActiveView(view);
    setSelectedClient(null);
    window.history.replaceState(null, "", `#${view}`);
  };

  useEffect(() => {
    const requested = window.location.hash.slice(1);
    if (viewMeta[requested]) setActiveView(requested);
  }, []);

  const create = () => {
    if (activeView === "automations") setAutomationBuilder(true);
    else if (activeView === "clients") setToast("Форма нового клиента открыта");
    else if (activeView === "tasks") setToast("Новая задача создана");
    else setToast("Выберите, что создать");
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar activeView={activeView} onNavigate={navigate} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="app-main">
        <Topbar activeView={activeView} onMenu={() => setMobileOpen(true)} search={search} onSearch={setSearch} onCreate={create} />
        <div className="screen-wrap">
          <AppContent activeView={activeView} search={search} onOpenClient={setSelectedClient} onBuildAutomation={() => { navigate("automations"); setAutomationBuilder(true); }} automationBuilder={automationBuilder} setAutomationBuilder={setAutomationBuilder} />
        </div>
      </div>
      {selectedClient && (
        <div className="drawer-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedClient(null); }}>
          <ClientContextPanel client={selectedClient} onClose={() => setSelectedClient(null)} onFullProfile={() => { setSelectedClient(null); navigate("clients"); }} />
        </div>
      )}
      {toast && <div className="toast"><CheckCircle size={19} />{toast}</div>}
    </div>
  );
}

export function App() {
  const requestedPage = new URLSearchParams(window.location.search).get("page");
  const path = window.location.pathname;
  const isPlatform =
    path === "/platform" || path === "/platform/" || requestedPage === "platform";
  const isBeauty = path === "/beauty" || path === "/beauty/" || requestedPage === "beauty";
  const isCustom = path === "/custom" || path === "/custom/" || requestedPage === "custom";
  const isOnboarding = path === "/onboarding" || requestedPage === "onboarding";
  const isBlog = path === "/blog" || path === "/blog/" || requestedPage === "blog";
  const isJobs = path === "/jobs" || path === "/jobs/" || requestedPage === "jobs";
  const isContacts = path === "/contacts" || path === "/contacts/" || requestedPage === "contacts";
  if (isOnboarding) return <Onboarding />;
  const articleSlug = path.startsWith("/blog/")
    ? path.replace("/blog/", "").replace(/\/$/, "")
    : requestedPage === "article"
      ? new URLSearchParams(window.location.search).get("slug") || ""
      : "";
  if (articleSlug) return <ArticlePage slug={articleSlug} />;
  if (isBlog) return <BlogPage />;
  if (isJobs) return <JobsPage />;
  if (isContacts) return <ContactsPage />;
  if (isPlatform) return <PlatformApp />;
  if (isBeauty) return <BeautyLanding />;
  if (isCustom) return <CustomLanding />;
  return <PlatformLanding />;
}
