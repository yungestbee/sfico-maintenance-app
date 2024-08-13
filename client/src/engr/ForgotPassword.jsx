import "./ForgotPassword.css"

const ForgotPassword = () => {
  return (
    <>
      <div className="f-container">
        <p>
          To reset your password, submit your username or your email address
          below. if we can find you in the database, an email will be sent to
          your email address, with instructions how to get access again.
        </p>
        <div className="forgot-container">
          <h3>Search by username</h3>
          <div className="forgot-input-box">
            <h4>Username</h4>
            <input />
          </div>
          <h3>Search by Email Address</h3>
          <div className="forgot-input-box">
            <h4>Email address</h4>
            <input />
          </div>
          <button>Search</button>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
