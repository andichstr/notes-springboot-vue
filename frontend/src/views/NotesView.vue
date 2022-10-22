<template>
    <div class="container">
        <div class="titleDiv">
            <h1>My notes</h1>
            <b-button v-b-modal.modalAddNote>Add Note</b-button>
            <router-link to="/notes/archived">Archived notes</router-link>
        </div>
        <div class="wrapper">
            <div v-for="note in notes" :key="note.id">
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
                    <b-form-textarea id="description" v-model="form.desc" required/>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="addNote(form)">OK</button>
            </div>
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
                    desc: "",
                },
            }
        },
        components: { Note },
        computed: {
            ...mapState("note", ["notes"]),
            ...mapGetters("note", ["getNotes"]),
        },
        methods: {
            ...mapActions("note", ["getNotesFromAPI", "addNoteToAPI"]),
            closeModal(){
                this.$refs['modalAddNote'].hide();
            },
            addNote(note){
                this.addNoteToAPI(note);
                this.getNotesFromAPI();
                this.closeModal();
            },
        },
        mounted() {
            this.getNotesFromAPI();
        },
    }
</script>
  
<style scoped>
    .titleDiv{
        text-align: left;
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }
</style>