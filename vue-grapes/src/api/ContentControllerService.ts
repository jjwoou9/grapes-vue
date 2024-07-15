import useSWRV from 'swrv';
import {fetcher, postFetcher} from '@/utils/fetcher'
import {PageDto} from '@/types/PageDto';


const endpoint = '/api/contents';

export class ContentControllerService {
    /*
    *   async findPages(): Promise<{ data: PageDto[], error: any }> {
    try {
      const response = await axios.get('/api/pages');
      return { data: response.data, error: null };
    } catch (error) {
      return { data: [], error: error };
    }
  },
    * */

    public static  findPages() {
        const { data, error, mutate } = useSWRV<PageDto[]>(`${endpoint}/pages`, fetcher);

        const isLoading = !data && !error;

        return {
            data: data,
            error: error ? error.value || null : null,
            isLoading: isLoading,
            mutate: mutate,
        };
    }

    public static async createPage(title: string, slug: string): Promise<PageDto> {
        return postFetcher(`${endpoint}/pages`, { title, slug });
    }

}
