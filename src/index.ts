#!/usr/bin/env node
import{StdioServerTransport}from'@modelcontextprotocol/sdk/server/stdio.js';import{buildServer,VERSION}from'./server.js';import{runCli,exitCodeFor}from'./cli.js';import{runDoctor}from'./doctor.js';import{basename}from'node:path';
const HELP=`Creatomate MCP and shared CLI ${VERSION}
creatomate-mcp                        Local stdio MCP
creatomate-cli <command> --help       Actual shared arguments
creatomate-cli schema <command>       Actual JSON input schema
creatomate-cli doctor [--network]     Local settings / explicit template read
creatomate-cli login                  Private setup instructions only
CREATOMATE_API_KEY / _TOKEN_FILE      Private project API key
CREATOMATE_ACCOUNTS                   Named isolated JSON project profiles
CREATOMATE_DEFAULT_ACCOUNT            Exact project profile label
CREATOMATE_READ_ONLY=1                Hide and directly refuse paid renders/template mutations
CREATOMATE_ALLOW_DESTRUCTIVE=0         Refuse mutations even when confirmed
CREATOMATE_REQUEST_TIMEOUT_MS         Default 30000; no automatic retries
CREATOMATE_MIN_REQUEST_INTERVAL_MS    Default 350; process-wide pacing across profiles
`;
async function main():Promise<void>{const args=process.argv.slice(2),command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Get a project API key from Creatomate Project Settings → API Integration at https://creatomate.com. Store only privately in CREATOMATE_API_KEY or an absolute owner-only CREATOMATE_TOKEN_FILE. Named CREATOMATE_ACCOUNTS profiles never inherit a global key. Official hosted MCP OAuth is separate. login prints instructions only; it does not store a key, open OAuth or purchase access.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('creatomate-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
