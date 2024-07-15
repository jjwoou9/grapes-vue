import {
    LayerManagerConfig,
    SelectorManagerConfig,
    TraitManagerConfig
} from "grapesjs";

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
export const deviceManager = {
    devices: [
        {
            name: "Desktop",
            width: "",
        },
        {
            name: "Mobile",
            width: "320px",
            widthMedia: "480px",
        },
    ],
};

export const storageSetting = (pageId: string): {
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
        id: "mycustom-",
        urlStore: `${API_HOST}pages/${pageId}/content`,
        urlLoad: `${API_HOST}pages/${pageId}/content`,
    };
};

export const scripts = [
    "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "https://unpkg.com/swiper@7/swiper-bundle.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js",
    "https://cdn.jsdelivr.net/npm/chart.js",
];
export const styles = [
    "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
    "https://unpkg.com/swiper@7/swiper-bundle.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
];

