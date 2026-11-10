class Endereco {
  #logradouro;
  #numero;
  #cidade;
  #uf;

  constructor(logradouro, numero, cidade, uf) {
    this.logradouro = logradouro;
    this.numero = numero;
    this.cidade = cidade;
    this.uf = uf;
  }

  get logradouro() {
    return this.#logradouro;
  }

  set logradouro(valor) {
    const texto = String(valor ?? "").trim();
    if (texto.length < 2) {
      throw new Error("Logradouro deve ter ao menos 2 caracteres.");
    }
    this.#logradouro = texto;
  }

  get numero() {
    return this.#numero;
  }

  set numero(valor) {
    const texto = String(valor ?? "").trim();
    if (!texto) {
      throw new Error("Número do endereço é obrigatório.");
    }
    this.#numero = texto;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(valor) {
    const texto = String(valor ?? "").trim();
    if (texto.length < 2) {
      throw new Error("Cidade deve ter ao menos 2 caracteres.");
    }
    this.#cidade = texto;
  }

  get uf() {
    return this.#uf;
  }

  set uf(valor) {
    const texto = String(valor ?? "").trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(texto)) {
      throw new Error("UF deve conter exatamente 2 letras.");
    }
    this.#uf = texto;
  }

  toString() {
    return `${this.logradouro}, ${this.numero}, ${this.cidade} - ${this.uf}`;
  }
}

class Pessoa {
  #nome;
  #endereco;

  constructor(nome, endereco) {
    if (new.target === Pessoa) {
      throw new Error("Pessoa é uma classe base e não pode ser instanciada diretamente.");
    }

    this.nome = nome;
    this.endereco = endereco;
  }

  get nome() {
    return this.#nome;
  }

  set nome(valor) {
    const texto = String(valor ?? "").trim();
    if (texto.length < 3) {
      throw new Error("Nome deve ter ao menos 3 caracteres.");
    }
    this.#nome = texto;
  }

  get endereco() {
    return this.#endereco;
  }

  set endereco(valor) {
    if (!(valor instanceof Endereco)) {
      throw new Error("Endereço deve ser uma instância da classe Endereco.");
    }
    this.#endereco = valor;
  }
}

class PessoaFisica extends Pessoa {
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNascimento, endereco) {
    super(nome, endereco);
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(valor) {
    const documento = String(valor ?? "").trim().replace(/[.\-/]/g, "");
    if (!/^\d{11}$/.test(documento)) {
      throw new Error("CPF deve conter exatamente 11 dígitos.");
    }
    this.#cpf = documento;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }

  set dataNascimento(valor) {
    const texto = String(valor ?? "").trim();
    const correspondencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);

    if (!correspondencia) {
      throw new Error("Data de nascimento deve estar no formato AAAA-MM-DD.");
    }

    const ano = Number(correspondencia[1]);
    const mes = Number(correspondencia[2]);
    const dia = Number(correspondencia[3]);
    const data = new Date(Date.UTC(ano, mes - 1, dia));

    const dataExiste =
      data.getUTCFullYear() === ano &&
      data.getUTCMonth() === mes - 1 &&
      data.getUTCDate() === dia;

    if (!dataExiste) {
      throw new Error("Data de nascimento inválida.");
    }

    const hoje = new Date();
    const hojeUTC = Date.UTC(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    if (data.getTime() > hojeUTC) {
      throw new Error("Data de nascimento não pode estar no futuro.");
    }

    this.#dataNascimento = texto;
  }

  toString() {
    return `PessoaFisica — ${this.nome} | CPF: ${this.cpf} | Nascimento: ${this.dataNascimento} | Endereço: ${this.endereco}`;
  }
}

class PessoaJuridica extends Pessoa {
  #cnpj;
  #razaoSocial;

  constructor(nome, cnpj, razaoSocial, endereco) {
    super(nome, endereco);
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
  }

  get cnpj() {
    return this.#cnpj;
  }

  set cnpj(valor) {
    const documento = String(valor ?? "").trim().replace(/[.\-/]/g, "");
    if (!/^\d{14}$/.test(documento)) {
      throw new Error("CNPJ deve conter exatamente 14 dígitos.");
    }
    this.#cnpj = documento;
  }

  get razaoSocial() {
    return this.#razaoSocial;
  }

  set razaoSocial(valor) {
    const texto = String(valor ?? "").trim();
    if (!texto) {
      throw new Error("Razão social é obrigatória.");
    }
    this.#razaoSocial = texto;
  }

  toString() {
    return `PessoaJuridica — ${this.nome} | CNPJ: ${this.cnpj} | Razão social: ${this.razaoSocial} | Endereço: ${this.endereco}`;
  }
}

const clientes = [];

function executarCenario(descricao, criarCliente) {
  try {
    const cliente = criarCliente();
    clientes.push(cliente);
    console.log(`[OK] ${descricao} cadastrada.`);
  } catch (erro) {
    console.log(`[ERRO] ${descricao} inválida: ${erro.message}`);
  }
}

function criarEndereco() {
  return new Endereco(
    "Rua das Flores",
    "120",
    "Belo Horizonte",
    "MG"
  );
}

executarCenario("Pessoa física válida", () =>
  new PessoaFisica(
    "Ana Souza",
    "529.982.247-25",
    "1990-05-10",
    criarEndereco()
  )
);

executarCenario("Pessoa jurídica válida", () =>
  new PessoaJuridica(
    "Electronic Comércio",
    "11.222.333/0001-81",
    "Electronic Comércio de Eletrônicos Ltda.",
    new Endereco("Avenida Central", "500", "Belo Horizonte", "MG")
  )
);

executarCenario("Pessoa física inválida", () =>
  new PessoaFisica(
    "Carlos Lima",
    "123.456",
    "1985-08-20",
    criarEndereco()
  )
);

executarCenario("Pessoa jurídica inválida", () =>
  new PessoaJuridica(
    "Loja Exemplo",
    "11.222.333/0001-81",
    "   ",
    criarEndereco()
  )
);

console.log(`\nClientes válidos: ${clientes.length}`);
for (const cliente of clientes) {
  console.log(cliente.toString());
}
