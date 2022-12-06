document.querySelector('#enviar').addEventListener('click', consulta);

async function consulta(){
    if(document.querySelector("img") !== null){
        document.querySelector("img").remove();
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '428ed3a953msh02d5768a4e04aecp18be4ejsn2ad602cc0f35',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    let pesquisa = document.querySelector("#pesquisa").value;
    let resposta = await fetch('https://spotify23.p.rapidapi.com/search/?q='+pesquisa +'&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
    .then(response => response.json())
    .catch(err => console.error(err));
    console.log(resposta);

    let imagemData = await fetch(resposta.albums.items[0].data.coverArt.sources[0].url);
    let imagem = await imagemData.blob();
    const imageObjectURL = URL.createObjectURL(imagem);
    let img = document.createElement('img');
    img.setAttribute("class", "img");
    img.src = imageObjectURL;
    resultados.appendChild(img);
}