const createSlug = (text) => {
    return text.toString().toLowerCase().replace(/\s+/g, '-')
}

module.exports = createSlug;