const fastglob = require("fast-glob");

const headFilesForCSS = [
    "style/reset.css",
    "style/base.css",
];

module.exports = {
    isActiveUrl(itemUrl, pageUrl) {
        if (!itemUrl.startsWith("/category") && pageUrl !== "/")
            return false;
        return RegExp(`${itemUrl}(\\d/)?$`).test(pageUrl);
    },
    async getAllCSS() {
        let files = await fastglob("src/_includes/style/*.css");
        files = files.map(path => path.slice(path.indexOf("style")));
        files.sort(file => headFilesForCSS.includes(file) ? -1 : 1);
        return files;
    }
}
