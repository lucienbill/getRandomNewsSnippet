/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	NEWS: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		/* returns an element from the kv store :
			- if a 'key' is sent in headers -> retrieves the value of the key
			- else : retrieves the  value of a random key
		*/
		let key=request.headers.get("key")
		if (key == null){
			const keys = await env.NEWS.list()
			const randomIndex = Math.floor(keys.keys.length * Math.random())
			key = keys.keys[randomIndex].name
		} 
		let data = await env.NEWS.get(key, { cacheTtl: 24*60*60 })
		if (data == null){
			data = `<h2>Erreur</h2><p>Aucune donnée ne correspond à la clé demandée (${key})</p>`
		}

		return new Response(
			JSON.stringify(data),
			{headers: {
				'Access-Control-Allow-Origin': '*',
				'key': key 
			}}
		);
	},

};
