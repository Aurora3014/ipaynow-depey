import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import MainWrapper from '../layout/MainWrapper';
import { GetRequest, PostRequest } from '../api/ApiRequest';
import { CURRENT_HOST } from '../Constants';
import { notifyError } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        GetRequest(`${CURRENT_HOST}/api/v1/admin/validate_token`)
            .then((res) => {
                if (res.data.valid) {
                    navigate('/dashboard/users');
                }
            })
    }, [])

    const onFinish = async (values) => {
        let loginRes = await PostRequest(`${CURRENT_HOST}/api/v1/admin/login`, {
            ...values
        });
        if (loginRes.data) {
            let { token, msg } = loginRes.data;
            console.log(token, msg);
            if (msg) {
                notifyError(msg);
            }
            if (token) {
                localStorage.setItem('token', token);
                navigate('/dashboard/users');
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <MainWrapper>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: 'auto'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    type="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </MainWrapper>
    )
}

export default Login;