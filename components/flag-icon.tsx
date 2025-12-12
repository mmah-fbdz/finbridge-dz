export function FlagIcon({ code, className = "" }: { code: string; className?: string }) {
  const flagMap: Record<string, string> = {
    US: "https://flagcdn.com/w40/us.png",
    GB: "https://flagcdn.com/w40/gb.png",
    DZ: "https://flagcdn.com/w40/dz.png",
    AE: "https://flagcdn.com/w40/ae.png",
  }

  return (
    <img
      src={flagMap[code] || flagMap.US}
      alt={`${code} flag`}
      className={`w-5 h-4 object-cover rounded-sm ${className}`}
    />
  )
}
