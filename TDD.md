# TDD (Test Drive Development)

## Benefícios
- Maior entendimento do software para que as regras de negócio do produto fiquem bem claras antes mesmo de iniciar a codificação
- Código limpo
- Segurança no processo de refatoração
- Menos bugs
- Feedbacks mais rápidos das novas funcionalidades

## Test doubles
- Fake: Em diversos casos você vai precisar substituir uma dependência por um dublê para que ele retorne algo particular. Nesses casos entra o fake, pois a função dele é retornar algum valor fixo que não dependa de nada. Entretanto, ao utilizar o fake você fica impossibilitado de saber quantas vezes ele foi chamado, se recebeu os parâmetros corretamente, etc.

- Spy: Diferentemente dos fakes, os spies conseguem verificar comportamentos internos das classes, possibilitando que você teste se a função enviou os parâmetros corretamente, ou quantas vezes determinada função foi chamada. Porém, os spies funcionam melhores em casos que a classe ou função possui poucos comportamentos.

- Stub: Os stubs basicamente atuam como spies, o diferencial deles é que possuem a capacidade de mudar o comportamento dependendo de como for chamado, pois podem possuir diversos comportamentos. 

- Mock: Quando você precisa testar tanto diversos comportamentos, como as informações armazendas, o mock entra em ação. Os mocks são utilizados para substituir uma dependência a fim de verificar vários comportamentos simultaneamente,

- Dummy: Vamos supor que a classe ou função que você esteja testando importa algo que você não queira e nem tem porque testar, como um arquivo css por exemplo, o que você faz para "ignorar" essa importação? A resposta está nos Dummies, que servem justamente para "ignorar" e trocar o valor por um objeto vazio, pois não interfere em nada no teste.