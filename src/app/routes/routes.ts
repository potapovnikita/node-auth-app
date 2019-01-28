module.exports = (app: any, db: any) => {
    app.post('/notes', (req: any, res: any) => {
        console.log(req.body)
        console.log(req.headers)
        res.send(req.body);
    });
};
