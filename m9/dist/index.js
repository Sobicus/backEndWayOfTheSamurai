"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    courses: [{ id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devops' },]
};
app.get('/', (req, res) => {
    res.json({ messageL: 'Hello World !!!' });
    //fetch('http://localhost:3000', {method: 'GET'}).then(res=>res.json()).then(json=>console.log(json))
});
app.get('/error', (req, res) => {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND);
});
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title || req.body.title.trim() === '') {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title.trim()
    };
    db.courses.push(createdCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
});
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST);
        return;
    }
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    foundCourse.title = req.body.title;
    res.status(HTTP_STATUSES.NO_CONTENT).json(foundCourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
