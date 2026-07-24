# Web Resume — Best Patcharapon

Personal portfolio website built with **Next.js 15 + React 19** (migrated from Ruby on Rails).
Features a responsive bento-grid design, interactive profile card stack, animated skill marquee,
projects carousel with lightbox, and an AI chatbot powered by Groq.

## Setup

```bash
npm install
```

Create `.env.local` with your Groq API keys (get one at https://console.groq.com):

```
GROQ_API_KEY=your_key_here
GROQ_API_KEY_2=your_backup_key_here   # optional fallback
```

Never commit `.env.local` — it is gitignored.

## Development

```bash
npm run dev
```

Open http://localhost:3002

## Production

```bash
npm run build
npm start
```

## Editing content

All resume data (skills, projects, experiences, typing texts) lives in `lib/data.js`.
Styles are in `app/homepage.css` and `app/chatbot.css`.
