import React from 'react';

const LoginForm = ({ form, onChange, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input name="id" onChange={onChange} value={form.id} />
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
