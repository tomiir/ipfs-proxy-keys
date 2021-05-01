import React from 'react';
import { shallow, configure } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';

import Checkbox from './index';

describe('<Checkbox />', () => {
  configure({ adapter: new Adapter() });
  it('should add checked prop', () => {
    const wrapper = shallow(<Checkbox checked />);
    const input = wrapper.find('input');

    expect(input.props().checked).toBeTruthy();
  });
  it('should call onChange when input is clicked', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Checkbox onChange={onChange} />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { checked: true } });

    expect(onChange).toBeCalled();
  });
});
