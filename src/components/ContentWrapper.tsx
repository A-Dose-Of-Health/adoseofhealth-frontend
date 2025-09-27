// components/ContentWrapper.tsx
export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow overflow-hidden">
      {children}
    </div>
  )
}
