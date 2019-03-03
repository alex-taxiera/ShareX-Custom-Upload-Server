const path = require("path")
const fs = require("fs-extra")
async function get(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.render("short")
    res.end()
}
async function post(req, res) {
    let userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
    res.setHeader("Content-Type", "text/text");
    let fileName = this.randomToken(4)
    if (req.body.URL == undefined || req.body.URL == "" || req.body.URL == null) {
        res.redirect("/l/short?error=No URL Input");
        return res.end();
    }
    let stream = fs.createWriteStream(`${__dirname}/../uploads/${fileName}.html`)
    stream.once("open", fd => {
        stream.write(`<meta http-equiv="refresh" content="0;URL='${req.body.URL}'" />`);
        stream.end();
        if (this.monitorChannel !== null) this.bot.createMessage(this.monitorChannel, `\`\`\`MARKDOWN\n[NEW][SHORT URL]\n[URL](${req.body.URL})\n[NEW](${req.headers.host}/l/${fileName})\n[IP](${userIP})\n\`\`\``)
        this.log.verbose(`New Short URL: http://${req.headers.host}/l/${fileName} | IP: ${userIP}`)
        let insecure = `/l/short?success=http://${req.headers.host}/l/${fileName}`
        let secure = `/l/short?success=https://${req.headers.host}/l/${fileName}`
        res.redirect(req.secure ? secure : insecure)
        return res.end();
    });
}
module.exports = { get, post }