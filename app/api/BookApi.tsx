import Api from "./Api";

const findBooks = () => {
    return Api.get('/books');
}

export default {
    findBooks
}