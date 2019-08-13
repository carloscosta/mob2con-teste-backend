# Teste Backend

Olá avaliador!

O objetivo desse teste foi avaliar minha proficiência em algumas áreas chaves do dia-a-dia de backender na Mob2con, desenvolvendo APIs, como:

* Autenticação para Arquitetura stateless (visando escalabilidade)
* Boas praticas de RESTful apis
* Integridade e Organização de código
* Controle de deploy e ci (é um diferencial)

Tentei estruturar o teste conforme solicitado por vocês, de tal forma que eu pudesse sentir um gostinho da temática da Mob2con, que trabalha, 
principalmente, com o controle de **visitantes** para **redes varejistas**. O cenário do teste é só um recorte da realidade, sem muita aplicação 
na solução final.

## Antes de começar...

Esta aplicação utiliza:

* JWT para autenticação
* Banco de dados relacional, de preferência [PostgreSQL](https://customer.elephantsql.com/instance). 
  Mas portável para outros vendors

## As Histórias

Tenha em mente somente o barramento de serviços, ok? Somente a API RESTful.

1. Como administrador, preciso fazer o controle (crud) Redes Varejistas para dar entrada em novos clientes.
2. Como administrador do sistema, preciso fazer o controle (crud) de usuários de cada rede para que mais pessoas utilizem o sistema.
3. Como usuário da rede, preciso me logar no sistema para fazer operações.
4. Como usuário da rede, preciso me deslogar no sistema para impedir que outros se passem por mim.
5. Como usuário da rede, preciso fazer o controle (crud) de visitantes a rede, para que possamos registrar suas entradas e saídas.
6. Como usuário externo, não autenticado, preciso do numero total de redes e seus visitantes. 

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
* Controle de deploy e ci. Esse não é um item obrigatório, mas seria muito bacana você descrever seu processo. 
  Pontos extras para o uso de `Docker` e `Docker Compose`.

# Para executar 

    $ git clone https://github.com/carloscosta/mob2con-teste-backend
    $ npm install

use o comando abaixo para (re)criar database

    $ npm run restart:db 

# Testes

Rode o comando

    $ npm test

Para ver os resultados de testes da API

    > mob2con-teste-backend@1.0.0 test /home/crncosta/Public/mob2con-teste-backend
> mocha --exit



Running on http://localhost:3000
  GET / route
    ✓ should return 302 status

  GET /api route: get total of networks and its visitors
    ✓ should return 200 status

  POST /api/networks route: create new network
    ✓ should return 201 status (904ms)

  GET /api/networks route: get all networks
    ✓ should return 200 status (42ms)

  GET /api/networks/$cnpj route: get networks by $cnpj
(sequelize) Warning: Model attributes (cnpj) passed into finder method options of model Network, but the options.where object is empty. Did you forget to use options.where?
    ✓ should return 200 status (41ms)

  PUT /api/networks/$cnpj route: update network name by $cnpj
    ✓ should return 204 status (84ms)

  POST /api/users route: create a given user
    ✓ should return 200 status (72ms)

  GET /api/users route: get all users
    ✓ should return 200 status (40ms)

  GET /api/users/$login route: get user by $login
    ✓ should return 200 status (50ms)

  PUT /api/users/$login route: update user by $login
    ✓ should return 204 status (80ms)

  POST /api/login route: login a given user
    ✓ should return 201 status (113ms)

  POST /api/logout route: logout an user session
    ✓ should return 204 status (46ms)

  DELETE /api/networks/$cnpj route: delete network by $cnpj
    ✓ should return 204 status (38ms)

  DELETE /api/users/$login route: delete user by $login
    ✓ should return 204 status (41ms)

  GET /api/visitors/ route: get visitors
    ✓ should return 200 status (78ms)

  GET /api/visitors/$login route: get visitors by $login
    ✓ should return 200 status (75ms)

  DELETE /api/visitors/$login route: delete visitors by $login
    ✓ should return 204 status (69ms)


  17 passing (2s)

