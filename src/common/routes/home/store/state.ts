import { IHomeState } from '@home/store/types';

export default (): IHomeState => ({
  userDetails: [],
  isLoading: true,
  userPhotos: [],
});
