import React from 'react';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        console.log("this.props.children");
        console.log(this.props.children);

    }

    componentDidMount() {
    }

    render() {
        return (
            <form>
                {this.props.children}
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export class AGInput extends React.Component {

    constructor(props) {
        super(props);
        console.log("AGInput");
    }

    componentDidMount() {
    }

    render() {
        return (
            <input className="aginput" name={this.props.name} type="text" placeholder="some data to go here"></input>
        );
    }
}

React.render(
    <Form>
        <AGInput name="First Name"/>
        <AGInput name="Surname"/>
    </Form>, document.querySelector("#myApp")
);