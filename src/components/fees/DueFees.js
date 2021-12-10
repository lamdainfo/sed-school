import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { postRequest } from "../../axios";

import { getSchoolData, getSessionData } from "../../utils/Helpers";
import FeePayment from "./FeePayment";

const { TabPane } = Tabs;

const DueFees = () => {
  // const [apiLoading, setApiLoading] = useState(false);
  const [feesList, setFeesList] = useState([]);

  var totalPrevDue = 0;
  var totalAmount = 0;

  useEffect(() => {
    getFeeList();
  }, []);

  const getFeeList = async () => {
    const getFeesResponse = await postRequest("fees-due", {
      schoolCode: getSchoolData().school_code,
      sid: "1",
      sessionCode: getSessionData().rcode,
    });
    setFeesList(getFeesResponse.data.response.feesDueArray);
  };

  function callback(key) {
    console.log(key);
  }

  const payFees = () => {};

  return (
    <div className="panel">
      <div className="panel-hdr">
        <h2>Due Fees Information</h2>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <Tabs defaultActiveKey="1" onChange={callback} className="nav-link">
            {feesList &&
              feesList.map((fees, id) => {
                return (
                  <TabPane tab={fees.categoryName} key={id + 1}>
                    {fees.nameArray && fees.nameArray.length > 0 && (
                      <table className="table table-sm table-bordered table-hover">
                        <thead className="thead-themed text-center">
                          <tr>
                            <th>DESCRIPTION</th>
                            <th>DUE</th>
                            <th>AMOUNT</th>
                            <th>TOTAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fees.nameArray.map((feeType, fid) => {
                            totalPrevDue = totalPrevDue + feeType.previousDue;
                            totalAmount = totalAmount + feeType.amount;
                            return (
                              <tr className="feesRow26" key={"f" + fid}>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      data-value="6"
                                      className="custom-control-input nameArrayMarkOptional2"
                                      id="frCheck26"
                                      checked
                                      disabled
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="frCheck26"
                                    >
                                      {feeType.name}
                                    </label>
                                  </div>
                                </td>
                                <td className="text-right">
                                  <i className="fal fa-rupee-sign"></i>
                                  <span>{feeType.previousDue}</span>
                                </td>
                                <td className="text-right">
                                  <i className="fal fa-rupee-sign"></i>
                                  <span> {feeType.amount}</span>
                                </td>
                                <td className="text-right">
                                  <i className="fal fa-rupee-sign"></i>
                                  <span>
                                    {" "}
                                    {feeType.previousDue + feeType.amount}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th className="text-right">Total -</th>
                            <td className="text-right">
                              <i className="fal fa-rupee-sign"></i>
                              <span>{totalPrevDue}</span>
                            </td>
                            <td className="text-right">
                              <i className="fal fa-rupee-sign"></i>
                              <span>{totalAmount}</span>
                            </td>
                            <td className="text-right">
                              <i className="fal fa-rupee-sign"></i>
                              <span>{totalPrevDue + totalAmount}</span>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="4">
                              <FeePayment
                                feesDueDetail={fees.dueMonthArray}
                                categoryId={fees.categoryId}
                                nameArray={fees.nameArray}
                                amountPerMonth={fees.amountPerMonth}
                              />
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    )}

                    <table className="table table-sm table-bordered table-hover">
                      <thead className="thead-themed text-center">
                        <tr>
                          <td colspan="2">SUMMARY</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total Fees Per Month</td>
                          <td className="text-right">
                            <i className="fal fa-rupee-sign"></i>{" "}
                            <strong>{fees?.amountPerMonth}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Fees</td>
                          <td className="text-right">
                            <i className="fal fa-rupee-sign"></i>{" "}
                            <strong>{fees?.totalAmount}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Paid</td>
                          <td className="text-right">
                            <i className="fal fa-rupee-sign"></i>{" "}
                            <strong>{fees?.totalPaid}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Due</td>
                          <td className="text-right">
                            <i className="fal fa-rupee-sign"></i>{" "}
                            <strong>{fees?.totalDue}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TabPane>
                );
              })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DueFees;
