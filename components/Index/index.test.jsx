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
    expect(wrapper.find('h1') === "Room 0");
  });
  describe("Login Component", () => {
    it('Creating an account', () => {
        const wrapper = mount(<Index />);
        const input = wrapper.find("#login-input");
        const button = wrapper.find("#login-button");
        expect(button.text() === "Join the chat");
        input.simulate("change", {target: {value: "Pera"}});
        button.simulate("click");
        const newButton = wrapper.find("button");
        expect(newButton.text() === "Create chat");
    });
    describe("Select chat room (Room 0)", () => {
      it("Able to join a chat", () => {
        const wrapper = mount(<Index />);
        const input = wrapper.find("#login-input");
        const button = wrapper.find("#login-button");
        input.simulate("change", {target: {value: "Pera"}});
        button.simulate("click");
        const newButton = wrapper.find(".chat").at(0);
        newButton.simulate('click');
        const roomId = wrapper.find("h1").at(1);
        console.log(roomId.text());
        expect(roomId.text() === "Room 1");
      })
    })
  })
})
