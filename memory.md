# Project Memory: Antigravity CLI Integration

This document records the modifications made to the Pixel Agents repository to support the Antigravity CLI alongside Claude Code.

## 1. Core Integration (Hook Providers)
- Extracted the provider logic to support multiple CLI tools.
- Added `providerId` to `AgentState` and `PersistedAgent` interfaces in `server/src/types.ts`.
- Created a centralized Provider Registry (`server/src/providers/index.ts`).
- Created a new `HookProvider` specifically for Antigravity in `server/src/providers/hook/antigravity/antigravity.ts` which uses the `agy` CLI command and passes the necessary arguments (like `--session-id` and `--dangerously-skip-permissions`).
- Refactored `AgentRuntime` to iterate over registered providers instead of being hardcoded to Claude.
- Abstracted `getHookProvider` utility in `server/src/providerRegistry.ts` to be used by the event handler, file watcher, and transcript parser.

## 2. VS Code Extension & Webview Adapters
- Updated `adapters/vscode/agentManager.ts` to dynamically use the `buildLaunchCommand` from the corresponding provider when a new terminal is launched.
- Updated `adapters/vscode/PixelAgentsViewProvider.ts` to initialize `AgentRuntime` with both Claude and Antigravity providers.
- Updated the React Webview UI (`webview-ui/src/App.tsx` and `webview-ui/src/components/Toolbar.tsx`) to add the **+ Antigravity** button next to the existing Claude button.
- Updated the AsyncAPI schema (`core/asyncapi.yaml`) to add `providerId` to the `launchAgent` payload.

## 3. Build & Packaging
- Fixed ESLint import sorting errors (`simple-import-sort`) that were preventing compilation.
- Successfully built the custom extension into a local `.vsix` file (`pixel-agents-1.3.0.vsix`) using `vsce package`.
- Updated `README.md` to include an **Antigravity CLI Edition** section explaining how to install the custom `.vsix` file from GitHub Releases.

## 4. Git & Deployment
- Connected the local repository to the user's GitHub fork: `https://github.com/J-Aqsal/pixel-agents-agy.git` (`myfork`).
- Pushed the source code to the `dev` branch of the fork.
- Guided the user on how to manually create a GitHub Release and attach the `.vsix` artifact for easy distribution.

## Notes for Future Development
- The system now natively supports a **Dual-Mode Architecture** via the `HookProvider` interface.
- Adding any new CLI agent (like Cursor, Codex, OpenCode) only requires creating a new provider module in `server/src/providers/hook/` and registering it in `index.ts`.
