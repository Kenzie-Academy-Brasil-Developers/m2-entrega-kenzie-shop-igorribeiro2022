class Criando {
    static criarCards(urlImagem, descricao, preco, precoAntigo) {
        const secaoCards = document.getElementById("secaoCards");
        const divCard = document.createElement("div");
        const figureCard = document.createElement("figure");
        const imgCard = document.createElement("img");
        const estrelasCard = document.createElement("div");
        const descricaoCard = document.createElement("p");
        const precoCard = document.createElement("p");
        const buttonCard = document.createElement("button");
        const sectionPreco = document.createElement("div")
        const precoDeCard = document.createElement("p")

        divCard.classList.add("card");
        secaoCards.append(divCard);

        figureCard.classList.add("figureCard");
        figureCard.appendChild(imgCard)

        imgCard.classList.add("imagemCard");
        imgCard.setAttribute("src", urlImagem);

        descricaoCard.classList.add("descricaoCard");
        descricaoCard.innerText = descricao;
        
        precoCard.classList.add("precoCard");
        precoCard.innerText = `R$ ${preco}`;
        
        if (precoAntigo !== undefined) {
            precoDeCard.setAttribute("id", "precoAntigo");
            precoDeCard.innerText = `De: R$ ${precoAntigo}`;
            sectionPreco.append(precoDeCard)
        }

        sectionPreco.append(precoCard)
        sectionPreco.setAttribute("id", "divSectionPreco")

        buttonCard.classList.add("buttonComprar");
        buttonCard.innerText = "Comprar";

        divCard.append(figureCard, descricaoCard, sectionPreco, buttonCard)
    }
}


function apiShop() {
    fetch("https://m2-kenzie-shop.herokuapp.com/products")
        .then(responseObject => responseObject.json())
        .then(data => {
            let preco;
            let precoAntigo;

            for (let i = 0; i < data.products.length; i++) {
                const urlimg = `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${data.products[i].id}/Image.png`;

                if (data.products[i].promotionStatus) {
                    preco = data.products[i].price.productPromotionPrice;
                    precoAntigo = data.products[i].price.productPrice

                    Criando.criarCards(urlimg, data.products[i].productName, preco, precoAntigo)

                } else {
                    preco = data.products[i].price.productPrice;
                    Criando.criarCards(urlimg, data.products[i].productName, preco)
                }

                console.log(data.products[i])
            }
        })
}
apiShop()