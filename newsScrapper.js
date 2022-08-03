// Script pour transformer tous mes extraits de newsletter en une base de données

// A exécuter dans le browser

titles = document.querySelectorAll(".link-title") 
scrapped = []

// for each article
for (let t of titles){
  let el;
  // get title + link
  let linkTitle = t.children[0]
    el = `<h2><a title='lien vers la ressource' href='${linkTitle.href.replace(/[&?]utm.*$/,'')}'>${linkTitle.text}</a></h2>`
  let descriptionNode = t.parentNode.childNodes[3];
  
  // clean each element of the description
  let descriptionInnerHTML = ""
  for(let c of descriptionNode.children){
    const elementClass = c.classList[0]
    switch (elementClass) {
      case "revue-p":
          descriptionInnerHTML += `<p>${c.innerHTML}</p>`
          break;
          
      case "revue-blockquote":
        descriptionInnerHTML += `<blockquote>${c.innerHTML}</blockquote>`
        break;
    
      default:
        descriptionInnerHTML += c.outerHTML
        break;
    }
  }

  // remove unwanted stuff
  descriptionInnerHTML = descriptionInnerHTML
  .replaceAll(/class=\"[^"]*\"/g, "")
  .replaceAll(/style=\"[^"]*\"/g, "")
  .replaceAll("?utm_campaign=Les%20Technews%20de%20Billy&amp;utm_medium=email&amp;utm_source=Revue%20newsletter", "")
  .replaceAll("utm_campaign=Les%20Technews%20de%20Billy&amp;utm_medium=email&amp;utm_source=Revue%20newsletter", "")
  .replaceAll(" target=\"_blank\"", "")
  .replaceAll(" >", ">")
  .replaceAll(" </p>", "</p>")
  .replaceAll("<p></p>", "")

  el += descriptionInnerHTML
  
  scrapped.push(el)
}
scrapped
