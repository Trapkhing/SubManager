# SubManager

SubManager is a premium, privacy-focused subscription tracker built with Next.js. It allows you to manage your recurring expenses, visualize your monthly spending, and keep your data safe on your own device.

![SubManager Preview](/app/opengraph-image.png)

## Features

- **Privacy First**: Local-first architecture. Your data is stored in your browser's Local Storage and never leaves your device.
- **Data Backup**: Export and Import your data as JSON. Control your backups.
- **PWA Support**: Install SubManager as a native app on iOS, Android, and Desktop.
- **Smart Tracking**: Automatic calculation of monthly/yearly costs.
- **Multi-Currency**: Support for major currencies including GHS, USD, EUR, GBP.
- **Premium Aesthetic**: Minimalist, dark-mode design with fluid animations.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Persistence**: Local Storage (via custom hooks)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/trappkhing/submanager.git
    cd submanager
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or npm install
    ```

3.  **Configure Environment Variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and add your keys (optional):
    - `NEXT_PUBLIC_LOGO_DEV_TOKEN`: Get a free token from [Logo.dev](https://www.logo.dev/) for better logo resolution.
    - `NEXT_PUBLIC_APP_URL`: Your deployment URL (default: http://localhost:3000).

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/):
1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the environment variables.
4.  Deploy.

## License

MIT License.

## Author

Built by [@trappkhing](https://twitter.com/trappkhing).
