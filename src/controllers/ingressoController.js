const ingressoModel = require("../models/ingressoModels");

const getAllIngressos = async (req, res) => {
    try {
        const { categoria } = req.query;
        const ingressos = await ingressoModel.getIngressos(categoria); 
        res.json(ingressos);
    } catch (error) {
        console.error("Erro ao buscar ingressos:", error);
        res.status(500).json({ message: "Erro ao buscar ingressos." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        console.error("Erro ao buscar ingresso:", error);
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

        const minPrecos = {
            'Pista': 100.00,
            'Pista VIP': 200.00,
            'Camarote': 300.00,
            'Arquibancada': 80.00
        };

        if (minPrecos[categoria] && preco < minPrecos[categoria]) {
            return res.status(400).json({ message: `Preço mínimo para ${categoria} é R$${minPrecos[categoria].toFixed(2)}` });
        }

        if (quantidade_disponivel === 0) {
            return res.status(400).json({ message: 'Ingressos esgotados' });
        }

        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.error("Erro ao criar ingresso:", error);
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

        const minPrecos = {
            'Pista': 100.00,
            'Pista VIP': 200.00,
            'Camarote': 300.00,
            'Arquibancada': 80.00
        };

        if (minPrecos[categoria] && preco < minPrecos[categoria]) {
            return res.status(400).json({ message: `Preço mínimo para ${categoria} é R$${minPrecos[categoria].toFixed(2)}` });
        }

        if (quantidade_disponivel === 0) {
            return res.status(400).json({ message: 'Ingressos esgotados' });
        }

        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedIngresso);
    } catch (error) {
        console.error("Erro ao atualizar ingresso:", error);
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        console.error("Erro ao deletar ingresso:", error);
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

const realizarVenda = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const ingresso = await ingressoModel.getIngressoById(id);

        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        if (ingresso.quantidade_disponivel < quantidade) {
            return res.status(400).json({ message: "Ingressos insuficientes para a venda." });
        }

        ingresso.quantidade_disponivel -= quantidade;
        const updateIngresso = await ingressoModel.updateIngresso(id, ingresso.evento, ingresso.local, ingresso.data_evento, ingresso.categoria, ingresso.preco, ingresso.quantidade_disponivel);

        res.status(200).json({
            mensagem: "Compra realizada com sucesso!",
            evento: updateIngresso.evento,
            categoria: updateIngresso.categoria,
            quantidade_comprada: quantidade,
            quantidade_restante: updateIngresso.quantidade_disponivel
        });
    } catch (error) {
        console.error("Erro ao realizar venda:", error);
        res.status(500).json({ message: "Erro ao realizar venda." });
    }
};

module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso, realizarVenda };