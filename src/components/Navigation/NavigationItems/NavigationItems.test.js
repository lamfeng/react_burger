import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
    // Here to write the actual test
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it("should render two <Navigation Item /> elements if not authenticated", () => {
        // const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <Navigation Item /> elements if authenticated", () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should an exact logout button elements if authenticated", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});

// Section 20,256
// it() gains two argument
// First argument is just a string, a description which will appear in the console
// Second argument is actual testing logic
