import Material from "../Modelo/materiais.js";

export function criarMessengerCard(){
  return {
    type: "info",
    title: "",
    subtitle: "",
    image: {
      src: {
        rawUrl: ""
      }
    },
    actionLink: ""
  }
}

export function criarCustomCard(){
  //exibir nos ambientes padrões, tais como: ambiente de teste do DialogFlow, slack, etc
  return {
    card: {
      title: "",
      subtitle: "",
      imageUri: "",
      buttons: [
        {
          text: "botão",
          postback: ""
        }
      ]
    }
  }
}

export async function obterCardMateriais(tipoCard = "custom"){
  const materialModelo = new Material();
  const listaMateriais = await materialModelo.consultar();
  const listaCards = [];
  for (const material of listaMateriais){
    let cartao;
    if (tipoCard == "custom"){
      cartao = criarCustomCard();
      cartao.card.title = material.descricao;
      cartao.card.subtitle = `valor: R$ ${material.valor}`;
      cartao.card.imageUri = material.urlImagem;
      cartao.card.buttons[0].text = "Clique aqui para mais informações";
      cartao.card.buttons[0].postback = "https://www.leroymerlin.com.br/materiais-de-construcao";
    } else{
      //card para messenger
      cartao = criarMessengerCard();
      cartao.title = material.descricao;
      cartao.subtitle = `valor: R$ ${material.valor}`;
      cartao.image.src.rawUrl = material.urlImagem;
      cartao.actionLink = "https://www.leroymerlin.com.br/materiais-de-construcao";
    }
    listaCards.push(cartao);
  }
  return listaCards;
}
