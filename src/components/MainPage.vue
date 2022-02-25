<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <button class="transparent" @click="onClickButtonSave">
        <i class="fas fa-save"></i>SAVE
      </button>
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
          @select="onSelectNote"
          @addNoteAfter="onAddNoteAfter"
        />
      </draggable>
      <button class="transparent" @click="onClickButtonAdd()">
        <i class="fas fa-plus-square"></i>ADD NOTE
      </button>
    </div>
    <div class="right-view" @click.self="onEditNoteEnd()">
      <template v-if="selectedNote == null">
        <div class="no-selected-note">Select note</div>
      </template>
      <template v-else>
        <div class="path">
          <small>{{selectedPath}}</small>
        </div>
        <div class="note-content">
          <h3 class="note-title">{{selectedNote.name}}</h3>
          <draggable v-bind:list="selectedNote.widgetList" group="widgets">
            <NoteContent
              v-for="(widget, index) in selectedNote.widgetList"
              :widget="widget"
              :layer="1"
              :key="`widget_${index}`"
              @delete="onDeleteWidget"
              @addChild="onAddChildWidget"
              @addWidgetAfter="onAddWidgetAfter"
            />
          </draggable>
          <button class="transparent" @click="onClickButtonAddWidget">
            <i class="fas fa-plus-square"></i>ADD WIDGET
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NoteItem from '@/views/Note/Item';
import NoteContent from '@/views/Note/NoteContent';
import draggable from 'vuedraggable';

export default {
  components: {
    NoteItem,
    NoteContent,
    draggable
  },
  data () {
    return {
      noteLists: [],
      selectedNote: null
    };
  },
  computed: {
    selectedPath () {
      function searchSelectedPath (noteList, path) {
        for (let note of noteList) {
          const currentPath = path == null ? note.name : `${path} / ${note.name}`;
          if (note.selected) return currentPath;
          const selectedPath = searchSelectedPath(note.children, currentPath);
          if (selectedPath.length > 0) return selectedPath;
        }
        return '';
      }
      return searchSelectedPath(this.noteLists);
    },
  },
  created () {
    const localData = localStorage.getItem('noteItem');
    if (localData != null)  {
      this.noteLists = JSON.parse(localData);
    }
  },
  methods: {
    onClickButtonAdd () {
      this.onAddNoteCommon(this.noteLists);
    },
    onClickButtonSave () {
      localStorage.setItem('noteItem', JSON.stringify(this.noteLists));
      this.$toasted.show('Note saved.', {
        position: 'top-left',
        duration: 1000,
        type: 'success'
      });
    },
    onAddNoteCommon (targetLists, layer, index) {
      layer = layer || 1;
      const note = {
        id : new Date().getTime().toString(16),
        name : `NewNote-${layer}-${targetLists.length}`,
        mouseover : false,
        editing : false,
        selected : false,
        children : [],
        layer : layer,
        widgetList : []
      };
      this.onAddWidgetCommon(note.widgetList);
      if (index == null) {
        targetLists.push(note);
      } else {
        targetLists.splice(index + 1, 0, note);
      }
    },
    onSelectNote (targetNote) {
      function updateSelectStatus (targetNote, noteList) {
        for (let note of noteList) {
          note.selected = (note.id === targetNote.id);
          updateSelectStatus(targetNote, note.children);
        }
      }
      updateSelectStatus(targetNote, this.noteLists);
      this.selectedNote = targetNote;
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
    },
    onAddWidgetCommon (targetList, layer, index) {
      layer = layer || 1;
      const widget = {
        id: new Date().getTime().toString(16),
        type: layer === 1 ? 'heading' : 'body',
        text: '',
        mouseover: false,
        children: [],
        layer: layer,
      };
      if (index == null) {
        targetList.push(widget);
      } else {
        targetList.splice(index + 1, 0, widget);
      }  
    },
    onClickButtonAddWidget () {
      this.onAddWidgetCommon(this.selectedNote.widgetList);
    },
    onAddChildWidget (widget) {
      this.onAddWidgetCommon(widget.children, widget.layer + 1);
    },
    onAddWidgetAfter (parentWidget, note) {
      const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
      const layer = parentWidget == null ? null : parentWidget.layer + 1;
      const index = targetList.indexOf(note);
      this.onAddWidgetCommon(targetList, layer, index);
    },
    onDeleteWidget (parentWidget, widget) {
      const targetList = parentWidget == null ? this.selectedNote.widgetList : parentWidget.children;
      const index = targetList.indexOf(widget);
      targetList.splice(index, 1);
      const focusWidget = (index === 0) ? parentWidget : targetList[index - 1];
      if (focusWidget != null) {
        focusWidget.id = (parseInt(focusWidget.id, 16) + 1).toString(16);
      }
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
    .no-selected-note {
      text-align: center;
      font-size: 25px;
      margin: 20px;
    }
    .path {
      text-align: left;
      margin-bottom: 50px;      
    }
    .note-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: left;
      .note-title {
        margin-bottom: 25px;
      }
    }
  }
}
</style>