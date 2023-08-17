"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('a > 5');
    }
    else {
        res.send('Hello World!!!');
    }
});
app.get('/users', (req, res) => {
    res.send('This our home page o_o');
});
app.post('/users', (req, res) => {
    res.send('You create new one user');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
