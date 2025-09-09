import { useState } from "react";
import Button from "../components/Button";
import type { Statement } from "../types/statement";

const Report = () => {
  const [data, setData] = useState<null | Statement[]>(null);

  const validateStatements = async (fileType: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/validate/${fileType}`,
      );
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
      setData(result.result.valid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      Has two buttons:
      <Button
        key="btn-validate-csv"
        title="Validate CSV"
        onClick={() => validateStatements("csv")}
      />
      <Button
        key="btn-validate-xml"
        title="Validate XML"
        onClick={() => validateStatements("xml")}
      />
      <br />
      <div>
        <h3>Data:</h3>

        {data?.map((transaction) => {
          return <p>{JSON.stringify(transaction)}</p>;
        })}
      </div>
    </>
  );
};

export default Report;
