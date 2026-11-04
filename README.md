# PPCC 2026 Conference Knowledge Base

> **Internal use only.** Contains Microsoft slide images (some marked *Microsoft Confidential*) and customer-specific observations. Keep this repository **private**.

Structured notes from the **Power Platform Community Conference 2026** (Las Vegas, Oct 27–29, 2026), combining notes from **Gino Cuccia** and **Anthony**. This repo is the data source for a future interactive Power Apps **code app** that will replace the static leadership report.

## Repository layout

```
data/
  conference.json            # themes, recommendations, platform comparison, key dates,
                             # open questions (with answers + sources), follow-ups, resources
  sessions/NN-<id>.json      # one file per session (11 total)
assets/slides/<session-id>/  # cleaned slide images (photos straightened/enhanced, PDF pages)
docs/                        # PPCC 2026 Conference Summary.docx (leadership report)
notes/anthony/               # Anthony's original notes (.docx) + Markdown conversion
source/                      # original slide decks (PDF)
scripts/make_data.py         # regenerates data/*.json (edit content here or in the JSON directly)
```

## Session data model

Each `data/sessions/*.json` file:

| Field | Type | Description |
|---|---|---|
| `id`, `order` | string, int | Stable key and display order |
| `title`, `deckTitle` | string | Session and official deck title |
| `speakers` | string[] | Presenters |
| `date`, `time` | string | ISO date / 24h time when known |
| `attendedBy` | string[] | `gino`, `anthony` |
| `tags` | string[] | Topic tags for filtering |
| `summary`, `whyItMatters` | string | Short summary and leadership framing |
| `keyPoints` | `{heading, text, source[]}`[] | Main content; `source` = whose notes |
| `announcements` | `{name, status, eta?, notes?}`[] | Features with status / ETA |
| `perspectives` | `{ <author>: string[] }` | "How this applies to my work" notes |
| `openQuestions`, `resources` | string[] | Follow-ups and links |
| `slidesDir`, `slides`, `keySlides` | string / string[] | Image folder, all slides, highlighted slides |

## Sessions

| # | Session | Attended by | Slides |
|---|---|---|---|
| 1 | Keynote (Charles Lamanna) | Gino, Anthony | – |
| 2 | DevOps in Power Platform / Managed Operations | Gino, Anthony | 48 |
| 3 | The New AI Development Cycle (Engineer Up) | Anthony | – |
| 4 | Beyond the Basics: the GitHub Copilot Harness | Gino, Anthony | 22 |
| 5 | Full Stack with Code Apps (TALXIS) | Gino, Anthony | 14 |
| 6 | The Copilot Compass | Gino, Anthony | 42 |
| 7 | Power Platform Security and Advisor | Anthony | – |
| 8 | Copilot-First Design: Plans and Generative Pages | Anthony | – |
| 9 | Build Fast, Govern Better | Gino | 15 |
| 10 | Managed Run Apps vs Power Pages | Gino | – |
| 11 | Managed Identity and VNet (slides only) | – | – |

## Ideas for the code app

- Home: themes, top recommendations, key-dates timeline
- Session browser: filter by tag / attendee, slide carousel using `keySlides`
- Compare view: Gino vs Anthony perspectives per session
- Tracker: open questions and GCC-availability follow-ups with status
- Platform chooser: interactive version of `platformComparison`

Load data with a static import (e.g., `import conference from '../data/conference.json'`) or move it into Dataverse tables later (`Session`, `KeyPoint`, `Announcement`, `FollowUp`).

## Conference Quest (Power Apps code app)

`conference-quest-app/` is a just-for-fun retro game version of these notes, rebuilt from a Claude Design prototype. Gino and Anthony walk the conference hallway. Each of the 11 sessions is a classroom deck built from `data/sessions/*.json`, with key points, announcements, key slide photos, perspectives and open questions. An expo hall built from `data/conference.json` sums up the big takeaways and is open from the start. The "boring document" option downloads `docs/PPCC 2026 Conference Summary.docx`.

- Environment: **Development** (Cuccia Home), solution **PowerPlatformConference**
- Play: https://apps.powerapps.com/play/e/cb3e4efb-5403-e59f-aafa-9d41ea217a1b/app/d464dfd9-acce-41f5-b289-28cb8fc1f260?tenantId=714f79a0-a041-4111-aad1-9f67d8939a8e
- Content comes straight from `data/` and `docs/` at build time. Edit the JSON (or `scripts/make_data.py`), then rebuild and push.
- Build and deploy steps, decisions and IDs: [conference-quest-app/memory-bank.md](conference-quest-app/memory-bank.md)
