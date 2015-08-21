import React from 'react';

export class Form extends React.Component {

    constructor(props) {
        super(props);

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
    }

    componentDidMount() {
    }

    render() {
        return (
            <input className="aginput" name={this.props.name} type="text" placeholder={this.props.placeholder}></input>
        );
    }
}

export class AGSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    handleChange() {
    }

    render() {
        return (
            <div>
            <select className="agselect" name={this.props.name} onChange={this.handleChange}>
                {this.props.children}
            </select>
            <AGDyanmicTextFields/>
            </div>
        );
    }
}

export class AGSelectOptions extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <option name={this.props.name} selected={this.props.selected}>
                {this.props.children}
            </option>

        );
    }
}


export class AGDyanmicTextFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {fields: [55, 55, 55]};
    }

    componentDidMount() {
        console.log("debug: " + this.state.fields.length);
    }

    render() {
        return (
            <div name={this.props.name}>
                {this.state.fields.map(
                    function (index) {
                        return <AGInput name="age"/>
                    }
                )}
            </div>
        );
    }
}

React.render(
    <Form>
        <AGInput name="FirstName"/>
        <AGInput name="Surname"/>
        <AGSelect>
            <AGSelectOptions selected="selected">Number of Fields to Add</AGSelectOptions>
            <AGSelectOptions>1</AGSelectOptions>
            <AGSelectOptions>2</AGSelectOptions>
            <AGSelectOptions>3</AGSelectOptions>
        </AGSelect>
    </Form>, document.querySelector("#myApp")
);