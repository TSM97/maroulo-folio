const KEY = 'intro-seen'

/** True once the splash has played in this browser session. Storage failures count as "seen". */
export function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return true
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* storage unavailable: nothing to remember */
  }
}
