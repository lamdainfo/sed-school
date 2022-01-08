import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import moment from "moment";
import axios from "axios";
import { postRequest } from "../../axios";

import { getSchoolData, getSessionData } from "../../utils/Helpers";

const { TabPane } = Tabs;

const PaidFees = () => {
  // const [apiLoading, setApiLoading] = useState(false);
  const [feesList, setFeesList] = useState([]);

  useEffect(() => {
    getFeeList();
  }, []);

  const getFeeList = async () => {
    const getFeesResponse = await postRequest("fees-history", {
      schoolCode: getSchoolData().school_code,
      sessionCode: getSessionData().rcode,
    });

    setFeesList(getFeesResponse.data.response.data.feesHistoryArray);
  };

  function callback(key) {
    console.log(key);
  }

  const printReceipt = async (receiptId) => {
    const receiptResponse = await postRequest("fees-receipt-print", {
      schoolCode: getSchoolData().school_code,
      receiptId,
      sessionCode: getSessionData().rcode,
    });
    window.open(receiptResponse.data.response.filePath, "_blank");
  };

  return (
    <div className="panel">
      <div className="panel-hdr">
        <h2>Paid Fees Information</h2>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <Tabs defaultActiveKey="1" onChange={callback} className="nav-link">
            {feesList &&
              feesList.map((fees, id) => {
                return (
                  <TabPane tab={fees.categoryName} key={id + 1}>
                    {fees.receiptArray &&
                      fees.receiptArray.length > 0 &&
                      fees.receiptArray.map((feeType, fid) => {
                        return (
                          <table
                            className="table table-sm table-bordered table-hover"
                            key={fid}
                          >
                            <thead className="thead-themed">
                              <tr>
                                <th colspan="2">
                                  <span className="d-block">
                                    Receipt No. : {feeType?.receiptNo}
                                  </span>
                                  <span className="d-block">
                                    Date :{" "}
                                    {moment(feeType?.receiptDate?.date).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </span>
                                  <span className="d-block">
                                    Mode : {feeType.paymentMode}
                                  </span>
                                  {feeType.forMonth !== "" && (
                                    <span className="d-block">
                                      Month(s) : {feeType.forMonth}
                                    </span>
                                  )}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {feeType.amount !== undefined
                                ? Object.entries(feeType.amount).map(
                                    ([feeName, feeAmount], i) => (
                                      <tr key={i}>
                                        <td>{feeName}</td>
                                        <td className="text-right">
                                          <i className="fal fa-rupee-sign"></i>{" "}
                                          {feeAmount}
                                        </td>
                                      </tr>
                                    )
                                  )
                                : ""}

                              {feeType.amount !== undefined && (
                                <tr>
                                  <td colspan="2">
                                    <span
                                      className="btn btn-block btn-warning htn-sm"
                                      onClick={() =>
                                        printReceipt(feeType?.receiptId)
                                      }
                                    >
                                      Print Receipt
                                    </span>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        );
                      })}

                    <table className="table table-sm table-bordered table-hover">
                      <thead className="thead-themed bg-info-50">
                        <tr>
                          <th colspan="2" className="text-center">
                            <strong>GRAND TOTAL</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.categoryGrandTotal !== undefined
                          ? Object.entries(fees.categoryGrandTotal).map(
                              ([feeName, feeAmount], i) => (
                                <tr key={i}>
                                  <td>{feeName}</td>
                                  <td className="text-right">
                                    <i className="fal fa-rupee-sign"></i>{" "}
                                    {feeAmount}
                                  </td>
                                </tr>
                              )
                            )
                          : ""}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="text-right">Total -</th>
                          <td className="text-right">
                            <i className="fal fa-rupee-sign"></i>
                            <strong>{fees.totalCategoryAmount}</strong>
                          </td>
                        </tr>
                      </tfoot>
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

export default PaidFees;
