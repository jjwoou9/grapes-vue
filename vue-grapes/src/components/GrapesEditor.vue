<template>
  <div id="gjs" ref="editor" style="height:100vh; overflow:hidden">
    <div class="panel">
      <h1 class="welcome">Welcome to</h1>
      <div class="big-title">
        <svg class="logo" viewBox="0 0 100 100">
          <path d="M40 5l-12.9 7.4 -12.9 7.4c-1.4 0.8-2.7 2.3-3.7 3.9 -0.9 1.6-1.5 3.5-1.5 5.1v14.9 14.9c0 1.7 0.6 3.5 1.5 5.1 0.9 1.6 2.2 3.1 3.7 3.9l12.9 7.4 12.9 7.4c1.4 0.8 3.3 1.2 5.2 1.2 1.9 0 3.8-0.4 5.2-1.2l12.9-7.4 12.9-7.4c1.4-0.8 2.7-2.2 3.7-3.9 0.9-1.6 1.5-3.5 1.5-5.1v-14.9 -12.7c0-4.6-3.8-6-6.8-4.2l-28 16.2"/>
        </svg>
        <span>GrapesJS</span>
      </div>
      <div class="description">
        This is a demo content from index.html. For the development, you shouldn't edit this file, instead you can
        copy and rename it to _index.html, on next server start the new file will be served, and it will be ignored by git.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import pluginPresetWebpage from 'grapesjs-preset-webpage';

import type { Editor, Plugin } from 'grapesjs';
import blocks from '@/components/preset/blocks'
import commands from '@/components/preset/commands'
import panels from '@/components/preset/panels';

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

export type RequiredPluginOptions = Required<PluginOptions>;

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


export default defineComponent({
  name: 'GrapesJSEditor',
  setup() {
    const editor = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (editor.value) {
        console.log('editor.value', editor.value);
        const grapesEditor = grapesjs.init({
          height: '100%',
          showOffsets: true,
          noticeOnUnload: false,
          storageManager: false,
          container: editor.value,
          fromElement: true,
          plugins: [pluginPresetWebpage],
          pluginsOpts: {
            'grapesjs-preset-webpage': {}
          }
        });


        applyPlugin(grapesEditor, {
          blocks: ['link-block', 'quote', 'text-basic'],
          block: (blockId) => ({
            label: blockId,
            attributes: { class: 'fa fa-link' },
            content: {
              type: 'link',
              content: 'Link',
              style: { color: '#d983a6' }
            }
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

      }else{
        console.log('editor.value is null');
      }
    });

    return { editor };
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
  margin: 150px auto 0px;
  background-color: #d983a6;
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.25);
  color:rgba(255,255,255,0.75);
  font: caption;
  font-weight: 100;
}

.welcome {
  text-align: center;
  font-weight: 100;
  margin: 0px;
}

.logo {
  width: 70px;
  height: 70px;
  vertical-align: middle;
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
