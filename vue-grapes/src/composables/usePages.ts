import useSWRV from 'swrv';
import { fetcher } from '@/utils/fetcher'
import { PageDto } from '@/types/PageDto';

export function usePages() {
    const { data, error } = useSWRV<PageDto[]>('/api/pages', fetcher);

    return {
        pages: data,
        error,
        isLoading: !error && !data,
    };
}
