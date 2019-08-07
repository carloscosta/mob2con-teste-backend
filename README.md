# Teste Backend
Olá candidato!

O objetivo desse teste é avaliar sua proficiência em algumas áreas chaves do seu dia-a-dia de backender aqui na Mob2con, desenvolvendo APIs, como:
* Autenticação para Arquitetura stateless (visando escalabilidade)
* Boas praticas de RESTful apis
* Integridade e Organização de código
* Controle de deploy e ci (é um diferencial)

Tentamos estruturar um teste pra você sentir um gostinho da temática da Mob2con, que trabalha, principalmente, com o controle de **visitantes** para **redes varejistas**. Mas, não se preocupe, o cenário do teste é só um recorde da realidade, sem muita aplicação na solução final. Ou seja, não utilizaremos seu código internamente.

## As Histórias
Tenha em mente somente o barramento de serviços, ok? Precisamos somente da API RESTful.
1. Como administrador, preciso fazer o controle (crud) Redes Varejistas para dar entrada em novos clientes.
2. Como administrador do sistema, preciso fazer o controle (crud) de usuários de cada rede para que mais pessoas utilizem o sistema.
2. Como usuário da rede, preciso me logar no sistema para fazer operações.
3. Como usuário da rede, preciso me deslogar no sistema para impedir que outros se passem por mim.
4. Como usuário da rede, preciso fazer o controle (crud) de visitantes a rede, para que possamos registrar suas entradas e saídas.
5. Como usuário externo, não autenticado, preciso do numero total de redes e seus visitantes. 

## Entidades
Usuário
* nome (texto)
* usuário (texto)
* senha (texto)
* rede (Rede) 

Rede 
* cnpj (string)
* nome (string)

Visitante 
* nome (texto)
* rede (Rede)


## Então...

É isso... Sem muito mistério, certo? Mas vamos a alguns diferenciais.
* Testes Unitários (Muito importante!)
* Controle de deploy e ci. Esse não é um item obrigatório, mas seria muito bacana você descrever seu processo. Pontos extras para o uso de `Docker` e `Docker Compose`.

## Quando terminar
Faça o upload de seu codigo para uma conta publica do github, gitlab ou afim pra darmos uma olhada e te retornaremos.

Muito Obrigado!