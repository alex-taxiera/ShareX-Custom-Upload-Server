const fs = require("fs-extra")
async function get(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.render("galleryLogin")
    res.end()
}
async function post(req, res) {
    let userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
    res.setHeader("Content-Type", "text/html");
    let password = this.c.admin.key
    if (!this.c.admin.key || !req.body.password || this.c.admin.key !== req.body.password) {
        res.statusCode = 401
        res.render("unauthorized")
        res.end();
        return this.log.warning(`Unauthorized User | File Upload | ${userIP}`)
    }
    this.log.warning(`IP Address: ${userIP} successfully accessed gallery`)
    fs.readdir(`${__dirname}/../uploads`, (err, files) => {
        console.log('err', err)
        console.log('files', files)
        res.render("gallery", {
            pictures: files.map((file) => {
                if (file.toString().includes(".jpg") || file.toString().includes(".png") || file.toString().includes(".gif")) {
                    pics.push(`http://${req.headers.host}/l/${file.toString()}`);
                }
            })
        })
        res.end();
    });
}
module.exports = { get, post }