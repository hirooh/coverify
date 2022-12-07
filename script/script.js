document.querySelector('#enviar').addEventListener('click', consulta);
document.querySelector('#pesquisa').addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      consulta();
    }
});

async function consulta(){
    // API config
    const optionsDeezer = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '428ed3a953msh02d5768a4e04aecp18be4ejsn2ad602cc0f35',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    // coleta pesquisa do input
    let pesquisa = document.querySelector("#pesquisa").value;
    let resposta = await fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q='+pesquisa, optionsDeezer)
    .then(response => response.json())
    .catch(err => console.error(err));
    console.log(resposta);

    if(resposta.total == 0){
        const urlItunes = new URL('https://itunes.apple.com/search');
        const paramsItunes = { term: pesquisa, media: 'music', country: 'br'}
        let cors = "https://cors-anywhere.herokuapp.com/";
        urlItunes.search = new URLSearchParams(paramsItunes);
        let resposta = await fetch(cors + urlItunes)
        .then(response => response.json())
        console.log(resposta);

        // coleta imagem da api Itunes
        let imagemData = await fetch(resposta.results[0].artworkUrl100);
        let imagemDataURL = imagemData.url;
        imagemDataURL = imagemDataURL.replace("/100x100", "/1000x1000");
        imagemData = await fetch(imagemDataURL);
        let imagem = await imagemData.blob();
        const imageObjectURL = URL.createObjectURL(imagem);
        let img = document.createElement('img');
        img.setAttribute("class", "img");
        img.setAttribute("alt", "album artwork");
        img.src = imageObjectURL;
        resultados.appendChild(img);

        // coleta dados do lançamento da api Deezer
        let info = resposta.results[0].artistName;
        info = info + " - " + resposta.results[0].collectionName;
        document.querySelector(".infoTexto").innerHTML = info;

    }
    else{
        // coleta imagem da api Deezer
        let imagemData = await fetch(resposta.data[0].album.cover_xl);
        let imagem = await imagemData.blob();
        const imageObjectURL = URL.createObjectURL(imagem);
        let img = document.createElement('img');
        img.setAttribute("class", "img");
        img.setAttribute("alt", "album artwork");
        img.src = imageObjectURL;
        resultados.appendChild(img);

        // coleta dados do lançamento da api Deezer
        let info = resposta.data[0].artist.name;
        info = info + " - " + resposta.data[0].album.title;
        document.querySelector(".infoTexto").innerHTML = info;
    }
    
    // impede a repetição da mesma imagem
    while(document.querySelectorAll('.img').length !== 1){
        document.querySelector(".img").remove();
    }

}
