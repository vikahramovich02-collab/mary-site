# Prototype Instructions

## Mandatory product context

Before changing code, UX, copy, navigation, state, mock data, or a user flow:

1. Read `PLATFORM_CONTEXT.md`.
2. Read the relevant section in `MARY_END_TO_END_USER_FLOW.md`.
3. Read the target section's `*_USER_FLOW.md`.
4. Inspect the current implementation and adjacent views that share the same
   entities.

Do not implement a page as an isolated mock. For every change, identify:

- the user role and permissions;
- the incoming route and carried entity IDs;
- the outgoing routes;
- the source-of-truth entities that change;
- the context passed to Mary;
- confirmation and impact-preview requirements;
- view state that must survive drawers, modals, navigation, and Back;
- effects on Inbox, Clients, Tasks, Calendar, Automations, Analytics, Knowledge,
  Integrations, Team, and Settings where applicable.

If the request conflicts with the cross-platform model, preserve the documented
entity relationships and explain the conflict before changing them. Use
`CODEX_TASK_BRIEF.md` as the per-screen task template.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Mary product direction

- Use the selected Mary mockups as the visual source of truth: white and soft-gray surfaces, charcoal typography, thin dividers, restrained radii, minimal elevation, and compact outline icons.
- Keep the chat experience central. Operational records should feel like connected context around Mary rather than a separate legacy CRM.
- The Chat navigation item opens the full-page Mary workspace for longer discovery,
  analysis, and solution-building sessions. The global "Ask Mary" action opens a
  compact contextual window on top of the current operational page. They share
  conversation history but use different layouts.
- CRM is an expandable navigation group containing Inbox, Clients, Tasks, Calendar, and Analytics.
- Client data, conversations, tasks, and automations must feel connected across screens and use consistent mock entities.
- The Clients section is list-first and has no separate client profile page.
- Clicking a client opens a right-side context drawer while preserving the current
  list, search, filters, sorting, pagination, and scroll position.
- Client conversations open as a focused modal above the list and drawer. Mary
  opens as a separate modeless floating window and never obscures the client drawer.
- Tasks are board/list-first and have no separate task page. Selecting a task opens
  a right-side context drawer while preserving the current view, filters, sorting,
  pagination, and scroll position.
- Task creation and meaningful task edits happen conversationally through Mary.
  Keep only safe, obvious task actions such as take, complete, reopen, and open
  related context directly available.
- Calendar entries for task deadlines reference the same task entity; never create
  a duplicate calendar copy. Changing the deadline updates Tasks and Calendar
  together.
- Calendar event details open in a right-side context drawer. Creating, rescheduling,
  and editing events happens through Mary, with explicit confirmation before
  notifications or linked records change.
- Analytics is action-first rather than dashboard-first. Lead with a short summary,
  a small set of defined metrics, and issues that require attention. Every metric
  must drill down to source conversations, clients, team members, or automation
  runs in a right-side context drawer.
- Do not gamify team analytics or rank employees on a single metric. Show workload,
  response time, quality, complexity, and data sufficiency together.
- Mary may explain trends and propose actions, but must distinguish facts,
  hypotheses, and data limitations.
- Knowledge is source-first and reviewable. Users must be able to see what Mary
  understood, which source supported an answer, whether it is current, and where
  it is used. New or materially changed sources require a Mary summary and user
  confirmation before they affect answers or automations.
- Conflicting knowledge sources must never be resolved silently. Mary explains the
  difference, asks for the applicable business rule, and safely escalates affected
  customer cases until the conflict is resolved.
- Integration setup is conversational through Mary. Explain the business purpose,
  requested data, permitted actions, and downstream impact before external
  authorization. Request the minimum permissions and keep technical configuration
  out of the default experience.
- Integration tests must not send real customer messages or mutate production
  records. Pausing or disconnecting an integration must preserve existing clients,
  tasks, conversations, knowledge history, and audit records.
- Team views distinguish people and AI agents while using one responsibility model:
  scope, availability, workload, quality, handoff rules, and linked work. Never turn
  the team page into a public leaderboard.
- Team members and AI agents open in right-side context drawers rather than separate
  profile pages. Role, access, workload redistribution, absence, and agent behavior
  changes happen through Mary with an impact preview.
- Settings are read-first summaries, not dense administration forms. Content-level
  settings change through Mary: the user describes the desired business rule, Mary
  shows current versus proposed behavior and affected sections, and the user
  confirms. Only safe personal preferences may use direct controls.
- Settings follow explicit precedence: legal and safety constraints, company rules,
  automation rules, channel or team rules, then one-off confirmed actions. Mary
  must surface conflicts and never create hidden exceptions.
- Avoid decorative dashboards, bright status colors, gradients, glassmorphism, nested cards, and emoji icons.

## Workflow canvas source of truth

- Match the user's workflow reference: a wide freeform white canvas with compact rounded nodes, visible left/right ports, thin dark connectors, and smooth curved branches.
- Node color is semantic and must remain visible: trigger nodes use charcoal, Mary/agent tasks use blue, employee steps use orange, and question/condition nodes use soft neutral gray.
- Trigger nodes include the small `Старт` pill. Decision branches use small dark `Да` and `Нет` pills placed directly on their outgoing connectors.
- Preserve the reference card anatomy: colored outer frame/header, white content body, plain-language title and description, small assignee row, and a compact overflow action.
- Do not simplify the canvas into a vertical stepper, table, list, or generic monochrome flowchart.
- The canvas explains the automation visually. Configuration happens conversationally through Mary, not through technical property forms, rule builders, schemas, or workflow jargon.
- Selecting a node highlights it and opens a Mary conversation scoped to that step. Mary asks plain business questions and summarizes the proposed change before applying it.
