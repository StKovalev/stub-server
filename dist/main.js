"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get('/error', (req, res) => {
    res.send('Смотрим ошибку %)');
});
app.get('/error2', (req, res, next) => {
    next(new Error('Здесь что-то поломалось...'));
});
app.get('/error3', (req, res, next) => {
    throw new Error('Поломали...');
});
app.use((err, req, res, next) => {
    res.status(400);
    res.send(`
        <h1>Все сломась!!!</h1>
        <p>${err.message || 'Что-то пошло не так ...'}</p>
    `);
});
app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`);
});
