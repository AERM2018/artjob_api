const authController = (userDataSource) => ({
    login: (req, res) => {
        res.json({ ok: true });
    }

})

module.exports = authController;
