import 'jsdom-global/register';
import Messages from './messages';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount, shallow, render} from 'enzyme';
import "@testing-library/jest-dom/extend-expect";

configure({adapter: new Adapter()})

describe('Messages', () => {
  it('Checking props', () => {
    const wrapper = mount(<Messages messages={[{text: "Hello", isText: true}]}/>);
    expect(wrapper.props().messages.text === "Hello");
  });
  it('Displays the messages', () => {
    const wrapper = shallow(<Messages messages={[{text: "Hello", isText: true}]}/>);
    const p = wrapper.find('p');
    expect(p.text() === "Hello");
  })
})
