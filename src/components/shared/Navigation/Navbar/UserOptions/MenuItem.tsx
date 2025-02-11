import { FC } from "react";

interface MenuItemProps {
  logo: React.ReactNode;
  label: string;
  onClick?: () => void;
  round?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  logo,
  label,
  onClick,
  round = false,
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer hover:bg-neutral-700 p-3 ${
        round && " rounded-lg"
      }`}
      onClick={onClick}
    >
      {logo}
      {label}
    </div>
  );
};

export default MenuItem;
