import { obterCardMateriais } from "../funcoesDialogFlow/funcoesDlFlow.js";

export default class DialogFlowCtrl {

    processarIntencoes(requisicao, resposta) {
        //verificar se a inteção é 'Default Welcome Intent'
        if (requisicao.method === 'POST') {
            const intencao = requisicao.body.queryResult.intent.displayName;

            //como identificar a origem da requisição do dialogFlow: messenger, slack, etc
            const origem = requisicao.body?.originalDetectIntentRequest?.source;
            if (intencao === 'Default Welcome Intent') {
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

        }
    }
}