import { useEffect, useState } from "react";
import { WithAuth } from "../../components/with-auth";
import MainWrapper from "../../layout/MainWrapper";
import { PostRequest } from "../../api/ApiRequest";
import { CURRENT_HOST } from "../../Constants";
import { List } from "antd";
import { formatWallet } from "../../utils/utils";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        PostRequest(`${CURRENT_HOST}/api/v1/admin/users`, {})
            .then((res) => {
                console.log(res);
                setUsers(res.data.users);
            })
    }, []);

    return (
        <WithAuth>
            <MainWrapper>
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[<NavLink to={'/dashboard/users/' + item.walletAddress} key="list-loadmore-more">more</NavLink>]}
                        >
                            <List.Item.Meta
                                avatar={<span>{index + 1}.</span>}
                                title={<NavLink to={'/dashboard/users/' + item.walletAddress} title={item.walletAddress}>{formatWallet(item.walletAddress)}</NavLink>}
                                description={item.referralAddress ? <NavLink to={'/dashboard/users/' + item.referralAddress}>Referrer: {formatWallet(item.referralAddress)}</NavLink>:<></>}
                            />
                            <div className="d-none d-md-block">{dayjs(new Date(parseInt(item.createdAt))).format('YYYY-MM-DD HH:mm:ss')}</div>
                        </List.Item>
                    )}
                />
            </MainWrapper>
        </WithAuth>
    )
}

export default Users;