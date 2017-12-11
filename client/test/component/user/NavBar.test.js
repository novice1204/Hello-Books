import React from 'react';
import expect from 'expect';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import  NavBar from '../../../components/includes/NavBar';

configure({ adapter: new Adapter() });


describe('Component: NavBar', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<NavBar />)
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
    expect(wrapper.find('nav').length).toBe(1);    
  })
})
