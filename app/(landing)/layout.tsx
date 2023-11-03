const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-auto">
      <div className="mx-auto max-w-screen-xl">{children}</div>
    </div>
  )
}

export default LandingLayout
