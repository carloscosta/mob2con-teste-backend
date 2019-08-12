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
* Banco de dados relacional, de preferência postgres. Mas portável para outros vendors

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
    $ npm run restart:db 
