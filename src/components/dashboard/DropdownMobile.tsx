// import Link from "next/link";
// import { ReactNode, useState } from "react";
// import styles from "@/styles/DashboardNav.module.css";
// import { FaAngleRight, FaAngleDown } from "react-icons/fa";
// import { AccordionItem, AccordionTrigger } from "../ui/accordion";

// const Dropdown = ({
//   children,
//   //   categories,
//   top = null,
//   content,
// }: {
//   children: ReactNode;
//   top: string | null;
//   content: Record<string, string>;
// }) => {
//   const [dropdown, setDropdown] = useState(false);

//   return (
//     <>
//
//         <AccordionContent>
//           Yes. It adheres to the WAI-ARIA design pattern.
//         </AccordionContent>
//       <div
//         className="flex justify-between items-center pl-3"
//         onClick={() => setDropdown(!dropdown)}
//       >
//         <div className={styles.flex}>
//           {children}
//           {top && <p>{top}</p>}
//         </div>
//         <div>{dropdown ? <FaAngleDown /> : <FaAngleRight />}</div>
//       </div>
//       <div className={dropdown ? styles.dropdownContent : "hidden"}>
//         {/* {categories?.map((item: string, i: number) => (
//           <div key={i}>
//             <Link href={item}>{item}</Link>
//           </div>
//         ))} */}
//         {Object.keys(content)?.map((key, index) => (
//           <div key={index}>
//             <Link href={content[key]}>
//               <p>{key}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dropdown;

import Link from "next/link";
import { ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const DropdownMobile = ({
  children,
  top = null,
  content,
}: {
  children: ReactNode;
  top: string | null;
  content: Record<string, string>;
}) => {
  return (
    <AccordionItem value={top || "item"} className="border-b-0">
      {/* mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2
      text-muted-foreground hover:text-foreground */}
      <AccordionTrigger className="text-lg mx-[-0.65rem] justify-between flex items-center rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
        <div className="flex gap-4 justify-between items-center">
          {children}
          {top && <>{top}</>}
        </div>
      </AccordionTrigger>
      <AccordionContent className="ml-3 pb-0">
        {Object.keys(content)?.map((key, index) => (
          <Link
            href={content[key]}
            key={index}
            className="text-lg flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary"
          >
            <p>{key}</p>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default DropdownMobile;
