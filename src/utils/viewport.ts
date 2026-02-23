/**
 * viewport.ts
 *
 * Fixes the iOS WebView "zoom/layout-jump after keyboard" bug.
 *
 * Root cause: iOS Safari/WKWebView shrinks window.innerHeight when the
 * software keyboard opens, which causes any element sized to 100vh or
 * h-full to collapse and then snap back, producing the "zoomed / can be
 * dragged" effect after dismissal.
 *
 * Strategy
 * ─────────
 * 1. Capture the REAL screen height once (before any keyboard opens) and
 *    store it in --app-height on <html>.
 * 2. Use VisualViewport API (available in WKWebView iOS 13+) to track
 *    keyboard appearance WITHOUT changing --app-height.  The keyboard
 *    pushes content via visualViewport.offsetTop / pageTop; we translate
 *    the fixed composer up by that offset instead of letting the whole
 *    document resize.
 * 3. On orientationchange, wait one frame for the new size to settle,
 *    then re-capture.
 *
 * Consumers
 * ─────────
 * AppShell root div:  height: var(--app-height)
 * ChatScreen composer: position sticky (no fixed needed — see ChatScreen)
 */

function setAppHeight(h: number) {
  document.documentElement.style.setProperty('--app-height', `${h}px`)
}

export function initViewport(): void {
  // --- Initial capture ---
  // Use screen.height as absolute fallback so we always have something
  // before the first resize fires.
  setAppHeight(window.innerHeight || screen.height)

  // --- VisualViewport path (iOS 13+, Android Chrome) ---
  // VisualViewport.height is the portion NOT covered by the keyboard.
  // We deliberately do NOT update --app-height from here — we want the
  // shell height to stay constant.  What we DO update is a secondary
  // --keyboard-height variable so the chat composer can shift itself up.
  if (window.visualViewport) {
    const vv = window.visualViewport

    const onVVResize = () => {
      // How many px of the bottom are obscured by the keyboard?
      const keyboardHeight = Math.max(0, window.innerHeight - vv.height)
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${keyboardHeight}px`,
      )
      // Also keep --app-height anchored to the FULL window height
      // (not the keyboard-shrunken vv.height).
      setAppHeight(window.innerHeight)
    }

    vv.addEventListener('resize', onVVResize)
    vv.addEventListener('scroll', onVVResize)
    onVVResize()
  } else {
    // Fallback: plain window resize (Android 4, old browsers)
    document.documentElement.style.setProperty('--keyboard-height', '0px')

    const onResize = () => {
      // Only update if height grew (keyboard closed), never shrink --app-height
      const current = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--app-height') || '0',
        10,
      )
      if (window.innerHeight > current) {
        setAppHeight(window.innerHeight)
      }
      // When height shrinks (keyboard opened) don't touch --app-height
      const keyboardHeight = Math.max(0, current - window.innerHeight)
      document.documentElement.style.setProperty(
        '--keyboard-height',
        `${keyboardHeight}px`,
      )
    }
    window.addEventListener('resize', onResize)
  }

  // --- orientationchange: re-anchor after rotate ---
  window.addEventListener('orientationchange', () => {
    // iOS reports the wrong innerHeight immediately after orientationchange.
    // Wait two animation frames for the layout to settle.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAppHeight(window.innerHeight)
        document.documentElement.style.setProperty('--keyboard-height', '0px')
      })
    })
  })
}
