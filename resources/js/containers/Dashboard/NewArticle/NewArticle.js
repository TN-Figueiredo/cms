import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components//UI/Button/Button";

// Actions
import * as actionTypes from "../../../store/actions/index";

// Utilities
import { updateObject, checkValidity } from "../../../shared/utility";

class NewArticle extends Component {
    state = {
        controls: {
            title: this.createFormInput(
                "Title",
                "input",
                { required: true },
                "text"
            ),
            body: this.createFormInput(
                "Body",
                "textarea",
                { required: true },
                "text"
            )
        }
    };

    // Function responsible for mounting all the inputs based on the information provided
    createFormInput(
        placeholder,
        elType = "input",
        rules = { required: true },
        type = "text"
    ) {
        return {
            elementType: elType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: "",
            validation: rules,
            valid: false,
            touched: false
        };
    }

    // Input Changed Handler
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    };

    // Submit Form Handler
    submitHandler = event => {
        event.preventDefault();
        this.props.onSubmitNewArticle({
            title: this.state.controls.title.value,
            body: this.state.controls.body.value
        });
    };
    render() {
        // Create array with the controls of the form
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        // Create variable to store the Form
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={event =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        return (
            <div>
                <div className="card">
                    <div className="card-header main-color-bg">New Article</div>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <Button btnType="Success">SUBMIT</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitNewArticle: data => dispatch(actionTypes.addNewArticle(data))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(NewArticle);
