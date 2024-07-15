import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import {
    storageSetting,
    panels,
    styleManager,
    styles,
    scripts,
    traitManager,
    layerManager,
    selectorManager
} from "../utils/editorUtils.ts";

// 플러그인 임포트
import pluginPresetWebpage from 'grapesjs-preset-webpage';
import pluginBlocksBasic from 'grapesjs-blocks-basic';
import pluginComponentCountdown from 'grapesjs-component-countdown';
import pluginCustomCode from 'grapesjs-custom-code';
import pluginIndexeddb from 'grapesjs-indexeddb';
import pluginNavbar from 'grapesjs-navbar';
import pluginPluginExport from 'grapesjs-plugin-export';
import pluginPluginForms from 'grapesjs-plugin-forms';


export function useGrapesJS(pageId: string, assets: any[]) {

    const initGrapesEditor = (container: HTMLElement) => {
        return grapesjs.init({
            container: container,
            showOffsets: true,
            noticeOnUnload: false,
            fromElement: true,
            styleManager: styleManager,
            layerManager: layerManager,
            traitManager: traitManager,
            selectorManager: selectorManager,
            panels: panels,
            assetManager: { assets: assets, upload: false },
            storageManager: storageSetting(pageId),
            // storageManager: {
            //     type: 'local',
            //     autosave: true,
            //     autoload: true,
            // },
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
