import { useParams } from "react-router-dom";
import { WithAuth } from "../../components/with-auth"
import MainWrapper from "../../layout/MainWrapper";
import { Col, Divider, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { GetRequest } from "../../api/ApiRequest";
import { CURRENT_HOST } from "../../Constants";
import { formatWallet } from "../../utils/utils";
import dayjs from "dayjs";

const Referral = ({wallet}) => {
    const [ referrals, setReferrals ] = useState([]);
    const [ totalRewards, setTotalRewards ] = useState(0);
    useEffect(() => {
        GetRequest(`${CURRENT_HOST}/api/v1/dashboard/referrals?wallet=${wallet}`)
            .then((res) => {
                console.log(res.data.referrals);
                setReferrals(res.data.referrals);
                setTotalRewards(res.data.rewards);
            })
    }, [wallet]);

    return <>
        <Row>
            <Col><h6>Total Reward Points: &nbsp;{totalRewards}</h6></Col>
        </Row>
        <Row className="p-2">
            <Col xl={12}><strong>Wallet Address</strong></Col>
            <Col xl={6}><strong>Signed At</strong></Col>
        </Row>
        { 
            referrals.map((refer, key)=>(
                <Row className="p-2" key={key}>
                    <Col xl={12}>{formatWallet(refer.walletAddress)}</Col>
                    <Col xl={6}>{dayjs(new Date(parseInt(refer.createdAt))).format('YYYY-MM-DD HH:mm:ss')}</Col>
                </Row>
            ))
        }
    </>;
}

const NumbersPurchased = ({wallet}) => {
    const [ numbers, setNumbers ] = useState([]);
    
    useEffect(()=>{
        GetRequest(`${CURRENT_HOST}/api/v1/dashboard/numbers?wallet=${wallet}`)
            .then((res) => {
                setNumbers(res.data.numbers);
            });
    }, [wallet]);

    return <>
        <Row>
            <Col><h6>Total numbers purchased: &nbsp;{numbers.length}</h6></Col>
        </Row>
        <Row className="p-2">
            <Col xl={12}><strong>Number</strong></Col>
            <Col xl={6}><strong>Price</strong></Col>
            <Col xl={6}><strong>Buy At</strong></Col>
        </Row>
        { 
            numbers.map((number, key)=>(
                <Row className="p-2" key={key} style={{ backgroundColor: number.isWinner ? '#45f882' : 'initial'}}>
                    <Col xl={12}>{number.num}</Col>
                    <Col xl={6}>{number.price}&nbsp;{number.currency.toUpperCase()}</Col>
                    <Col xl={6}>{dayjs(new Date(parseInt(number.createdAt))).format('YYYY-MM-DD HH:mm:ss')}</Col>
                </Row>
            ))
        }
    </>;
}

const Prize = ({wallet}) => {
    const [ prizes, setPrizes ] = useState([]);
    
    useEffect(()=>{
        GetRequest(`${CURRENT_HOST}/api/v1/dashboard/prizes?wallet=${wallet}`)
            .then((res) => {
                setPrizes(res.data.prizes);
            });
    }, [wallet]);

    return <>
        <Row className="p-2">
            <Col xl={6}><strong>Prize</strong></Col>
            <Col xl={6}><strong>Made at</strong></Col>
        </Row>
        { 
            prizes.map((prize, key)=>(
                <Row className="p-2" key={key}>
                    <Col xl={6}>{prize.qty.toFixed(2)}&nbsp;{prize.currency.toUpperCase()}</Col>
                    <Col xl={6}>{dayjs(new Date(parseInt(prize.endAt))).format('YYYY-MM-DD HH:mm:ss')}</Col>
                </Row>
            ))
        }
    </>;
}

const UserDetail = () => {
    const { wallet } = useParams();

    const items = [
        {
          key: '1',
          label: 'Referrals',
          children: <Referral wallet={wallet}/>,
        },
        {
          key: '2',
          label: 'Numbers purchased',
          children: <NumbersPurchased wallet={wallet} />,
        },
        {
          key: '3',
          label: 'Prize',
          children: <Prize wallet={wallet} />,
        },
    ];

    return (
        <WithAuth>
            <MainWrapper>
                <h5>Wallet Address: <a target="_blank" href={'https://tonscan.org/address/' + wallet}>{formatWallet(wallet)}</a></h5>
                <Divider/>
                <Tabs defaultActiveKey="1" items={items} />
            </MainWrapper>
        </WithAuth>
    )
}

export default UserDetail;