# ChatThing

A sleek, privacy-first AI chat application that runs entirely in your browser. It supports multiple AI providers for maximum flexibility, including **Ollama** (default), **Google AI (Gemini)**, **OpenRouter**, and Chrome's built-in **Prompt API** for 100% local conversations.

## 📊 Test Coverage

| Coverage Type         | Percentage                                              |
| --------------------- | ------------------------------------------------------- |
| **Total**             | ![Total Coverage](./.badges/total.svg)                  |
| **Unit Tests**        | ![Unit Test Coverage](./.badges/unit.svg)               |
| **Integration Tests** | ![Integration Test Coverage](./.badges/integration.svg) |
| **E2E Tests**         | ![E2E Test Coverage](./.badges/e2e.svg)                 |

> **Note**: Total coverage represents the union of all covered lines across all test types. A line is considered covered if it's executed by any test type (unit, integration, or e2e). We maintain a rigorous **~90% coverage** target for all new features.

## ✨ Features

- **Multi-Provider Support** — Seamlessly switch between **Ollama**, **Google AI (Gemini)**, **OpenRouter**, and Chrome's built-in **Prompt API**.
- **Privacy First** — Local-first architecture with optional AES-GCM encrypted storage for cloud provider API keys.
- **Experimental Tools** — Toggle advanced capabilities like AI Tools (Web Search, Weather, etc.) via the dedicated Experiments Panel.
- **Frictionless Security** — Session-based unlocking that only prompts for your master password right before you need an API key.
- **Installable PWA** — Install ChatThing as a native-like app on any device with full offline support.
- **Multimodal Interactions** — High-quality image compression and rendering for vision-capable models.
- **Deep Analytics** — Comprehensive usage tracking including message volume, token usage, and tool breakdown by provider and model.
- **Vibrant Theming** — High-contrast themes (Light/Dark/Vibrant) with refined markdown and code block styling.
- **SSR Pre-rendered** — Optimized loading performance powered by TanStack Start and server-side pre-rendering.

## 🔧 Tech Stack

| Category               | Technology                                   |
| ---------------------- | -------------------------------------------- |
| **Framework**          | React 19 with TypeScript                     |
| **Build Tool**         | Rolldown-Vite (Optimized bundle split)       |
| **Routing**            | TanStack Router                              |
| **Styling**            | Tailwind CSS v4                              |
| **State Management**   | nanostores                                   |
| **AI Integration**     | Vercel AI SDK + Google + OpenRouter + Ollama |
| **Data Visualization** | Recharts + TanStack Table                    |
| **Testing**            | Vitest + Playwright (Unit/Int/E2E)           |
| **Formatting**         | Prettier + Tailwind & Import Sorting         |
| **Linting**            | Oxlint (Ultra-fast linting)                  |
| **Deployment**         | Vercel (with SSR pre-rendering)              |

## 📋 Browser Requirements

While ChatThing works in any modern browser using providers like **Ollama**, **Google AI**, or **OpenRouter**, the **100% Local AI** experience using the **Prompt API** specifically requires:

| Browser | Minimum Version | AI Model    |
| ------- | --------------- | ----------- |
| Chrome  | 138+            | Gemini Nano |
| Edge    | 138+            | Phi mini    |

### Enabling the Prompt API (Optional)

<details>
<summary><strong>Chrome Setup</strong></summary>

1. Enable the following flags:
   - [`Prompt API for Gemini Nano`](chrome://flags/#prompt-api-for-gemini-nano)
   - [`Prompt API for Gemini Nano with Multimodal Input`](chrome://flags/#prompt-api-for-gemini-nano-multimodal-input)
   - [`Enables optimization guide on device`](chrome://flags/#optimization-guide-on-device-model)
2. Restart Chrome
3. Visit [`chrome://on-device-internals/`](chrome://on-device-internals/) to download the model

</details>

<details>
<summary><strong>Edge Setup</strong></summary>

1. Enable the following flag:
   - [`Prompt API for Phi mini`](edge://flags/#prompt-api-for-phi-mini)
2. Restart Edge
3. Visit [`edge://on-device-internals/`](edge://on-device-internals/) to download the model

</details>

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Yarn 4+ (Yarn PnP mode)

### Installation

```bash
git clone https://github.com/JesseKoldewijn/ChatThing.git
cd ChatThing
yarn install
```

### Development

```bash
yarn dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Available Scripts

| Command                  | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `yarn dev`               | Start development server with HMR                  |
| `yarn build`             | Build for production (client + server + prerender) |
| `yarn lint`              | Run Oxlint + Prettier check                        |
| `yarn lint:fix`          | Auto-fix linting and format code                   |
| `yarn test`              | Run unit tests in watch mode                       |
| `yarn test:integration`  | Run integration tests                              |
| `yarn test:e2e`          | Run Playwright E2E tests                           |
| `yarn test:all:coverage` | Run all test types and generate combined coverage  |
| `yarn test:badges`       | Generate coverage badge SVGs                       |

## 🤝 Contributing

We follow a **Test-Driven Development (TDD)** approach. When contributing:

1. Ensure all new logic has corresponding tests.
2. Maintain high statement coverage (>90% for UI, 100% for stores/utils).
3. Run `yarn lint:fix` before committing to ensure consistent formatting.

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Live Demo**: [ai.jereko.dev](https://ai.jereko.dev)
- **Chrome Prompt API Docs**: [developer.chrome.com](https://developer.chrome.com/docs/ai/built-in)
