import { Instagram, Send, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_CHANNELS, type SocialChannelId } from "@/data/socialChannels";

export const SocialChannelIcon = ({
  id,
  className,
}: {
  id: SocialChannelId;
  className?: string;
}) => {
  if (id === "youtube") return <Youtube className={cn("h-4 w-4", className)} aria-hidden="true" />;
  if (id === "instagram") return <Instagram className={cn("h-4 w-4", className)} aria-hidden="true" />;
  if (id === "telegram") return <Send className={cn("h-4 w-4", className)} aria-hidden="true" />;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
    </svg>
  );
};

type SocialChannelVariant = "header" | "mobile" | "footer";

export const SocialChannelLinks = ({
  variant = "header",
  className,
}: {
  variant?: SocialChannelVariant;
  className?: string;
}) => {
  const iconOnly = variant === "header";

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} aria-label="Каналы CentrLP">
      {SOCIAL_CHANNELS.map((channel) => (
        <a
          key={channel.id}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          data-metric={`social-channel-${channel.id}`}
          aria-label={`${channel.label}: ${channel.detail}`}
          title={`${channel.label}: ${channel.detail}`}
          className={cn(
            "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            channel.className,
            iconOnly
              ? "h-11 w-11 rounded-full xl:h-8 xl:w-8"
              : "min-h-11 rounded-full px-3 py-2 text-sm",
          )}
        >
          <SocialChannelIcon id={channel.id} />
          {!iconOnly && <span>{channel.label}</span>}
        </a>
      ))}
    </div>
  );
};
