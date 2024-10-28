# Code Complexity Analyzer

A [Next.js](https://nextjs.org) application that analyzes code complexity using Claude AI (Anthropic's API). The analyzer provides insights about cyclomatic complexity, cognitive complexity, and suggestions for improvement.

-- with help from [Cursor](https://www.cursor.com/) Composer --

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Anthropic API key

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-repo/code-complexity-analyzer.git
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. Create a `.env.local` file in the root directory:

```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To get your Anthropic API key:

1. Visit [Anthropic's Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file
