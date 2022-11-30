document.querySelector('#enviar').addEventListener('click',consulta);

async function consulta(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '428ed3a953msh02d5768a4e04aecp18be4ejsn2ad602cc0f35',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    let pesquisa = document.querySelector('#pesquisa').value;
    let resposta = await fetch('https://spotify23.p.rapidapi.com/album_metadata/?id='+pesquisa+'', options)
    .then(response => response.json())
    .catch(err => console.error(err));
    console.log(resposta);

    let resultados = document.querySelector('#resultados');
    let texto = "<h1>Capa solicitada</h1>";
    resultados.innerHTML = texto;

    let imagemData = await fetch(resposta.data.album.coverArt.sources[0].url);
    let imagem = await imagemData.blob();
    const imageObjectURL = URL.createObjectURL(imagem);
    let img = document.createElement('img');
    img.src = imageObjectURL;
    resultados.appendChild(img);
}