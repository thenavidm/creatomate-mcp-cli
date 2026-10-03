# Changelog

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
