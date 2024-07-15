import grapesjs, {LayerManagerConfig, SelectorManagerConfig, TraitManagerConfig} from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import {
    styles,
    scripts,
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

const API_HOST = import.meta.env.VITE_APP_API_URL

export const layerManager: LayerManagerConfig = {
    appendTo: "#layers-container",
};
export const traitManager: TraitManagerConfig = {
    appendTo: "#trait-container",
};
export const selectorManager: SelectorManagerConfig = {
    appendTo: "#styles-container",
};

const storageSetting = (pageId: string): {
    headers: { "Content-Type": string };
    urlStore: string;
    urlLoad: string;
    storeHtml: boolean;
    contentTypeJson: boolean;
    storeComponents: boolean;
    storeStyles: boolean;
    storeCss: boolean;
    id: string;
    type: string;
    stepsBeforeSave: number
} => {
    return {
        type: "remote",
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        headers: {
            "Content-Type": "application/json",
        },
        id: "",
        urlStore: `${API_HOST}pages/${pageId}/content`,
        urlLoad: `${API_HOST}pages/${pageId}/content`,
    };
};

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
