import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { postRequest } from "../../axios";

import { getSessionData } from "../../utils/Helpers";
import { Link } from "react-router-dom";

const DueFees = () => {
  const [apiLoading, setApiLoading] = useState(false);
  const [liveClassList, setLiveClassList] = useState([]);

  // useEffect(() => {
  //   getLiveClassList();
  // }, []);

  // const getLiveClassList = async () => {
  //   const getClassResponse = await postRequest("live-class-list-staff", {
  //     filterDate: "25/11/2021",
  //     page: 1,
  //   });
  //   setLiveClassList(getClassResponse.data.response.live_classes);
  //   setPaginationData(getClassResponse.data.paginationData);
  // };

  return (
    <div className="panel">
      <div className="panel-hdr">
        <h2>Due Fees Information</h2>
      </div>
      <div className="panel-container show">
        <div className="panel-content">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#fees-info-category-1"
                role="tab"
                aria-selected="true"
              >
                MONTHLY CHARGES
              </a>
            </li>
          </ul>
          <div className="tab-content border border-top-0 p-3">
            <div
              className="tab-pane fade active show"
              id="fees-info-category-1"
              role="tabpanel"
            >
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
                  <tr className="feesRow26">
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
                        <label className="custom-control-label" for="frCheck26">
                          TUITION FEE
                        </label>
                      </div>
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="dueSpan26">0</span>
                      <input type="hidden" id="due26" value="0" />
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="amtSpan26"> 750</span>
                      <input type="hidden" id="amt26" value="750" />
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="totSpan26"> 750</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right">Total -</th>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="totDue2">0</span>
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="totAmt2">750</span>
                    </td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <span id="totTotal2">750</span>
                    </td>
                  </tr>
                  <tr>
                    <th colspan="4">
                      <button
                        className="btn btn-block btn-success"
                        onclick="ShowMonthSelection('#totDue2','totAmt2','2',2);"
                      >
                        {" "}
                        PAY NOW
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed text-center">
                  <tr>
                    <td colspan="2">SUMMARY</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Fees</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> <strong>9000</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Paid</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> <strong>5250</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Total Due</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> <strong>3750</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueFees;
