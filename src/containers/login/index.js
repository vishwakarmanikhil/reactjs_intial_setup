import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { Form, Input, Button } from 'antd';
import { isValidObject } from '../../components/CommonFunctions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, userLogin } = useContext(AuthContext);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
    if(isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    if(user && user?.status) {
      if(user?.data && isValidObject(user?.data)) {
        setLoading(false);

        let userData = {
          id: user?.data?.id,
          name: user?.data?.name,
          phone_number: user?.data?.phone_number,
        }

        userLogin(user?.data?.token, userData);
      }
    }
  }, [user]);

  const handleLogin = (values) => {
    setLoading(true);
    console.log('Success:', values);

    let post = {
      phone_number: values.mobile,
      password: values.password
    }

    dispatch(loginUser(post));
  };

  return (
    <div>
      <h1>Login</h1>
      <Form 
        form={form}
        onFinish={handleLogin}
        layout={'vertical'}
      >
        <Form.Item
          label='mobile'
          name='mobile'
          rules={[
            {
              required: true,
              message: 'Please input your mobile!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='password'
          name={'password'}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Button htmlType='submit' type='primary' loading={loading} disabled={loading}>Login</Button>
      </Form>
    </div>
  );
};

export default Login;