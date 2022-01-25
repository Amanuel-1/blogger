import snarkdown from "snarkdown";
import type { FunctionComponent } from "react";
import { FaExclamationCircle, FaLightbulb, FaStickyNote } from "react-icons/fa";

type Props = {
  type?: "warn" | "info";
  markdown: string;
};

const SpecialBlock: FunctionComponent<Props> = ({ type, markdown }) => {
  let wrapperClass =
    "text-base my-4 mx-auto p-4 border-2 rounded-md flex items-start w-full max-w-xl ";
  let iconClass = "text-2xl ";
  let Icon = null;

  switch (type) {
    case "warn":
      wrapperClass = wrapperClass + "border-red-600";
      iconClass = iconClass + "text-red-600";
      Icon = FaExclamationCircle;
      break;
    case "info":
      wrapperClass = wrapperClass + "border-yellow-400";
      iconClass = iconClass + "text-yellow-400";
      Icon = FaLightbulb;
      break;
    default:
      wrapperClass = wrapperClass + "border-emerald-600";
      iconClass = iconClass + "text-emerald-600";
      Icon = FaStickyNote;
  }

  const html = snarkdown(markdown);

  return (
    <div className={wrapperClass}>
      <Icon className={iconClass} />

      <div
        className="ml-2 flex-1 font-sora text-base text-gray-800 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default SpecialBlock;
