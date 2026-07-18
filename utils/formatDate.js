export function formatDateRelative(dateString) {
  const now = new Date()
  const date = new Date(dateString)

  let diffMs = now - date

  if (diffMs < 0) diffMs = 0

  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return `Hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`
  }

  if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
  }

  if (diffDays < 7) {
    return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`
  }

  return formatDateAbsolute(dateString)
}

export function formatDateAbsolute(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateNumeric(dateString) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric'
  })
}