# Community Care

A community-driven platform where people create, join and track social service events in their local area, such as winter clothes drives in Mirpur and blanket distribution in Mohammadpur.

**Live site:** https://community-care-client.vercel.app
**Server repo:** https://github.com/richibinte26/community-care-server

## Features
- Register and log in with email and password (uppercase, lowercase and 6+ characters required) or with GitHub
- Browse upcoming events only; past events are hidden automatically
- Create events with validation, including a future-date check
- Join events with one click; duplicate joins are blocked
- Manage your own events: update or delete (owner only, enforced on the server)
- Joined Events page sorted by event date
- Profile page to update your name and photo
- Light and dark theme toggle, loading skeletons, and a fully responsive design
- JWT-protected API: the server verifies every protected request

## Tech Stack
Next.js (App Router), Tailwind CSS, shadcn/ui, Better Auth, MongoDB, Express.js