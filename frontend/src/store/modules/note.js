const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        notes: [],
        archivedNotes: [],
    },
    getters: {
        getNotes(state) {
            return state.notes;
        },
        getArchivedNotes(state) {
            return state.archivedNotes;
        }
    },
    mutations: {
        setNotes(state, data) {
            state.notes = [];
            state.archivedNotes = [];
            data.forEach(element => {
                if(element.archived){
                    state.archivedNotes.push(element);
                }else{
                    state.notes.push(element);
                }
            });
        },
        //data format: {i: Number, note: Object}
        setNote(state, data){
            if(data.archived){
                state.archivedNotes[data.i] = data.note;
            } else {
                state.notes[data.i] = data.note;
            }
        },
        deleteNote(state, i){
            state.notes.splice(i,1);
        },
        deleteArchivedNote(state, i){
            state.archivedNotes.splice(i,1);
        },
        addNote(state, data) {
            if(data.archived){
                state.archivedNotes.push(data)
            } else {
                state.notes.push(data)
            }
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