import React, { useEffect, useState } from "react";
import { Loading } from "components/shared";
import Statistic from "./Statistic";
import SalesReport from "./SalesReport";
import SalesByCategories from "./SalesByCategories";
import LatestOrder from "./LatestOrder";
import TopProduct from "./TopProduct";
import { getSalesDashboardData } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiGetSalaries } from "services/SalariesServices";

const SalesDashboardBody = () => {
  const dispatch = useDispatch();
  const [SalaryData, setSalaryData] = useState([]);

  const {
    statisticData,
    salesReportData,
    topProductsData,
    latestOrderData,
    salesByCategoriesData,
  } = useSelector((state) => state.salesDashboard.data.dashboardData);
  const loading = useSelector((state) => state.salesDashboard.data.loading);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const response = await apiGetSalaries({ order: "ASC" });
    setSalaryData(response.data?.data);
  };
  const fetchFilterData = async (body) => {
    const response = await apiGetSalaries(body);
    setSalaryData(response.data?.data);
  };
  const MaleGenderSalary = SalaryData?.map((salary) => {
    if (salary.gender === "Male") {
      return parseInt(salary.salary);
    }
  });
  const FeMaleGenderSalary = SalaryData?.map((salary) => {
    if (salary.gender === "Female") {
      return parseInt(salary.salary);
    }
  });
  console.log(MaleGenderSalary);
  return (
    <Loading loading={false}>
      <Statistic data={statisticData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SalesReport
          data={{
            series: [
              {
                name: "Series A",
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
              },
              {
                name: "Series B",
                data: [20, 29, 37, 36, 44, 45, 50, 58],
              },
            ],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
          className="col-span-2"
        />
        <SalesReport
          data={{
            series: [
              {
                name: "Series A",
                data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
              },
              {
                name: "Series B",
                data: [20, 29, 37, 36, 44, 45, 50, 58],
              },
            ],
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        <LatestOrder
          data={SalaryData}
          className="lg:col-span-3"
          fetchFilterData={fetchFilterData}
        />
      </div>
    </Loading>
  );
};

export default SalesDashboardBody;
