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
### Spy
- Permite verificar comportamentos internos de classes
- Exemplo: verificar se a função dentro da classe foi chamada com os valores corretos

### Stub
- Comportamento isolado
- Diversos comportamentos para uma mesma função

### Mock
- Somente guarda os valores para testar se estão sendo passados corretamente

### Dummies
- Quando você quer ignorar o objeto, trocar o valor dele por um objeto vazio

## Design Pattern Composite
- Utilizado para "juntar" as validações de cada campo

## Design Pattern Builder
- Utilizado para "montar" o array de validators para o composite

## Design Pattern Factory
- Utilizado para injetar as dependências do componente

## Outros aprendizados do projeto
- npx npm-check -u -s para checar as dependências do projeto, se precisam ser atualizadas ou não
- Utilização do coveralls para deixar o test coverage do projeto na internet