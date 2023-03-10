# Clean Architecture no React

## Como funciona?
- Um componente no React deve apenas renderizar a interface e controlar estados.
- Para que isso ocorra, deve-se utilizar uma arquitetura capaz de fazer com que a regra de negócio da aplicação não dependa de ninguém. 
- Além de que a aplicação deve ser testável, escalável e desacoplada de serviços externos.
- Com esse intuito a Clean Architecture foi criada, e basicamente ela é composta por algumas camadas que estão listadas a seguir.

### Camadas:
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