[![Coverage Status](https://coveralls.io/repos/github/jvolima/clean-architecture/badge.svg?branch=master)](https://coveralls.io/github/jvolima/clean-architecture?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

# Aprendizados adquiridos ao criar essa aplicação:

## Clean Architecture no React
### Como funciona?
- Um componente no React deve apenas renderizar a interface e controlar estados.
- Para que isso ocorra, deve-se utilizar uma arquitetura capaz de fazer com que a regra de negócio da aplicação não dependa de ninguém. 
- Além de que a aplicação deve ser testável, escalável e desacoplada de serviços externos.
- Com esse intuito a Clean Architecture foi criada, e basicamente ela é composta por algumas camadas que estão listadas a seguir.

#### Camadas:
- Camada Domain (regras de negócio):
    - Criação de interfaces para as regras de negócio.
    - Regra de negócio não fica acoplada a nenhum tipo de implementação.
    - Domain é a camada principal, ele não deve depender de ninguém.
- Camada Data
    - Implementação dos casos de uso.
    - Essa camada Data depende das interfaces criadas na camada Domain.
    - Implementação não fica acoplada a serviços como Axios, fetch, etc.
    - Criação de interface para desacoplar a serviços externos.
- Camada Infra
    - Implementações que utilizam frameworks externos.
- Camada Presentation
    - Renderização da view.
    - Controlar o estado.
- Camada Validation
    - Validação de campos de formulários.
    - Composite para juntar as regras de validação que o componente precise.
- Camada Main
    - Classes que geram instâncias de outras classes.
    - Composition Root: ponto de entrada da aplicação.
    - Responsável por montar o “quebra-cabeça” por meio da injeção de dependência.

## Benefícios de configurar o react na "mão"
- Desacoplar de qualquer script que gere um projeto React, como CRA e Vite.
- Configurar de maneira adequada para seu projeto o webpack, tsconfig, jest, etc.

## TDD (Test Drive Development)
### Test doubles
#### Fakes
Em diversos casos você vai precisar substituir uma dependência por um dublê para que ele retorne algo particular. Nesses casos entra o fake, pois a função dele é retornar algum valor fixo que não dependa de nada. Entretanto, ao utilizar o fake você fica impossibilitado de saber quantas vezes ele foi chamado, se recebeu os parâmetros corretamente, etc.

#### Spy
Diferentemente dos fakes, os spies conseguem verificar comportamentos internos das classes, possibilitando que você teste se a função enviou os parâmetros corretamente, ou quantas vezes determinada função foi chamada. Porém, os spies funcionam melhores em casos que a classe ou função possui poucos comportamentos.

#### Stub
Os stubs basicamente atuam como spies, o diferencial deles é que possuem a capacidade de mudar o comportamento dependendo de como for chamado, pois podem possuir diversos comportamentos. 

#### Mocks
Quando você precisa testar tanto diversos comportamentos, como as informações armazendas, o mock entra em ação. Os mocks são utilizados para substituir uma dependência a fim de verificar vários comportamentos simultaneamente,

#### Dummies
Vamos supor que a classe ou função que você esteja testando importa algo que você não queira e nem tem porque testar, como um arquivo css por exemplo, o que você faz para "ignorar" essa importação? A resposta está nos Dummies, que servem justamente para "ignorar" e trocar o valor por um objeto vazio, pois não interfere em nada no teste.

## Design Pattern Composite
- Utilizado para "juntar" as validações de cada campo

## Design Pattern Builder
- Utilizado para "montar" o array de validators para o composite

## Design Pattern Factory
- Utilizado para injetar as dependências do componente

## Outros aprendizados do projeto
- npx npm-check -u -s para checar as dependências do projeto, se precisam ser atualizadas ou não
- Utilização do coveralls para deixar o test coverage do projeto na internet