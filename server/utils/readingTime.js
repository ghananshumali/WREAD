export const getReadingTime = (text = "") => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
};
