const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        categories: [],
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
    },
    mutations: {
        setCategories(state, data) {
            state.categories = data;
        },
        //data format: {i: number, category: Object}
        setCategory(state, data){
            state.categories[data.i] = data.category;
        },
        deleteCategory(state, i){
            state.categories.splice(i,1);
        },
        addCategory(state, data) {
            state.categories.push(data);
        },
    },
    actions: {
        async getCategoriesFromAPI({ commit }){
            let result = null;
            result = await axios.get(`${apiURL}/categories`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null){
                commit('setCategories', result);
            }
        },
        async addCategoryToAPI({ commit }, data) {
            let result = null;
            result = await axios.post(`${apiURL}/categories`, data)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('addCategory', data);
            }
        },
        async editCategoryToAPI({ commit, state }, category){
            let result = null;
            result = await axios.put(`${apiURL}/categories/${category.id}`, category)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for (let i = 0; i < state.categories.length; i++) {
                    if (state.categories[i].id == category.id) {
                        const data = {
                            'i': i,
                            'category': category
                        };
                        commit('setCategory', data);
                    }
                }
            }
        },
        async deleteCategory({ commit, state }, id) {
            let result = null;
            result = await axios.delete(process.env.VUE_APP_API_URL + '/categories/' + id)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for(let i = 0; i < state.categories.length; i++) {
                    if (state.categories[i].id == id){
                        commit('deleteCategory', i);
                    }
                }
            }
        },
    }
}