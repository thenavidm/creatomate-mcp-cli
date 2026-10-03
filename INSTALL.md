# Install Creatomate MCP Server & CLI

One npm package includes both binaries and all **17 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Creatomate project REST API access; provider project plans, key permissions and API quota apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | creatomate-cli | Scripts and agents with a shell |
| Local MCP | creatomate-mcp | AI clients supporting stdio |
| Desktop archive | creatomate-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Creatomate-hosted alternative | https://api.creatomate.com/mcp | Official remote provider-hosted access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and quota with Creatomate instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/creatomate-mcp-cli@latest
creatomate-cli --version
creatomate-cli
creatomate-cli list-templates --help
creatomate-cli schema create-render
creatomate-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/creatomate-mcp-cli@latest creatomate-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/creatomate-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

### Private project API keys

1. Open the intended project in [Creatomate](https://creatomate.com), then Project Settings → API Integration. The editor’s Use Template → Integrate with API also shows the template ID and integration examples.
2. Save that project’s API key outside repositories. Set CREATOMATE_TOKEN_FILE to an absolute owner-private token-only file, or set CREATOMATE_API_KEY in private client settings. A profile is a project, not an account-wide unrestricted connection.
3. Run creatomate-cli doctor for local settings. Deliberately run doctor --network for one GET /v2/templates: it reports count, not full template data. Success proves that request, not account ownership, every endpoint or rendering quality.
4. Read the intended template’s source and the current [provider guide](https://creatomate.com/llms.txt). Prepare the exact requested design; use validate_render before paid submission. A free provider dry run returns effective source, errors and warnings.
5. Approve only the requested paid render or template mutation. Do not submit a render just to test installation.

Keys are project-specific and sent only to api.creatomate.com in Authorization: Bearer. Named {name,api_key,token_file} profiles never fall back to a global key or another profile. The exact selected label and requested IDs matter. login prints setup instructions only; it does not store credentials, start OAuth, load .env or reuse official MCP sessions. The hosted official MCP supports OAuth or project-key Bearer access separately, and reaches one project per connection.

Token files override the selected profile’s environment key and are cached until restart. Use a canonical private directory (0700) and regular absolute non-symlink file (0600), at most 64 KiB, on macOS/Linux. Windows users must restrict ACLs to themselves; POSIX mode checks do not prove Windows ACL protection. GUI and remote clients have their own environment and filesystem.

### Credits, plans and limits

This AGPL wrapper is free; provider access, credits, media rights and external generation services remain separate. Check [current pricing](https://creatomate.com/pricing), your project and API Log before approving spending. A provider dry run with dry_run:true uses no credits and queues nothing. Our validate_render forces that flag; preview_render_batch is local only and does not validate through the provider.

Current credit documentation states one credit per image. Video credits depend on width × height × frame_rate × duration / 100000000, rounded up, with subtitle/provider rules and actual plan behavior still relevant. A half-scale draft is approximately one quarter of full-resolution video credits, not free. Current free-plan output is clamped so both dimensions are at most 480 pixels. Wrapper limits are not a spending cap or reliable quote; inspect the provider estimate under Single Export and actual API Log usage.

The current API rate limit is 30 requests per ten seconds per account, across projects. Every request counts; X-RateLimit-Remaining and Retry-After report provider guidance. Default 350 ms process-wide spacing serializes starts across this client’s project profiles. Other processes/apps still share the provider limit. There is no automatic retry, including 429/402, redirects, network timeouts and 5xx. Respect Retry-After before an intentional repeat; do not replay an unknown paid submission.

JSON request bodies are capped at 1 MiB, API responses at 5 MiB. Local exact batches contain one to ten separate v2 submissions; status batches contain one to twenty unique IDs. Native v1 tag rendering can select any number of matching templates and is explicitly not covered by the exact-batch count bound. Provider render concurrency is separate from accepted request rate; a planned job can remain queued. Webhooks are preferred over repeatedly polling large batches.

### Rotation, disconnection and retention

Rotate/revoke the intended project key through provider settings, update private files/config and restart every process using it. Removing npm or a client entry does not revoke a key or undo submissions. Official OAuth connections can be revoked through Account Settings → MCP Connections; removing a client-side connector alone does not revoke the provider grant.

Generated renders, status records, snapshots and download URLs expire after 30 days. Template input media is a different retention scope. Save requested finished files to your own storage through an explicitly approved external workflow; this wrapper never automatically fetches media or uploads files. Current v2 template deletion is soft deletion, recoverable for 30 days; no undocumented wrapper restore endpoint is added. Keep keys, project profiles, source/media URLs and private render metadata out of public issues.


```bash
export CREATOMATE_TOKEN_FILE='/absolute/private/creatomate.txt'
creatomate-cli doctor --network
```

```powershell
$env:CREATOMATE_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\creatomate.txt'
creatomate-cli doctor --network
```

### Agent-guided installation

> Help me install Creatomate MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not change or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add creatomate -- npx -y @thenavidm/creatomate-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.creatomate]
command = "npx"
args = ["-y", "@thenavidm/creatomate-mcp-cli@latest"]
env_vars = ["CREATOMATE_API_KEY", "CREATOMATE_TOKEN_FILE", "CREATOMATE_ACCOUNTS", "CREATOMATE_DEFAULT_ACCOUNT", "CREATOMATE_READ_ONLY", "CREATOMATE_ALLOW_DESTRUCTIVE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user creatomate -- npx -y @thenavidm/creatomate-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `creatomate-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/creatomate-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Requests use Authorization: Bearer at the fixed Creatomate endpoint. Use the intended project API key; named profiles are configured separately in private client environments.
4. Enable read-only if you want only the 11 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "creatomate": {
      "command": "npx",
      "args": ["-y", "@thenavidm/creatomate-mcp-cli@latest"],
      "env": {
        "CREATOMATE_API_KEY": "YOUR_PRIVATE_API_KEY",
        "CREATOMATE_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/creatomate-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "creatomate": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/creatomate-mcp-cli@latest"],
      "env": {
        "CREATOMATE_API_KEY": "${env:CREATOMATE_API_KEY}",
        "CREATOMATE_TOKEN_FILE": "${env:CREATOMATE_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "creatomate-api-token", "description": "Creatomate API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "creatomate-token-file", "description": "Optional private token-file path (leave empty for API key)"}
  ],
  "servers": {
    "creatomate": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/creatomate-mcp-cli@latest"],
      "env": {
        "CREATOMATE_API_KEY": "${input:creatomate-api-token}",
        "CREATOMATE_TOKEN_FILE": "${input:creatomate-token-file}"
      }
    }
  }
}
~~~

Start Creatomate through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Creatomate in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "creatomate": {
      "command": "npx",
      "args": ["-y", "@thenavidm/creatomate-mcp-cli@latest"],
      "env": {
        "CREATOMATE_API_KEY": "YOUR_PRIVATE_API_KEY",
        "CREATOMATE_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/creatomate-mcp-cli.git
cd creatomate-mcp-cli
docker build -t creatomate-mcp-cli .
docker run --rm -i -e CREATOMATE_API_KEY creatomate-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/creatomate-mcp-cli@latest`, stdio transport, and private local CREATOMATE_API_KEY or CREATOMATE_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Creatomate's official server rather than this local stdio command.

## Verify

```bash
creatomate-cli doctor
creatomate-cli doctor --network
creatomate-cli list-accounts --agent
creatomate-cli list-templates --agent
creatomate-cli get-template --template-id YOUR_TEMPLATE_ID --agent
```

Local doctor verifies presence/settings, not authentication. Network doctor deliberately reads compact template metadata and prints its count. It does not verify account ownership or submit a render. Read-only discovery leaves eleven tools and refuses hidden confirmed mutations.

## Multiple accounts

Set CREATOMATE_ACCOUNTS privately to unique {name,api_key,token_file} project profiles. CREATOMATE_DEFAULT_ACCOUNT selects the exact label and defaults to the first configured profile. --account selects one project for that operation; no wildcard/all-accounts expansion occurs.

Missing selected credentials fail rather than inheriting CREATOMATE_API_KEY or another profile. A token_file overrides only that profile’s key. Restart after rotation because loaded credentials are cached. list_accounts reports labels/default/auth-method availability without keys or file paths; it does not prove which provider project a key reaches.

The official hosted MCP already supports one project per connection and project-specific URLs for multiple connections. These are acknowledged useful official controls. The owned profile routing serves local scripts/shared MCP workflows and does not claim provider project isolation is unique.

## Updates and removal

```bash
npm install -g @thenavidm/creatomate-mcp-cli@latest
creatomate-cli --version
npm uninstall -g @thenavidm/creatomate-mcp-cli
codex mcp remove creatomate
```

npx @latest resolves when a process starts; restart/reconnect for a released update. Global npm and desktop bundles require explicit updates. Install the new versioned .mcpb and verify its reported version. Remove client entries and revoke provider key/OAuth grants separately. Uninstalling does not undo renders/template edits, revoke keys or copy expiring output into permanent storage.

## Troubleshooting

| Symptom | Check / next action |
| --- | --- |
| Exit10 | Exact profile’s key/file, owner permissions and GUI environment; no global fallback |
| 401/403 | Intended project key and provider permissions; hosted OAuth is a different credential |
| 402/429 | Balance/request limit, Retry-After and concurrent clients; no automatic paid replay |
| 400 with hint | Inspect provider hint/docs; basic local acceptance is not RenderScript validation |
| valid:false | Correct dry-run errors; no render was queued |
| valid:true but bad design | Inspect source, media availability, external keys and actual visual output |
| 202 with warnings/errors | Job may still be queued/spend credits; inspect status, not a silent retry |
| Low resolution | Current free-plan 480-pixel clamp, render_scale and max dimensions |
| Render URL not ready | Wait for succeeded through an intentional read or webhook |
| URL/status expired | Provider retention is 30 days; retrieve permanent copies separately |
| Review hash mismatch | Same profile label, exact payloads and order; re-review changed work |
| Partial paid batch | Inspect known IDs and uncertain failed request; later items are unattempted |
| list_renders / page rejected | No current documented render-list or paging contract was carried forward |
| Source object rejected in v2 | Use raw top-level elements; legacy v1 source is a separate tool |
| Desktop rejected | Host/runtime/custom-extension policy; protocol and GUI installation differ |


## Development

```bash
git clone https://github.com/thenavidm/creatomate-mcp-cli.git
cd creatomate-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/creatomate-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
