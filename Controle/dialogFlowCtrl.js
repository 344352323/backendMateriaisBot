import { obterCardMateriais } from "../funcoesDialogFlow/funcoesDlFlow.js";
import Pedido from '../Modelo/pedido.js';
import Materiais from '../Modelo/materiais.js'

export default class DialogFlowCtrl {

    processarIntencoes(requisicao, resposta) {
        //verificar se a inteção é 'Default Welcome Intent'
        if (requisicao.method === 'POST') {
            const intencao = requisicao.body.queryResult.intent.displayName;

            //como identificar a origem da requisição do dialogFlow: messenger, slack, etc
            const origem = requisicao.body?.originalDetectIntentRequest?.source;
            if (intencao === 'IntencaoUsuario') {
                //devolver uma resposta para o DialogFlow
                if (origem) {
                    //cards no formato custom
                    obterCardMateriais('custom').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text" : [
                                    "Bem vindo à Loja Matéco Materiais para Construção",
                                    "Escolha uma das opções abaixo: \n"
                                ]
                            }
                        });
                        respostaDF.fulfillmentMessages.push(...listaCards);
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text" : [
                                    "Qual material você deseja?",
                                ]
                            }
                        })
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        "Erro ao recuperar menu: \n",
                                        "Não foi possivel consultar o menu de materiais",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    })

                }
                else {
                    obterCardMateriais('messenger').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type" : "description",
                                    "title" : "Bem vindo à Loja Matéco Materiais para Construção",
                                    "text" : [
                                        "Estamos muito felizes em ter você por aqui",
                                        "Esses são nossos materiais de construção: \n"
                                    ]
                                }]]
                            }
                        });
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push(...listaCards);
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type" : "description",
                            "title" : "Qual item você deseja?",
                            "text" : []
                        });
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type" : "description",
                                    "title" : "Erro ao recuperar o menu: \n",
                                    "text" : [
                                        "Não foi possivel consultar o menu",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }]]
                            }
                        });

                    })
                }
            }
            else if(intencao === "RegistroLocalEntrega"){
                let materiais = [];
                let qtds = [];
                for(const contexto of requisicao.body.queryResult.outputContexts){
                   if(contexto.parameters.material){
                     materiais = contexto.parameters.material;
                     qtds = contexto.parameters.material;
                   }
                }
                const dataHoje = new Date ().toLocaleDateString();
                let itensPedido = [];
                for(let i=0; i<materiais.length; i++){
                    itensPedido.push({
                        "codigo":0,
                        "material": materiais[i],
                        "qtd": qtds[i]
                    })
                    
                }
                const enderecoEntrega = `Rua: ${requisicao.body.queryResult.parameters.location['street-address']}`;
                const pedido = new Pedido(0,dataHoje,itensPedido);
                pedido.gravar().then(()=>{
                    if(origem){
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        `Ok seu pedido nº ${pedido.id} foi separado com sucesso!\n`,
                                        `Logo sairá para entrega no seu endereço : ${enderecoEntrega} .Muito obrigado(a) por comprar em nossa loja, volte sempre =)\n`,
                                        `Agradecemos a preferência`,
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    }
                    else{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type" : "description",
                                    "title" : `Ok seu pedido nº ${pedido.id} foi separado com sucesso!\n`,
                                    "text" : [
                                        `Logo sairá para entrega no seu endereço : ${enderecoEntrega} .Muito obrigado(a) por comprar em nossa loja, volte sempre =)\n`,
                                        `Agradecemos a preferência`,
                                    ]
                                }]]
                            }
                        });
                    }
                })
                .catch((erro)=>{
                    if(origem){
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        `Erro ao registrar o seu pedido\n`,
                                        `Erro : ${erro.message}`,
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    }
                    else{
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type" : "description",
                                    "title" : `Erro ao registrar o seu pedido\n`,
                                    "text" : [
                                        `Erro : ${erro.message}`
                                    ]
                                }]]
                            }
                        });
                    }
                });

            }

        }
    }
}