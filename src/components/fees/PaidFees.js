import React, { useState, useEffect } from "react";
import { postRequest } from "../../axios";

import { getSessionData } from "../../utils/Helpers";
import { Link } from "react-router-dom";

const PaidFees = () => {
  const [apiLoading, setApiLoading] = useState(false);
  const [paidFeesList, setPaidFeesList] = useState([]);

  useEffect(() => {
    getFeeList();
  }, []);

  const getFeeList = async () => {
    const getFeesResponse = await postRequest("fees/history", {
      schoolCode: "5555555",
      sid: "1",
      sessionCode: "2021",
    });
    setPaidFeesList(getFeesResponse.data.feesHistoryArray);
  };

  return (
    <div className="panel">
      <div className="panel-hdr">
        <h2>Paid Fees Information</h2>
      </div>
      <div className="panel-container">
        <div className="panel-content">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#fees-due-category-0"
                role="tab"
                aria-selected="true"
              >
                ADMISSION CHARGES
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-toggle="tab"
                href="#fees-due-category-1"
                role="tab"
                aria-selected="true"
              >
                MONTHLY CHARGES
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                data-toggle="tab"
                href="#fees-due-category-2"
                role="tab"
                aria-selected="true"
              >
                BOOKS &amp; STATIONARY (BENG)
              </a>
            </li>
          </ul>
          <div className="tab-content border border-top-0 p-3">
            <div
              className="tab-pane fade active show"
              id="fees-due-category-0"
              role="tabpanel"
            >
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100001</span>
                      <span className="d-block">Receipt Date : 15-01-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ADMISSION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>SESSION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>DEVELOPMENT FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 2,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>ASSESSMENT FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>MISC CHARGES</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 4,000.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed bg-info-50">
                  <tr>
                    <th colspan="2" className="text-center">
                      <strong>GRAND TOTAL</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ADMISSION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>SESSION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>DEVELOPMENT FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 2,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>ASSESSMENT FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>MISC CHARGES</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,000.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right">Total -</th>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <strong>4,000.00</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              className="tab-pane fade  show"
              id="fees-due-category-1"
              role="tabpanel"
            >
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100094</span>
                      <span className="d-block">Receipt Date : 20-04-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :APR, </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('95')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100130</span>
                      <span className="d-block">Receipt Date : 05-05-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :MAY, </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('131')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100133</span>
                      <span className="d-block">Receipt Date : 05-05-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :JUN, </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 750.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('134')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100283</span>
                      <span className="d-block">Receipt Date : 10-07-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :JUL, AUG, </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,500.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,500.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('284')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100536</span>
                      <span className="d-block">Receipt Date : 25-09-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :SEP, OCT, </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,500.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,500.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('537')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed bg-info-50">
                  <tr>
                    <th colspan="2" className="text-center">
                      <strong>GRAND TOTAL</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TUITION FEE</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 700.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 1,500.00
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right">Total -</th>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <strong>5,250.00</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              className="tab-pane fade  show"
              id="fees-due-category-2"
              role="tabpanel"
            >
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed">
                  <tr>
                    <th colspan="2">
                      <span className="d-block">Receipt No. : 20210100475</span>
                      <span className="d-block">Receipt Date : 02-04-2021</span>
                      <span className="d-block">Mode : CASH</span>
                      <span className="d-block">Month(s) :</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OXFORD ADVANTAGE SET</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 3,182.00
                    </td>
                  </tr>
                  <tr>
                    <td>ART &amp; CRAFT WITH DISNEY</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 332.00
                    </td>
                  </tr>
                  <tr>
                    <td>NOTEBOOK SET</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 237.00
                    </td>
                  </tr>
                  <tr>
                    <td>COVER</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 140.00
                    </td>
                  </tr>
                  <tr>
                    <td>BENGALI BOOK - SET OF 3 BOOKS</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 275.00
                    </td>
                  </tr>
                  <tr>
                    <td>KEYBOARD WIN 10 - OFFICE 16</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 204.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 4,370.00
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <span
                        className="btn btn-block btn-warning htn-sm"
                        onclick="generateFeesReceiptPrint('476')"
                      >
                        Print Receipt
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-themed bg-info-50">
                  <tr>
                    <th colspan="2" className="text-center">
                      <strong>GRAND TOTAL</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OXFORD ADVANTAGE SET</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>ART &amp; CRAFT WITH DISNEY</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>NOTEBOOK SET</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>COVER</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>BENGALI BOOK - SET OF 3 BOOKS</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>KEYBOARD WIN 10 - OFFICE 16</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 0.00
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i> 4,370.00
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right">Total -</th>
                    <td className="text-right">
                      <i className="fal fa-rupee-sign"></i>
                      <strong>4,370.00</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidFees;
