# BackEnd_assistidoporIA


# 🚀 Guia do Aluno: Lab de Back-End Assistido por IA (Versão Codespaces)

Bem-vindo ao laboratório prático! Hoje, você vai atuar como um **Engenheiro de Software Sênior**, utilizando o **GitHub Codespaces** como seu ambiente de desenvolvimento na nuvem e o **GitHub Copilot** como seu copiloto de IA.

---

## 🛠️ Passo 0: Preparando o seu Codespace

Em vez de instalar tudo na sua máquina local, vamos subir um ambiente de desenvolvimento completo na nuvem em segundos.

1. Acesse o repositório base fornecido pelo professor no GitHub.
2. Clique no botão verde **Code** (ou Código).
3. Selecione a aba **Codespaces** e clique em **Create codespace on main** (Criar codespace na main).
4. Aguarde o ambiente carregar no seu navegador. Você verá uma interface idêntica ao VS Code.
5. **Ativação da IA:** Certifique-se de que a extensão do **GitHub Copilot** está ativa no canto inferior direito. Se solicitado, faça o login com sua conta do GitHub para liberar o chat.

---

## 📅 Roteiro do Laboratório

### Etapa 1: Atividade Desplugada – Modelagem e Arquitetura 🧠

*Antes de codificar, vamos desenhar a lógica do sistema e usar a IA para validar nossa arquitetura.*

1. **O Problema:** Precisamos gerenciar **Usuários**, **Produtos** e **Pedidos** em um Mini-E-commerce.
2. **Desafio Humano:** Pense por 2 minutos: Como deve ser a relação entre um *Pedido* e um *Produto*? Um pedido pode ter vários produtos? Um produto pode estar em vários pedidos? Como mapear isso?
3. **Engenharia de Prompt:** Abra o chat do GitHub Copilot (`Ctrl + Shift + I` ou clicando no ícone de chat na barra lateral esquerda) e digite o prompt estruturado:

> **Prompt Base:**
> *"Atue como um arquiteto de software sênior. Preciso criar o modelo de banco de dados relacional (PostgreSQL) para um mini-e-commerce. O sistema deve ter: Usuários, Produtos, Pedidos e Itens do Pedido. Gere o script SQL de criação das tabelas, incluindo chaves primárias, estrangeiras e os índices necessários."*

4. **Análise Crítica:**
* A IA criou uma tabela intermediária (ex: `ItemPedido`) para resolver a relação de muitos-para-muitos?
* O campo de preço foi gerado como `DECIMAL` ou `NUMERIC`? Se ela gerou como `FLOAT`, questione no chat o porquê de isso ser um perigo para sistemas que lidam com dinheiro.



---

### Etapa 2: Setup e Código Inicial (Boilerplate) 🏗️

Vamos usar a automação da IA para criar a base do servidor sem perder tempo digitando configurações repetitivas.

1. No terminal do seu Codespace, execute os comandos para instalar as dependências:
```bash
npm init -y
npm install express zod
npm install --save-dev typescript @types/express @types/node ts-node-dev
npx tsc --init

```


2. Crie um arquivo chamado `server.ts`.
3. Dentro do arquivo `server.ts`, use o comando **Copilot Inline** (`Ctrl + I` ou `Cmd + I`) e digite:
> *"Criar uma estrutura básica de servidor Express em TypeScript rodando na porta 3000 com suporte a JSON e uma rota de healthcheck GET /health"*


4. Clique em **Accept** (Aceitar).
5. No terminal do Codespace, mude o script no `package.json` para rodar o projeto e teste a rota. *Dica: O Codespaces vai abrir uma notificação no canto inferior direito dizendo "Your application running on port 3000 is available". Clique em **Open in Browser** para testar!*

---

### Etapa 3: Validação, Regras de Negócio e Segurança 🛡️

A IA gera o código rápido, mas cabe a você garantir a segurança dele.

1. Crie uma rota simples para o cadastro de usuários (`POST /usuarios`), recebendo `nome`, `email` e `senha`.
2. Selecione o código dessa rota, abra o chat do Copilot na lateral e use o comando de contexto:
> *"/explain Analise este trecho de código. Como posso protegê-lo contra validações incorretas de dados? Refatore o código utilizando a biblioteca Zod para validar se o email é real e se a senha tem pelo menos 6 caracteres."*


3. Substitua o código antigo pelo código seguro gerado pela IA e analise o que mudou na estrutura.

---

### Etapa 4: Caça ao Bug (O Desafio da Performance) 🐛

Copie o código intencionalmente ineficiente abaixo para o seu arquivo `server.ts`. Ele funciona, mas vai derrubar a performance do banco de dados em produção (Problema do Loop N+1).

```typescript
// Código Ineficiente para Análise dos Alunos
app.get('/relatorio-pedidos', async (req, res) => {
    const pedidos = await buscarTodosOsPedidos(); // Simula buscar 100 pedidos
    const relatorioCompleto = [];

    for (const pedido of pedidos) {
        // PROBLEMA: Faz uma nova consulta ao banco para cada item do loop
        const detalhesDoItem = await buscarDetalhesDoItem(pedido.id); 
        relatorioCompleto.push({ ...pedido, itens: detalhesDoItem });
    }

    res.json(relatorioCompleto);
});

```

**Sua missão:**

1. Destaque o código acima.
2. Pergunte ao Copilot Chat:
> *"Este código possui o problema de performance N+1 dentro do laço de repetição. Como posso refatorá-lo usando conceitos de Eager Loading ou uma única query com JOIN para torná-lo performático?"*


3. Aplique a correção sugerida pela IA.

---

### Etapa 5: Testes Unitários com Copilot 🧪

Escrever testes costuma ser exaustivo. Vamos deixar a IA fazer o trabalho pesado enquanto focamos na estratégia.

1. Abra o arquivo onde estão as suas validações ou rotas.
2. No chat lateral do Copilot, digite o comando nativo de testes:
> *"/tests Escreva os testes unitários para a rota de criação de usuários. Inclua um cenário de sucesso e cenários de falha (como e-mail inválido)."*


3. Avalie se os mocks e asserções que a IA criou cobrem todos os caminhos possíveis do seu código.

---

## 🏆 Desafio Final Autônomo (15 min)

Agora o Codespace é seu laboratório livre.

* **Objetivo:** Crie uma nova rota chamada `GET /produtos/busca`.
* **Regra:** Ela deve permitir buscar produtos por *nome* ou por *categoria* usando parâmetros de busca na URL (ex: `/produtos/busca?categoria=eletronicos`).
* **Como fazer:** Escreva apenas um comentário em formato de **Prompt** dentro do arquivo explicando o que você quer e deixe o autocomplete do Copilot sugerir o código por completo.

---

### 📝 Checklist de Conclusão no Codespace

* [ ] O ambiente no Codespace rodou sem erros locais?
* [ ] O Copilot foi utilizado para validar a segurança das rotas (Zod)?
* [ ] O código ineficiente (N+1) foi corrigido e você entendeu o motivo da correção?
* [ ] Você testou a rota final usando a própria aba de "Ports" do Codespaces?

---

