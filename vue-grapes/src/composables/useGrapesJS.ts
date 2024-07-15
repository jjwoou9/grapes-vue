import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import {
    storageSetting,
    styles,
    scripts,
    traitManager,
    layerManager,
    selectorManager
} from '@/utils/editorUtils';

// 플러그인 임포트
import pluginPresetWebpage from 'grapesjs-preset-webpage';
import pluginBlocksBasic from 'grapesjs-blocks-basic';
import pluginComponentCountdown from 'grapesjs-component-countdown';
import pluginCustomCode from 'grapesjs-custom-code';
import pluginIndexeddb from 'grapesjs-indexeddb';
import pluginNavbar from 'grapesjs-navbar';
import pluginPluginExport from 'grapesjs-plugin-export';
import pluginPluginForms from 'grapesjs-plugin-forms';


export function useGrapesJS(pageId: string) {

    const initGrapesEditor = (container: HTMLElement) => {
        return grapesjs.init({
            container: container,
            showOffsets: true,
            noticeOnUnload: false,
            fromElement: true,
            layerManager: layerManager,
            traitManager: traitManager,
            selectorManager: selectorManager,
            storageManager: storageSetting(pageId),
            canvas: {
                styles: styles,
                scripts: scripts,
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

    return { initGrapesEditor };
}
