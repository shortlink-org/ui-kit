import clsx from 'clsx'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { ProfileIdentity } from '../../ui/ProfileIdentity/ProfileIdentity'

interface FooterProps {
  mode?: 'full' | 'compact' | 'mini'
  density?: 'default' | 'compact'
  embedded?: boolean
  name?: string
  email?: string
  avatarUrl?: string
  onToggleMode?: () => void
}

function Footer({
  mode = 'full',
  density = 'default',
  embedded = false,
  name = 'User Name',
  email = 'user@example.com',
  avatarUrl = 'https://i.ibb.co/fxrbS6p/Ellipse-2-2.png',
  onToggleMode,
}: FooterProps) {
  const compactMode = mode === 'mini' || mode === 'compact'
  const dense = density === 'compact'
  const miniRail = compactMode && mode === 'mini'

  if (miniRail) {
    return (
      <div
        className={clsx(
          'border-t border-[var(--color-border)]/80 pt-3 pb-3.5',
          embedded && 'bg-transparent',
        )}
      >
        <div className="flex flex-col items-center gap-3">
          {onToggleMode ? (
            <button
              type="button"
              onClick={onToggleMode}
              aria-label="Expand sidebar"
              title="Expand sidebar"
              className="focus-ring inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-muted)_38%,transparent)] hover:text-[var(--color-foreground)]"
            >
              <ChevronDoubleRightIcon className="size-4" aria-hidden="true" />
            </button>
          ) : null}

          <button
            type="button"
            aria-label={`Open ${name} profile`}
            title={name}
            className="focus-ring relative inline-flex size-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-[var(--color-muted-foreground)] transition-[transform,border-color] duration-200 hover:border-sky-200/70 hover:shadow-[0_12px_28px_-18px_rgba(14,165,233,0.35)]"
          >
            <ProfileIdentity
              avatarSrc={avatarUrl}
              name={name}
              size="md"
              showDetails={false}
              avatarShape="rounded"
              avatarClassName="size-full rounded-[0.85rem]"
            />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'border-t border-[var(--color-border)]/80',
        compactMode || dense ? 'p-2.5' : 'p-3',
      )}
    >
      <div
        className={clsx(
          'relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_94%,rgb(14_165_233)_6%)] shadow-[0_22px_48px_-36px_rgba(15,23,42,0.45)]',
          dense ? 'p-2.5' : 'p-3',
          compactMode &&
            'flex justify-center rounded-[1.15rem] border-transparent bg-transparent p-0 shadow-none',
        )}
      >
        <div
          className="pointer-events-none absolute right-[-10%] top-[-30%] h-20 w-20 rounded-full bg-sky-400/12 blur-2xl"
          aria-hidden="true"
        />

        {compactMode ? (
          <div className="flex flex-col items-center gap-2.5">
            {onToggleMode ? (
              <button
                type="button"
                onClick={onToggleMode}
                aria-label="Expand sidebar"
                title="Expand sidebar"
                className="focus-ring inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                <ChevronDoubleRightIcon className="size-4" />
              </button>
            ) : null}

            <button
              type="button"
              aria-label={`Open ${name} profile`}
              title={name}
              className="focus-ring relative inline-flex size-12 cursor-pointer items-center justify-center rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-[var(--color-muted-foreground)] shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)] transition-[transform,border-color,box-shadow] duration-200 hover:scale-[1.03] hover:border-sky-200/70 hover:shadow-[0_20px_45px_-30px_rgba(14,165,233,0.32)]"
            >
              <ProfileIdentity
                avatarSrc={avatarUrl}
                name={name}
                size="md"
                showDetails={false}
                avatarShape="rounded"
                avatarClassName="size-full rounded-[0.9rem]"
              />
            </button>
          </div>
        ) : (
          <ProfileIdentity
            avatarSrc={avatarUrl}
            name={name}
            email={email}
            size="md"
            avatarShape="rounded"
            avatarClassName="border border-white/60 shadow-sm dark:border-white/10"
            avatarOverlay={
              <span
                className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[var(--color-surface)] bg-emerald-500"
                aria-hidden="true"
              />
            }
            accessory={
              onToggleMode ? (
                <button
                  type="button"
                  onClick={onToggleMode}
                  aria-label="Collapse sidebar"
                  className="focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                >
                  <ChevronDoubleLeftIcon className="size-4" />
                </button>
              ) : null
            }
          />
        )}
      </div>
    </div>
  )
}

export default Footer
