<template>
    <div>
        <div class="wrapper">
            <div class="right">
                <h2>{{note.title}}</h2>
                <h4>{{note.date}}</h4>
            </div>
            <div class="left">
                <b-icon class="icon" @click="archiveNote(note)" icon="archive-fill" scale="2"></b-icon>
                <b-icon class="icon" @click="openModal()" icon="pencil-fill" scale="2"></b-icon>
                <b-icon class="icon" @click="deleteNote(note)" icon="trash-fill" scale="2"></b-icon>
            </div>
        </div>
        <b-modal id="modalEditNote" ref="modalEditNote">
            <h1>Edit Note</h1>
            <b-form>
                <b-form-group id="title-group" label="Title: " label-for="title">
                    <b-form-input id="title" v-model="form.title" type="text" required/>
                </b-form-group>
                <b-form-group id="description-group" label="Description: " label-for="description">
                    <b-form-textarea id="description" v-model="form.desc" required/>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="editNote(form)">OK</button>
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
                desc: this.note.description,
            }
        }
    },
    methods: {
        archiveNote(note){
            note.archived = true;
            this.editNoteToAPI(note);
            this.getNotesFromAPI();
        },
        openModal(){
            this.$refs['modalEditNote'].show();
        },
        closeModal(){
            this.$refs['modalEditNote'].hide();
        },
        editNote(note){
            console.log(note);
            this.editNoteToAPI(note);
        },
        deleteNote(note){
            this.deleteNoteToAPI(note.id);
            this.getNotesFromAPI();
        },
        ...mapActions("note", ["getNotesFromAPI", "editNoteToAPI", "deleteNoteToAPI"]),
    },
    computed: {
            ...mapState("note", ["notes"]),
            ...mapGetters("note", ["getNotes"]),
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