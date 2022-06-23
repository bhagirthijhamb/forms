import React, { useState, useRef } from "react";

const SimpleInput = (props) => {
  // const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  // used to not show errror in the starting
  // not corect way as enteredName is not valid to start with as its not even there
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  // so we need another state enteredNameTouched to handle this situation when the input field is untouched
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // we can get rid of this enteredNameIsValid state and derive a constant from other two states
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim().length !== 0;
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  // validate on every keystroke
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    // updated value of enteredName may not be available just after  setEnteredName()
    // if (enteredName.trim().length !== 0) {
    // if (event.target.value.trim().length !== 0) {
    //   setEnteredNameIsValid(true);
    // }
  };

  // validate on blur
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    // if (enteredName.trim().length === 0) {
    //   setEnteredNameIsValid(false);
    // }
  };

  // validate on form submit
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // because if the user submits the form all the inputs are considered as touched
    setEnteredNameTouched(true);

    // if (enteredName.trim().length === 0) {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
    // setEnteredNameIsValid(true);

    // we want to keep this if to cancel the form submission if inout is not valid.
    // no need to check the validity
    // just check if enteredNameIsValid is false
    if (!enteredNameIsValid) {
      return;
    }

    console.log("enteredName", enteredName); // state
    // refs are objects with current property. current stores the pointer to the inout element
    // so we read the input element's value (current.value)
    // const enteredValue = nameInputRef.current.value;
    // console.log("enteredValue", enteredValue); // ref

    setEnteredName(""); // clear input field with setState
    // nameInputRef.current.value = ""; // clear input field with ref, not ideal to manipulate DOM
    setEnteredNameTouched(false); // after the form is submitted, it should be set back to untouched
  };

  // const nameInputClasses = enteredNameIsValid
  //  ? "form-control"
  //   : "form-control invalid";
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      {/* <div className="form-control"> */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {/* {!enteredNameIsValid && ( */}
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
