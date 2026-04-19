export function SkeletonCard() {
  return (
    <div className="flex gap-4 py-5 border-b animate-pulse">
      <div className="flex-1 space-y-3 py-1">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
        <div className="h-5 w-4/5 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 rounded-full bg-muted" />
          <div className="h-5 w-10 rounded bg-muted" />
        </div>
      </div>
      <div className="hidden sm:block h-[90px] w-[90px] shrink-0 rounded-lg bg-muted" />
    </div>
  );
}

export function SkeletonFeatured() {
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center rounded-xl border bg-card shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-muted" />
      <div className="space-y-4 p-6">
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-12 rounded-full bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-7 w-full rounded bg-muted" />
          <div className="h-7 w-3/4 rounded bg-muted" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="h-7 w-7 rounded-full bg-muted" />
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex gap-6 items-start">
        <div className="h-24 w-24 rounded-full bg-muted shrink-0" />
        <div className="flex-1 space-y-3 pt-2">
          <div className="h-6 w-40 rounded bg-muted" />
          <div className="h-4 w-56 rounded bg-muted" />
          <div className="flex gap-6 pt-2">
            {[1,2,3].map(i => <div key={i} className="h-10 w-16 rounded bg-muted" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
