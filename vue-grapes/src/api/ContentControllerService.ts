import useSWRV from 'swrv';
import {fetcher, postFetcher} from '@/utils/fetcher'
import {PageDto} from '../types/PageDto';

export class ContentControllerService {

    public static findPages() {
        const { data, error } = useSWRV<PageDto[]>('/api/pages', fetcher);

        return {
            pages: data,
            error,
            isLoading: !error && !data,
        };
    }

    public static async createPage(title: string, slug: string): Promise<PageDto> {
        return postFetcher('/api/pages', { title, slug });
    }

}
