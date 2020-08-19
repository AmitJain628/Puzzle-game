import { RootState } from '@common/store/reducers';
import homeState from '@home/store/state';

export default (): RootState => ({
  home: homeState(),
});
