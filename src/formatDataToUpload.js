const snippets = require ('./dataToUpload');

let dataForKV = []
let i = 421 // start = biggest ID + 1
for (let el of snippets.snippets){
	const base64data = Buffer.from(el, 'utf8').toString('base64')
	let data = {
		"key" : `${i}`,
		"value" : base64data,
		"base64" : true
	}

	dataForKV.push(data)
	i += 1
}
// console.log(dataForKV)

const fs = require('fs');
fs.writeFile('dataForKv.json', JSON.stringify(dataForKV), function (err) {
  if (err) return console.log(err);
});

// wrangler kv:bulk put dataForKv.json --preview --binding="NEWS"
// wrangler kv:bulk put dataForKv.json --preview false --binding="NEWS"