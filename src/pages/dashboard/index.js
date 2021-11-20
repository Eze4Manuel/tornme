import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import { ChartCard } from '../../components/chartCard/chartCard';
import { UsersCard } from '../../components/usersCard/usersCard';
import { TopUserCard } from '../../components/topUserCard/topUserCard';
import { SupportCard } from '../../components/supportCard/supportCard';
import { UsersDistributionCard } from '../../components/usersDistributionCard/usersDistributionCard';
import { Menu, Dropdown, Row, Col } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import './dashboard.scss';

import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import totalPost from '../../assets/images/icons/total_post.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image

const Dashboard = () => {
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
        </Menu>
    );
    const dataSource = [
        {img: btc, userHandle: "@priewereer", followers: 2325},
        {img: onlineUser, userHandle: "@priewereer", followers: 5445},
        {img: newUser, userHandle: "@priewereer", followers: 335},
        {img: onlineUser, userHandle: "@priewereer", followers: 2145},
        {img: newUser, userHandle: "@priewereer", followers: 2245},
        {img: btc, userHandle: "@priewereer", followers: 2340}
    ]
    return (
        <Structure>
            <PageHeaderComp title="Dashboard" />
            <div className="analytic-cards">
                <Row>
                    <Col flex={2}>
                        <AnalyticCard
                            textColor={{ "color": "#276AFF" }}
                            image={btc}
                            topLeft={"Your Earnings"}
                            bottomText={0.5989}
                            menu={menu}
                            topRight={"Today"}
                            icon={<ReloadIcon />}
                        />
                    </Col>
                    <Col flex={2}>
                        <AnalyticCard
                            textColor={{ "color": "#FFBD4F" }}
                            image={newUser}
                            topLeft={"New Users"}
                            bottomText={372873}
                            menu={menu}
                            topRight={"Last 7 Days"}
                            icon={<ReloadIcon />}
                        />
                    </Col>
                    <Col flex={2}>
                        <AnalyticCard
                            textColor={{ "color": "#09A479" }}
                            image={onlineUser}
                            topLeft={"Online Users"}
                            bottomText={"7389k"}
                            menu={menu}
                        />
                    </Col>
                    <Col flex={2}>
                        <AnalyticCard
                            textColor={{ "color": "#2470F1" }}
                            image={totalPost}
                            topLeft={"Total Posts"}
                            bottomText={"897k"}
                            menu={menu}
                        />
                    </Col>
                </Row>
            </div>
            <div className="chart-cards">
                <Row>
                    <Col flex={11}>
                        <ChartCard
                            textColor={{ "color": "#276AFF" }}
                            image={btc}
                            topLeft={"Your Earnings"}
                            bottomText={0.5989}
                            menu={menu}
                            topRight={"Month"}
                            icon={<ReloadIcon />}
                        />
                    </Col>

                    <Col flex={2}>
                        <UsersCard
                            textColor={{ "color": "#276AFF" }}
                            image={btc}
                            topLeft={"Users"}
                            bottomText={0.5989}
                            menu={menu}
                            topRightFirst={"Year"}
                            topRightSecond={"Month"}
                            icon={<ReloadIcon />}
                        />
                    </Col>
                    <Col flex={3}>
                        <TopUserCard
                            textColor={{ "color": "#276AFF" }}
                            topLeft={"Top Users"}
                            data = {dataSource}
                            bottomText={0.5989}
                        />
                    </Col>


                </Row>
            </div>

            <div className="info-cards">
                <Row>
                    <Col flex={12}>
                        <UsersDistributionCard
                            textColor={{ "color": "#276AFF" }}
                            image={btc}
                            topLeft={"Users Distribution"}
                            bottomText={0.5989}
                            menu={menu}
                            topRight={"Month"}
                            icon={<ReloadIcon />}
                        />
                    </Col>
                    <Col flex={3}>
                        <SupportCard
                            textColor={{ "color": "#276AFF" }}
                            image={btc}
                            topLeft={"Support"}
                            bottomText={0.5989}
                                                    />
                    </Col>
                </Row>
            </div>
        </Structure>
    )
}
export default Dashboard;