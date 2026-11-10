# Cadastro de clientes — Electronic

**Estudante:** Leandro Duarte  
**Linguagem:** JavaScript  
**Paradigma:** Programação Orientada a Objetos (POO)

## Descrição

Projeto de cadastro de clientes para um e-commerce de produtos eletrônicos. O sistema permite representar pessoas físicas e jurídicas, validar os dados informados e exibir, ao final da execução, somente os cadastros válidos.

## Conceitos aplicados

- **Classes e objetos:** representam endereços e clientes.
- **Abstração:** a classe `Pessoa` reúne características comuns aos tipos de cliente e não pode ser instanciada diretamente.
- **Encapsulamento:** os dados são protegidos com campos privados, identificados por `#`, e acessados por getters e setters.
- **Herança:** `PessoaFisica` e `PessoaJuridica` herdam de `Pessoa` com `extends` e utilizam `super`.
- **Validação e tratamento de erros:** valores inválidos geram erros com `throw`, tratados com `try` e `catch`, para que um cadastro inválido não interrompa o programa.

## Estrutura do projeto

```text
cadastro-clientes/
├── README.md
├── index.js
└── docs/
    ├── diagrama-classes.drawio
    └── diagrama-classes.svg
```

- `index.js`: código-fonte do sistema.
- `docs/diagrama-classes.drawio`: diagrama UML editável no Draw.io.
- `docs/diagrama-classes.svg`: imagem do diagrama UML.

## Classes do projeto

- **Endereco:** armazena logradouro, número, cidade e UF.
- **Pessoa:** classe base com nome e endereço.
- **PessoaFisica:** classe derivada com CPF e data de nascimento.
- **PessoaJuridica:** classe derivada com CNPJ e razão social.

O diagrama UML apresenta os atributos, métodos, visibilidades (`+` público, `-` privado e `#` protegido, quando aplicável) e as relações de herança entre as classes.

## Validações implementadas

- O nome deve conter ao menos 3 caracteres.
- O CPF deve conter 11 dígitos.
- O CNPJ deve conter 14 dígitos.
- Pontos, traços e barras são desconsiderados na validação do CPF e do CNPJ.
- A data de nascimento deve existir e não pode estar no futuro.
- A razão social é obrigatória.
- O endereço deve ser uma instância válida da classe `Endereco`.

## Como executar

É necessário ter o Node.js instalado.

1. Abra o terminal na pasta do projeto.
2. Execute:

```bash
node index.js
```

## Evidências de teste

Foram executados quatro cenários: pessoa física válida, pessoa jurídica válida, pessoa física inválida e pessoa jurídica inválida.

Saída do terminal:

```text
[OK] Pessoa física válida cadastrada.
[OK] Pessoa jurídica válida cadastrada.
[ERRO] Pessoa física inválida: CPF deve conter exatamente 11 dígitos.
[ERRO] Pessoa jurídica inválida: Razão social é obrigatória.

Clientes válidos: 2
PessoaFisica — Ana Souza | CPF: 52998224725 | Nascimento: 1990-05-10 | Endereço: Rua das Flores, 120, Belo Horizonte - MG
PessoaJuridica — Electronic Comércio | CNPJ: 11222333000181 | Razão social: Electronic Comércio de Eletrônicos Ltda. | Endereço: Avenida Central, 500, Belo Horizonte - MG
```

Os dois cadastros inválidos são informados pelo programa, mas não são adicionados à lista de clientes válidos. O programa continua a execução após cada erro.


