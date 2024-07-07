
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const recebe_dadosCad = require('./recebe_dadosCad');

const app = express();
const port = 3000;

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));

app.use(bodyParser.urlencoded({ extended: true }));

const recebe_dados = new recebe_dadosCad();

app.post('/submit', (req, res) => {
    const { nome, email, endereco, senha } = req.body;

    recebe_dados.insertData(nome, email, endereco, senha);

    res.send('Dados inseridos com sucesso!');
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    recebe_dados.validateUser(email, senha, (err, isValid) => {
        if (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
    }
        if (isValid) {
            res.redirect('/logged.html'); // Redireciona para index.html na raiz do projeto
        } else {
        res.status(401).json({ error: 'Email ou senha incorretos' });
            
        }
    });
});

// Rota para a tela inicial
app.get('/logged.html', (req, res) => {
    // Envia o HTML da tela
    res.sendFile(path.join(__dirname, '..', 'logged.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
