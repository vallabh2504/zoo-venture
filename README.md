# Zoo-Venture 🦁

A world-class interactive children's game built with React, Tailwind CSS, and Framer Motion.

## Features
- **Big Five Animals**: Lion, Elephant, Giraffe, Dog, Cat (substituted for variety).
- **Mystery Guest Flow**: Hidden animal -> Sound Mimic -> Reveal.
- **Admin Controls**: Hidden top-right corner toggle for parents to control the flow.
- **Celebration**: Confetti and sound effects on success.
- **Design**: Playful Safari/Glassmorphism theme.

## Tech Stack
- React 19 + Vite
- Tailwind CSS 4
- Framer Motion
- React Confetti
- Use-Sound
- Lucide React Icons

## Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Deployment (Vercel)

To deploy to Vercel:

1.  Push the code to GitHub:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/vallabh2504/zoo-venture.git
    git push -u origin main
    ```

2.  Connect to Vercel:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard)
    - Click "Add New Project"
    - Import `zoo-venture` from GitHub
    - Deploy!

## How to Play
1.  **Mystery Phase**: An animal card appears, hiding the name.
2.  **Mimic Phase**: Click the speaker icon to hear the sound. Ask the child to mimic it!
3.  **Reveal**: Click the **Hidden Admin Button** (top-right corner) to reveal controls.
    - **Blue Button**: Reveal the name.
    - **Green Check**: Success (Confetti!).
    - **Red X**: Try again.
    - **Purple Button**: Next animal.

Enjoy the Zoo-Venture! 🦒🐘🦁
