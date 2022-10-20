import React, { useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from "assets/data/user-list.data.json";
import {API_BASE_URL} from "../../../../../configs/AppConfig";
import axios from "axios";
import Loading from "../../../../../components/shared-components/Loading";
import {useHistory, useLocation} from "react-router-dom";

const ClientsList = () => {

    const history = useHistory()
    const location = useLocation()

    const [state, setState] = useState({
        users: null,
        userProfileVisible: false,
        selectedUser: null,
        isLoading: true,
        isError: {status: false, message: ''}
    })

    useEffect(() => {

        const remoteUsers = async () => {
            setState({...state, isLoading: true})
            try {
                const result = await axios(`${API_BASE_URL}/users`)

                result.data = result.data.map(e => {
                    e.img = userData[e.id - 1].img
                    e.status = Number(e.address.zipcode[0]) > 5 ? 'active' : 'blocked'
                    return e
                })

                setState({...state, users: result.data, isLoading: false})
            } catch (error) {
                setState({...state, isError: {status: true, message: 'Error load users!'}, isLoading: false})
            }
        }

        remoteUsers()
    }, [])

    useEffect(() => {
        if (state.isError.status) {
            message.error({ content: state.isError.message, duration: 2 })
        }
    }, [state.isError])

    const deleteUser = userId => {
        setState({...state, users: this.state.users.filter(item => item.id !== userId)})
        message.success({ content: `Deleted user ${userId}`, duration: 2 });
    }

    const showUserProfile = userInfo => {
        history.push(`${location.pathname}/${userInfo.id}`)
        // setState({
        //     ...state,
        //     userProfileVisible: true,
        //     selectedUser: userInfo
        // });
    };

    const closeUserProfile = () => {
        setState({
            ...state,
            userProfileVisible: false,
            selectedUser: null
        });
    }

    const tableColumns = [
        {
            title: 'User',
            dataIndex: 'name',
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
                </div>
            ),
            sorter: {
                compare: (a, b) => {
                    a = a.name.toLowerCase();
                    b = b.name.toLowerCase();
                    return a > b ? -1 : b > a ? 1 : 0;
                },
            },
        },
        {
            title: 'Website',
            dataIndex: 'website',
            sorter: {
                compare: (a, b) => {
                    a = a.website.toLowerCase();
                    b = b.website.toLowerCase();
                    return a > b ? -1 : b > a ? 1 : 0;
                },
            },
        },
        {
            title: 'Company',
            dataIndex: 'company',
            render: company => (<span>{company.name}</span>),
            sorter: {
                compare: (a, b) => {
                    a = a.company.name.toLowerCase();
                    b = b.company.name.toLowerCase();
                    return a > b ? -1 : b > a ? 1 : 0;
                },
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
            ),
            sorter: {
                compare: (a, b) => a.status.length - b.status.length,
            },
        },
        {
            title: '',
            dataIndex: 'actions',
            render: (_, elm) => (
                <div className="text-right">
                    <Tooltip title="View">
                        <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => showUserProfile(elm)} size="small"/>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button danger icon={<DeleteOutlined />} onClick={() => deleteUser(elm.id)} size="small"/>
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        state.isLoading ? (
                <Loading cover="content"/>
            ) : (
                <Card bodyStyle={{'padding': '0px'}}>
                    {state.users && <Table columns={tableColumns} dataSource={state.users} rowKey='id' />}
                    <UserView data={state.selectedUser} visible={state.userProfileVisible} close={()=> {closeUserProfile()}}/>
                </Card>
            )
    )
}

export default ClientsList
