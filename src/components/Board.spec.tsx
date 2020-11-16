import { shallow } from 'enzyme'
import React from 'react'
import Board from './Board'

describe('BoardComponent', () => {
  it('should render Board', () => {
    const wrapper = shallow(<Board />); 
    expect(wrapper.find('ul')).not.toBeUndefined();
  });
});
