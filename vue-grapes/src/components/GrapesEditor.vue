<template>
  <div id="gjs" ref="editor" style="height:100vh; overflow:hidden">
    <div class="panel">
      <h1 class="welcome">Welcome to</h1>
      <div class="big-title">
        <span>GrapesJS</span>
      </div>
      <div class="description">
        This is a demo content from index.html. For the development, you shouldn't edit this file, instead you can
        copy and rename it to _index.html, on next server start the new file will be served, and it will be ignored by git.
      </div>
    </div>
  </div>
</template>

<
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import type { Editor, Plugin } from 'grapesjs';
import blocks from '@/components/preset/blocks';
import commands from '@/components/preset/commands';
import panels from '@/components/preset/panels';

import pluginPresetWebpage from 'grapesjs-preset-webpage';
import pluginBlocksBasic from 'grapesjs-blocks-basic';
import pluginComponentCountdown from 'grapesjs-component-countdown';
import pluginCustomCode from 'grapesjs-custom-code';
import pluginIndexeddb from 'grapesjs-indexeddb';
import pluginNavbar from 'grapesjs-navbar';
import pluginPluginExport from 'grapesjs-plugin-export';
import pluginPluginForms from 'grapesjs-plugin-forms';

export type PluginOptions = {
  blocks?: string[];
  block?: (blockId: string) => ({});
  modalImportTitle?: string;
  modalImportButton?: string;
  modalImportLabel?: string;
  modalImportContent?: string | ((editor: Editor) => string);
  importViewerOptions?: Record<string, any>;
  textCleanCanvas?: string;
  showStylesOnChange?: boolean;
  useCustomTheme?: boolean;
};

const applyPlugin: Plugin<PluginOptions> = (editor, opts: Partial<PluginOptions> = {}) => {
  const config: RequiredPluginOptions = {
    blocks: ['link-block', 'quote', 'text-basic'],
    block: () => ({}),
    modalImportTitle: 'Import',
    modalImportButton: 'Import',
    modalImportLabel: '',
    modalImportContent: '',
    importViewerOptions: {},
    textCleanCanvas: 'Are you sure you want to clear the canvas?',
    showStylesOnChange: true,
    useCustomTheme: true,
    ...opts,
  };

  if (config.useCustomTheme && typeof window !== 'undefined') {
    const primaryColor = '#463a3c';
    const secondaryColor = '#b9a5a6';
    const tertiaryColor = '#804f7b';
    const quaternaryColor = '#d97aa6';
    const prefix = 'gjs-';
    let cssString = '';

    [
      ['one', primaryColor],
      ['two', secondaryColor],
      ['three', tertiaryColor],
      ['four', quaternaryColor],
    ].forEach(([cnum, ccol]) => {
      cssString += `
        .${prefix}${cnum}-bg {
          background-color: ${ccol};
        }
        .${prefix}${cnum}-color {
          color: ${ccol};
        }
        .${prefix}${cnum}-color-h:hover {
          color: ${ccol};
        }
      `;
    });

    const style = document.createElement('style');
    style.innerText = cssString;
    document.head.appendChild(style);
  }

  // Load blocks
  blocks(editor, config);
  // Load commands
  commands(editor, config);
  // Load panels
  panels(editor, config);
};


export type RequiredPluginOptions = Required<PluginOptions>;

const initializeGrapesEditor = (container: HTMLElement) => {
  return grapesjs.init({
    container: container,
    showOffsets: true,
    noticeOnUnload: false,
    fromElement: true,
    storageManager: {
      type: 'local',
      autosave: true,
      autoload: true,
    },
    canvas: {
      styles: [],
      scripts: [],
    },
    plugins: [
        pluginPresetWebpage,
        pluginBlocksBasic,
        pluginComponentCountdown,
        pluginCustomCode,
        pluginNavbar,
        pluginIndexeddb,
        pluginNavbar,
        pluginPluginExport,
        pluginPluginForms,
    ],
    pluginsOpts: {
      'gjs-preset-webpage': {},
    },
  });
};

const applyEditorPlugin = (editorInstance: Editor) => {
  applyPlugin(editorInstance, {
    blocks: ['link-block', 'quote', 'text-basic'],
    block: (blockId: string) => ({
      label: blockId,
      attributes: { class: 'fa fa-link' },
      content: {
        type: 'link',
        content: 'Link',
        style: { color: '#d983a6' },
      },
    }),
    modalImportTitle: 'Import',
    modalImportButton: 'Import',
    modalImportLabel: '',
    modalImportContent: '',
    importViewerOptions: {},
    textCleanCanvas: 'Are you sure you want to clear the canvas?',
    showStylesOnChange: true,
    useCustomTheme: true,
  });
};

const editor = ref<HTMLElement | null>(null);
onMounted(() => {
  if (editor.value) {
    const grapesEditor = initializeGrapesEditor(editor.value);
    applyEditorPlugin(grapesEditor);
  }
});
</script>


<style  scoped>
body,
html {
  height: 100%;
  margin: 0;
}

#gjs {
  border: 3px solid #444;
}

.panel {
  width: 90%;
  max-width: 700px;
  border-radius: 3px;
  padding: 30px 20px;
  margin: 150px auto 0;
  background-color: #d983a6;
  box-shadow: 0 3px 10px 0 rgba(0,0,0,0.25);
  color:rgba(255,255,255,0.75);
  font: caption;
  font-weight: 100;
}

.welcome {
  text-align: center;
  font-weight: 100;
  margin: 0;
}

.logo path {
  pointer-events: none;
  fill: none;
  stroke-linecap: round;
  stroke-width: 7;
  stroke: #fff
}

.big-title {
  text-align: center;
  font-size: 3.5rem;
  margin: 15px 0;
}

.description {
  text-align: justify;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>
