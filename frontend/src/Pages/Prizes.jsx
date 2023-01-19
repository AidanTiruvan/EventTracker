import Header from "../Components/NavBar"

const Prizes = () => { //displays 3 images of prizes and their descriptions side by side
  return (
    <div className="min-h-screen max-w-full flex flex-col">
      <Header />
      <h1 className="text-center text-3xl text-green-500 mt-5"><strong>Prizes</strong></h1>
      <div className="w-3/4 flex flex-row mx-auto mt-5">
        <div className="w-1/3 mr-10">
          <img src="data:image/png;base64,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"></img>
          <div className="mt-2 bg-green-500 rounded-lg">
            <h1 className="text-center text-black text-xl"><strong>20 point prize</strong></h1>
            <p className="text-center text-black">Homework Pass</p>
          </div>
        </div>
        <div className="w-1/3 mr-10">
          <img src="https://media.sciencephoto.com/image/f0078214/225"></img>
          <div className="mt-2 bg-green-500 rounded-lg">
            <h1 className="text-center text-black text-xl"><strong>50 point prize</strong></h1>
            <p className="text-center text-black">Singular Pizza Slice</p>
          </div>
        </div>
        <div className="w-1/3">
          <img src="http://www.thetenniszone.com/v/vspfiles/photos/BV0760-063-2T.jpg"></img>
          <div className="mt-2 bg-green-500 rounded-lg">
            <h1 className="text-center text-black text-xl"><strong>100 point prize</strong></h1>
            <p className="text-center text-black">School Hoodie</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prizes