// Number formatting utilities

export const NUMBER_FORMATS = {
  NORMAL: 'normal',
  SCIENTIFIC: 'scientific',
  ENGINEERING: 'engineering',
  ALPHABET: 'alphabet',
}

const ALPHABET_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg']

export const formatNumber = (num, format = NUMBER_FORMATS.NORMAL, decimals = 2) => {
  if (num === undefined || num === null || isNaN(num)) return '0'

  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''

  switch (format) {
    case NUMBER_FORMATS.SCIENTIFIC:
      if (absNum >= 1000) {
        return sign + absNum.toExponential(decimals)
      }
      return sign + absNum.toFixed(decimals)

    case NUMBER_FORMATS.ENGINEERING:
      if (absNum >= 1000) {
        const exp = Math.floor(Math.log10(absNum))
        const engExp = Math.floor(exp / 3) * 3
        const mantissa = absNum / Math.pow(10, engExp)
        return `${sign}${mantissa.toFixed(decimals)}e${engExp}`
      }
      return sign + absNum.toFixed(decimals)

    case NUMBER_FORMATS.ALPHABET:
      if (absNum < 1000) {
        return sign + Math.floor(absNum).toString()
      }

      const tier = Math.floor(Math.log10(absNum) / 3)
      if (tier >= ALPHABET_SUFFIXES.length) {
        return sign + absNum.toExponential(decimals)
      }

      const scaled = absNum / Math.pow(1000, tier)
      return `${sign}${scaled.toFixed(decimals)}${ALPHABET_SUFFIXES[tier]}`

    case NUMBER_FORMATS.NORMAL:
    default:
      if (absNum >= 1e12) return `${sign}${(absNum / 1e12).toFixed(decimals)}T`
      if (absNum >= 1e9) return `${sign}${(absNum / 1e9).toFixed(decimals)}B`
      if (absNum >= 1e6) return `${sign}${(absNum / 1e6).toFixed(decimals)}M`
      if (absNum >= 1e3) return `${sign}${(absNum / 1e3).toFixed(decimals)}K`
      return sign + Math.floor(absNum).toString()
  }
}

export const formatTime = (seconds) => {
  if (seconds < 60) return `${Math.floor(seconds)}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`
}
