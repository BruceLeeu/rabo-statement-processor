import { useState } from "react";
import Button from "../components/Button/Button";
import type { Statement, ValidateResponse } from "../generated-sources/openapi";
import { validateStatements } from "../api/data-fetchers";
import Table from "../components/Table/Table";
import TitleBar from "../components/TitleBar/TitleBar";

const Report = () => {
  const [data, setData] = useState<null | ValidateResponse>(null);
  const [successfulTransactions, setSuccessfulTransactions] = useState<number>(0);
  const [failedTransactions, setFailedTransactions] = useState<number>(0);

  const generateReport = async (fileType: string) => {
    const result = await validateStatements(fileType);
    setData(result);
    setSuccessfulTransactions(result?.valid.length ?? 0);
    setFailedTransactions((result?.incorrectBalance?.length ?? 0) + (result?.duplicate?.length ?? 0));
  };

  const calculateStatementDifference = (statement: Statement) => {
    // Round to two decimal places, because calculation does not have infinite precision
    const calculatedEndBalance = Math.round((statement.startBalance + statement.mutation) * 100) / 100;
    const difference = Math.round((statement.endBalance - calculatedEndBalance) * 100) / 100;
    return { calculatedEndBalance, difference };
  };

  const duplicateRows = (duplicate: Statement[]) => {
    return duplicate.map((statement) => [statement.reference.toString(), statement.description, "Transaction reference was not unique"]) ?? [];
  };

  const incorrectBalanceRows = (incorrectBalance: Statement[]) => {
    return (
      incorrectBalance.map((statement) => {
        const { calculatedEndBalance, difference } = calculateStatementDifference(statement);
        return [
          statement.reference.toString(),
          statement.description,
          `End balance incorrect. Posted endBalance: €${statement.endBalance}. Calculated endBalance: €${calculatedEndBalance}. Difference: €${difference}`,
        ];
      }) ?? []
    );
  };

  return (
    <>
      <TitleBar title="Rabobank Statement Processor" withLogo />
      <h2>Validation actions</h2>
      <Button key="btn-validate-csv" title="Validate CSV" onClick={() => generateReport("csv")} />
      <Button key="btn-validate-xml" title="Validate XML" onClick={() => generateReport("xml")} />
      <br />
      {data && (
        <>
          <h3>Report:</h3>
          <Table
            headers={["Statement summary", "Total"]}
            data={[
              ["Successfully processed transactions", successfulTransactions.toString()],
              ["Failed transactions", failedTransactions.toString()],
            ]}
          />
          <h4>Detail</h4>
          <Table
            headers={["Reference", "Transaction description", "Fail reason"]}
            data={[...duplicateRows(data?.duplicate ?? []), ...incorrectBalanceRows(data?.incorrectBalance ?? [])]}
          />
        </>
      )}
    </>
  );
};

export default Report;
