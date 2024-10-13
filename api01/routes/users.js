var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany(); // Busca usuários do banco de dados
    res.json(users); // Retorna a lista de usuários em JSON
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar usuários', error: error.message });
  }
});

/* POST para adicionar um novo usuário */
router.post('/', async (req, res, next) => {
  try {
    const age = parseInt(req.body.age, 10); // Converte a idade para número
    if (isNaN(age)) throw new Error('Idade deve ser um número válido.');

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: age
      }
    });

    res.status(201).send({ message: 'Usuário adicionado com sucesso!', user });
  } catch (error) {
    res.status(400).send({ message: 'Erro ao adicionar usuário', error: error.message });
  }
});

/* DELETE para remover um usuário pelo ID */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: id }
    });

    res.status(200).send({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(400).send({ message: 'Erro ao remover usuário', error: error.message });
  }
});

/* PUT para substituir completamente um usuário pelo ID */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Verifica se os dados necessários foram enviados
    if (!name || !email || !age) {
      throw new Error('Nome, email e idade são obrigatórios para a substituição.');
    }

    // Converte a idade para número inteiro
    const updatedAge = parseInt(age, 10);
    if (isNaN(updatedAge)) {
      throw new Error('Idade deve ser um número válido.');
    }

    // Substitui completamente o usuário existente
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        age: updatedAge
      }
    });

    res.status(200).send({ message: 'Usuário substituído com sucesso!', updatedUser });
  } catch (error) {
    res.status(400).send({ message: 'Erro ao substituir usuário', error: error.message });
  }
});

module.exports = router;
