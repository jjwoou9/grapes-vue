import {PageDto} from "@/types/PageDto";

export interface PageContentDto extends PageDto {
    html: string;
    css: string;
    components: string;
    assets: string;
    styles: string;
};
