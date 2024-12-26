import { NostrLink, NostrPrefix } from "@snort/system";
import { useUserProfile } from "@snort/system-react";
import { CSSProperties, HTMLProps } from "react";
import { Link } from "react-router-dom";

type ProfileImageProps = HTMLProps<HTMLDivElement> & {
  pubkey?: string;
  size?: number;
  withName?: boolean;
};

export function ProfileImage({ pubkey, size, withName, children, ...props }: ProfileImageProps) {
  const profile = useUserProfile(pubkey);
  const url =
    (profile?.picture?.length ?? 0) > 0
      ? profile?.picture
      : `https://nostr.api.v0l.io/api/v1/avatar/cyberpunks/${pubkey}`;

  const v = {
    backgroundImage: `url(${url})`,
  } as CSSProperties;
  if (size) {
    v.width = `${size}px`;
    v.height = `${size}px`;
  }
  return (
    <div className="flex items-center justify-between">
      <Link
        to={pubkey ? `/p/${new NostrLink(NostrPrefix.Profile, pubkey).encode()}` : ""}
        className="flex items-center gap-2"
      >
        <div
          {...props}
          className="rounded-full aspect-square w-12 bg-neutral-800 border border-neutral-500 bg-cover bg-center"
          style={v}
        ></div>
        {withName === true && <>{profile?.name}</>}
      </Link>
      {children}
    </div>
  );
}
