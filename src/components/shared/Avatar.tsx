import { FC } from "react";
import Image from "next/image";

export enum AvatarSize {
  extraSmall = 24,
  Small = 32,
  Medium = 40,
  Large = 128,
}

interface AvatarProps {
  className?: string;
  onClick?: () => void;
  size?: AvatarSize;
  imageSrc?: string | null;
}

const Avatar: FC<AvatarProps> = ({
  className,
  onClick,
  size = AvatarSize.Medium,
  imageSrc,
}) => {
  return (
    <Image
      alt="Avatar"
      className={` rounded-full aspect-square object-fill ${
        onClick && " cursor-pointer"
      } ${className}`}
      onClick={onClick}
      width={size}
      height={size}
      src={imageSrc || "/images/avatarph.jpg"}
      priority
    />
  );
};

export default Avatar;
