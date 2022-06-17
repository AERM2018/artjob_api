const statusRouter = (router) => {
    router.get('/status', (req, res) => { res.json({ status: 'OK!' }) })
}

module.exports = statusRouter;
