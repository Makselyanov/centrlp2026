export type SocialChannelId = "youtube" | "instagram" | "telegram" | "vk";

export const SOCIAL_CHANNELS = [
  {
    id: "youtube",
    label: "YouTube",
    detail: "AI, блин, работает!",
    href: "https://www.youtube.com/channel/UCo6y9tPx6p6n1RCFkGuzZ-A",
    className: "bg-[#D52323] text-white hover:bg-[#B91C1C]",
  },
  {
    id: "instagram",
    label: "Instagram*",
    detail: "@centrlp",
    href: "https://www.instagram.com/centrlp/",
    className: "bg-[#A32A8A] text-white hover:bg-[#852271]",
  },
  {
    id: "telegram",
    label: "Telegram",
    detail: "Идеи CentrLP",
    href: "https://t.me/centrlp_ideas",
    className: "bg-[#087FAE] text-white hover:bg-[#066B94]",
  },
  {
    id: "vk",
    label: "ВКонтакте",
    detail: "CentrLP",
    href: "https://vk.com/centrlp",
    className: "bg-[#1469B8] text-white hover:bg-[#105A9F]",
  },
] as const;
