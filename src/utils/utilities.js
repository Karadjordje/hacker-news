export const getDomainName = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?/i; // Removes protocols plus www
    return url.replace(regex, '').split('/')[0];
};
