<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <NoteItem
        v-for="(note, index) in noteLists"
        :key="`note_${index}`"
        :note="note"
        @delete="onDeleteNote"
        @editStart="onEditNoteStart"
        @editEnd="onEditNoteEnd"
      />
      <button class="transparent" @click="onClickButtonAdd()">
        <i class="fas fa-plus-square"></i>ADD NOTE
      </button>
    </div>
    <div class="right-menu">
      RIGHT
    </div>
  </div>
</template>

<script>
import NoteItem from '@/views/Note/Item';
export default {
  components: {
    NoteItem
  },
  data () {
    return {
      noteLists: []
    };
  },
  methods: {
    onClickButtonAdd () {
      this.noteLists.push({
        id : new Date().getTime().toString(16),
        name : `New Note`,
        mouseover: false,
        editing : false
      });
    },
    onDeleteNote (deleteNote) {
      const index = this.noteLists.indexOf(deleteNote);
      this.noteLists.splice(index, 1);
    },
    onEditNoteStart (editNote) {
      for (let i = 0; i < this.noteLists.length; i++) {
        this.noteLists[i].editing = (this.noteLists[i].id === editNote.id);
      }
    },
    onEditNoteEnd () {
      for (let i = 0; i < this.noteLists.length; i++) {
        this.noteLists[i].editing = false;
      }
    },
  }
}
</script>

<style scoped lang="scss">
.fas {
  padding-right: 5px;
}
.main-page {
  display: flex;
  height: calc(100vh - 60px);
  .left-menu {
    width: 350px;
    background-color: #f7f6f3;
  }
  .right-view {
    flex-grow: 1;
    padding: 10px;
  }
}
</style>