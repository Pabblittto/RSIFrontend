import { Button } from "antd";
import { downloadEventListAsPDF } from "../../API/events-api";

export const SaveResultsAsPdfButton = ({ idList }: { idList: number[] }) => {
  const onSearchClick = async () => {
    try {
      const res = await downloadEventListAsPDF(idList.map((v) => v.toString()));

      const blob = new Blob([res.data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(blob);
      const w = window.open(fileUrl, "_blank");
      w && w.focus();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      style={{ marginLeft: "20px" }}
      type="primary"
      onClick={onSearchClick}
      disabled={idList.length === 0}
    >
      Save Results as PDF
    </Button>
  );
};
