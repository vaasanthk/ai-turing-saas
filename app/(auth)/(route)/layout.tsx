const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex justify-center items-center min-h-screen theme
    "
    >
      {children}
    </div>
  )
}

export default AuthLayout
