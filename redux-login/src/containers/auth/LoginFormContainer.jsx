import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { changeField, initialField, login } from '../../modules/auth';

const LoginFormContainer = () => {
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.form,
    auth: auth.auth,
    authError: auth.authError,
  }));
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch수행
    dispatch(login(form));
    authError && setError('존재하지 않는 회원입니다.');
    dispatch(initialField());
  };

  const onChange = (e) => {
    const { name, value } = e.target; //e.target.name,e.target.value
    dispatch(changeField({ key: name, value }));
  };

  return (
    <LoginForm
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
    />
  );
};

//container는 항상 withRouter로 감싸기
export default withRouter(LoginFormContainer);
