# getRandomNewsSnippet
Code for my CloudFlare Worker

The worker `src/index.ts` retrieves a random value from a key-value store (hosted on CloudFlare Workers KV), and returns it.
It is published as an API at `https://getrandomnewssnippet.lucienbill.workers.dev/`
