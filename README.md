# Redpoint Developer Portal

Developer portal for integrating Puntored’s financial APIs across LATAM.  
Includes a public site (Getting Started, products, changelog, sandbox) and a documented UI library via Storybook.

---

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**:
  - Tailwind CSS 3 + custom Redpoint design tokens
  - Radix UI primitives (wrapped in `components/ui/*`)
  - `next-themes` for light/dark mode
  - `lucide-react` icons
- **State & data**:
  - `@tanstack/react-query` for data fetching & caching
  - `next-intl` for internationalization (`es` / `en`)
- **Forms & validation**:
  - `react-hook-form`
  - `zod` + `@hookform/resolvers`
- **Docs / Design System**:
  - Storybook 10 (`@storybook/nextjs-vite`)
- **HTTP**:
  - `axios` (see `lib/http/axiosClient.ts`)

---

## Project structure (overview)

### App routes

- `app/[locale]/layout.tsx`  
  Locale layout. Wraps the app with:
  - `NextIntlClientProvider` for translations.
  - `Providers` (React Query + Theme + Country context).
  - `Navbar` and `Footer` around `children`.

- `app/[locale]/getting-started/page.tsx`  
  **Getting Started** guide (`GettingStartedPage`) with:
  - Onboarding steps.
  - Progress tracking.
  - Code snippets for sandbox usage.

- `app/[locale]/changelog/page.tsx`  
  **Changelog** page (`ChangelogPage`) rendered from mocked changelog data.

- `app/api/sandbox/execute/route.ts`  
  API route used as a **sandbox executor**, simulating calls to Puntored’s APIs.

### Key components

- `components/Navbar.tsx`  
  - Main navigation: Home, Products, Getting Started, Changelog.
  - Language switcher (`next-intl`) and country switcher (`useCountry`).
  - Contact CTA that opens the `ContactFormDialog`.
  - Mobile nav using `Sheet`.

- `components/Footer.tsx`  
  - Branding, sections (Platform, Resources, Company).
  - Links to Postman Collection, support, blog, etc.
  - “Request more information” CTA, also opening `ContactFormDialog`.

- `components/ContactFormDialog.tsx`  
  - Dialog with a full **contact form**:
    - Corporate email, first name, last name, phone, role.
    - Company sector, country, region (region depends on country).
    - Free text message and marketing consent checkbox.
  - Uses `react-hook-form` + `zod` (via `useContactForm`):
    - All fields validated through a Zod schema.
    - On submit, logs `"[CONTACT_FORM_SUBMIT]", values` with a fully typed payload.
    - Closes the dialog after successful submit (ready to be wired to a real API).

- `components/CodeBlock.tsx`  
  - Multi-language code snippet component using tabs:
    - Supported languages: `curl`, `javascript`, `python`, `php`.
  - Terminal-like header and a copy‑to‑clipboard button.
  - Used to display example requests for the APIs.

### Infra & context

- `components/providers.tsx`  
  - Wraps children with:
    - `QueryClientProvider` (React Query).
    - `ThemeProvider` (`next-themes`, with optional `forcedTheme`, used by Storybook).
    - `CountryProvider` for the selected country context.

- `components/theme-provider.tsx`  
  - Thin wrapper around `next-themes`:
    - `attribute="class"`.
    - `defaultTheme="system"`.
    - `forcedTheme` prop to force `light` or `dark` (used by Storybook toolbar).

### Mocks & data

- `lib/mocks/onboarding.mock.ts`  
  - Onboarding steps, sample code snippets, country list and version summary for the Getting Started page.

- `lib/mocks/changelog.mock.ts`  
  - Changelog entries for the changelog route.

- `lib/mocks/products.mock.ts`  
  - Large mocked catalog of products, ready to fuel a future Products page.

- `hooks/useContactForm.ts`  
  - Encapsulates:
    - `contactFormSchema` (Zod).
    - `useForm` with `zodResolver`.
    - Country → region logic.
    - `handleSubmit` that logs the validated payload and calls an optional callback.

---

## Design system (UI)

Base components live in `components/ui` (shadcn‑style, customized):

- Core elements:
  - `Button`, `Input`, `Textarea`, `Checkbox`, `Select`, `Label`.
- Layout & content:
  - `Card`, `Badge`, `Tabs`, `Accordion`, `Separator`, `ScrollArea`, `Table`.
- Overlays & feedback:
  - `Dialog`, `Sheet`, `DropdownMenu`, `Toast`, `Alert`, `Progress`.

Each of these has a dedicated Storybook story under **UI/** (`*.stories.tsx`), with small but realistic examples (sandbox flows, transactions, API context).

Composite components with stories:

- `components/CodeBlock.stories.tsx` – multi-language API snippet block.
- `components/Navbar.stories.tsx` – navigation bar wired with mocked `next-intl` + mocked App Router.
- `components/Footer.stories.tsx` – full footer layout.

---

## Storybook

### Configuration

- `/.storybook/main.ts`:

```ts
stories: [
  "../stories/**/*.mdx",
  "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  "../components/**/*.stories.@(ts|tsx)",
],
addons: [
  "@chromatic-com/storybook",
  "@storybook/addon-vitest",
  "@storybook/addon-a11y",
  "@storybook/addon-docs",
  "@storybook/addon-onboarding",
],
framework: "@storybook/nextjs-vite",
```

- `/.storybook/preview.tsx`:
  - Imports `../app/globals.css`.
  - Wraps all stories with `Providers`, so React Query, Theme and Country context work like in the app.
  - Declares a **global `theme` control** (`light` / `dark`) exposed in Storybook’s toolbar:
    - The selected theme is passed as `forcedTheme` to `ThemeProvider`.
    - This drives `next-themes` and switches the entire design between light and dark modes.

### Running Storybook

```bash
cd redpoint-2
npm install --legacy-peer-deps   # first time, to resolve peer deps
npm run storybook                # http://localhost:6006
```

---

## Sandbox API

- `app/api/sandbox/execute/route.ts` exposes a route that:
  - Receives sandbox requests from the frontend.
  - Returns mocked responses simulating real Puntored API behavior.
  - Intended as a safe test environment before hitting production endpoints.

---

## Development scripts

From `redpoint-2/package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "format": "prettier --check .",
  "format:fix": "prettier --write .",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

Typical usage:

```bash
# App
cd redpoint-2
npm run dev          # http://localhost:3000

# Storybook
npm run storybook    # http://localhost:6006

# Lint / format
npm run lint
npm run format:fix
```

---

## Environment & configuration

- The project is mostly driven by mocks and internal routes, so it runs locally without heavy `.env` configuration.
- To connect to real Puntored APIs later:
  - Add environment variables (`client_id`, `client_secret`, base URLs…) to `.env.local`.
  - Update `lib/http/axiosClient.ts` and/or API routes under `app/api/*` to use those variables.

---

## Summary

This repo provides:

- A **Next.js developer portal** with:
  - i18n and country‑aware navigation.
  - Guided Getting Started flow.
  - Changelog and sandbox execution route.
  - Validated contact form ready to be wired to a backend.

- A **documented design system**:
  - Tailwind + Radix‑based components in `components/ui`.
  - Storybook with light/dark themes, realistic examples and composite components (Navbar, Footer, CodeBlock).

