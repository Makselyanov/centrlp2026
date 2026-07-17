export type LeadReceipt = {
  ok: true;
  accepted: true;
  delivery_status: "email_delivered";
  lead_submission_id: string;
  receipt_id: string;
  received_at: string;
  duplicate?: boolean;
};

export const createLeadSubmissionId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const readLeadReceipt = async (response: Response): Promise<LeadReceipt> => {
  const payload = await response.json().catch(() => null);
  if (
    !response.ok ||
    payload?.ok !== true ||
    payload?.accepted !== true ||
    payload?.delivery_status !== "email_delivered" ||
    typeof payload?.lead_submission_id !== "string" ||
    typeof payload?.receipt_id !== "string"
  ) {
    throw new Error("Lead delivery was not confirmed");
  }

  return payload as LeadReceipt;
};
