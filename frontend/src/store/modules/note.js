const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        notes: [],
    },
    getters: {
        getNotes(state) {
            return state.notes;
        },
    },
    mutations: {
        setNotes(state, data) {
            state.notes = data;
        },
        //data format: {i: Number, note: Object}
        setNote(state, data){
            state.notes[data.i] = data.note;
        },
        deleteNote(state, i){
            state.notes.splice(i,1);
        },
        addNote(state, data) {
            state.notes.push(data);
        },
    },
    actions: {
        async getNotesFromAPI({ commit }){
            let result = null;
            result = await axios.get(`${apiURL}/notes`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null){
                commit('setNotes', result);
            }
        },
        async addNoteToAPI({ commit }, data) {
            let result = null;
            result = await axios.post(`${apiURL}/notes`, data)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('addNote', data);
            }
        },
        async editNoteToAPI({ commit, state }, note){
            let result = null;
            result = await axios.put(`${apiURL}/notes/${note.id}`, note)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for (let i = 0; i < state.notes.length; i++) {
                    if (state.notes[i].id == note.id) {
                        const data = {
                            'i': i,
                            'note': note
                        };
                        commit('setNote', data);
                    }
                }
            }
        },
        async deleteNoteToAPI({ commit, state }, id) {
            let result = null;
            result = await axios.delete(process.env.VUE_APP_API_URL + '/notes/' + id)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for(let i = 0; i < state.notes.length; i++) {
                    if (state.notes[i].id == id){
                        commit('deleteNote', i);
                    }
                }
            }
        },
    }
}