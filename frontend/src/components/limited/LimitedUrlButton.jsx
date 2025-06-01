import { ButtonIconed } from "@/components";
import { FORMAT } from "@/constants";
import Link45Deg from "@icons/link-45deg.svg?react";
import { useState } from "react";

const LimitedUrlButton = ({ format }) => {
  const [success, setSuccess] = useState(false);

  const copyUrl = () => {
    const formatURI = encodeURI(`${FORMAT}=${format}`);
    const url = `${import.meta.env.VITE_BASE_URL}/account?${formatURI}`;

    navigator.clipboard.writeText(url);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };
  return (
    <ButtonIconed
      onClick={copyUrl}
      title="Copy URL"
      icon={<Link45Deg width="21" height="21" viewBox="0 0 15 15" />}
      variant={success ? "success" : "primary"}
      text={success ? "Copied" : "Copy URL"}
    />
  );
};

export default LimitedUrlButton;
