<template>
    <div class="container">
        <div class="titleDiv">
            <h1>Archived notes</h1>
            <router-link to="/notes">Go back to unarchived notes</router-link>
        </div>
        <div class="wrapper">
            <div v-for="note in notes" :key="note.id">
                <Note :note="note" v-if="note.archived"/>
            </div>
        </div>
    </div>
</template>
  
<script>
    import Note from '@/components/NoteComponent.vue';
    import { mapActions, mapGetters, mapState } from 'vuex';
    export default {
        name: "ArchivedNotesView",
        components: { Note },
        computed: {
            ...mapState("note", ["notes"]),
            ...mapGetters("note", ["getNotes"]),
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
</style>