/**
 * RoniiiZz — Link configuration
 * ערוך כאן את הקישורים, השם והסטטוס לייב
 */
window.RONIZ_CONFIG = {
  name: "RoniiiZz",
  tagline: "כל הקישורים",
  avatar: "assets/avatar.png",

  /** Kick channel slug — used for optional live check */
  kickChannel: "roniiizz",

  /**
   * showLiveBadge:
   *   "auto"  — tries to detect if Kick is live (falls back to false)
   *   true    — always show "on Live"
   *   false   — hide the badge
   */
  showLiveBadge: "auto",

  links: [
    {
      id: "kick",
      label: "Kick",
      url: "https://kick.com/roniiizz",
      brand: "kick",
      showLive: true,
    },
    {
      id: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@roniiizz",
      brand: "tiktok",
    },
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/roniiizz__/",
      brand: "instagram",
      gradientLabel: true,
    },
    {
      id: "discord",
      label: "Discord",
      url: "https://discord.gg/3T8FjmZKqY",
      brand: "discord",
    },
    {
      id: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@RoniiiZZLive",
      brand: "youtube",
    },
    
  ],
};
