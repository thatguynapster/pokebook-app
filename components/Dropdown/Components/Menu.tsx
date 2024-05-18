import { UseDropdownMenuOptions, useDropdownMenu } from "@restart/ui";
import { motion } from "framer-motion";
import useIsomorphicEffect from "@restart/hooks/useIsomorphicEffect";
import { classNames } from "@/libs";

export interface MenuProps extends UseDropdownMenuOptions {
  className?: string;
  role?: string;
  children?: any;
}

export const Menu = ({ role, className, children, ...rest }: MenuProps) => {
  const [props, { toggle, show, popper }] = useDropdownMenu({
    flip: true,
    fixed: true,
    offset: [0, 8],
    placement: "bottom-end",
    ...rest,
  });

  useIsomorphicEffect(() => {
    if (show) popper?.update();
  }, [show]);

  return (
    <motion.div
      {...props}
      role={role}
      initial="hidden"
      animate={show ? "opened" : "hidden"}
      variants={{
        hidden: { opacity: 0, pointerEvents: "none" },
        opened: { opacity: 1, pointerEvents: "inherit" },
      }}
      className={classNames(
        "bg-white shadow-3xl rounded-lg",
        "z-10 overflow-auto",
        "flex flex-col",
        "p-1",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Menu;
