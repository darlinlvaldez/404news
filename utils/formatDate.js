export function formatDate(dateString) {
  const now = new Date()
  const date = new Date(dateString)

  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Hoy'
  }

  if (diffDays > 0 && diffDays < 7) {
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  }

  if (diffDays >= 7 && diffDays < 14) {
    return 'La semana pasada'
  }

  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}