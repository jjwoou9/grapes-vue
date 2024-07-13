import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import type { Editor } from 'grapesjs';
import { PluginOptions, RequiredPluginOptions } from '@/types/grapesjs.types';
import { applyCustomTheme } from '@/utils/applyCustomTheme';

// 플러그인 임포트
import pluginPresetWebpage from 'grapesjs-preset-webpage';
import pluginBlocksBasic from 'grapesjs-blocks-basic';
import pluginComponentCountdown from 'grapesjs-component-countdown';
import pluginCustomCode from 'grapesjs-custom-code';
import pluginIndexeddb from 'grapesjs-indexeddb';
import pluginNavbar from 'grapesjs-navbar';
import pluginPluginExport from 'grapesjs-plugin-export';
import pluginPluginForms from 'grapesjs-plugin-forms';

import blocks from '@/components/GrapesEditor/preset/blocks';
import commands from '@/components/GrapesEditor/preset/commands';
import panels from '@/components/GrapesEditor/preset/panels';

export function useGrapesJS() {
    const applyPlugin = (editor: Editor, opts: Partial<PluginOptions> = {}) => {
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
            applyCustomTheme();
        }

        // Load blocks, commands, and panels
        blocks(editor, config);
        commands(editor, config);
        panels(editor, config);
    };

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

    return {
        initializeGrapesEditor,
        applyEditorPlugin,
    };
}