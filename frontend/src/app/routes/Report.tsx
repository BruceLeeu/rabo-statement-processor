import { useState } from "react";
import Button from "../components/Button";
import type { Statement } from "../types/statement";
import RabobankLogo from "../../assets/rabobank.png";
import "./Report.scss";

const Report = () => {
  const [data, setData] = useState<null | {
    duplicate?: Statement[];
    incorrectBalance?: Statement[];
    valid: Statement[];
  }>(null);

  const validateStatements = async (fileType: string) => {
    try {
      const response = await fetch(`http://localhost:3000/validate/${fileType}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result: {
        fileType: string;
        result: {
          duplicate?: Statement[];
          incorrectBalance?: Statement[];
          valid: Statement[];
        };
      } = await response.json();
      console.log(result);
      setData(result.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="titleBar">
        <span className="titleFloater">
          <img src={RabobankLogo} alt="Rabobank logo" />
          <h1>Rabobank Statement Processor</h1>
        </span>
      </div>
      <h2>Validation actions</h2>
      <Button key="btn-validate-csv" title="Validate CSV" onClick={() => validateStatements("csv")} />
      <Button key="btn-validate-xml" title="Validate XML" onClick={() => validateStatements("xml")} />
      <br />
      <div>
        {data && (
          <>
            <h3>Report:</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Statement summary</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Successfully processed transactions</td>
                    <td>{data?.valid.length}</td>
                  </tr>
                  <tr>
                    <td>Failed transactions</td>
                    <td>{(data?.incorrectBalance?.length ?? 0) + (data?.duplicate?.length ?? 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4>Detail</h4>
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Fail reason: </th>
                </tr>
              </thead>

              <tbody>
                {data?.duplicate?.map((statement) => {
                  return (
                    <tr>
                      <td>{statement.reference}</td>
                      <td>Transaction reference was not unique</td>
                    </tr>
                  );
                })}
                {data?.incorrectBalance?.map((statement) => {
                  // Round to two decimal places, because calculation does not have infinite precision
                  const calculatedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100;
                  const difference = Math.round((statement.endBalance - calculatedEndBalance) * 100) / 100;
                  return (
                    <tr>
                      <td>{statement.reference}</td>
                      <td>
                        End balance incorrect. Posted endBalance: €{statement.endBalance}. Calculated endBalance: €{calculatedEndBalance}. Difference:
                        €{difference}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Report;
