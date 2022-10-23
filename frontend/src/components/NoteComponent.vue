<template>
    <div>
        <div class="wrapper">
            <div class="right">
                <h3>{{note.title}}</h3>
                <h5>Last edited</h5>
                <h6>{{note.date}}</h6>
            </div>
            <div class="left">
                <b-icon class="icon" @click="archiveNote(note)" icon="archive-fill" scale="2"></b-icon>
                <b-icon class="icon" @click="openModal()" icon="pencil-fill" scale="2"></b-icon>
                <b-icon class="icon" @click="confirmDelete()" icon="trash-fill" scale="2"></b-icon>
            </div>
        </div>
        <b-modal id="modalEditNote" ref="modalEditNote">
            <h1>Edit Note</h1>
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
                        <li v-for="(category, index) in form.categories" :key="index">{{category.name}} <b-icon class="removeCatBtn" icon="x" @click="removeCategory(index)"></b-icon></li>
                    </ul>
                </b-form-group>
                <b-form-group id="addCategory-group" label="New category: " label-for="addCategory">
                    <b-form-input type="text" id="addCategory" v-model="newCategory"/>
                    <b-button variant="outline-primary" @click="addCategory(newCategory)">Add</b-button>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="editNote(form)">OK</button>
            </div>
        </b-modal>
        <b-modal id="modalConfirm" ref="modalConfirm">
            <h3>{{confirmMsg}}</h3>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModalConfirm()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="getNotesFromAPI()">OK</button>
            </div>
        </b-modal>
        <b-modal id="modalDelete" ref="modalDelete">
            <h3>Are you sure you want to delete this note?</h3>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModalDelete()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="deleteNote(form)">OK</button>
            </div>
        </b-modal>
    </div>
    
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'NoteComponent',
    props: {
        note: {
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            form: {
                id: this.note.id,
                title: this.note.title,
                description: this.note.description,
                date: this.note.date,
                archived: this.note.archived,
                categories: this.note.categories,
            },
            confirmMsg: "",
            newCategory: "",
        }
    },
    methods: {
        async archiveNote(note){
            note.archived = !note.archived;
            await this.editNoteToAPI(note)
            .then(response => {
                if(note.archived){
                    this.confirmMsg = "Note archived succesfully"
                } else {
                    this.confirmMsg = "Note restored succesfully"
                }
                this.$refs['modalConfirm'].show();
            })
        },
        openModal(){
            this.$refs['modalEditNote'].show();
        },
        closeModal(){
            this.$refs['modalEditNote'].hide();
        },
        async addNoteCategory(categories){
            let categoriesToAdd = []
            categories.forEach(element => {
                categoriesToAdd.push({'name': element.name});
            });
            return categoriesToAdd;
        },
        async editNote(note){
            await this.addNoteCategory(note.categories)
            .then(response => {
                note.categories = response;
                console.log(note);
                this.editNoteToAPI(note);
                this.getNotesFromAPI();
                this.closeModal();
                this.confirmMsg = "Note edited succesfully"
                this.$refs['modalConfirm'].show();
            })
            
        },
        confirmDelete(){
            this.$refs['modalDelete'].show();
        },
        closeModalDelete(){
            this.$refs['modalDelete'].hide();
        },
        closeModalConfirm(){
            this.$refs['modalConfirm'].hide();
        },
        async deleteNote(note){
            this.closeModalDelete();
            await this.deleteNoteToAPI(note.id)
            .then(response => {
                this.getNotesFromAPI();
            })
        },
        addCategory(category){
            let categoryToAdd = {'name': category};
            let found = false;
            this.form.categories.forEach(element => {
                if(categoryToAdd.name===element.name) found = true
            });
            if (!found) this.form.categories.push(categoryToAdd);
            this.newCategory = "";
        },
        removeCategory(i){
            this.form.categories.splice(i,1);
        },
        ...mapActions("note", ["getNotesFromAPI", "editNoteToAPI", "deleteNoteToAPI"]),
        ...mapActions("category", ["addCategoryToAPI"]),
    },
    computed: {
            ...mapState("note", ["notes"]),
            ...mapGetters("note", ["getNotes"]),
            ...mapState("category", ["categories"]),
            ...mapGetters("category",["getCategories"]),
    },
}
</script>

<style scoped>
    .wrapper{
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
        border: 1px solid #000;
    }

    .right{
        grid-column: 1;
        grid-row: 1;
    }

    .left{
        grid-column: 2;
        grid-row: 1;
    }
    .icon{
        margin-right: 20px;
        cursor: pointer;
        margin-top: 20px;
    }
</style>