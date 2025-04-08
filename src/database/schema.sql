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
    ('Festa do Figo', 'Valinhos', '30-06-2025', 'Pista', 150.00, 20000),
    ('Show da Anitta', 'Maracanã', '15-07-2025', 'Pista VIP', 500.00, 15000),
    ('Festival de Rock', 'Autódromo de Interlagos', '20-08-2025', 'Camarote', 800.00, 5000),
    ('Concerto de Música Clássica', 'Sala São Paulo', '10-09-2025', 'Arquibancada', 120.00, 3000),
    ('Stand-up Comedy', 'Teatro Municipal', '05-10-2025', 'Pista', 80.00, 1000),
    ('Final do Campeonato Brasileiro', 'Mineirão', '12-11-2025', 'Pista VIP', 600.00, 20000),
    ('Show do Coldplay', 'Allianz Parque', '25-12-2025', 'Camarote', 1000.00, 8000),
    ('Festa de Réveillon', 'Copacabana', '31-12-2025', 'Pista', 200.00, 50000),
    ('Feira de Tecnologia', 'Expo Center Norte', '15-01-2026', 'Arquibancada', 50.00, 10000),
    ('Jogo da Seleção Brasileira', 'Arena Pantanal', '20-02-2026', 'Pista', 300.00, 25000),
    ('Show do Gusttavo Lima', 'Parque de Exposições', '10-03-2026', 'Pista VIP', 400.00, 12000);