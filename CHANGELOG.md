# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.14. The 17 tools keep their names and arguments, and every difference below was measured against 2.0.1, the last version on npm, before release.

- **A person approves each paid render and template change over MCP.** All six still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `CREATOMATE_CONFIRM=model` makes it enough everywhere. The audit log records who approved each one.
- **`CREATOMATE_ALLOW_DESTRUCTIVE=0` still refuses all six**, confirmed or not, as 2.0 did.
- **Creatomate's status picks the exit code.** A request Creatomate rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 402 and 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that renders a video from a template took a median of 83,234 input tokens over the CLI instead of 103,721 (five runs each): every 2.0.1 run guessed a `render` command that does not exist, because 2.0.1's help listed none, and every 3.0.0 run asked `which`.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`creatomate-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **Less work to start.** Each input schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 167 ms of CPU before its first answer where 2.0.1 spent 223, and answers in 119 ms of wall time instead of 141 (median of 21 runs, taking turns on one busy Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were deferred; the version table says 3.0.0; and the exit codes include 1.

### Upgrading

Over MCP, expect an approval prompt or form before a paid render or a template change; a headless agent that should make them with `confirm: true` alone needs `CREATOMATE_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error's JSON keeps `error` and `status`; its `code` is now Slipway's (`usage`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`). Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `CREATOMATE_READ_ONLY=1`, a client that calls a hidden write gets "tool not found" instead of a refusal naming `CREATOMATE_READ_ONLY`; the CLI still names it. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `CREATOMATE_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 227 tokens, for `which`, `install`, the flags and the exit codes it now lists; the command list by 17; and a missing argument's error by 15, for its code and a hint. The tool list on the wire is 66 tokens longer, because each of the six carries a flag Claude Code reads to show its own approval prompt; with every tool loaded, Claude Code spends 24 fewer. `SKILL.md` is 58 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.1, 2026-10-04

- **`npx -y @thenavidm/creatomate-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `creatomate-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.0 - 2026-10-03

- Modernize the five-tool private MCP as the shared house TypeScript CLI, local stdio MCP and versioned desktop bundle.
- Use current V2 template CRUD and single-object renders; retain documented V1 feed reads and explicit legacy tag/transcript submission.
- Force free dry_run validation, preserve advisory errors/warnings, and require confirmation for six paid/template operations on both surfaces.
- Add isolated private project profiles, exact reviewed one-to-ten render batches, bounded unique status reads, stop-on-failure receipts and no automatic replay/polling.
- Remove undocumented render listing/page arguments and PDF format claims; document changed v2 payload/result shapes.
- Preserve AGPL/private legacy history and maintain complete client/OS setup, current alternatives, version history, topics/keywords and quality evidence.

## 1.0.0 - private legacy source

Five MCP registrations on V1, no declared task CLI. Private history is retained; no earlier owned public npm release is assumed.

| Component | Verified local version |
| --- | --- |
| Owned package / desktop | 2.0.0 |
| Runtime | Node22+ |
| API | V2 templates/renders, documented V1 feeds/tag compatibility |
| @modelcontextprotocol/sdk | 1.32.0 |
| ajv | 8.20.0 |
| ajv-formats | 3.0.1 |
| typescript | 7.0.2 |
| vitest | 5.0.3 |
| vite | 8.3.2 |
| @anthropic-ai/mcpb | 2.1.2 |


The private 1.0.0 package exposed five MCP tools and no CLI. Version2.0.0 preserves list_templates, get_template, create_render and get_render names while changing their native contract deliberately: rendering uses payload JSON on /v2/renders and returns one object; templates use current v2 sources/tag filters. list_renders and old page/per_page arguments are removed because current docs do not establish those endpoints/options. Do not send requests to guessed paths for compatibility. PDF is absent from the documented render formats; it is no longer advertised.

Raw v2 RenderScript is top-level. Native legacy source/tags/transcripts require create_legacy_render and explicit approval; v1 results are arrays. All paid/template operations require confirmation and both read-only policy and private credential routing are enforced. Full client docs, package keywords, topics, dated changelog, annotated tags, public npm/desktop artifacts and complete guide are maintained together.

Fifty-two behavior/shared-CLI tests, local build/typecheck and full/read-only stdio discovery passed with fixture-only credentials. The official SDK’s actual startRender comparison used injected HTTP. Public source/platform CI/npm/desktop/CMS checks must be recorded separately in release proof before claiming publication. Actual account outcomes, desktop GUI, fresh matched successful Codex task/token usage and private site deployment remain pending.
