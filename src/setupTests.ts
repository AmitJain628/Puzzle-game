import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

window.matchMedia =
  window.matchMedia ||
  // tslint:disable-next-line:only-arrow-functions
  function(): {
    matches: boolean;
    addListener(): void;
    removeListener(): void;
  } {
    return {
      matches: false,
      addListener(): void {
        //
      },
      removeListener(): void {
        //
      }
    };
  };
