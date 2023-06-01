import useFormInput from "../hooks/use-form-input";

const isNotEmpty = value => value.trim() !== "";
const isEmail = value =>
/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
  value
)

const BasicForm = (props) => {
  const {
    value : enteredFirstName,
    isValid : firstNameIsValid,
    hasError : firstNameHasError,
    valueChangeHandler : firstNameChangeHandler, 
    inputBlurHandler : firstNameBlurHandler, 
    reset: resetFirstNameInput
  } = useFormInput(isNotEmpty);

  const {
    value : enteredLastName,
    isValid : lastNameIsValid,
    hasError : lastNameHasError,
    valueChangeHandler : lastNameChangeHandler, 
    inputBlurHandler : lastNameBlurHandler, 
    reset: resetLastNameInput
  } = useFormInput(isNotEmpty);

  const {
    value : enteredEmail,
    isValid : emailIsValid,
    hasError : emailHasError,
    valueChangeHandler : emailChangeHandler, 
    inputBlurHandler : emailBlurHandler, 
    reset: resetEmailInput
  } = useFormInput(isEmail);


  let formIsValid = false; 

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = e => {
    e.preventDefault(); 
    
    if (!formIsValid) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  } 

  const firstNameInputClasses = firstNameHasError ? 
  'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameHasError ? 
  'form-control invalid' : 'form-control';
  const emailInputClasses = emailHasError ? 
  'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name'
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          value={enteredFirstName}
          />
          {firstNameHasError && (
          <p className="error-text">First name must not be empty.</p>
        )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name'
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
          />
          {lastNameHasError && (
          <p className="error-text">Last name must not be empty.</p>
        )}
        </div>
        <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input type='email' id='email'
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
