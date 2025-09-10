interface NestedRecordArray {
  records: {
    record: unknown[];
  };
}

export const hasNestedRecordArray = (obj: unknown): obj is NestedRecordArray => {
  if (!obj || typeof obj !== "object") return false;
  if (!("records" in obj) || !obj.records) return false;
  if (typeof obj.records !== "object" || !("record" in obj.records)) return false;
  if (!Array.isArray(obj.records.record)) return false;
  return true;
};
