const PDFDocument = require("pdfkit");
const ingressoModel = require("../models/ingressoModels");

const exportIngressoPDF = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=ingressos.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório de Ingressos", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text("Id | Evento | Local | Data | Categoria | Preço | Disponível", { underline: true });
        doc.moveDown(0.5);

        ingressos.forEach((ingresso) => {
            doc.text(
                `${ingresso.id} | ${ingresso.evento} | ${ingresso.local} | ${ingresso.data_evento} | ${ingresso.categoria} | R$ ${ingresso.preco} | ${ingresso.quantidade_disponivel}`
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF." });
    }
};

module.exports = { exportIngressoPDF };