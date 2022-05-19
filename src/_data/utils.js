module.exports = {
    isActiveUrl(itemUrl, pageUrl) {
        if (!itemUrl.startsWith("/category") && pageUrl !== "/")
            return false;
        return RegExp(`${itemUrl}(\\d/)?$`).test(pageUrl);
    }
}