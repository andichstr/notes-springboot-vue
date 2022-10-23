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
        addCategories(state, data) {
            data.forEach(element => {
                state.categories.push(element.name);
            });
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
        async addCategoriesToAPI({ commit }, data) {
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
                commit('addCategories', data);
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
        async deleteCategorys({ commit, state }, ids) {
            let result = null;
            result = await axios.delete(process.env.VUE_APP_API_URL + '/categories/', ids)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                ids.forEach(id => {
                    for(let i = 0; i < state.categories.length; i++) {
                        if (state.categories[i].id == id){
                            commit('deleteCategory', i);
                        }
                    }
                });
                
            }
        },
    }
}