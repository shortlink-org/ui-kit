declare namespace Temporal {
  interface PlainDate {
    year: number
  }

  interface Instant {
    readonly epochMilliseconds: number
    subtract(duration: { seconds?: number }): Instant
    toLocaleString(
      locales?: string | string[],
      options?: Intl.DateTimeFormatOptions,
    ): string
    toString(): string
  }

  interface InstantConstructor {
    from(value: string): Instant
  }

  interface NowNamespace {
    instant(): Instant
    plainDateISO(): PlainDate
  }
}

declare const Temporal: {
  Instant: Temporal.InstantConstructor
  Now: Temporal.NowNamespace
}
