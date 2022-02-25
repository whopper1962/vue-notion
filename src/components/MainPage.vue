<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <draggable :list="noteLists" group="notes">
        <NoteItem
          v-for="(note, index) in noteLists"
          :key="`note_${index}`"
          :note="note"
          :layer="1"
          @delete="onDeleteNote"
          @editStart="onEditNoteStart"
          @editEnd="onEditNoteEnd"
          @addChild="onAddChildNote"
          @addNoteAfter="onAddNoteAfter"
        />
      </draggable>
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
import draggable from 'vuedraggable';

export default {
  components: {
    NoteItem,
    draggable
  },
  data () {
    return {
      noteLists: []
    };
  },
  methods: {
    onClickButtonAdd () {
      this.onAddNoteCommon(this.noteLists);
    },
    onAddNoteCommon (targetLists, layer, index) {
      layer = layer || 1;
      const note = {
        id : new Date().getTime().toString(16),
        name : `NewNote-${layer}-${targetLists.length}`,
        mouseover : false,
        editing : false,
        children : [],
        layer : layer
      };
      if (index == null) {
        targetLists.push(note);
      } else {
        targetLists.splice(index + 1, 0, note);
      }
    },
    onDeleteNote (parentNote, note) {
      const targetList = parentNote == null ? this.noteLists : parentNote.children;
      const index = targetList.indexOf(note);
      targetList.splice(index, 1);
    },
    onEditNoteStart (editNote, parentNote) {
      const targetList = parentNote == null ? this.noteLists : parentNote.children;
      for (let note of targetList) {
        note.editing = (note.id === editNote.id);
        this.onEditNoteStart(editNote, note);
      }
    },
    onEditNoteEnd (parentNote) {
      const targetList = parentNote == null ? this.noteLists : parentNote.children;
      for (let note of targetList) {
        note.editing = false;
        this.onEditNoteEnd(note);
      }
    },
    onAddChildNote (note) {
      this.onAddNoteCommon(note.children, note.layer + 1);
    },
    onAddNoteAfter (parentNote, note) {
      const targetList = parentNote == null ? this.noteLists : parentNote.children;
      const layer = parentNote == null ? 1 : note.layer;
      const index = targetList.indexOf(note);
      this.onAddNoteCommon(targetList, layer, index);
    }
  }
}
</script>

<style scoped lang="scss">
.fas {
  padding-left: 2px;
  padding-right: 13px;
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