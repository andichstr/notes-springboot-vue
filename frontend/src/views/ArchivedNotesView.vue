<template>
    <div class="container">
        <div class="titleDiv">
            <div>
                <h1>My notes</h1>
                <b-button v-b-modal.modalAddNote class="addNoteBtn">Add Note</b-button>
                <router-link to="/notes/">Active notes</router-link>
            </div>
            <div class="align-self-end">
                <label for="selectCategory">Category filter: </label>
                <select id="selectCategory" ref="selectCategory" v-model="selectedCategory">
                    <option value="All">All</option>
                    <option v-for="(category, index) in categories" :key="index" :value="category.name">{{category.name}}</option>
                </select>
            </div>
        </div>
        <div class="wrapper">
            <div v-for="note in selectedNotes" :key="note.id">
                <Note :note="note"/>
            </div>
        </div>
    </div>
</template>
  
<script>
    import Note from '@/components/NoteComponent.vue';
    import { mapActions, mapGetters, mapState } from 'vuex';
    export default {
        name: "ArchivedNotesView",
        data(){
            return {
                selectedCategory: "",
            }
        },
        components: { Note },
        computed: {
            ...mapState("note", ["archivedNotes"]),
            ...mapGetters("note", ["getArchivedNotes"]),
            ...mapState("category", ["categories"]),
            selectedNotes: function() {
                if(this.selectedCategory=="All" || this.selectedCategory=="") return this.archivedNotes;
                let arr = [];
                let found = false;
                this.archivedNotes.forEach(element => {
                    element.categories.forEach(cat => {
                        if(cat.name==this.selectedCategory) found = true;
                    })
                    if(found) arr.push(element);
                    found = false;
                });
                return arr;
            }
        },
        methods: {
            ...mapActions("note", ["getNotesFromAPI"]),
        },
        mounted() {
            this.getNotesFromAPI();
        },
    }
</script>
  
<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }
    .titleDiv{
        text-align: left;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(100px, auto)
    }
    .addNoteBtn{
        margin-right: 5px;
    }
</style>