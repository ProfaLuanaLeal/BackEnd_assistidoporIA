import express from 'express';

const app = express();
app.use(express.json());

// Rota de Healthcheck inicial
app.get('/health', (req, res) => {
  res.json({ status: "OK", message: "Codespace rodando perfeitamente!" });
});

// --- MOCKS PARA A ATIVIDADE DE PERFORMANCE ---
const buscarTodosOsPedidos = async () => Array.from({ length: 10 }, (_, i) => ({ id: i + 1, cliente: `Cliente ${i + 1}` }));
const buscarDetalhesDoItem = async (id: number) => ({ pedidoId: id, produto: "Teclado Mecânico", preco: 250.00 });

// 🔥 DESAFIO: Código ineficiente (Problema N+1) para os alunos corrigirem com a IA
app.get('/relatorio-pedidos', async (req, res) => {
    const pedidos = await buscarTodosOsPedidos(); 
    const relatorioCompleto = [];

    for (const pedido of pedidos) {
        // PROBLEMA: Faz uma nova consulta ao banco fictício para cada item do loop
        const detalhesDoItem = await buscarDetalhesDoItem(pedido.id); 
        relatorioCompleto.push({ ...pedido, itens: detalhesDoItem });
    }

    res.json(relatorioCompleto);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});