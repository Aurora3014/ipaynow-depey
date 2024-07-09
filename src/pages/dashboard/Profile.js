import { Button, Form, Input } from "antd"
import { WithAuth } from "../../components/with-auth"
import MainWrapper from "../../layout/MainWrapper"
import { GetRequest, PostRequest } from "../../api/ApiRequest";
import { CURRENT_HOST } from "../../Constants";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useEffect, useState } from "react";

const Profile = () => {
    const [myProfile, setMyProfile] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await GetRequest(`${CURRENT_HOST}/api/v1/dashboard/profile`);
            console.log(res.data);
            if (res.data?.profile) {
                setMyProfile({ ...res.data?.profile });
            } else {
                notifyError(res.data?.msg);
            }
        })();
    }, []);

    const onFinish = async (values) => {
        if (values['new_password'] !== values['new_confirm_password']) {
            notifyError('New password does not match');
            return;
        }
        if (values['adminWallet'].length !== 48) {
            notifyError('Invalid wallet address');
            return;
        }

        let profileRes = await PostRequest(`${CURRENT_HOST}/api/v1/dashboard/profile`, values);
        if (profileRes.data?.profile) {
            setMyProfile(profileRes.data?.profile);
            notifySuccess('Admin Profile is updated successfully');
        } else {
            notifyError(profileRes.data?.msg);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <WithAuth>
            <MainWrapper>
                {
                    myProfile ?
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
                                initialValue={myProfile?.email}
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
                                label="New Password"
                                name="new_password"
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm New Password"
                                name="new_confirm_password"
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Wallet Address (ton)"
                                name="adminWallet"
                                initialValue={myProfile.adminWallet}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your wallet address!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                        : <></>
                }

            </MainWrapper>
        </WithAuth>
    )
}

export default Profile;