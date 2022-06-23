import React, { useState, useRef, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  // const nameInputRef = useRef();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  // From useInput hook
  // const [enteredName, setEnteredName] = useState("");

  // used to not show errror in the starting
  // not corect way as enteredName is not valid to start with as its not even there
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  // so we need another state enteredNameTouched to handle this situation when the input field is untouched
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // we can get rid of this enteredNameIsValid state and derive a constant from other two states

  // From useInput hook
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // const [formIsValid, setFormIsValid] = useState(false);

  // From useInput hook
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  // From useInput hook
  // const enteredNameIsValid = enteredName.trim().length !== 0;
  // const nameInputHasError = !enteredNameIsValid && enteredNameTouched;

  // From useInput hook
  // const enteredEmailIsValid = enteredEmail.includes("@");
  // const emailInputHasError = !enteredEmailIsValid && enteredEmailTouched;

  // useEffect just adds an extra re-evaluation cycle
  // we can use just derived constants here instead of setting setFormIsValid
  // so lets get rid of  forIsValid state and useEffect
  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     setFormIsValid(true);
  //   } else {
  //     setFormIsValid(false);
  //   }
  // }, [enteredNameIsValid]);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // From useInput hook
  // validate on every keystroke
  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);

  //   // updated value of enteredName may not be available just after  setEnteredName()
  //   // if (enteredName.trim().length !== 0) {
  //   // if (event.target.value.trim().length !== 0) {
  //   //   setEnteredNameIsValid(true);
  //   // }
  // };

  // From useInput hook
  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // From useInput hook
  // validate on blur
  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  //   // if (enteredName.trim().length === 0) {
  //   //   setEnteredNameIsValid(false);
  //   // }
  // };

  // From useInput hook
  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  // validate on form submit
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // because if the user submits the form all the inputs are considered as touched
    // commented out because we are not able to submit the form if there are errors
    // setEnteredNameTouched(true);

    // if (enteredName.trim().length === 0) {
    //   setEnteredNameIsValid(false);
    //   return;
    // }
    // setEnteredNameIsValid(true);

    // we want to keep this if to cancel the form submission if input is not valid.
    // no need to check the validity
    // just check if enteredNameIsValid is false
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log("enteredName", enteredName); // state
    // refs are objects with current property. current stores the pointer to the inout element
    // so we read the input element's value (current.value)
    // const enteredValue = nameInputRef.current.value;
    // console.log("enteredValue", enteredValue); // ref

    // From useInput hook
    // setEnteredName(""); // clear input field with setState
    // nameInputRef.current.value = ""; // clear input field with ref, not ideal to manipulate DOM

    // From useInput hook
    // setEnteredNameTouched(false); // after the form is submitted, it should be set back to untouched

    resetNameInput();
    resetEmailInput();

    // From useInput hook
    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
  };

  // const nameInputClasses = enteredNameIsValid
  //  ? "form-control"
  //   : "form-control invalid";
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
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
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          // ref={nameInputRef}
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {/* {!enteredNameIsValid && ( */}
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
