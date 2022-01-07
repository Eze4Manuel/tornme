import React, { useState, useEffect } from 'react';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import Structure from "../../components/layout/index";
import { AnalyticCard } from '../../components/analyticCard/analyticCard';
import { ChartCard } from '../../components/chartCard/chartCard';
import { UsersCard } from '../../components/usersCard/usersCard';
import { TopUserCard } from '../../components/topUserCard/topUserCard';
import { UsersDistributionCard } from '../../components/usersDistributionCard/usersDistributionCard';
import { Menu, Row, Col } from 'antd';
import { ReloadIcon } from '@modulz/radix-icons';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { fShortenNumber } from '../../assets/utils/formatNumber';

import './dashboard.scss';

import btc from '../../assets/images/icons/btc.png'; // Tell webpack this JS file uses this image
import newUser from '../../assets/images/icons/new_users.png'; // Tell webpack this JS file uses this image
import totalPost from '../../assets/images/icons/total_post.png'; // Tell webpack this JS file uses this image
import onlineUser from '../../assets/images/icons/online_users.png'; // Tell webpack this JS file uses this image
import lib from './lib'

const Dashboard = () => {
  const { set, user} = useAuth();
  const [,setLoader] = useState(false);
  const [datas, setDatas] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [userStatus, setUserStatus] = useState([]);

  const menu = (
    <Menu>
     
    </Menu>
  );

  // data 
  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.getType(user?.token, "type")

      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setDatas(reqData?.data);
      }
      setLoader(false);
    })();
  }, [user?.token, set])

  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.getType(user?.token, "count")

      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        setUserCount(reqData?.data);
      }
      setLoader(false);
    })();
  }, [user?.token, set])

  useEffect(() => {
    (async () => {
      setLoader(true)
      let reqData = await lib.getType(user?.token, "status")

      if (reqData.status === "error") {
        helpers.sessionHasExpired(set, reqData.msg);
      }
      if (reqData.status === 'ok') {
        transformData(reqData?.data);
      }
      setLoader(false);
    })();
  }, [user?.token, set])


  const transformData = (stats) => {
    let status = [];

    stats.forEach( (e, ind) => {
      if(e._id === 0) {
        let obj = {}
        obj.type = "Inactive";
        obj.value = e.total;
        obj.index = ind;
         status.push(obj)
      }else
      if(e._id === 1) {
        let obj = {}
        obj.type = "Active";
        obj.value = e.total;
        obj.index = ind;
        status.push(obj)
      }
      if(e._id === 2) {
        let obj = {}
        obj.type = "Deactived";
        obj.value = e.total;
        obj.index = ind;
        status.push(obj)
      }
     
    })
    setUserStatus(status);
  }

  const dataSource = [
    { img: btc, userHandle: "@priewereer", followers: 2325 },
    { img: onlineUser, userHandle: "@priewereer", followers: 5445 },
    { img: newUser, userHandle: "@priewereer", followers: 335 },
    { img: onlineUser, userHandle: "@priewereer", followers: 2145 },
    { img: newUser, userHandle: "@priewereer", followers: 2245 },
    { img: btc, userHandle: "@priewereer", followers: 2340 },
    { img: newUser, userHandle: "@priewereer", followers: 335 },
    { img: onlineUser, userHandle: "@priewereer", followers: 2145 },
    { img: newUser, userHandle: "@priewereer", followers: 2245 },
    { img: btc, userHandle: "@priewereer", followers: 2340 },
    { img: newUser, userHandle: "@priewereer", followers: 335 },
    { img: onlineUser, userHandle: "@priewereer", followers: 2145 }
  ]

  // const data = [
  //   {
  //     type: 'Inactive',
  //     value: 8,
  //   },
  //   {
  //     type: 'Active',
  //     value: 70,
  //   }
  // ];

  const lineData = [
    {
      "Date": "2010-01",
      "scales": 1998
    },
    {
      "Date": "2010-02",
      "scales": 1850
    },
    {
      "Date": "2010-03",
      "scales": 1720
    },
    {
      "Date": "2010-04",
      "scales": 1818
    },
    {
      "Date": "2010-05",
      "scales": 1920
    },
    {
      "Date": "2010-06",
      "scales": 1802
    },
    {
      "Date": "2010-07",
      "scales": 1945
    },
    {
      "Date": "2010-08",
      "scales": 1856
    },
    {
      "Date": "2010-09",
      "scales": 2107
    },
    {
      "Date": "2010-10",
      "scales": 2140
    },
    {
      "Date": "2010-11",
      "scales": 2311
    },
    {
      "Date": "2010-12",
      "scales": 1972
    },
    {
      "Date": "2011-01",
      "scales": 1760
    },
    {
      "Date": "2011-02",
      "scales": 1824
    },
    {
      "Date": "2011-03",
      "scales": 1801
    },
    {
      "Date": "2011-04",
      "scales": 1001
    },
    {
      "Date": "2011-05",
      "scales": 1640
    },
    {
      "Date": "2011-06",
      "scales": 1502
    },
    {
      "Date": "2011-07",
      "scales": 1621
    },
    {
      "Date": "2011-08",
      "scales": 1480
    },
    {
      "Date": "2011-09",
      "scales": 1549
    },
    {
      "Date": "2011-10",
      "scales": 1390
    },
    {
      "Date": "2011-11",
      "scales": 1325
    },
    {
      "Date": "2011-12",
      "scales": 1250
    },
    {
      "Date": "2012-01",
      "scales": 1394
    },
    {
      "Date": "2012-02",
      "scales": 1406
    },
    {
      "Date": "2012-03",
      "scales": 1578
    },
    {
      "Date": "2012-04",
      "scales": 1465
    },
    {
      "Date": "2012-05",
      "scales": 1689
    },
    {
      "Date": "2012-06",
      "scales": 1755
    },
    {
      "Date": "2012-07",
      "scales": 1495
    },
    {
      "Date": "2012-08",
      "scales": 1508
    },
    {
      "Date": "2012-09",
      "scales": 1433
    },
    {
      "Date": "2012-10",
      "scales": 1344
    },
    {
      "Date": "2012-11",
      "scales": 1201
    },
    {
      "Date": "2012-12",
      "scales": 1065
    },
    {
      "Date": "2013-01",
      "scales": 1255
    },
    {
      "Date": "2013-02",
      "scales": 1429
    },
    {
      "Date": "2013-03",
      "scales": 1398
    },
    {
      "Date": "2013-04",
      "scales": 1678
    },
    {
      "Date": "2013-05",
      "scales": 1524
    },
    {
      "Date": "2013-06",
      "scales": 1688
    },
    {
      "Date": "2013-07",
      "scales": 1500
    },
    {
      "Date": "2013-08",
      "scales": 1670
    },
    {
      "Date": "2013-09",
      "scales": 1734
    },
    {
      "Date": "2013-10",
      "scales": 1699
    },
    {
      "Date": "2013-11",
      "scales": 1508
    },
    {
      "Date": "2013-12",
      "scales": 1680
    },
    {
      "Date": "2014-01",
      "scales": 1750
    },
    {
      "Date": "2014-02",
      "scales": 1602
    },
    {
      "Date": "2014-03",
      "scales": 1834
    },
    {
      "Date": "2014-04",
      "scales": 1722
    },
    {
      "Date": "2014-05",
      "scales": 1430
    },
    {
      "Date": "2014-06",
      "scales": 1280
    },
    {
      "Date": "2014-07",
      "scales": 1367
    },
    {
      "Date": "2014-08",
      "scales": 1155
    },
    {
      "Date": "2014-09",
      "scales": 1289
    },
    {
      "Date": "2014-10",
      "scales": 1104
    },
    {
      "Date": "2014-11",
      "scales": 1246
    },
    {
      "Date": "2014-12",
      "scales": 1098
    },
    {
      "Date": "2015-01",
      "scales": 1189
    },
    {
      "Date": "2015-02",
      "scales": 1276
    },
    {
      "Date": "2015-03",
      "scales": 1033
    },
    {
      "Date": "2015-04",
      "scales": 956
    },
    {
      "Date": "2015-05",
      "scales": 845
    },
    {
      "Date": "2015-06",
      "scales": 1089
    },
    {
      "Date": "2015-07",
      "scales": 944
    },
    {
      "Date": "2015-08",
      "scales": 1043
    },
    {
      "Date": "2015-09",
      "scales": 893
    },
    {
      "Date": "2015-10",
      "scales": 840
    },
    {
      "Date": "2015-11",
      "scales": 934
    },
    {
      "Date": "2015-12",
      "scales": 810
    },
    {
      "Date": "2016-01",
      "scales": 782
    },
    {
      "Date": "2016-02",
      "scales": 1089
    },
    {
      "Date": "2016-03",
      "scales": 745
    },
    {
      "Date": "2016-04",
      "scales": 680
    },
    {
      "Date": "2016-05",
      "scales": 802
    },
    {
      "Date": "2016-06",
      "scales": 697
    },
    {
      "Date": "2016-07",
      "scales": 583
    },
    {
      "Date": "2016-08",
      "scales": 456
    },
    {
      "Date": "2016-09",
      "scales": 524
    },
    {
      "Date": "2016-10",
      "scales": 398
    },
    {
      "Date": "2016-11",
      "scales": 278
    },
    {
      "Date": "2016-12",
      "scales": 195
    },
    {
      "Date": "2017-01",
      "scales": 145
    },
    {
      "Date": "2017-02",
      "scales": 207
    }
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
              topLeft={"Total Users"}
              bottomText={fShortenNumber(userCount?.total)}
              menu={menu}
              topRight={"Today"}
              icon={<ReloadIcon />}
            />
          </Col>
          <Col flex={2}>
            <AnalyticCard
              textColor={{ "color": "#FFBD4F" }}
              image={newUser}
              topLeft={"Admin Users"}
              bottomText={fShortenNumber(datas[0]?.total)}
              menu={menu}
              topRight={"Last 7 Days"}
              icon={<ReloadIcon />}
            />
          </Col>
          <Col flex={2}>
            <AnalyticCard
              textColor={{ "color": "#09A479" }}
              image={onlineUser}
              topLeft={"Users"}
              bottomText={fShortenNumber(datas[1]?.total)}
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
          <Col flex={4}>
            <Row>
              <Col flex={10}>
                <ChartCard
                  textColor={{ "color": "#276AFF" }}
                  image={btc}
                  topLeft={"Your Earnings"}
                  menu={menu}
                  topRight={"Month"}
                  icon={<ReloadIcon />}
                  data={lineData}
                />
              </Col>

              <Col >
                <UsersCard
                  textColor={{ "color": "#276AFF" }}
                  image={btc}
                  topLeft={"Users"}
                  data={userStatus}
                />
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
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
            </Row>
          </Col>

          <Col flex={1}>
            <Row>
              <Col flex={1}>
                <TopUserCard
                  textColor={{ "color": "#276AFF" }}
                  topLeft={"Top Users"}
                  data={dataSource}
                  bottomText={0.5989}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>


      <div className="info-cards">

      </div>
    </Structure>
  )
}
export default Dashboard;