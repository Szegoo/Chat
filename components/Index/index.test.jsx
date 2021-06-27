import 'jsdom-global/register';
import Index from '../../pages/index';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount, shallow, render} from 'enzyme';
import "@testing-library/jest-dom/extend-expect";

configure({adapter: new Adapter()})

describe('Index page', () => {
  it('Getting displayed', () => {
    const wrapper = mount(<Index/>);
    expect(wrapper.find('h1') === "Room #1");
  });
  describe("Login Component", () => {
    it('Rendering login component', () => {
        const wrapper = mount(<Index />);
        const button = wrapper.find("#login-button");
        expect(button.text() === "Join the chat");
    });
  })
})
