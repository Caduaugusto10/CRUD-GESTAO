CREATE DATABASE gestao;

\c gestao

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES
    ('Jogo do Corinthians', 'Neo Química Arena', '27-03-2025', 'Pista VIP', 450.00, 49205),
    ('Show Mc Tuto', 'Beach Lounge', '25-04-2025', 'Pista', 100.00, 8000),
    ('Festa do Peão', 'Rodeio', '30-05-2025', 'Camarote', 300.00, 10000),
    ('Festa do Figo', 'Valinhos', '30-06-2025', 'Pista', 150.00, 20000);