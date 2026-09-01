const statusColor = {
  Applied: "text-dusk",
  Interview: "text-gold",
  Rejected: "text-clay",
  Offer: "text-forest",
};

const StatusTag = ({ status }) => (
  <span className={`font-medium text-sm ${statusColor[status] || "text-ink-soft"}`}>
    {status}
  </span>
);

export default StatusTag;