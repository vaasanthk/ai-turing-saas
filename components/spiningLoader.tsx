export const SpiningLoader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center">
      <div className="loader h-full flex flex-col items-center">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      <p className="text-center text-lg ">
        Turing at work
        <span className="dot-one"> .</span>
        <span className="dot-two"> .</span>
        <span className="dot-three"> .</span>
      </p>
    </div>
  )
}
