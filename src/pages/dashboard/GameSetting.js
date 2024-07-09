import { Button, Form, Input, Switch, Tabs } from 'antd';
import { WithAuth } from "../../components/with-auth"
import MainWrapper from "../../layout/MainWrapper"
import { useEffect, useState } from 'react';
import { GetRequest, PostRequest } from '../../api/ApiRequest';
import { CURRENT_HOST } from '../../Constants';
import { notifyError, notifySuccess } from '../../utils/toast';

const CoinForm = ({game}) => {
    const [ myGame, setMyGame ] = useState(game);

    const onFinish = (values) => {
        PostRequest(`${CURRENT_HOST}/api/v1/dashboard/game_setting`, {...values, id: myGame._id})
            .then((res) => {
                if (res.data.setting) {
                    setMyGame(res.data.setting);
                    notifySuccess('Successfully updated');
                } else {
                    notifyError(res.data.msg);
                }
            })
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        setMyGame(game);
    }, [game]);

    return (
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
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Period (min)"
                type="number"
                name="period"
                min={1}
                initialValue={myGame.period/60000}
                rules={[
                    {
                        required: true,
                        message: 'Please input period!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Break (min)"
                type="number"
                step="1"
                min={1}
                name="breakTime"
                initialValue={myGame.breakTime/60000}
                rules={[
                    {
                        required: true,
                        message: 'Please input break!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                type="number"
                name="price"
                initialValue={myGame.price}
                rules={[
                    {
                        required: true,
                        message: 'Please input price!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Admin margin (%)"
                type="number"
                name="margin"
                initialValue={myGame.adminMargin}
                rules={[
                    {
                        required: true,
                        message: 'Please input admin margin!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            

            <Form.Item label="Enable" name="status" valuePropName="checked" initialValue={myGame.status == 'enabled'}>
                <Switch />
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
    )
}

const GameSetting = () => {
    const [ gameSettings, setGameSettings ] = useState([]);
    const [ tabItems, setTabItems ] = useState([]);

    useEffect(()=>{
        GetRequest(`${CURRENT_HOST}/api/v1/dashboard/game_settings?category=number`)
            .then((res) => {
                let _settings = res.data.settings
                setGameSettings(_settings);
                let _tabItems = [];
                for (let i = 0; i < _settings.length; i++) {
                    _tabItems.push({
                        key: `${i}`,
                        label: _settings[i].currency.toUpperCase(),
                        children: <CoinForm game={_settings[i]} />
                    });
                }
                setTabItems(_tabItems);
            });
    }, [])

    return (
        <WithAuth>
            <MainWrapper>
                <Tabs defaultActiveKey="1" items={tabItems} />
            </MainWrapper>
        </WithAuth>
    )
}

export default GameSetting;