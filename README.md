# venom-whatsapp-bot

<h3 align="center">
Automatização para envio de grandes volumes de mensagens ! 🚀
</h3>

## Visão Geral

O objetivo desse projeto é fornecer uma ferramenta que automatize o processo de envio de mensagens para um grande número de contatos.

O projeto esta em evolução e ganhará novas funcionalidades conforme o avanço de seu desenvolvimento.

## Instalação

1° Clone para sua máquina e instale as dependências

```
$ git clone https://github.com/valdecirdev/venom-whatsapp-bot.git <dir>
$ cd <dir>
$ yarn install
```

2° Edite o arquivo ``` "config.json" ``` com suas preferências.

3° Escreva a mensagem desejada no arquivo ``` "message.txt" ``` localizado na pasta ``` "data" ```.

4° Você também pode configurar uma imagem a ser enviada editando o arquivo ``` "image.json" ``` localizado na pasta ``` "data" ```.

5° Liste os contatos dentro do array no arquivo ``` "contacts.json" ``` localizado na pasta ````"data" ```, no formato [cod. pais][ddd][numero]@c.us. Ex.: "5511981814481@c.us".

6° Para iniciar o envio das mensagens execute o comando ``` "yarn start" ```.


## Dependências

Este projeto se baseia no "venom-bot" para se comunicar com o whatsapp.

## Contribuições

Para relatar bugs ou propor melhorias a serem implementadas utilize o Issues ou via [email](mailto:valdecir.junoir@outlook.com).

[Valdecir Junior](https://github.com/valdecirdev) - Planejamento e Desenvolvimento