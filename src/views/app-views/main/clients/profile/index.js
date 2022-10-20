import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../../../../../configs/AppConfig";
import userData from "../../../../../assets/data/user-list.data.json";
import Flex from "../../../../../components/shared-components/Flex";
import {Avatar, Button, Col, Form, Row, Upload, message, Input, DatePicker} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {ROW_GUTTER} from "../../../../../constants/ThemeConstant";
import Loading from "../../../../../components/shared-components/Loading";

const Profile = () => {

    const { userId } = useParams()
    const history = useHistory()
    const location = useLocation()

    const [state, setState] = useState({
        user: null,
        isLoading: true,
        isError: {status: false, message: ''}
    })

    const avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

    useEffect(() => {
        const remoteUser = async () => {
            setState({...state, isLoading: true})
            await axios(`${API_BASE_URL}/users/${userId}`)
                .then(response => {
                    response.data.avatarUrl = userData[response.data.id - 1].img
                    setState({...state, user: response.data, isLoading: false})
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        history.push(location.pathname.replace(`/${userId}`, ''))
                    } else {
                        setState({...state, isError: {status: true, message: 'Error load user!'}, isLoading: false})
                    }
                })
        }

        remoteUser()
    }, [])

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const onFinish = values => {
        const key = 'updatable';
        setState({...state, isLoading: true})
        // message.loading({ content: 'Updating...', key });
        setTimeout(() => {
            setState({
                ...state,
                user: {
                    name: values.name,
                    email: values.email,
                    username: values.username,
                    phone: values.phoneNumber,
                    website: values.website,
                    address: {
                        city: values.city,
                        zipcode: values.postcode
                    }
                },
                isLoading: false
            })
            // message.success({ content: 'Done!', key, duration: 2 });
            history.push(location.pathname.replace(`/${userId}`, ''))
        }, 1000);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onUploadAavater = info => {
        const key = 'updatable';
        if (info.file.status === 'uploading') {
            message.loading({ content: 'Uploading...', key, duration: 1000 });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    avatarUrl: imageUrl,
                }),
            );
            message.success({ content: 'Uploaded!', key,  duration: 1.5 });
        }
    };

    const onRemoveAvater = () => {
        setState({
            ...state,
            user: {...state.user, avatarUrl: ''}
        })
    }

    return (
            state.isLoading ? (
                <Loading cover="content"/>
            ) : (
                <>
                    <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
                        <Avatar size={90} src={state.user.avatarUrl} icon={<UserOutlined />}/>
                        <div className="ml-md-3 mt-md-0 mt-3">
                            <Upload onChange={onUploadAavater} showUploadList={false} action={avatarEndpoint}>
                                <Button type="primary">Change Avatar</Button>
                            </Upload>
                            <Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
                        </div>
                    </Flex>
                    <div className="mt-4">
                        <Form
                            name="basicInformation"
                            layout="vertical"
                            initialValues={
                                {
                                    'name': state.user.name,
                                    'email': state.user.email,
                                    'username': state.user.username,
                                    'dateOfBirth': null,
                                    'phoneNumber': state.user.phone,
                                    'website': state.user.website,
                                    'address': state.user.address.street,
                                    'city': state.user.address.city,
                                    'postcode': state.user.address.zipcode
                                }
                            }
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    <Row gutter={ROW_GUTTER}>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Name"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your name!',
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Username"
                                                name="username"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!'
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[{
                                                    required: true,
                                                    type: 'email',
                                                    message: 'Please enter a valid email!'
                                                }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Date of Birth"
                                                name="dateOfBirth"
                                            >
                                                <DatePicker className="w-100"/>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Phone Number"
                                                name="phoneNumber"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Website"
                                                name="website"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24}>
                                            <Form.Item
                                                label="Address"
                                                name="address"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="City"
                                                name="city"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Form.Item
                                                label="Post code"
                                                name="postcode"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Button type="primary" htmlType="submit">
                                        Save Change
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </>
            )
    )
}

export default Profile
