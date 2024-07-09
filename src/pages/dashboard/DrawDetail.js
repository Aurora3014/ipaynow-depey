import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GetRequest } from "../../api/ApiRequest";
import { CURRENT_HOST } from "../../Constants";
import { Col, Divider, Row } from "antd";
import { WithAuth } from "../../components/with-auth";
import MainWrapper from "../../layout/MainWrapper";
import { formatWallet, tonScanUrl } from "../../utils/utils";

const DrawDetail = () => {
    const { drawId } = useParams();
    const [ drawInfo, setDrawInfo ] = useState({});
    
    useEffect(()=>{
        GetRequest(`${CURRENT_HOST}/api/v1/dashboard/draw?drawId=${drawId}`)
            .then((res)=>{
                setDrawInfo(res.data);
            })
    }, [drawId]);

    return (
        <WithAuth>
            <MainWrapper>
                {
                    drawInfo?.prize?.winnerWallet 
                    ?
                    <h6>Winner: &nbsp;
                        <a href={tonScanUrl(drawInfo?.prize?.winnerWallet)} target="_blank" >
                            {formatWallet(drawInfo?.prize?.winnerWallet)}
                        </a> 
                        &nbsp;Prize: &nbsp;{drawInfo?.prize?.qty.toFixed(4) + ' ' + drawInfo?.prize?.currency.toUpperCase() }
                    </h6>
                    :
                    <><h6>No Winner</h6></>
                }
                <Divider />
                <p>Numbers</p>
                <Row>
                {
                    drawInfo?.numbers?.map((number, key) => (
                        <Col key={key} className="p-2">{number.num}</Col>
                    ))
                }
                </Row>
            </MainWrapper>
        </WithAuth>
    )
}

export default DrawDetail;