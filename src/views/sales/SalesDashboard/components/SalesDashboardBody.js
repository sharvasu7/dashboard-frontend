/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { Loading } from "components/shared";
import SalesReport from "./SalesReport";
import LatestOrder from "./LatestOrder";
import { setSalaryData, setGraphData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiGetSalaries, apiGetGraph } from "services/SalariesServices";

const SalesDashboardBody = () => {
  const dispatch = useDispatch();
  //   const [SalaryData, setSalaryData] = useState([]);

  const data = useSelector((state) => state.salesDashboard.data);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const reponse = await apiGetSalaries({ order: "ASC" });
    const response = await apiGetGraph({});
    console.log(reponse?.data?.data);
    dispatch(setSalaryData(reponse?.data?.data));
    dispatch(setGraphData(response?.data?.data));
  };
  const SeriesA = data?.graphData
    .filter((graph) => {
      if (graph.gender === "Male") {
        return graph.values;
      }
    })
    .map((val) => val.values);
  const SeriesB = data?.graphData
    .filter((graph) => {
      if (graph.gender === "Female") {
        return graph.values;
      }
    })
    .map((val) => val.values);
  const donut = data?.gaphData?.map((grap) => grap);
  console.log(donut, "donut");
  return (
    <Loading loading={false}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SalesReport
          data={{
            series: [
              {
                name: "Series A",
                data: SeriesA,
              },
              {
                name: "Series B",
                data: SeriesB,
              },
            ],
            // categories: [1, 10, 15, 20, 25, 30, 35, 40],
          }}
        />
        <SalesReport
          data={{
            series: [
              {
                name: "Series c",
                data: SeriesA,
              },
              {
                name: "Series D",
                data: SeriesB,
              },
            ],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
          type="bar"
        />
        <SalesReport
          data={{
            series: [...SeriesA, ...SeriesB],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
          type="donut"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        <LatestOrder data={data?.salarydata} className="lg:col-span-3" />
      </div>
    </Loading>
  );
};

export default SalesDashboardBody;
