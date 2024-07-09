import { Button, Col, Grid, Input, Row } from "antd";
import { WithAuth } from "../../components/with-auth";
import MainWrapper from "../../layout/MainWrapper";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { PostRequest } from "../../api/ApiRequest";
import { CURRENT_HOST } from "../../Constants";
import { NavLink } from "react-router-dom";
import { formatWallet } from "../../utils/utils";
import { SendOutlined } from '@ant-design/icons';
import { notifyError, notifySuccess } from "../../utils/toast";

const Draws = () => {
    const [draws, setDraws] = useState([]);

    useEffect(() => {
        PostRequest(`${CURRENT_HOST}/api/v1/dashboard/draws`, {})
            .then((res) => {
                setDraws(res.data.draws);
            })
    }, []);

    const onChangePayout = (drawIndex, ev) => {
        let _draws = draws;
        _draws[drawIndex].prize.payout = ev.target.value;
        setDraws(_draws);
    }

    const handleSubmitPayout = (drawIndex) => {
        console.log(drawIndex, draws[drawIndex]);
        const _draw = draws[drawIndex];
        let _draws = draws;
        PostRequest(`${CURRENT_HOST}/api/v1/dashboard/payout`, {drawId: _draw._id, payout: _draw.prize.payout})
            .then((res) => {
                if (res.data.prize) {
                    _draws[drawIndex].prize = res.data.prize;
                    setDraws(_draws);
                    notifySuccess('Payout has been updated successfully.');
                } else {
                    notifyError(res.data.msg);
                }
            })
    }

    const copyWallet = (wallet) => {
        if (!wallet) return;
        navigator.clipboard.writeText(wallet);
        notifySuccess('Copied to clipboard.');
    }

    const copyPrize = (qty) => {
        if (!qty) return;
        navigator.clipboard.writeText(qty);
        notifySuccess('Copied to clipboard.');
    }

    return (
        <WithAuth>
            <MainWrapper>
                <Row className="p-2">
                    <Col xl={3}><strong>Draw-Id</strong></Col>
                    <Col xl={2}><strong>Coin</strong></Col>
                    <Col xl={2}><strong>Price</strong></Col>
                    <Col xl={3}><strong>Start</strong></Col>
                    <Col xl={3}><strong>End</strong></Col>
                    <Col xl={2}><strong>Prize</strong></Col>
                    <Col xl={3}><strong>Winner</strong></Col>
                    <Col xl={2}><strong>Margin</strong></Col>
                    <Col xl={4}><strong>Payout</strong></Col>
                </Row>
                {
                    draws?.map((draw, key) => (
                        <Row key={key} className="p-2">
                            <Col xl={3}><NavLink to={'/dashboard/draws/' + draw._id} className={'text-black'}> {draw._id}</NavLink></Col>
                            <Col xl={2}>{draw.currency.toUpperCase()}</Col>
                            <Col xl={2}>{draw.price}</Col>
                            <Col xl={3}>{dayjs(new Date(parseInt(draw.startAt))).format('YYYY-MM-DD HH:mm:ss')}</Col>
                            <Col xl={3}>{dayjs(new Date(parseInt(draw.endAt))).format('YYYY-MM-DD HH:mm:ss')}</Col>
                            <Col xl={2}><span onClick={()=>copyPrize(draw.prize?.qty)}>{draw.prize?.qty}</span></Col>
                            <Col xl={3}><span onClick={()=>copyWallet(draw.prize?.winnerWallet)}>{formatWallet(draw.prize?.winnerWallet)}</span></Col>
                            <Col xl={2}>{draw.adminProfit?.qty}</Col>
                            <Col xl={4}>
                                <Row>
                                    <Col xl={20}><Input defaultValue={draw.prize?.payout} disabled={!draw.prize} onChange={(ev) => onChangePayout(key, ev)} /></Col>
                                    <Col xl={4}><Button disabled={!draw.prize} type="text" className="p-2" onClick={() => handleSubmitPayout(key)}><SendOutlined /></Button></Col>
                                </Row>
                            </Col>
                        </Row>
                    ))
                }
            </MainWrapper>
        </WithAuth>
    )
}

export default Draws;