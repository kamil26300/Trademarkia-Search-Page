import { useEffect, useRef, useState } from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const CustomToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: 600,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    whiteSpace: "pre-wrap",
  },
}));

const TruncatedText = ({ text }: { text: string }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const hasOverflow = element.scrollHeight > element.clientHeight;
      setIsTruncated(hasOverflow);
    }
  }, [text]);

  return (
    <CustomToolTip title={text} arrow disableHoverListener={!isTruncated}>
      <p ref={textRef} className="text-justify truncate-text">
        {text}
      </p>
    </CustomToolTip>
  );
};

export default TruncatedText;
