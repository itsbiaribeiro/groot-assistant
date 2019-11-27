const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1'); // watson sdk
require('dotenv').config(); 

let fimConversa = false

const ASSISTANT_IAM_URL = process.env.ASSISTANT_IAM_URL
const ASSISTANT_IAM_APIKEY = process.env.ASSISTANT_IAM_APIKEY
 
const chatbot = new watson({
    'version': '2018-02-16',
    'url': ASSISTANT_IAM_URL || '<url>',
    'iam_apikey': ASSISTANT_IAM_APIKEY || '<iam_apikey>',
    'iam_url': process.env.IAM_URL
  });
 
  var payload = {
    workspace_id: process.env.WORKSPACE_ID,
    context: {},
    input: {}
  };
 
  //Começando a conversação com a mensagem vazia;
  chatbot.message(payload, function trataResposta(err, resposta){
 
    if(err){
        console.log(err);
        return;
    }

    //detecta intenção
    if(resposta.intents.length > 0){
        console.log('Eu detectei a intenção: ' + resposta.intents[0].intent);
        if(resposta.intents[0].intent = 'despedida'){
            fimConversa = true;
        }
    }
 
    // exibe a resposta do dialogo,caso exista
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text[0]);
    }
    //verifa contexto
    //console.log(resposta.context);

    if(!fimConversa){
    const mensagemUsuario = prompt('>>');
    chatbot.message({
        workspace_id,
        input: {text: messagemUsuario},
        context: resposta.context
    }, trataResposta);
    }

  });
