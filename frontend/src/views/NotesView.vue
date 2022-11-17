<template>
    <div class="container">
        <div class="titleDiv">
            <div>
                <h1>My notes</h1>
                <b-button v-b-modal.modalAddNote class="addNoteBtn">Add Note</b-button>
                <router-link to="/notes/archived">Archived notes</router-link>
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
        <b-modal id="modalAddNote" ref="modalAddNote">
            <h1>Create Note</h1>
            <b-form>
                <b-form-group id="title-group" label="Title: " label-for="title">
                    <b-form-input id="title" v-model="form.title" type="text" required/>
                </b-form-group>
                <b-form-group id="description-group" label="Description: " label-for="description">
                    <b-form-textarea id="description" v-model="form.description" required/>
                </b-form-group>
                <b-form-group id="category-group" label="Categories: " label-for="category">
                    <p v-if="form.categories.length==0">There are no categories in this note</p>
                    <ul id="categories">
                        <li v-for="(category, index) in form.categories" :key="index">{{category}} <b-icon class="removeCatBtn" icon="x" @click="removeCategory(index)"></b-icon></li>
                    </ul>
                </b-form-group>
                <b-form-group id="addCategory-group" label="New category: " label-for="addCategory">
                    <b-form-input type="text" id="addCategory" v-model="newCategory"/>
                    <b-button variant="outline-primary" @click="addCategory(newCategory)">Add</b-button>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="addNote(form)">OK</button>
            </div>
        </b-modal>
        <b-modal id="modalConfirmNote" ref="modalConfirmNote" ok-only>
            <h3>Note added succesfully</h3>
        </b-modal>
    </div>
</template>
  
<script>
    import Note from '@/components/NoteComponent.vue';
    import { mapActions, mapGetters, mapState } from 'vuex';
    export default {
        name: "NotesView",
        data(){
            return {
                form: {
                    title: "",
                    description: "",
                    categories: [],
                },
                newCategory: "",
                selectedCategory: "",
            }
        },
        components: { Note },
        computed: {
            ...mapState("note", ["notes"]),
            ...mapGetters("note", ["getNotes"]),
            ...mapState("category", ["categories"]),
            selectedNotes: function() {
                if(this.selectedCategory=="All" || this.selectedCategory=="") return this.notes;
                let arr = [];
                let found = false;
                this.notes.forEach(element => {
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
            ...mapActions("note", ["getNotesFromAPI", "addNoteToAPI"]),
            ...mapActions("category", ["getCategoriesFromAPI", "addCategoriesToAPI"]),
            closeModal(){
                this.$refs['modalAddNote'].hide();
            },
            async addNoteCategory(categories){
                let categoriesToAdd = [];
                categories.forEach(element => {
                    categoriesToAdd.push({'name': element});
                });
                return categoriesToAdd;
            },
            async addNote(note){
                await this.addNoteCategory(note.categories)
                .then(response => {
                    note.categories = response;
                    this.addNoteToAPI(note);
                    this.closeModal();
                    this.openConfirmModal();
                    this.getNotesFromAPI();
                })
            },
            openConfirmModal(){
                this.$refs['modalConfirmNote'].show();
            },
            addCategory(category){
                if(!this.form.categories.includes(category)){
                    this.form.categories.push(category);
                }
                this.newCategory = "";
            },
            removeCategory(i){
                this.form.categories.splice(i,1);
            },
            isSelected(note){
                if (this.selectedCategory=="All" || this.selectedCategory=="") return true;
                let selected = false;
                note.categories.forEach(element => {
                    if(element.name==this.selectedCategory) selected = true;
                });
                return selected
            }
        },
        mounted() {
            this.getNotesFromAPI();
            this.getCategoriesFromAPI();
        },
    }
</script>
  
<style scoped>
    .titleDiv{
        text-align: left;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(100px, auto)
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }
    .addNoteBtn{
        margin-right: 5px;
    }
    .removeCatBtn{
        cursor: pointer;
    }
</style>