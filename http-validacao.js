const fetch = (...args) => import('node-fetch')
  .then(({default: fetch}) => fetch(...args));

function manejaErros(erro) {
  throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
  try {
    //promises e async await
      const arrayStatus = await Promise
      .all(arrayURLs
        .map(async url => {
          const res = await fetch(url)
          return `${res.status} - ${res.statusText}`;
    }))
    return arrayStatus;
  } catch (erro) {
    manejaErros(erro);
  }
}

function geraArrayURLs(arrayLinks) {
  //loop para cada { chave: valor }
  //pega um objeto e retorna um valor
  //Object.values(objeto)
  return arrayLinks
    .map(objetoLink => Object
      .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {
  const links = geraArrayURLs(arrayLinks);
  const statusLinks = await checaStatus(links);
  //spread operator são os ...
  const resultados = arrayLinks.map((objeto, indice) => ({
    ...objeto, status: statusLinks[indice]
  }))
  return resultados;
}

module.exports = validaURLs;